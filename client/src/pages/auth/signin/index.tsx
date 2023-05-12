import { Link } from "react-router-dom";
import styles from "./index.module.scss";
import { SigninForm } from "../../../forms/signin";

export function SigninPage() {
    return (
        <div className={styles.container}>
            <h1>Авторизация</h1>
            <p>Нет аккаунта? <Link to="/signup" children="регистрация" /></p>
            <SigninForm />
            <Link to="/restore" children="Забыли пароль ?" />
        </div>
    );
}