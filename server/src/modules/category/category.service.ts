import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Category } from "./category.entity";
import { CategoryDto } from "./category.dto";

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>
    ) {}

    private async isExist(title: string): Promise<void> {
        await this.categoryRepository.findOneBy({ title }).then((candidate) => {
            if (candidate) {
                throw new BadRequestException("Данная категория уже существует");
            }
        });
    }

    public async findAllCategories(page, size): Promise<Category[]> {
        return await this.categoryRepository.find({ skip: page * size - size, take: size });
    }

    public async findOneCategoryById(id: string): Promise<Category> {
        const candidate = await this.categoryRepository.findOneBy({ id });
        if (candidate) {
            return candidate;
        } else {
            throw new NotFoundException("Категория не найдена");
        }
    }

    public async createCategory(category: CategoryDto): Promise<Category> {
        await this.isExist(category.title);
        return await this.categoryRepository.save(category);
    }

    public async updateCategory(id: string, category: CategoryDto): Promise<Category> {
        await this.categoryRepository.update(id, category);
        return await this.findOneCategoryById(id);
    }

    public async deleteCategory(id: string): Promise<void> {
        await this.categoryRepository.delete(id);
    }
}
