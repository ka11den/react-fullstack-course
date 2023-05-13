import { useEffect } from "react";
import { Button } from "../../../ui/button";
import styles from "./index.module.scss";
import { useActions, useAppSelector } from "../../../state/store";

export function UsersPanelPage() {
    const { users } = useAppSelector((state) => state.users);
    const { getAllUsers } = useActions();

    useEffect(() => {
        getAllUsers();
    }, [getAllUsers])

    return (
        <div className={styles.container}>
            <h1 className={styles.section__title}>Панель управления пользователями</h1>
            <table>
                <tr>
                    <th>Никнейм</th>
                    <th>Почта</th>
                    <th>Оплата</th>
                    <th>Статус бана</th>
                </tr>
                {users.map((user: User) => (
                    <tr key={user.id} className={styles.user}>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td className={styles[user.isPaid ? "paid" : "not_paid"]}>{user.isPaid ? "Оплачен" : "Не оплачен"}</td>
                        <td>
                            <Button className={user.isBanned ? "" : styles.banned} children={user.isBanned ? "Разбанить" : "Забанить"} />
                        </td>
                    </tr>
                ))}
            </table>
        </div>
    );
}
