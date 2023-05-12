import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Video } from "./video.entity";
import { VideoController } from "./video.controller";
import { VideoService } from "./video.service";
import { CategoryService } from "../category/category.service";
import { Category } from "../category/category.entity";
import { UserModule } from "../user/user.module";

@Module({
    imports: [TypeOrmModule.forFeature([Video, Category]), UserModule],
    controllers: [VideoController],
    providers: [VideoService, CategoryService],
    exports: [VideoService, CategoryService]
})
export class VideoModule {}
