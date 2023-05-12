import { useForm } from "react-hook-form";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";

import styles from "./index.module.scss"
import { useEffect } from "react";
import { useActions, useAppSelector } from "../../state/store";

export function EditUser() {
    const { user } = useAppSelector((state) => state.user);
    const { updateUser } = useActions();

    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
        reset
    } = useForm({ mode: "onChange" });

    function onSubmit(data: any) {
        updateUser(data);
    }

    useEffect(() => {
        reset({
            username: user.username,
            email: user.email
        })
    }, [user, reset])

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <h2>Изменение учетной записи</h2>
            <Input
                name="username"
                label="Имя пользователя"
                type="text"
                errors={errors}
                register={register("username", {
                    required: "Это поле обязательно для заполнения",
                    minLength: {
                        value: 3,
                        message: "Имя пользователя слишком короткое"
                    },
                    maxLength: {
                        value: 28,
                        message: "Имя пользователя слишком длинное"
                    },
                    pattern: {
                        value: /^[a-zа-яё0-9]+$/i,
                        message: "Имя пользователя должно состоять только из букв и чисел"
                    }
                })}
            />
            <Input
                name="email"
                label="Электронная почта"
                type="text"
                errors={errors}
                register={register("email", {
                    required: "Электронная почта обязательна для заполнения",
                    pattern: {
                        value: /^[^.](?=[a-z\d!#$%&'*+\-\\/=?.^_`{}|~]+@([a-z-\d]+\.){1,2}[a-z]{2,}$)((?!\.\.).)*$/i,
                        message: "Некорректный Email"
                    }
                })}
            />
            <Button type="submit" disabled={!isValid}>
                Изменить
            </Button>
        </form>
    )
}
