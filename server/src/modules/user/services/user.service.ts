import { HttpException, HttpStatus, BadRequestException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { SignupDto, UpdateUserDto } from "../user.dto";
import { User } from "../user.entity";
import { ConfigService } from "@nestjs/config";
import { BCrypt } from "src/utils/hash.utils";

export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly configService: ConfigService
    ) {}

    public async findAll(page: number, size: number): Promise<User[]> {
        return await this.userRepository.find({ skip: page * size - size, take: size });
    }

    public async findOneByEmail(email: string): Promise<User> {
        const candidate: User | null = await this.userRepository.findOneBy({ email });
        if (candidate) {
            return candidate;
        } else {
            throw new NotFoundException("Пользователя с данной почтой не существует");
        }
    }

    public async findOneById(id: string): Promise<User> {
        const candidate: User | null = await this.userRepository.findOneBy({ id });
        if (candidate) {
            return candidate;
        } else {
            throw new NotFoundException("Пользователя с таким id не существует");
        }
    }

    // public async findOneByRefreshToken() {

    // }

    // public async findOneByRestoreToken() {

    // }

    public async createUser(input: SignupDto): Promise<User> {
        let candidate: User | null = await this.userRepository.findOneBy({ email: input.email });
        if (candidate) {
            throw new BadRequestException("Пользовательс с данной электронной почтой уже зарегистрирован");
        } else {
            candidate = this.userRepository.create(input);
            return await this.userRepository.save(candidate);
        }
    }

    public async updateUser(id: string, input: UpdateUserDto): Promise<User> {
        const candidate: User = await this.findOneById(id);
        return await this.userRepository.save({ ...candidate, ...input });
    }

    public async updatePassword(
        id: string,
        input: { oldPassword: string; newPassword: string },
        currentPassword: string
    ): Promise<void> {
        if (BCrypt.comparePasswords(input.oldPassword, currentPassword)) {
            const hashedPasswrods = BCrypt.hashPassword(input.newPassword);
            await this.userRepository.update({ id }, { password: hashedPasswrods });
        } else {
            throw new BadRequestException("Неверынй пароль");
        }
    }

    public async deleteUser(id: string): Promise<void> {
        const response = await this.userRepository.delete(id);
        if (!response.affected) {
            throw new NotFoundException("User with this id does not exist");
        }
    }

    public async setEmailConfirmation(email: string) {
        return await this.userRepository.update({ email }, { isEmailConfirmed: true });
    }

    private verifyPassword(password: string, hashedPassword: string) {
        const isPasswordMatching = BCrypt.comparePasswords(password, hashedPassword);
        if (!isPasswordMatching) {
            throw new HttpException("Wrong credentials provided", HttpStatus.BAD_REQUEST);
        }
    }

    public async getAuthenticatedUser(email: string, plainTextPassword: string) {
        try {
            const user = await this.findOneByEmail(email);
            this.verifyPassword(plainTextPassword, user.password);
            return user;
        } catch (error) {
            throw new HttpException("Wrong credentials provided", HttpStatus.BAD_REQUEST);
        }
    }

    public async restorePassword(user: User, password: string) {
        const hashedPasswrods = BCrypt.hashPassword(password);
        await this.userRepository.update({ id: user.id }, { password: hashedPasswrods });
    }

    public async seedUser(): Promise<User> {
        let candidate = await this.userRepository.findOneBy({ email: this.configService.get("ADMIN_EMAIL") });
        if (candidate) {
            return candidate;
        } else {
            const password = BCrypt.hashPassword(this.configService.get("ADMIN_PASSWORD"));
            candidate = this.userRepository.create({
                username: this.configService.get("ADMIN_USERNAME"),
                email: this.configService.get("ADMIN_EMAIL"),
                password,
                isEmailConfirmed: true,
                isPaid: true,
                isAdmin: true
            });
            return await this.userRepository.save(candidate);
        }
    }
}
