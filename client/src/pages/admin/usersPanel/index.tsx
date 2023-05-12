import { Button } from "../../../ui/button";
import styles from "./index.module.scss";

const mock = [
    {
        id: "1",
        username: "Толик",
        email: "tolik@mail.com",
        isPaid: true,
        isBanned: false
    }, {
        id: "2",
        username: "user 2",
        email: "user2@mail.com",
        isPaid: false,
        isBanned: false
    }, {
        id: "3",
        username: "user 3",
        email: "user3@mail.com",
        isPaid: true,
        isBanned: false
    }, {
        id: "4",
        username: "user 4",
        email: "user4@mail.com",
        isPaid: false,
        isBanned: true
    }, {
        id: "5",
        username: "user 5",
        email: "user5@mail.com",
        isPaid: false,
        isBanned: false
    }, {
        id: "6",
        username: "user 6",
        email: "user6@mail.com",
        isPaid: true,
        isBanned: false
    }
]

export function UsersPanelPage() {
    return (
        <div className={styles.container}>
            <h2>Панель управления пользователями</h2>
            <div className={styles.titles}>
                <p>Никнейм</p>
                <p>Почта</p>
                <p>Оплата</p>
                <p>Статус бана</p>
            </div>
            <div className={styles.list}>
                {mock.map((user) => (
                    <div key={user.id} className={styles.user}>
                        <p>{user.username}</p>
                        <p>{user.email}</p>
                        <p className={styles[user.isPaid ? "paid" : "not_paid"]}>{user.isPaid ? "Оплачен" : "Не оплачен"}</p>
                        <Button className={user.isBanned ? "" : styles.banned} children={user.isBanned ? "Разбанить" : "Забанить"} />
                    </div>
                ))}
            </div>
        </div>
    );
}
