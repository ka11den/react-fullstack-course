import styles from "./index.module.scss";
import { Link, useLocation } from "react-router-dom";

export function AdminNav() {
    const { pathname } = useLocation();

    return (
        <nav className={styles.navigator}>
            <ul>
                <li className={pathname === "/admin/users" ? styles.current : ""}>
                    <Link to="/admin/users" children="Пользователи" />
                </li>
            </ul>
        </nav>
    );
}
