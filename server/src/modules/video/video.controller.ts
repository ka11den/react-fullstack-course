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
    UseGuards,
    Param
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

    @Get("file")
    @UseGuards(IsPayedGuard)
    @UseGuards(IsAuthGuard)
    public findOneFile(@Query() { id }: UuidDto, @Res() res: Response): void {
        this.videoService.findOneFileById(id, res);
    }

    @Get("all/:id")
    @UseGuards(IsPayedGuard)
    @UseGuards(IsAuthGuard)
    public async findAll(@Param() { id: category_id }: UuidDto): Promise<Video[]> {
        return await this.videoService.findAllVideosByCategory(category_id);
    }

    @Get(":id")
    @UseGuards(IsPayedGuard)
    @UseGuards(IsAuthGuard)
    public async findVideoById(@Param() { id }: UuidDto): Promise<Video> {
        return await this.videoService.findOneVideoById(id);
    }

    @Post(":id")
    @UseGuards(IsAdminGuard)
    @UseGuards(IsAuthGuard)
    @UseInterceptors(FileInterceptor("video"))
    public async createVideo(
        @Param() { id: category_id }: UuidDto,
        @UploadedFile() video: Express.Multer.File,
        @Body() data: CreateVideoDto
    ): Promise<Video> {
        return await this.videoService.createVideo(data, category_id, video);
    }

    @Patch(":id")
    @UseGuards(IsAdminGuard)
    @UseGuards(IsAuthGuard)
    public async updateVideo(@Param() { id }: UuidDto, @Body() updatedVideo: UpdateVideoDto): Promise<Video> {
        return await this.videoService.updateVideo(id, updatedVideo);
    }

    @Patch("file/:id")
    @UseGuards(IsAdminGuard)
    @UseGuards(IsAuthGuard)
    @UseInterceptors(FileInterceptor("file"))
    public updateVideoFile(@UploadedFile() file: Express.Multer.File, @Param() { id }: UuidDto): void {
        this.videoService.updateFile(id, file);
    }

    @Delete(":id")
    @UseGuards(IsAdminGuard)
    @UseGuards(IsAuthGuard)
    public async removeVideo(@Param() { id }: UuidDto): Promise<void> {
        await this.videoService.deleteVideo(id);
    }
}
