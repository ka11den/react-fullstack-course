import { ExecutionContext, Injectable, UnauthorizedException, BadRequestException } from "@nestjs/common";
import { Request, Response } from "express";
import { JWTService } from "src/modules/user/services/jwt.service";
import { UserService } from "src/modules/user/services/user.service";
import { User } from "src/modules/user/user.entity";

@Injectable()
export class IsAuthGuard {
    constructor(private readonly jwtService: JWTService, private readonly userService: UserService) {}

    public async canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest<Request & { user: User }>();
        const res = context.switchToHttp().getResponse<Response>();
        const token = req.cookies.Refresh;
        try {
            const id = this.jwtService.validateRefreshToken(token);
            const user = await this.userService.findOneById(id);
            if (user.isBanned) {
                res.removeHeader("Authorization");
                res.setHeader("Set-Cookie", "Refresh=; HttpOnly; Max-Age=0");
                throw new BadRequestException("Ты забанен мудила");
            } else if (user.refreshToken === token) {
                req.user = user;
                return true;
            } else {
                res.removeHeader("Authorization");
                res.setHeader("Set-Cookie", "Refresh=; HttpOnly; Max-Age=0");
                throw new UnauthorizedException("Ты не авторизован1");
            }
        } catch (error) {
            res.removeHeader("Authorization");
            res.setHeader("Set-Cookie", "Refresh=; HttpOnly; Max-Age=0");
            throw new UnauthorizedException("Ты не авторизован2");
        }
    }
}
