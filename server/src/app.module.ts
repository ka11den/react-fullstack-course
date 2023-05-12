import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";

import { ormOprions } from "orm.config";

import { AppController } from "./app.controller";

import { CategoryModule } from "./modules/category/category.module";
import { VideoModule } from "./modules/video/video.module";
import { UserModule } from "./modules/user/user.module";

@Module({
    imports: [
        TypeOrmModule.forRoot({ ...ormOprions, autoLoadEntities: true }),
        ConfigModule,
        CategoryModule,
        VideoModule,
        UserModule
    ],
    controllers: [AppController]
})
export class AppModule {}
