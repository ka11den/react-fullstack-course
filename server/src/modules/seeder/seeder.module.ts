import { Logger, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ormOprions } from "orm.config";
import { UserModule } from "../user/user.module";
import { SeederService } from "./seeder.service";

@Module({
    imports: [TypeOrmModule.forRoot({ ...ormOprions, autoLoadEntities: true }), UserModule],
    providers: [Logger, SeederService]
})
export class SeederModule {}
