import React from "react";
import { IButton } from "./button.interface";

import styles from "./button.module.scss";

const Button = ({ title }: IButton) => {
  return <button className={styles.btn}>{title}</button>;
};

export default Button;
