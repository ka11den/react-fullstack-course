import { SignupForm } from "../../../forms/signup";
import styles from "./index.module.scss";
import { Link } from "react-router-dom";

export function SignupPage() {
    return (
        <div className={styles.container}>
            <h2>Регистрация</h2>
            <p>Уже есть аккаунт? <Link to="/signin" children="авторизация" /></p>
            <SignupForm />
        </div>
    );
}
