import { IsString, IsNotEmpty, MinLength, MaxLength } from "@nestjs/class-validator";

export class CategoryDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(99)
    title: string;

    @IsString()
    @MaxLength(999)
    description: string;
}
