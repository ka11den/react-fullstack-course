import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cookieParser from "cookie-parser";
import { ConfigService } from "@nestjs/config";
import { ValidationPipe } from "@nestjs/common";

(async function () {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({ skipMissingProperties: true, transform: true }));

    app.use(cookieParser());

    const configService = app.get(ConfigService);

    app.enableCors({
        origin: [configService.get("FRONTEND_URL_HTTP"), configService.get("FRONTEND_URL_HTTPS")],
        credentials: true
    });

    await app.listen(8000);
})();
