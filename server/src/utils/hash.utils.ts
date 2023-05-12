import { BadRequestException } from "@nestjs/common";
import * as bcrypt from "bcryptjs";

export abstract class BCrypt {
    public static comparePasswords(password: string, hashedPassword: string): boolean {
        const isPasswordMatching = bcrypt.compareSync(password, hashedPassword);
        if (isPasswordMatching) {
            return true;
        } else {
            throw new BadRequestException("Wrong credentials provided");
        }
    }
    public static hashPassword(password: string): string {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
    }
}
