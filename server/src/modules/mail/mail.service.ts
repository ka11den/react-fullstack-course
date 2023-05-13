import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService, private configService: ConfigService) {}

    public async send(email: string, token: string) {
        const url = `${
            JSON.parse(this.configService.get("IN_PRODUCTION"))
                ? this.configService.get("FRONTEND_URL_HTTPS")
                : this.configService.get("FRONTEND_URL_HTTP")
        }/reset/${token}`;

        await this.mailerService.sendMail({
            to: email,
            subject: "Reset your password",
            template: "password-restore",
            context: {
                name: email,
                url
            }
        });
    }

    public async sendConfirmEmail(email: string, token: string) {
        const url = `${
            JSON.parse(this.configService.get("IN_PRODUCTION"))
                ? this.configService.get("SERVER_URL_HTTPS")
                : this.configService.get("SERVER_URL_HTTP")
        }/verify/${token}`;

        await this.mailerService.sendMail({
            to: email,
            subject: "Email confirmation",
            template: "confirmation-email",
            context: {
                name: email,
                url
            }
        });
    }
}
