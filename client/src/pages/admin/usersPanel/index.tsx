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
            <h1>Панель управления пользователями</h1>
            <div className={styles.admin__content}>
                <div className={styles.titles}>
                    <p>Никнейм</p>
                    <p>Почта</p>
                    <p>Оплата</p>
                    <p>Статус бана</p>
                </div>
                <div className={styles.list}>
                    {users.map((user: User) => (
                        <div key={user.id} className={styles.user}>
                            <p>{user.username}</p>
                            <p>{user.email}</p>
                            <p className={styles[user.isPaid ? "paid" : "not_paid"]}>{user.isPaid ? "Оплачен" : "Не оплачен"}</p>
                            <Button  className={user.isBanned ? "" : styles.banned} children={user.isBanned ? "Разбанить" : "Забанить"} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
