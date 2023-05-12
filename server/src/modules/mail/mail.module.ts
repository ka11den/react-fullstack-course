import { MailerModule } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { MailService } from "./mail.service";

@Module({
    imports: [
        MailerModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (config: ConfigService) => ({
                transport: {
                    host: config.get("SMTP_HOST"),
                    port: config.get("SMTP_PORT"),
                    secure: true,
                    auth: {
                        user: config.get("SMTP_USER"),
                        pass: config.get("SMTP_PASSWORD")
                    }
                },
                defaults: {
                    from: `"No Reply" <${config.get("SMTP_USER")}>`
                },
                template: {
                    dir: "src/modules/mail/templates",
                    adapter: new HandlebarsAdapter(),
                    options: {
                        strict: true
                    }
                }
            }),
            inject: [ConfigService]
        }),
        ConfigModule
    ],
    providers: [MailService],
    exports: [MailService]
})
export class MailModule {}
