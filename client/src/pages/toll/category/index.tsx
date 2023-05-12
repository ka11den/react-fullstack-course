import { useLocation } from "react-router";
import styles from "./index.module.scss";
import { useEffect } from "react";
import { Button } from "../../../ui/button";
import cn from 'classnames'
import { useActions } from "../../../state/store";

export function CategoryPage() {
    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const { pathname } = useLocation();
    const { getCategories } = useActions();

    useEffect(() => {
        console.log(id)
    }, [])

    useEffect(() => {
        getCategories(id)
        console.log(getCategories(id))
    }, [getCategories])

    return (
        <div className={styles.container}>
            <h1 className={styles.section__title}>Монтаж</h1>
            <p className={styles.section__desc}>Блоки этого модуля</p>
            <div className={cn(styles.category__content, styles.category__container)}>
                <article className={styles.category__card}>
                    <h1 className={styles.category__num}>01</h1>
                    <h1 className={styles.category__title}>Вводные уроки</h1>
                    <Button>Перейти к уроку</Button>
                </article>
                <article className={styles.category__card}>
                    <h1 className={styles.category__num}>02</h1>
                    <h1 className={styles.category__title}>Расширенные уроки</h1>
                    <Button>Перейти к уроку</Button>
                </article>
                <article className={styles.category__card}>
                    <h1 className={styles.category__num}>03</h1>
                    <h1 className={styles.category__title}>Контент</h1>
                    <Button>Перейти к уроку</Button>
                </article>
            </div>
        </div>
    );
}
