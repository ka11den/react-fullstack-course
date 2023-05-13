import { useLocation } from "react-router";
import styles from "./index.module.scss";
import { useEffect } from "react";
import { useActions, useAppSelector } from "../../../state/store";

export function VideoPage() {
    const { pathname } = useLocation()
    const { video } = useAppSelector((state) => state.videos);
    const { getVideo } = useActions();

    useEffect(() => {
        const id = pathname.split("/").at(-1) as string;
        getVideo(id);
    }, [pathname, getVideo])

    return (
        <div className={styles.container}>
            <h1 className={styles.section__title}>Видео</h1>
            <div className={styles.video__content}>
                <video className={styles.video__player} controls>
                    <source src={`http://localhost:8000/video/file?id=${pathname.split("/").at(-1)}`} type="video/mp4" />
                </video>
                <h2 className={styles.video__title}>Название: {video?.title}</h2>
                <p className={styles.video__desc}>Описание: {video?.description}</p>
            </div>
        </div>
    );
}
