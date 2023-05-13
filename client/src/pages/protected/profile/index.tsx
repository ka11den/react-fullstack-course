import { useState } from "react";
import { Modal } from "../../../components/modal";
import { Button } from "../../../ui/button";
import styles from "./index.module.scss";
import cn from "classnames";

import { EditPassword } from "../../../forms/editPassword";
import { EditUser } from "../../../forms/editUser";
import { useActions, useAppSelector } from "../../../state/store";
import { useNavigate } from "react-router";

export function ProfilePage() {
    const navigator = useNavigate();
    const { user } = useAppSelector((state) => state.user);
    const { signout } = useActions();

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [modalType, setModalType] = useState<"data" | "password">("data");

    const editForms: Record<"data" | "password", JSX.Element> = {
        data: <EditUser closeModal={() => setIsOpen(false)} />,
        password: <EditPassword closeModal={() => setIsOpen(false)} />
    }

    function openModal(type: "data" | "password"): void {
        setIsOpen(true);
        setModalType(type);
    }

    function logout() {
        signout();
        navigator("/signin");
    }

  return (
      <section className={cn(styles.section, styles.section__account)}>
        <div className={cn(styles.account__container, styles.container)}>
          <h1 className={styles.section__title}>Настройки</h1>
          <div className={styles.content}>
            <article className={styles.account__card}>
              {/* <img className={styles.account__img} src={avatar} /> */}
              <h1 className={styles.account__title}>{user?.username}</h1>
              <p className={styles.account__desc}>Электронная почта: <span>{user?.email}</span></p>
              <p className={styles.account__desc}>Статус подписки: <span>{user?.isPaid ? "Оплачена" : "Не оплачена"}</span></p>
              <div className={styles.account__btns}>
                <Button onClick={() => openModal("data")}>Изменить данные</Button>
                <Button onClick={() => openModal("password")}>Изменить пароль</Button>
                {isOpen && <Modal closeModal={() => setIsOpen(false)} children={
                    editForms[modalType]
                } />}
                <Button onClick={logout}>Выход</Button>
            </div>
            </article>
          </div>
        </div>
      </section>
  );
}
