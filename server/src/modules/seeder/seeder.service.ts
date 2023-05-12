import { Injectable, Logger } from "@nestjs/common";
import { UserService } from "../user/services/user.service";

@Injectable()
export class SeederService {
    constructor(private readonly logger: Logger, private readonly userService: UserService) {}

    public async seed() {
        await this.users()
            .then((completed) => {
                this.logger.debug("Successfully completed seeding administrator...");
                Promise.resolve(completed);
            })
            .catch((error) => {
                this.logger.error("Failed seeding administrator...");
                Promise.reject(error);
            });
    }

    private async users() {
        return await this.userService
            .seedUser()
            .then((createdUser) => {
                this.logger.debug(
                    `Created by : ${[createdUser].filter((nullValueOrCreatedUser) => nullValueOrCreatedUser).length}`
                );
                return Promise.resolve(true);
            })
            .catch((error) => Promise.reject(error));
    }
}
