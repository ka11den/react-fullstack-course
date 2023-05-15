import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import styles from "./index.module.scss";
import cn from "classnames";

const initialStateInPlan = {
    shopId: "e26617d1-c425-4905-b997-683f3d48dc28",
    showcaseId: "6abab2fe-67cc-4447-b0d2-166dc5343967",
    sum: 100000,
    items: [
      {
        name: "iPhone",
        quantity: 1,
        price: 100000,
        category: "mobile",
        vendorCode: "12345"
      }
    ],
    orderNumber: "1234567890",
    promoCode: "default",
    demoFlow: "sms",
    values: {
      contact: {
        fio: {
          lastName: "Тиньков",
          firstName: "Олег",
          middleName: "Юрьевич"
        },
        mobilePhone: "9998887766",
        email: "oleg@example.com"
      }
    }
}

const initialState = {
    TerminalKey: "1683284484670DEMO",
    Frame: true,
    Language: "ru",
    Amount: 6700000,
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
          Price: 6700000,
          Quantity: 1,
          Amount: 6700000,
          PaymentMethod: "full_prepayment",
          PaymentObject: "commodity",
          Tax: "vat10",
          Ean13: "0123456789"
        }
      ]
    }
  };

export function PaymentPage() {
    const navigate = useNavigate()
    const [formValue, setFormValue] = useState(initialState);
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
        navigate(`//${res.data.PaymentURL}`);
        } catch {
        setError("Не предвиденная ошибка!");
        }
        setLoading(false);
    };

    const handleClickRas = async () => {
        setLoading(true);
        try {
            const res = await axios.post("https://forma.tinkoff.ru/api/partners/v2/orders/create-demo", initialStateInPlan);
            navigate(`//${res.data.link}`);
        } catch {
            setError("Не предвиденная ошибка!");
        }
        setLoading(false);
    };

    return (
        <div className={styles.container}>
            <div className={styles.payment__content_header}>
              <h1 className={styles.payment__title}>Сумма к оплате: 67.000 Р</h1>
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
                <button onClick={() => handleClickRas()} className={styles.payment__button}>
                  Купить в рассрочку
                </button>
              </div>
            </div>
        </div>
    );
}
