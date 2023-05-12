import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";

import { User } from "./user.entity";

import { VerificationService } from "./services/verification.service";
import { JWTService } from "./services/jwt.service";
import { UserService } from "./services/user.service";

import { UserController } from "./controllers/user.controller";
import { AuthController } from "./controllers/auth.controller";
import { MailModule } from "../mail/mail.module";
import { MailService } from "../mail/mail.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get("JWT_ACCESS_SECRET"),
                signOptions: {
                    expiresIn: `${configService.get("JWT_EXPIRES_IN_ACCESS")}`
                }
            })
        }),
        ConfigModule,
        MailModule
    ],
    controllers: [UserController, AuthController],
    providers: [UserService, JWTService, VerificationService, MailService],
    exports: [UserService, JWTService, VerificationService, MailService]
})
export class UserModule {}
