import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    Param,
    Post,
    Redirect,
    Req,
    Res,
    UseGuards,
    UseInterceptors
} from "@nestjs/common";
import { UserService } from "../services/user.service";
import { JWTService } from "../services/jwt.service";
import { Request, Response } from "express";
import { IsAuthGuard } from "src/guards/isAuth.guard";
import { IsConfirmedGuard } from "src/guards/isConfirmed.guard";
import { VerificationService } from "../services/verification.service";
import { MailService } from "src/modules/mail/mail.service";
import { BCrypt } from "src/utils/hash.utils";
import { ConfigService } from "@nestjs/config";
import { SetPasswordDto, SigninDto, SignupDto } from "../user.dto";
import { User } from "../user.entity";

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
    constructor(
        private readonly jwtService: JWTService,
        private readonly userService: UserService,
        private readonly mailService: MailService,
        private readonly configService: ConfigService,
        private readonly verificationService: VerificationService
    ) {}

    @Post("signup")
    public async signup(@Body() input: SignupDto) {
        const user = await this.userService.createUser({ ...input, password: BCrypt.hashPassword(input.password) });
        await this.verificationService.sendVerificationLink(input.email);
        return user;
    }

    @Post("signin")
    @UseGuards(IsConfirmedGuard)
    public async signin(@Res() res: Response, @Body() input: SigninDto) {
        const candidate = await this.userService.findOneByEmail(input.email);
        BCrypt.comparePasswords(input.password, candidate.password);
        const accessToken = this.jwtService.getAccessToken(candidate.id);
        const refreshToken = this.jwtService.getRefreshToken(candidate.id);
        await this.jwtService.setRefreshToken(candidate.id, refreshToken);
        res.setHeader("Authorization", accessToken);
        res.setHeader("Set-Cookie", `Refresh=${refreshToken}; HttpOnly;`);
        res.status(200).send(candidate);
    }

    @Get("me")
    @UseGuards(IsAuthGuard)
    public me(@Req() req: Request & { user: User }, @Res() res: Response) {
        res.status(200).send(req.user);
    }

    @Get("signout")
    @UseGuards(IsAuthGuard)
    public async signout(@Req() req: Request & { user: User }, @Res() res: Response) {
        await this.jwtService.removeRefreshToken(req.user.id);
        res.removeHeader("Authorization");
        res.setHeader("Set-Cookie", "Refresh=; HttpOnly; Max-Age=0");
        res.status(200).send("success");
    }

    @Get("verify/:token")
    @Redirect("http://localhost:3000") // привязать к конфигу
    async confirm(@Param() { token }: { token: string }) {
        const { email } = await this.jwtService.validateVerifyToken(token);
        await this.verificationService.confirmEmail(email);
    }

    @Post("resend-verification")
    async resendConfirmationLink(@Res() res: Response, @Body() input: { email: string }) {
        await this.verificationService.resendVerificationLink(input.email);
        res.status(200).send("success");
    }

    @Post("restore")
    public async restorePassword(@Res() res: Response, @Body() input: { email: string }) {
        const user = await this.userService.findOneByEmail(input.email);
        const restoreToken = this.jwtService.getRestoreToken(user.id);
        await this.jwtService.setRestoreToken(user.id, restoreToken);
        this.mailService.send(user.email, restoreToken);
        res.status(200).send("success");
    }

    @Post("reset-password/:token")
    public async setPassword(@Res() res: Response, @Param() { token }: { token: string }, @Body() input: SetPasswordDto) {
        const { id } = await this.jwtService.validateRestoreToken(token);
        const user = await this.userService.findOneById(id);
        await this.userService.restorePassword(user, input.password);
        await this.jwtService.removeRestoreToken(user.id);
        res.status(200).send("success");
    }
}
