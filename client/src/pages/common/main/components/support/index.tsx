import tg from "../../../../../assets/icon/tg_icon.svg";

import cn from "classnames";
import styles from "./support.module.scss";
import { Link } from "react-router-dom";

const Support = () => {
  return (
    <section className={styles.section}>
      <div className={cn(styles.support__container, styles.container)}>
        <div className={cn(styles.support__data, styles.grid)}>
          <h1 className={styles.support__title}>Круглосуточная поддержка!</h1>
          <p className={styles.support__desc}>
            Если у вас возникли вопросы по оплате или вам требуется подключить
            <br />
            монетизацию на ваш канал, вы можете связаться с нами по кнопке ниже.
            <br />
            Написать можно в любое время.
          </p>
          <div>
            <button className={styles.support__btn}>
              <img className={styles.support__btn_img} src={tg} />
              <Link target="_blank" to="https://t.me/max_lindent">
                Написать менеджеру
              </Link>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Support;
