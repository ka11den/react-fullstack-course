import { useEffect } from "react";
import { useAppSelector } from "../../state/store";
import { Button } from "../../ui/button";
import styles from "./index.module.scss";
import { Link, useLocation } from "react-router-dom";

import avatar from "../../assets/img/avatar.webp";
import play from "../../assets/icon/play.svg";

export function Header() {
    const { user, isAuth } = useAppSelector((state) => state.user);
    const { pathname } = useLocation();

    return (
    <header className={styles.header}>
      <div className={styles.content}>
        <div className={styles.left}>
          <Link to={"/"}>
            <img src={avatar} alt="circle-photo" />
            <div>
              <p>Социальные инструменты</p>
              <p className={styles.header__title}>от Максима Линдента</p>
            </div>
          </Link>
        </div>
        <Link to="/">
          <div className={styles.center}>
            <h3>9,5</h3>
            <p>часов</p>
            <img src={play} alt="play-icon" />
            <p>видео-контента без воды</p>
          </div>
        </Link>
        <div className={styles.right}>
          {isAuth ? (
            <Link to={"/profile"}>
              <button>Личный Кабинет</button>
            </Link>
          ) : (
            <Link to={"/signin"}>
              <button>Авторизация</button>
            </Link>
          )}
        </div>
        {/* <Link to="/payment" children={<Button className={pathname === "/payment" ? styles.current : ""}>Оплата</Button>} /> */}
      </div>
    </header>
    );
}
