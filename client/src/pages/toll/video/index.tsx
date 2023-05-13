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
            <h2>Название: {video?.title}</h2>
            <p>Описание: {video?.description}</p>
            <video controls style={{height: "400px", width: "600px"}}>
                <source src={`http://localhost:8000/video/file?id=${pathname.split("/").at(-1)}`} type="video/mp4" />
            </video>
        </div>
    );
}
