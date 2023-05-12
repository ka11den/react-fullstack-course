import pos2 from "../../../../../assets/img/pos2.webp";
import signature from "../../../../../assets/img/signature.webp";
import line__about from "../../../../../assets/icon/line__about.svg";

import cn from "classnames";
import styles from "./about.module.scss";
import Card from "../../ui/card/index";

const About = () => {
  return (
    <section className={cn(styles.about, styles.section)}>
      <div className={cn(styles.container, styles.grid)}>
        <div className={cn(styles.about__card, styles.about__container, styles.grid)}>
          <img className={styles.about__img} src={pos2} />
          <img className={styles.about__line} src={line__about} />
          <div className={styles.about__data}>
            <div className={styles.about__titles}>
              <h1 className={styles.about__title}>Максим Линдент</h1>
              <p className={styles.about__sub_title}>
                Владелец интернациональных ютуб каналов <br />с суммарной аудиторией более 1,6 млн
              </p>
            </div>
            <div className={styles.about__content}>
              <span className={styles.about__char}>“</span>
              <p className={styles.about__desc}>
                На протяжении долгого времени, покупая десятки зарубежных <br />
                курсов, я изучал как работает внимание зрителей, оттачивая свои <br />
                навыки на видеороликах, предназначенных для российской <br />
                аудитории. Со временем я понял, что можно создавать видео без <br />
                озвучки, захватывая интерес созерцателей со всего земного шара. <br />
                <br />
                Если бы я мог передать себе свои же социальные инструменты в то <br />
                время, то это сэкономило бы мне кучу времени, нервов и денег.
              </p>
            </div>
            <img className={styles.about__signature} src={signature} />
            <Card className={styles.about__card_btn} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
