import { Link } from "react-router-dom";
import styles from "./footer.module.scss";
import cn from "classnames";

export function Footer() {
  return (
    <footer className={cn(styles.footer, styles.section)}>
      <div className={cn(styles.footer__container, styles.container, styles.grid)}></div>

      <p className={styles.footer__sub_desc}>
        <Link to="/politics">Политика конфиденциальности</Link>
        <br />
        <Link to="/oferta">Публичная оферта</Link>
        <br />
        <p>ИП УТЮЖ ИЛЬЯ НИКОЛАЕВИЧ ОГРНИП 322774600747400 ИНН 772864420416</p>
      </p>
      <span className={styles.footer__copy}>&#169; lindent-max.ru Все права защищены</span>
    </footer>
  );
}
