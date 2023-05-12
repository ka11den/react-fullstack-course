import { useForm } from "react-hook-form";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";

import styles from "./index.module.scss"
import { useActions, useAppSelector } from "../../state/store";
import { useEffect } from "react";

export function EditCategory({ currentCategory }: { currentCategory : string }) {
    const { categories } = useAppSelector((state) => state.categories);
    const { updateCategory } = useActions();

    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
        reset
    } = useForm({ mode: "onChange" });

    function onSubmit(form: any) {
        updateCategory({ form, id: currentCategory });
    }

    useEffect(() => {
        const current = categories.find((category: Category) => category.id === currentCategory)
        current && reset({
            title: current.title,
            description: current.description
        })
    }, [])

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <h2>Изменение категории</h2>
            <Input
                name="title"
                label="Название категории"
                type="text"
                errors={errors}
                register={register("title", {
                    required: "Название категории обязательно для заполнения",
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
                    required: "Описание категории обязательно для заполнения",
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
