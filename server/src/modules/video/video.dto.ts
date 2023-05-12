import { IsUUID, IsString, IsNotEmpty, MinLength, MaxLength } from "@nestjs/class-validator";

export class CreateVideoDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(99)
    title: string;

    @IsString()
    @MaxLength(999)
    description: string;

    @IsUUID()
    category_id: string;
}

export class UpdateVideoDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(99)
    title: string;

    @IsString()
    @MaxLength(999)
    description: string;
}
