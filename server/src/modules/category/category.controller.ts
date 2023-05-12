import { Controller, Get, Param, Delete, Post, Body, Patch, Query, UseGuards } from "@nestjs/common";

import { CategoryService } from "./category.service";
import { Category } from "./category.entity";
import { IsPayedGuard } from "src/guards/isPayed.guard";
import { IsAuthGuard } from "src/guards/isAuth.guard";
import { IsAdminGuard } from "src/guards/isAdmin.guard";
import { PaginationDto, UuidDto } from "src/utils/global.dto";
import { CategoryDto } from "./category.dto";

@Controller("category")
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get()
    @UseGuards(IsPayedGuard)
    @UseGuards(IsAuthGuard)
    public async findAll(@Query() { page = 1, size = 10 }: PaginationDto): Promise<Category[]> {
        return await this.categoryService.findAllCategories(page, size);
    }

    @Get()
    @UseGuards(IsPayedGuard)
    @UseGuards(IsAuthGuard)
    public async findOne(@Param() { id }: UuidDto): Promise<Category> {
        return await this.categoryService.findOneCategoryById(id);
    }

    @Post()
    @UseGuards(IsAdminGuard)
    @UseGuards(IsAuthGuard)
    public async createCategory(@Body() category: CategoryDto): Promise<Category> {
        return await this.categoryService.createCategory(category);
    }

    @Patch(":id")
    @UseGuards(IsAdminGuard)
    @UseGuards(IsAuthGuard)
    public async update(@Param() { id }: UuidDto, @Body() category: CategoryDto): Promise<Category> {
        return await this.categoryService.updateCategory(id, category);
    }

    @Delete(":id")
    @UseGuards(IsAdminGuard)
    @UseGuards(IsAuthGuard)
    public async remove(@Param() { id }: UuidDto): Promise<void> {
        await this.categoryService.deleteCategory(id);
    }
}
