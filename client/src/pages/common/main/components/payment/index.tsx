/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import styles from "./payment.module.scss";
import cn from "classnames";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { IPayement } from "./payment.props";

const initialState = {
  TerminalKey: "1683284484670DEMO",
  Frame: true,
  Language: "ru",
  Amount: 3000000,
  OrderId: uuidv4(),
  Description: "Описание",
  Name: "",
  Email: "",
  Phone: "",
  Receipt: {
    Email: "",
    Phone: "",
    EmailCompany: "ka11denblin@gmail.com",
    Taxation: "osn",
    Items: [
      {
        Name: "Наименование товара 1",
        Price: 3000000,
        Quantity: 1,
        Amount: 3000000,
        PaymentMethod: "full_prepayment",
        PaymentObject: "commodity",
        Tax: "vat10",
        Ean13: "0123456789"
      }
    ]
  }
};

export const Payment = (props: IPayement) => {
  const [formValue, setFormValue] = useState(initialState);
  const navigation = useNavigate();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { Name, Phone, Email } = formValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
      Receipt: { ...formValue.Receipt, [e.target.name]: e.target.value }
    });
  };

  const handleClick = async () => {
    setLoading(true);
    try {
      const res = await axios.post("https://securepay.tinkoff.ru/v2/Init", formValue);
      navigation(`//${res.data.PaymentURL}`);
    } catch {
      setError("Не предвиденная ошибка!");
    }
    setLoading(false);
  };

  return (
    <>
      {props.isOpen && (
        <section className={cn(styles.payment__modal, styles.payment__section, styles.section)} onClick={props.toggle}>
          <div
            onClick={(e) => e.stopPropagation()}
            className={cn(styles.container, styles.payment__container, styles.grid)}>
            <div className={styles.payment__content_header}>
              <h1 className={styles.payment__title}>Сумма к оплате: 30.000 Р</h1>
              <p className={styles.payment__subtitle}>TRANSACTION ID: {formValue.OrderId}</p>
            </div>
            <div className={cn(styles.payment__content, styles.payment__inputs)}>
              <div>
                <label className={styles.payment__label}>Введите имя</label>
                <div className={styles.payment__box}>
                  <input
                    onChange={handleChange}
                    name="Name"
                    type="text"
                    placeholder="Иван"
                    required
                    className={styles.payment__input_1}
                  />
                </div>
              </div>
              <div className={styles.payment__input_container}>
                <div>
                  <label className={styles.payment__label}>Введите E-mail</label>
                  <div className={styles.payment__box}>
                    <input
                      onChange={handleChange}
                      name="Email"
                      type="text"
                      placeholder="ivanov@gmali.com"
                      required
                      className={styles.payment__input}
                    />
                  </div>
                </div>
                <div>
                  <label className={styles.payment__label}>Введите номер телефона</label>
                  <div className={styles.payment__box}>
                    <input
                      onChange={handleChange}
                      name="Phone"
                      type="text"
                      placeholder="79999999"
                      className={styles.payment__input}
                    />
                  </div>
                </div>
              </div>
              {error}
              <div className={styles.payment__buttons}>
                <button onClick={() => handleClick()} className={styles.payment__button}>
                  Оплатить курс
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
