import styles from "./index.module.scss";
import cn from "classnames";
import { Link } from "react-router-dom";

export const UserNav = () => {
  return (
    <header className={styles.navbar}>
      <div className={cn(styles.navbar__content, styles.navbar__container)}>
        <nav className={styles.navbar__nav}>
          <ul className={styles.navbar__list}>
            <li className={styles.navbar__item}>
              <Link to="/categories" className={styles.navbar__link}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M16 18V20H5V18H16ZM21 11V13H3V11H21ZM19 4V6H8V4H19Z" fill="rgba(255,255,255,1)"></path>
                </svg>
                Контент
              </Link>
              <Link to="/profile" className={styles.navbar__link}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z"
                    fill="rgba(255,253,253,1)"></path>
                </svg>
                Профиль
              </Link>
              <Link to="/admin/users" className={styles.navbar__link}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z"
                    fill="rgba(255,253,253,1)"></path>
                </svg>
                Админка
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default UserNav
