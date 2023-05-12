import styles from "./index.module.scss";

export function PaymentPage() {
    return (
        <div className={styles.container}>
            <h2>Оплата подписки</h2>
            <p>Кайден <span style={{"color": "red"}}>тут</span> прикручиваешь платежку!</p>
        </div>
    );
}
