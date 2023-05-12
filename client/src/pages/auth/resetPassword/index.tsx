import { ResetPasswordForm } from "../../../forms/resetPassword";
import styles from "./index.module.scss";

export function ResetPasswordPage() {
    return (
        <div className={styles.container}>
            <h2>Сброс пароля</h2>
            <ResetPasswordForm />
        </div>
    );
}
