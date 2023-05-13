import { useForm } from "react-hook-form";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";

import styles from "./index.module.scss"
import { useActions } from "../../state/store";
import { useLocation } from "react-router";

export function CreateVideo({ currentVideo }: { currentVideo : string }) {
    const { createVideo } = useActions();
    const { pathname } = useLocation();

    const {
        register,
        formState: { errors, isValid },
        handleSubmit
    } = useForm({ mode: "onChange" });

    function onSubmit(data: any) {
        const form = new FormData();
        form.append("video", data.video[0]);
        form.append("title", data.title);
        form.append("description", data.description);
        createVideo({form, id: pathname.split("/").at(-1) as string });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <h2>Создание видеоролика</h2>
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
            <Input
                name="video"
                label="Видеоролик"
                type="file"
                accept="video/mp4"
                errors={errors}
                register={register("video", {
                    required: "Это поле обязательно для заполнения"
                })}
            />
            <Button type="submit" disabled={!isValid}>
                Создать
            </Button>
        </form>
    )
}
