import cn from "classnames"

import styles from "./index.module.scss"

export function Button({ children, disabled, type, onClick, className = "" }: UI.Button): JSX.Element {
    return (
        <button className={cn(styles.btn, className, (disabled && styles.disabled_btn))}
            type={type}
            onClick={onClick}
            disabled={disabled}>
            {children}
        </button>
    );
}
