import { IsNumber, Min, IsUUID } from "@nestjs/class-validator";

export class PaginationDto {
    @Min(1)
    @IsNumber()
    page: number;

    @Min(1)
    @IsNumber()
    size: number;
}

export class UuidDto {
    @IsUUID()
    id: string;
}
