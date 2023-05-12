import { ExecutionContext, Injectable, BadRequestException } from "@nestjs/common";
import { Request } from "express";
import { User } from "src/modules/user/user.entity";

@Injectable()
export class ItIsMeGuard {
    public canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest<Request & { user: User }>();
        if (req.params.id === req.user.id || req.user.isAdmin) {
            return true;
        } else {
            throw new BadRequestException("Недостаточной прав");
        }
    }
}
