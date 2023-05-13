import { useLocation } from "react-router";
import styles from "./index.module.scss";
import { createElement, useEffect, useState } from "react";
import { useActions, useAppSelector } from "../../../state/store";
import { Button } from "../../../ui/button";
import { Modal } from "../../../components/modal";
import { CreateVideo } from "../../../forms/createVideo";
import { Link } from "react-router-dom";
import { EditVideo } from "../../../forms/editVideo";
import cn from "classnames";

const forms: Record<"create" | "edit", ({ currentVideo }: { currentVideo: string; }) => JSX.Element> = {
    create: CreateVideo,
    edit: EditVideo
}

export function CategoryPage() {
    const { pathname } = useLocation();
    const { user } = useAppSelector((state) => state.user);
    const { videos } = useAppSelector((state) => state.videos);
    const { category } = useAppSelector((state) => state.categories);
    const { getAllVideos, deleteVideo, getCategory } = useActions();

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [modalType, setModalType] = useState<"create" | "edit">("create");
    const [currentVideo, setCurrentVideo] = useState<string>(videos[0]?.id ?? "");

    useEffect(() => {
        const id = pathname.split("/").at(-1) as string;
        getCategory(id);
        getAllVideos(id);
    }, [pathname, getAllVideos, getCategory])

    function createHandler() {
        setIsOpen(true);
        setModalType("create");
    }

    function editHandler(id: string) {
        setIsOpen(true);
        setModalType("edit");
        setCurrentVideo(id);
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.section__title}>{category?.title}</h1>
            <p className={styles.section__desc}>{category?.description}</p>
            {user?.isAdmin && <Button onClick={createHandler} children={"Создать видеоролик"} />}
            <div className={cn(styles.category__content, styles.category__container)}>
            {videos.map((video: Video) => (
                <article key={video.id} className={styles.category__card}>
                    <h1 className={styles.category__num}>{video.title}</h1>
                    <h1 className={styles.category__title}>{video.description}</h1>
                    <div className={styles.category__btns}>
                        <Link className={styles.category__link} to={`/video/${video.id}`} children={<Button children={"Смотреть"} />} />
                        {user?.isAdmin && <Button onClick={() => editHandler(video.id)} children={"Изменить"} />}
                        {user?.isAdmin && <Button onClick={() => deleteVideo(video.id)} children={"Удалить"} />}
                    </div>
                </article>
            ))}
            </div>
            {isOpen && <Modal closeModal={() => setIsOpen(false)} children={createElement(forms[modalType], {currentVideo})} />}
        </div>
    );
}
