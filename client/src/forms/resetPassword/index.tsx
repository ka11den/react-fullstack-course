import { useForm, useWatch } from "react-hook-form";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";

import styles from "./index.module.scss"
import { useEffect } from "react";
import { useActions, useAppSelector } from "../../state/store";
import { useLocation, useNavigate } from "react-router";

export function ResetPasswordForm() {
    const navigator = useNavigate();
    const { pathname } = useLocation();
    const { resetPassword } = useActions();
    const { isAuth } = useAppSelector((state) => state.user);

    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
        control
    } = useForm({ mode: "onChange" });

    const passwordWatch = useWatch({
        control,
        name: "password"
    });

    function onSubmit(form: any) {
        resetPassword({ form, token: pathname.split("/").at(-1) as string});
    }

    // useEffect(() => {
    //     isAuth && navigator("/");
    // }, [isAuth, navigator])

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <Input
                name="password"
                label="Новый пароль"
                type="password"
                errors={errors}
                register={register("password", {
                    required: "Пароль обязателен для заполнения",
                    pattern: {
                        value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[#?!@$%^&*-])[a-zA-Z\d#?!@$%^&*-]{8,}$/,
                        message: "Пароль слишком простой"
                    }
                })}
            />
            <Input
                name="confirm_password"
                label="Повторите пароль"
                type="password"
                errors={errors}
                register={register("confirm_password", {
                    required: "Это поле обязательно для заполнения",
                    validate: (value) => value === passwordWatch || "Пароли не совпадают"
                })}
            />
            <Button type="submit" disabled={!isValid}>
                Сменить пароль
            </Button>
        </form>
    )
}
