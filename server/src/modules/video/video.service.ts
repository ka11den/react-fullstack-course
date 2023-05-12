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

    public findOneFileById(id: string, type: FileType, res: Response): void {
        const target = readdirSync(`./uploads/${type}s`).find((name) => name.startsWith(id));
        if (target) {
            res.sendFile(target, { root: `./uploads/${type}s` });
        } else {
            throw new NotFoundException("Файл не найден");
        }
    }

    public async createVideo(
        data: CreateVideoDto,
        video: Express.Multer.File,
        preview: Express.Multer.File
    ): Promise<Video> {
        if (Mimetype.video(video, ["mp4"]) && Mimetype.image(preview, ["jpeg", "png"])) {
            await this.isExist(data.title);
            const category = await this.categoryService.findOneCategoryById(data.category_id),
                video_extension = video.mimetype.split("/")[1],
                preview_extension = preview.mimetype.split("/")[1],
                id = randomUUID(),
                newVideo = this.videoRepository.create({ id, ...data, category, video_extension, preview_extension }),
                result = await this.videoRepository.save(newVideo);
            writeFileSync(`./uploads/videos/${id}.${video_extension}`, video.buffer);
            writeFileSync(`./uploads/previews/${id}.${preview_extension}`, preview.buffer);
            return result;
        } else {
            throw new BadRequestException("Неверный тип файла");
        }
    }

    public updateFile(id: string, type: FileType, video: Express.Multer.File) {
        if (Mimetype.video(video, ["mp4"])) {
            const target = readdirSync(`./uploads/${type}s`).find((name) => name.startsWith(id));
            unlinkSync(`./uploads/${type}s/${target}`);
            writeFileSync(`./uploads/${type}s/${id}.${video.mimetype.split("/")[1]}`, video.buffer);
        } else {
            throw new BadRequestException("Неверный тип файла");
        }
    }

    public async updateVideo(id: string, video: UpdateVideoDto): Promise<Video> {
        await this.videoRepository.update(id, video);
        return await this.findOneVideoById(id);
    }

    public async deleteVideo(id: string): Promise<void> {
        await this.videoRepository.delete(id);
    }
}
