import clock from "../../../../../assets/img/clock_img.webp";
import pig from "../../../../../assets/img/pig_img.webp";
import time from "../../../../../assets/img/time_img.webp";
import proger from "../../../../../assets/img/proger_img.webp";

import cn from "classnames";
import styles from "./tools.module.scss";
import square2 from "../../../../../assets/icon/square__2.svg";

const Tools = () => {
  return (
    <section className={cn(styles.tools, styles.section)}>
      <div className={styles.container}>
        <h1 className={styles.section__title}>Кому подойдут эти инструметы?</h1>
        <div className={cn(styles.tools__container, styles.container, styles.grid)}>
          <img className={styles.tools__square_2} src={square2} />
          <article className={styles.tools__card}>
            <img className={styles.tools__img} src={clock} />
            <h1 className={styles.tools__title}>Для тех кто ценит свое время и желает его сэкономить.</h1>
            <p className={styles.tools__desc}>
              Вам не придется тратить 1-2 года на эксперименты в поисках высокодоходной ниши, изучая методом “тыка” как
              работает ютуб и его алгоритмы.
            </p>
          </article>
          <img className={styles.tools__square_3} src={square2} />
          <h1 className={cn(styles.tools__card_number, styles.tools__number_2)}>2</h1>
          <article className={cn(styles.tools__card, styles.tools__card_2)}>
            <img className={styles.tools__img} src={pig} />
            <h1 className={styles.tools__title}>Для тех кто ценит свое время и желает его сэкономить.</h1>
            <p className={styles.tools__desc}>
              Вам не придется тратить десятки тысяч рублей на покупку обучающих курсов пытаясь разобраться в противоречащей
              информации.
            </p>
          </article>
          <img className={styles.tools__square_1} src={square2} />
          <h1 className={cn(styles.tools__card_number, styles.tools__number_4)}>3</h1>
          <article className={cn(styles.tools__card, styles.tools__card_3)}>
            <img className={styles.tools__img} src={time} />
            <h1 className={styles.tools__title}>Для тех кто ценит свое время и желает его сэкономить.</h1>
            <p className={styles.tools__desc}>
              В среднем, с момента создания канала и применения социальных инструментов, клиенты выходят на доход в течении
              2-4 недель.
            </p>
          </article>
          <h1 className={cn(styles.tools__card_number, styles.tools__number_3)}>4</h1>
          <article className={cn(styles.tools__card, styles.tools__card_4)}>
            <img className={styles.tools__img} src={proger} />
            <h1 className={styles.tools__title}>Для тех кто ценит свое время и желает его сэкономить.</h1>
            <p className={styles.tools__desc}>
              Если физическая работа вам не подходит, вы находитесь без работы или просто хотите перебраться на удаленку со
              справедливой зарплатой.
            </p>
          </article>
          <h1 className={cn(styles.tools__card_number, styles.tools__card_1)}>1</h1>
        </div>
      </div>
    </section>
  );
};

export default Tools;
