import { useForm } from "react-hook-form";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import styles from "./index.module.scss"
import { useNavigate } from "react-router";
import { useAppSelector } from "../../state/store";
import { useEffect } from "react";

export function RestoreAccountForm() {
    const navigator = useNavigate();
    const { isAuth } = useAppSelector((state) => state.user);
    const {
        register,
        formState: { errors, isValid },
        handleSubmit
    } = useForm({ mode: "onChange" });

    function onSubmit(data: any) {
        console.log(data);
        navigator("/signin")
    }

    useEffect(() => {
        isAuth && navigator("/");
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
            <Button type="submit" disabled={!isValid}>
                Восстановить
            </Button>
        </form>
    )
}
