import macbook from "../../../../../assets/img/macbook.webp";
import square__3 from "../../../../../assets/icon/square__3.svg";

import cn from "classnames";
import styles from "./video.module.scss";
import { Link } from "react-router-dom";

const Video = () => {
  return (
    <section className={cn(styles.section, styles.video)}>
      <Link target="_blank" to="https://youtu.be/y1DG0TdNeDI">
        <div className={cn(styles.video__container, styles.container, styles.grid)}>
          <div className={styles.video__images}>
            <img className={styles.video__img_background} src={macbook} />
          </div>
        </div>
      </Link>
      <img className={styles.square_1} src={square__3} />
    </section>
  );
};

export default Video;
