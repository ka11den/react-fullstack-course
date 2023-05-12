import { Controller, Get, Delete, UseGuards, Body, Patch, Query, Param, Req } from "@nestjs/common";

import { UpdateUserDto } from "../user.dto";

import { UserService } from "../services/user.service";
import { User } from "../user.entity";
import { IsAuthGuard } from "src/guards/isAuth.guard";
import { IsAdminGuard } from "src/guards/isAdmin.guard";
import { PaginationDto, UuidDto } from "src/utils/global.dto";
import { ItIsMeGuard } from "src/guards/itIsMe.guard";
import { Request } from "express";

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @UseGuards(IsAdminGuard)
    @UseGuards(IsAuthGuard)
    public async findAll(@Query() { page = 1, size = 10 }: PaginationDto): Promise<User[]> {
        return await this.userService.findAll(page, size);
    }

    @Get(":id")
    @UseGuards(ItIsMeGuard)
    @UseGuards(IsAuthGuard)
    public findOneByEmail(@Param() { id }: UuidDto): Promise<User> {
        return this.userService.findOneById(id);
    }

    @Patch()
    @UseGuards(IsAuthGuard)
    public async update(@Req() req: Request & { user: User }, @Body() updateUser: UpdateUserDto): Promise<User> {
        return await this.userService.updateUser(req.user.id, updateUser);
    }

    @Patch("/password")
    @UseGuards(IsAuthGuard)
    public async updatePassword(
        @Req() req: Request & { user: User },
        @Body() input: { oldPassword: string; newPassword: string }
    ): Promise<void> {
        await this.userService.updatePassword(req.user.id, input, req.user.password);
    }

    @Delete(":id")
    @UseGuards(ItIsMeGuard)
    @UseGuards(IsAuthGuard)
    public async remove(@Param() { id }: UuidDto): Promise<void> {
        await this.userService.deleteUser(id);
    }
}
