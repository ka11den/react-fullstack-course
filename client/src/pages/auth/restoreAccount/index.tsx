import { useNavigate } from "react-router";
import { Button } from "../../../ui/button";
import styles from "./index.module.scss";
import { RestoreAccountForm } from "../../../forms/restoreAccount";

export function RestoreAccountPage() {
    const navigator = useNavigate()
    return (
        <div className={styles.container}>
            <h1>Восстановление аккаунта</h1>
            <p className={styles.description}>Для восстановления необходимо перейти по ссылке отправленной на вашу электронную почту и установить новый пароль</p>
            <RestoreAccountForm />
            <Button className={styles.back_btn} onClick={() => navigator(-1)}>Назад</Button>
        </div>
    );
}
