import { useForm } from "react-hook-form";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import styles from "./index.module.scss"
import { useNavigate } from "react-router";
import { useActions, useAppSelector } from "../../state/store";
import { useEffect } from "react";

export function SigninForm() {
    const navigator = useNavigate();
    const { isAuth } = useAppSelector((state) => state.user);
    const { signin } = useActions();
    const {
        register,
        formState: { errors, isValid },
        handleSubmit
    } = useForm({ mode: "onChange" });

    function onSubmit(data: any) {
        signin(data);
        isAuth && navigator("/");
    }

    useEffect(() => {
        isAuth && navigator("/profile");
    }, [isAuth, navigator])

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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
            <Input
                name="password"
                label="Пароль"
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
            <Button type="submit" disabled={!isValid}>
                Войти
            </Button>
        </form>
    )
}
