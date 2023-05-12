import { useState } from "react";

import styles from "./index.module.scss"

export function Input({ name, label, register, errors, type }: UI.Input): JSX.Element {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    return (
        <div className={styles.input_container}>
            <label>{label}</label>
            <div>
                <input
                    type={showPassword ? "text" : type}
                    placeholder={label}
                    autoComplete="off"
                    id={name}
                    {...register}
                />
                {type === "password" && (
                    <button className={styles.input__btn_icon} type="button" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ?
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M14.5 12C14.5 13.3827 13.3827 14.5 12 14.5C10.6173 14.5 9.5 13.3827 9.5 12C9.5 10.6173 10.6173 9.5 12 9.5C13.3827 9.5 14.5 10.6173 14.5 12Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M12 18.5C15.2468 18.5 18.2729 16.8662 20.3792 14.0384C21.207 12.9308 21.207 11.0692 20.3792 9.96163C18.2729 7.13384 15.2468 5.5 12 5.5C8.75319 5.5 5.72713 7.13384 3.62085 9.96163C2.79305 11.0692 2.79305 12.9308 3.62085 14.0384C5.72713 16.8662 8.75319 18.5 12 18.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M15 12.2871C15 13.9463 13.6592 15.2871 12 15.2871C10.3408 15.2871 9 13.9463 9 12.2871C9 10.6279 10.3408 9.28711 12 9.28711C13.6592 9.28711 15 10.6279 15 12.2871Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M12 18.7871C15.2468 18.7871 18.2729 17.1533 20.3792 14.3255C21.207 13.2179 21.207 11.3563 20.3792 10.2487C18.2729 7.42095 15.2468 5.78711 12 5.78711C8.75319 5.78711 5.72713 7.42095 3.62085 10.2487C2.79305 11.3563 2.79305 13.2179 3.62085 14.3255C5.72713 17.1533 8.75319 18.7871 12 18.7871Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M18.7202 5.57812L5.28027 18.9968" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        }
                    </button>
                )}
            </div>
            {errors[name] && (
                <p className={styles.error_msg}>{errors[name].message as string}</p>
            )}
        </div>
    );
}
