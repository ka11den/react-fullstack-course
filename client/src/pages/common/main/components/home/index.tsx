import person1 from "../../../../../assets/img/person.png";
import tg from "../../../../../assets/icon/tg_icon.svg";
import yt from "../../../../../assets/icon/yt_icon.svg";
import yt_btn1 from "../../../../../assets/img/yt_btn1.webp";
import yt_btn2 from "../../../../../assets/img/yt_btn2.webp";
import yt_btn3 from "../../../../../assets/img/yt_btn3.webp";
import cn from "classnames";

import styles from "./home.module.scss";
import Card from "../../ui/card";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className={cn(styles.home, styles.section)}>
      <div className={cn(styles.container, styles.grid)}>
        <div className={styles.home__effects}>
          <img className={styles.home__img_background} src={yt_btn1} />
          <img className={styles.home__img_background_2} src={yt_btn2} />
          <img className={styles.home__img_background_3} src={yt_btn3} />
        </div>
        <div className={cn(styles.home__data, styles.home__container, styles.grid)}>
          <div className={styles.home__content}>
            <div className={styles.home__social}>
              <Link target="_blank" to="https://www.youtube.com/@lindent_max/videos">
                <div className={styles.home__social_yt}>
                  <img src={yt} />
                </div>
              </Link>
              <Link target="_blank" to="https://t.me/lindent_max">
                <div className={styles.home__social_tg}>
                  <img src={tg} />
                </div>
              </Link>
            </div>
            <h1 className={styles.home__title}>
              Как <span style={{ fontWeight: 800 }}>создать зарубежный</span> YouTube
              <br />
              <span style={{ fontWeight: 800 }}>канал</span> и вывести его на{" "}
              <span style={{ fontWeight: 800 }}>стабильный</span>
              <br />
              <span style={{ fontWeight: 800 }}>доход от 600$ в месяц</span>
            </h1>
            <Card />
          </div>
          <img className={styles.home__img} src={person1} />
        </div>
      </div>
    </section>
  );
};

export default Home;
