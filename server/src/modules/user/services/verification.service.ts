import { BadRequestException, Injectable } from "@nestjs/common";

import { MailService } from "../../mail/mail.service";
import { UserService } from "./user.service";
import { JWTService } from "./jwt.service";

@Injectable()
export class VerificationService {
    constructor(
        private readonly jwtService: JWTService,
        private readonly mailService: MailService,
        private readonly usersService: UserService
    ) {}

    public async confirmEmail(email: string) {
        const user = await this.usersService.findOneByEmail(email);
        if (user.isEmailConfirmed) {
            throw new BadRequestException("Email is already confirmed");
        } else {
            await this.usersService.setEmailConfirmation(email);
        }
    }

    public sendVerificationLink(email: string) {
        const token = this.jwtService.getVerifyToken(email);
        return this.mailService.sendConfirmEmail(email, token);
    }

    public async resendVerificationLink(id: string) {
        const user = await this.usersService.findOneById(id);
        if (user.isEmailConfirmed) {
            throw new BadRequestException("Email is already confirmed");
        } else {
            await this.sendVerificationLink(user.email);
        }
    }
}
