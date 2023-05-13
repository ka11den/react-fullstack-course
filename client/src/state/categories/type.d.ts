type Category = {
    id: string;
    title: string;
    description: string;
}

type CategoriesState = {
    category: Category | null;
    categories: Category[];
    isSuccess: boolean;
    isLoading: boolean;
    isError: boolean;
}

namespace CategoriesAPI {
    type CreateCategoryForm = {
        title: string;
        description: string;
    }
    type UpdateCategoryForm = {
        title: string;
        description: string;
    }
}
