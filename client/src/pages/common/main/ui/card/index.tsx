import arrow__cards from "../../../../../assets/icon/arrow_cards.svg";
import cards from "../../../../../assets/img/cards.webp";

import styles from "./card.module.scss";
import { ICard } from "./card.interface";

const Card = ({ className }: ICard) => {
  return (
    <>
      <div className={className}>
        <div className={styles.home__btns}>
          <img className={styles.home__arrow_cards} src={arrow__cards} />
          <button className={styles.home__btn}>
            Купить инструменты
          </button>
          <div className={styles.home__subdesc_data}>
            <p className={styles.home__btn_desc}>за 2 792 ₽</p>
            <p className={styles.home__btn_subdesc}>в месяц по рассрочке на 24 месяца</p>
          </div>
        </div>
        <div className={styles.home__cards}>
          <img className={styles.home__card_img} src={cards} />
          <p className={styles.home__cards_desc}>
            Оплатите за 1 минуту с банковской карты или
            <br />
            расчетного счета и мгновенно получите
            <br />
            доступ к инструментам
          </p>
        </div>
      </div>
    </>
  );
};

export default Card;
