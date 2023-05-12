import { ExecutionContext, Injectable, BadRequestException } from "@nestjs/common";
import { Request } from "express";
import { UserService } from "src/modules/user/services/user.service";

@Injectable()
export class IsConfirmedGuard {
    constructor(private readonly userService: UserService) {}

    public async canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest<Request>();
        const user = await this.userService.findOneByEmail(req.body.email);
        if (user.isEmailConfirmed) {
            return true;
        } else {
            throw new BadRequestException("Акаунт не верифицирован");
        }
    }
}
