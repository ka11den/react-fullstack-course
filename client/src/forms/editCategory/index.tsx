import { useForm } from "react-hook-form";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";

import styles from "./index.module.scss"
import { useActions } from "../../state/store";

export function EditCategory({ currentCategory, closeModal }: { currentCategory: string; closeModal: () => void }) {
    const { updateCategory } = useActions();

    const {
        register,
        formState: { errors, isValid },
        handleSubmit
    } = useForm({ mode: "onChange" });

    function onSubmit(data: any) {
        const form: Record<string, any> = {};
        for (const key in data) {
            if (data[key]) {
                form[key] = data[key];
            }
        }
        updateCategory({ form: form as CategoriesAPI.UpdateCategoryForm, id: currentCategory });
        closeModal();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <h2>Изменение категории</h2>
            <Input
                name="title"
                label="Название категории"
                type="text"
                errors={errors}
                register={register("title", {
                    minLength: {
                        value: 3,
                        message: "Название категории слишком короткое"
                    },
                    maxLength: {
                        value: 28,
                        message: "Название категории слишком длинное"
                    },
                    pattern: {
                        value: /^[a-zа-яё0-9 ]+$/i,
                        message: "Название категории должно состоять только из букв и чисел"
                    }
                })}
            />
            <Input
                name="description"
                label="Описание категории"
                type="text"
                errors={errors}
                register={register("description", {
                    pattern: {
                        value: /^[a-zа-яё0-9 ]+$/i,
                        message: "Описание категории должно состоять только из букв и чисел"
                    }
                })}
            />
            <Button type="submit" disabled={!isValid}>
                Создать
            </Button>
        </form>
    )
}
