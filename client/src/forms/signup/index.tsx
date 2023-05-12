import { useForm, useWatch } from "react-hook-form";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Checkbox } from "../../ui/checkbox";

import styles from "./index.module.scss"
import { useNavigate } from "react-router";
import { useActions, useAppSelector } from "../../state/store";
import { useEffect } from "react";

export function SignupForm() {
    const navigator = useNavigate();
    const { isSuccess } = useAppSelector((state) => state.user);
    const { signup } = useActions();
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

    function onSubmit(data: any) {
        delete data.confirm_password;
        delete data.agreement;
        signup(data);
    }

    useEffect(() => {
        isSuccess && navigator("/signin")
    }, [isSuccess, navigator])

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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
            <div className={styles.agreement}>
                <Checkbox
                    name="agreement"
                    errors={errors}
                    register={register("agreement", {
                        required: "Это поле обязательно для заполнения"
                    })}
                />
                <p>Я принимаю условия бла-бла-бла</p>
            </div>
            <Button type="submit" disabled={!isValid}>
                Зарегистрироваться
            </Button>
        </form>
    )
}
