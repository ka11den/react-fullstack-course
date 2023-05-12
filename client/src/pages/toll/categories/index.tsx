import { createElement, useEffect, useState } from "react";
import { Button } from "../../../ui/button";
import styles from "./index.module.scss";
import { Link } from "react-router-dom";
import { useActions, useAppSelector } from "../../../state/store";
import { Modal } from "../../../components/modal";
import { CreateCategory } from "../../../forms/createCategory";
import { EditCategory } from "../../../forms/editCategory";
import cn from 'classnames'

const forms: Record<"create" | "edit", ({ currentCategory }: { currentCategory: string; }) => JSX.Element> = {
    create: CreateCategory,
    edit: EditCategory
}

export function CategoriesPage() {
    const { user } = useAppSelector((state) => state.user);
    const { categories } = useAppSelector((state) => state.categories);
    const { getAllCategories, deleteCategory } = useActions();

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [modalType, setModalType] = useState<"create" | "edit">("create");
    const [currentCategory, setCurrentCategory] = useState<string>(categories[0]?.id ?? "");

    useEffect(() => {
        getAllCategories()
    }, [getAllCategories])

    function editHandler(id: string) {
        setIsOpen(true);
        setModalType("edit");
        setCurrentCategory(id);
    }

    function createHandler() {
        setIsOpen(true);
        setModalType("create");
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.section__title}>Страница выбора категории</h1>
            {user?.isAdmin && <Button onClick={createHandler} children={"Создать категорию"} />}
            <div className={cn(styles.category__container ,styles.grid)}>
                {categories.map((category: Category) => (
                    <>
                    <article key={category.id} className={styles.category__card}>
                        <h3>{category.title}</h3>
                        <p>{category.description}</p>
                        <div className={styles.category__btns}>
                            <Link to={`/category/${category.id}`} children={<Button children={"Смотреть"} />} />
                            {user?.isAdmin && <Button onClick={() => editHandler(category.id)} children={"Изменить"} />}
                            {user?.isAdmin && <Button onClick={() => deleteCategory(category.id)} children={"Удалить"} />}
                        </div>
                    </article>
                    <article key={category.id} className={styles.category__card}>
                        <h3>{category.title}</h3>
                        <p>{category.description}</p>
                        <div className={styles.category__btns}>
                            <Link to={`/category/${category.id}`} children={<Button children={"Смотреть"} />} />
                            {user?.isAdmin && <Button onClick={() => editHandler(category.id)} children={"Изменить"} />}
                            {user?.isAdmin && <Button onClick={() => deleteCategory(category.id)} children={"Удалить"} />}
                        </div>
                    </article>
                    <article key={category.id} className={styles.category__card}>
                        <h3>{category.title}</h3>
                        <p>{category.description}</p>
                        <div className={styles.category__btns}>
                            <Link to={`/category/${category.id}`} children={<Button children={"Смотреть"} />} />
                            {user?.isAdmin && <Button onClick={() => editHandler(category.id)} children={"Изменить"} />}
                            {user?.isAdmin && <Button onClick={() => deleteCategory(category.id)} children={"Удалить"} />}
                        </div>
                    </article>
                    </>
                ))}
            </div>
            {isOpen && <Modal closeModal={() => setIsOpen(false)} children={createElement(forms[modalType], {currentCategory})} />}
        </div>
    );
}
