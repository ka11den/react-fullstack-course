import styles from "./index.module.scss";
import { useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";

export function Modal({ children, closeModal }: { children: JSX.Element; closeModal: () => void }) {
    const ref = useRef(null)

    function handleClickOutside() {
        closeModal();
    }

    useOnClickOutside(ref, handleClickOutside)

    return (
        <div className={styles.modal}>
            <div ref={ref} className={styles.modal_content}>
                {children}
            </div>
        </div>
    );
}
