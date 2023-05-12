import channel1 from "../../../../../assets/img/channel1.webp";
import channel2 from "../../../../../assets/img/channel2.webp";
import channel3 from "../../../../../assets/img/channel3.webp";
import channel4 from "../../../../../assets/img/channel4.webp";
import channel5 from "../../../../../assets/img/channel5.webp";
import video_icon from "../../../../../assets/icon/video_icon.svg";

import cn from "classnames";
import styles from "./reviews.module.scss";
import square2 from "../../../../../assets/icon/square__2.svg";
import { Link } from "react-router-dom";

const Reviews = () => {
  return (
    <section className={cn(styles.reviews, styles.section)}>
      <div className={styles.container}>
        <img className={styles.reviews__square_2} src={square2} />
        <h1 className={styles.section__title}>
          <span className={styles.section__span}>не верим в </span>Отзывы
        </h1>
        <p className={styles.section__desc}>
          Увидев любые отзывы в интернете зачастую крайне затруднительно проверить их подлинность. Именно поэтому вместо
          отзывов, в качестве стойкой доказательной базы, я сделал подробные разборы ютуб каналов на которых были применены
          мои социальные инструменты.
        </p>
      </div>
      <div className={cn(styles.reviews__data, styles.container, styles.grid)}>
        <div className={cn(styles.reviews__container, styles.grid)}>
          <article className={cn(styles.reviews__card, styles.grid)}>
            <div className={cn(styles.reviews__content, styles.grid)}>
              <img className={styles.reviews__img} src={channel1} />
              <div className={styles.reviews__header}>
                <h1 className={styles.reviews__title}>944.000₽ за 16 дней</h1>
                <p className={styles.reviews__sub_title}>Канал: BUDDYZ QUIZ</p>
                <p className={styles.reviews__desc}>~4,5$ за 1000 просмотров</p>
              </div>
            </div>
            <p className={styles.reviews__desc}>
              Один из пятидесяти форматов который содержится в инструментах и включает в себя полную инструкцию о том как
              правильно создавать, продвигать и оптимизировать видеоролики данной категории, заточенную под зарубежную
              подростковую аудиторию.
            </p>
            <div className={styles.reviews__btns}>
              <button className={styles.reviews__btn}>
                <img className={styles.reviews__btn_img} src={video_icon} />
                <Link target="_blank" to="https://youtu.be/y1DG0TdNeDI">
                  Видеоотчет
                </Link>
              </button>
            </div>
          </article>

          <article className={cn(styles.reviews__card, styles.card_1, styles.grid)}>
            <div className={cn(styles.reviews__content, styles.grid, styles.grid)}>
              <img className={styles.reviews__img} src={channel2} />
              <div className={styles.reviews__header}>
                <h1 className={styles.reviews__title}>88.000₽ за 30 дней</h1>
                <p className={styles.reviews__sub_title}>Канал: STOMI CRASH</p>
                <p className={styles.reviews__desc}>~3,7$ за 1000 просмотров</p>
              </div>
            </div>
            <p className={styles.reviews__desc}>
              Формат видеороликов по игре BeamNG, популярность которого закончилась еще в 2018 году. Многие контентмейкеры
              не могут его развивать в силу низкого зрительского спроса и высокой конкуренции, но применив пакет социальных
              инструметов ситуация сильно меняется.
            </p>
            <div className={styles.reviews__btns}>
              <button className={styles.reviews__btn}>
                <img className={styles.reviews__btn_img} src={video_icon} />
                <Link target="_blank" to="https://youtu.be/Vn7wFFPd9jg">
                  Видеоотчет
                </Link>
              </button>
            </div>
          </article>

          <article className={cn(styles.reviews__card, styles.card_2, styles.grid)}>
            <div className={cn(styles.reviews__content, styles.grid)}>
              <img className={styles.reviews__img} src={channel3} />
              <div className={styles.reviews__header}>
                <h1 className={styles.reviews__title}>38.000₽ за 7 дней</h1>
                <p className={styles.reviews__sub_title}>Канал: Toca Peddy</p>
                <p className={styles.reviews__desc}>~2,3$ за 1000 просмотров</p>
              </div>
            </div>
            <p className={styles.reviews__desc}>
              Toca Life World — мобильная игра на андроид и iOS. Преимущество формата заключается в том что создавать
              конкурентноспособный контент можно исключительно с телефона. Наличие компьютера не является обязательным
              условием.
            </p>
            <div className={styles.reviews__btns}>
              <button className={styles.reviews__btn}>
                <img className={styles.reviews__btn_img} src={video_icon} />
                <Link target="_blank" to="https://youtu.be/bleu2PcSbxw">
                  Видеоотчет
                </Link>
              </button>
            </div>
          </article>

          <article className={cn(styles.reviews__card, styles.card_3, styles.grid)}>
            <div className={cn(styles.reviews__content, styles.grid)}>
              <img className={styles.reviews__img} src={channel4} />
              <div className={styles.reviews__header}>
                <h1 className={styles.reviews__title}>40.000₽ за 9 дней</h1>
                <p className={styles.reviews__sub_title}>Канал: El’ Mario</p>
                <p className={styles.reviews__desc}>~2,9$ за 1000 просмотров</p>
              </div>
            </div>
            <p className={styles.reviews__desc}>
              Трудоемкость данного формата минимальная, однако взамен приходится жертвовать долгосрочностью канала. Решение
              есть — создаем новый канал, применяем инструменты, монетизируем до падения статистики, проворачиваем весь
              алгоритм по новой.
            </p>
            <div className={styles.reviews__btns}>
              <button className={styles.reviews__btn}>
                <img className={styles.reviews__btn_img} src={video_icon} />
                <Link target="_blank" to="https://youtu.be/AsePvpLQeHw">
                  Видеоотчет
                </Link>
              </button>
            </div>
          </article>

          <article className={cn(styles.reviews__card, styles.card_4, styles.grid)}>
            <div className={cn(styles.reviews__content_card_4, styles.reviews__card_4, styles.grid)}>
              <img className={styles.reviews__img} src={channel5} />
              <div className={styles.reviews__header}>
                <h1 className={styles.reviews__title}>825 тыс. подписчиков за 90 дней</h1>
                <p className={styles.reviews__sub_title}>Канал: ПЕПСИК</p>
                <p className={styles.reviews__desc}>Мой российский ютуб канал</p>
              </div>
            </div>
            <p className={cn(styles.reviews__desc, styles.reviews__desc_4)}>
              На сегодняшний день в интернете присутствует очень много сомнительной, непроверенной информации касательно
              продвижения в медиапространстве, а люди которые ее преподносят в большинстве случаев не имеют никакого
              реального результата. В связи с этим я принял решение создать российский ютуб канал и продемонстрировать
              работу своих социальных инструментов на нем. За 3 месяца работы мне удалось собрать 47 миллионов просмотров и
              825.000 подписчиков. После такого эксперимента, в очередной раз смело могу сказать — результат подтвержден
              делом, а не словами.
            </p>
            <div className={cn(styles.reviews__btns, styles.reviews__btns_4)}>
              <button className={styles.reviews__btn}>
                <img className={styles.reviews__btn_img} src={video_icon} />
                <Link target="_blank" to="https://www.youtube.com/@pepsik_toca/featured">
                  Перейти на канал
                </Link>
              </button>
            </div>
          </article>
        </div>
        <Link target="_blank" to="https://t.me/max_lindent" className={styles.reviews__sub_desc}>
          <p>
            Для того что бы оценить возможности инструментов и понять их работу, вы можете получить тестовый материал нажав
            по этой ссылке.
          </p>
        </Link>
      </div>
    </section>
  );
};

export default Reviews;
