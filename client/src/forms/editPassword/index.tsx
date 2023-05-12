import { useForm, useWatch } from "react-hook-form";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";

import styles from "./index.module.scss"
import { useActions, useAppSelector } from "../../state/store";
import { useNavigate } from "react-router";
import { useEffect } from "react";

export function EditPassword() {
    const navigator = useNavigate();
    const { isAuth } = useAppSelector((state) => state.user);
    const { updatePassword } = useActions();

    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
        control
    } = useForm({ mode: "onChange" });

    const passwordWatch = useWatch({
        control,
        name: "newPassword"
    });

    function onSubmit(data: any) {
        delete data.confirmPassword;
        updatePassword(data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <h2>Изменение пароля</h2>
            <Input
                name="oldPassword"
                label="Текущий пароль"
                type="password"
                errors={errors}
                register={register("oldPassword", {
                    required: "Пароль обязателен для заполнения",
                    pattern: {
                        value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[#?!@$%^&*-])[a-zA-Z\d#?!@$%^&*-]{8,}$/,
                        message: "Пароль слишком простой"
                    }
                })}
            />
            <Input
                name="newPassword"
                label="Новый пароль"
                type="password"
                errors={errors}
                register={register("newPassword", {
                    required: "Пароль обязателен для заполнения",
                    pattern: {
                        value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[#?!@$%^&*-])[a-zA-Z\d#?!@$%^&*-]{8,}$/,
                        message: "Пароль слишком простой"
                    }
                })}
            />
            <Input
                name="confirmPassword"
                label="Повторите новый пароль"
                type="password"
                errors={errors}
                register={register("confirmPassword", {
                    required: "Это поле обязательно для заполнения",
                    validate: (value) => value === passwordWatch || "Пароли не совпадают"
                })}
            />
            <Button type="submit" disabled={!isValid}>
                Изменить пароль
            </Button>
        </form>
    )
}
