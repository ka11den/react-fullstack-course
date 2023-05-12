import {
    Controller,
    Get,
    Delete,
    Post,
    Body,
    Patch,
    UseInterceptors,
    UploadedFiles,
    Query,
    Res,
    UploadedFile,
    UseGuards
} from "@nestjs/common";

import { VideoService } from "./video.service";
import { Video } from "./video.entity";
import { CreateVideoDto, UpdateVideoDto } from "./video.dto";
import { FileFieldsInterceptor, FileInterceptor } from "@nestjs/platform-express";
import { Response } from "express";
import { IsPayedGuard } from "src/guards/isPayed.guard";
import { IsAuthGuard } from "src/guards/isAuth.guard";
import { IsAdminGuard } from "src/guards/isAdmin.guard";
import { UuidDto } from "src/utils/global.dto";

@Controller("video")
export class VideoController {
    constructor(private readonly videoService: VideoService) {}
    @Get()
    @UseGuards(IsPayedGuard)
    @UseGuards(IsAuthGuard)
    public async findAll(@Query() { id: category_id }: UuidDto): Promise<Video[]> {
        return await this.videoService.findAllVideosByCategory(category_id);
    }

    @Get("file")
    @UseGuards(IsPayedGuard)
    @UseGuards(IsAuthGuard)
    public findOneFile(@Query() { id, type }: UuidDto & { type: FileType }, @Res() res: Response): void {
        this.videoService.findOneFileById(id, type, res);
    }

    @Post()
    @UseGuards(IsAdminGuard)
    @UseGuards(IsAuthGuard)
    @UseInterceptors(
        FileFieldsInterceptor([
            { name: "preview", maxCount: 1 },
            { name: "video", maxCount: 1 }
        ])
    )
    public async createVideo(
        @UploadedFiles() files: { preview?: Express.Multer.File[]; video?: Express.Multer.File[] },
        @Body() video: CreateVideoDto
    ): Promise<Video> {
        return await this.videoService.createVideo(video, files.video[0], files.preview[0]);
    }

    @Patch()
    @UseGuards(IsAdminGuard)
    @UseGuards(IsAuthGuard)
    public async updateVideo(@Query() { id }: UuidDto, @Body() updatedVideo: UpdateVideoDto): Promise<Video> {
        return await this.videoService.updateVideo(id, updatedVideo);
    }

    @Patch(":type")
    @UseGuards(IsAdminGuard)
    @UseGuards(IsAuthGuard)
    @UseInterceptors(FileInterceptor("file"))
    public updateVideoFile(
        @UploadedFile() file: Express.Multer.File,
        @Query() { id, type }: UuidDto & { type: FileType }
    ): void {
        this.videoService.updateFile(id, type, file);
    }

    @Delete()
    @UseGuards(IsAdminGuard)
    @UseGuards(IsAuthGuard)
    public async removeVideo(@Query() { id }: UuidDto): Promise<void> {
        await this.videoService.deleteVideo(id);
    }
}
