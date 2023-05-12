import { DataSourceOptions, DataSource } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { config } from "dotenv";

config();

const configService = new ConfigService();

export const ormOprions: DataSourceOptions = {
    type: "postgres",
    host: configService.get("DB_HOST"),
    port: configService.get<number>("DB_PORT"),
    username: configService.get("DB_USER"),
    password: configService.get("DB_PASSWORD"),
    database: configService.get("DB_NAME"),
    entities: ["dist/**/*.entity{.ts}"],
    synchronize: true
};

export const AppDataSource = new DataSource(ormOprions);
