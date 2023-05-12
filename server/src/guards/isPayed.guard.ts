import { ExecutionContext, Injectable, BadRequestException } from "@nestjs/common";
import { Request } from "express";
import { User } from "src/modules/user/user.entity";

@Injectable()
export class IsPayedGuard {
    public canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest<Request & { user: User }>();
        if (req.user.isPaid) {
            return true;
        } else {
            throw new BadRequestException("Подписка не куплена");
        }
    }
}
