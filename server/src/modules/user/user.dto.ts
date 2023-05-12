import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class UserDto {
    id: string;
    username: string;
    email: string;
    isAdmin: boolean;
    isPaid: boolean;
    isBanned: boolean;
}

export class UpdateUserDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(24)
    username: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;
}

export class SetPasswordDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(28)
    password: string;
}

export class SignupDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(24)
    username: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(28)
    password: string;
}

export class SigninDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(28)
    password: string;
}
