import { useForm } from "react-hook-form";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";

import styles from "./index.module.scss"
import { useActions } from "../../state/store";

export function EditUser({ closeModal }: { closeModal: () => void}) {
    const { updateUser } = useActions();

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
        updateUser(form as UserAPI.UpdateUserForm);
        closeModal()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <h2>Изменение учетной записи</h2>
            <Input
                name="username"
                label="Имя пользователя"
                type="text"
                errors={errors}
                register={register("username", {
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
