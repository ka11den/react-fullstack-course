import { BadRequestException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { User } from "../user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class JWTService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {}

    public parseToken(token: string) {
        return this.jwtService.decode(token) as { id: string };
    }

    public getAccessToken(id: string): string {
        return this.jwtService.sign(
            { id },
            {
                secret: this.configService.get("JWT_ACCESS_SECRET"),
                expiresIn: `${this.configService.get("JWT_EXPIRES_IN_ACCESS")}`
            }
        );
    }

    public getRefreshToken(id: string): string {
        return this.jwtService.sign(
            { id },
            {
                secret: this.configService.get("JWT_REFRESH_SECRET"),
                expiresIn: `${this.configService.get("JWT_EXPIRES_IN_REFRESH")}`
            }
        );
    }

    public validateRefreshToken(token: string): string {
        const decoded = this.jwtService.verify(token, {
            secret: this.configService.get("JWT_REFRESH_SECRET")
        });
        return decoded.id;
    }

    public async removeRefreshToken(id: string) {
        return await this.userRepository.update(
            { id },
            {
                refreshToken: null
            }
        );
    }

    public async setRefreshToken(id: string, refreshToken: string): Promise<void> {
        await this.userRepository.update(id, { refreshToken });
    }

    public getRestoreToken(id: string): string {
        return this.jwtService.sign(
            { id },
            {
                secret: this.configService.get("JWT_RESTORE_PASSWORD_SECRET"),
                expiresIn: `${this.configService.get("JWT_EXPIRES_IN_RESTORE_PASSWORD")}`
            }
        );
    }

    public async setRestoreToken(id: string, restoreToken: string): Promise<void> {
        await this.userRepository.update(id, { restoreToken });
    }

    public async validateRestoreToken(token: string) {
        try {
            return await this.jwtService.verify(token, {
                secret: this.configService.get("JWT_RESTORE_PASSWORD_SECRET")
            });
        } catch (error) {
            throw new BadRequestException("Bad restore token");
        }
    }

    public async removeRestoreToken(id: string) {
        return await this.userRepository.update(
            { id },
            {
                restoreToken: null
            }
        );
    }

    public getVerifyToken(email: string): string {
        return this.jwtService.sign(
            { email },
            {
                secret: this.configService.get("JWT_VERIFICATION_TOKEN_SECRET"),
                expiresIn: this.configService.get("JWT_VERIFICATION_TOKEN_EXPIRATION_TIME")
            }
        );
    }

    public async validateVerifyToken(token: string) {
        try {
            return await this.jwtService.verify(token, {
                secret: this.configService.get("JWT_VERIFICATION_TOKEN_SECRET")
            });
        } catch (error) {
            throw new BadRequestException("Bad confirmation token");
        }
    }
}
