import { Inject, Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Video } from "./video.entity";
import { CategoryService } from "../category/category.service";
import { CreateVideoDto, UpdateVideoDto } from "./video.dto";
import { randomUUID } from "crypto";
import { readdirSync, unlinkSync, writeFileSync } from "fs";
import { Mimetype } from "src/utils/mimetype.validator";
import { Response } from "express";

@Injectable()
export class VideoService {
    constructor(
        @InjectRepository(Video)
        private readonly videoRepository: Repository<Video>,
        @Inject(CategoryService)
        private readonly categoryService: CategoryService
    ) {}

    private async isExist(title: string): Promise<void> {
        await this.videoRepository.findOneBy({ title }).then((candidate) => {
            if (candidate) {
                throw new BadRequestException("Видео с таким названием уже создано");
            }
        });
    }

    public async findAllVideosByCategory(id: string): Promise<Video[]> {
        const category = await this.categoryService.findOneCategoryById(id);
        return await this.videoRepository.findBy({ category });
    }

    public async findOneVideoById(id: string): Promise<Video> {
        return await this.videoRepository.findOneBy({ id });
    }

    public findOneFileById(id: string, res: Response): void {
        const target = readdirSync("./uploads").find((name) => name.startsWith(id));
        if (target) {
            res.sendFile(target, { root: "./uploads" });
        } else {
            throw new NotFoundException("Файл не найден");
        }
    }

    public async createVideo(data: CreateVideoDto, category_id: string, video: Express.Multer.File): Promise<Video> {
        if (Mimetype.video(video, ["mp4"])) {
            await this.isExist(data.title);
            const category = await this.categoryService.findOneCategoryById(category_id),
                video_extension = video.mimetype.split("/")[1],
                id = randomUUID(),
                newVideo = this.videoRepository.create({
                    id,
                    ...data,
                    category
                }),
                result = await this.videoRepository.save(newVideo);
            writeFileSync(`./uploads/${id}.${video_extension}`, video.buffer);
            return result;
        } else {
            throw new BadRequestException("Неверный тип файла");
        }
    }

    public updateFile(id: string, video: Express.Multer.File) {
        if (Mimetype.video(video, ["mp4"])) {
            const target = readdirSync("./uploads").find((name) => name.startsWith(id));
            unlinkSync(`./uploads/${target}`);
            writeFileSync(`./uploads/${id}.${video.mimetype.split("/")[1]}`, video.buffer);
        } else {
            throw new BadRequestException("Неверный тип файла");
        }
    }

    public async updateVideo(id: string, video: UpdateVideoDto): Promise<Video> {
        await this.videoRepository.update(id, video);
        return await this.findOneVideoById(id);
    }

    public async deleteVideo(id: string): Promise<void> {
        const target = readdirSync("./uploads").find((name) => name.startsWith(id));
        unlinkSync(`./uploads/${target}`);
        await this.videoRepository.delete(id);
    }
}
