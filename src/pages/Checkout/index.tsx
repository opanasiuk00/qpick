import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartData } from '../../redux/cart/selectors';
import { ErrorMessage, Field, Formik } from 'formik';
import styles from './checkout.module.scss';
import validation from './validation';

const Checkout: React.FC = () => {
  const [showPopup, setShowPopup] = React.useState(false);

  const { cartLength, totalPrice, cartItems } = useSelector(selectCartData);

  if (cartLength === 0) {
    return <Navigate to="/" />;
  } else {
    return (
      <div className={styles.checkout}>
        <div className={styles.checkout_total}>
          <h3>Итого</h3>
          <div>
            <p>
              {cartLength > 1 ? `${cartLength} товара на сумму` : `${cartLength} товар на сумму`}
            </p>
            <p>{totalPrice}₴</p>
          </div>
          <div>
            <p>Стоимость доставки</p>
            <p>Бесплатно</p>
          </div>
          <p className={styles.checkout_total_more} onClick={() => setShowPopup(!showPopup)}>
            Подробнее
          </p>
        </div>
        {showPopup && (
          <div className={styles.checkout_popup}>
            <div className={styles.checkout_popup_close} onClick={() => setShowPopup(false)}>
              <p>&#10006;</p>
            </div>
            {cartItems.map((obj) => (
              <div key={obj.id} className={styles.checkout_popup_item}>
                <img src={obj.img} alt={obj.typeName} />
                <h3>{obj.title}</h3>
                <div>
                  <p className={styles.checkout_popup_item_info}>Цена</p>
                  <p>{obj.price}₴</p>
                </div>
                <div>
                  <p className={styles.checkout_popup_item_info}>Количество</p>
                  <p>{obj.count}</p>
                </div>
                <div>
                  <p className={styles.checkout_popup_item_info}>Сумма</p>
                  <p>{obj.count * Number(obj.price.replace(/ /g, ''))}</p>
                </div>
              </div>
            ))}
            <p>Стоимость: {totalPrice}₴</p>
          </div>
        )}
        <Formik
          initialValues={{
            name: '',
            surname: '',
            email: '',
            phone: '',
            address: '',
          }}
          onSubmit={(values) => {
            alert('Ваш заказ оформлен, console.log');
            console.log({ values, cartItems, totalPrice });
          }}
          validationSchema={validation}>
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit} className={styles.checkout_form}>
              <label htmlFor="name">Имя</label>
              <Field id="name" name="name" />
              <ErrorMessage className={styles.checkout_form_error} component="p" name={'name'} />

              <label htmlFor="surname">Фамилия</label>
              <Field id="surname" name="surname" />
              <ErrorMessage className={styles.checkout_form_error} component="p" name={'surname'} />

              <label htmlFor="email">Email</label>
              <Field id="email" name="email" />
              <ErrorMessage className={styles.checkout_form_error} component="p" name={'email'} />

              <label htmlFor="phone">Мобильный телефон</label>
              <Field id="phone" name="phone" />
              <ErrorMessage className={styles.checkout_form_error} component="p" name={'phone'} />

              <label htmlFor="address">Введите населенный пункт</label>
              <Field id="address" name="address" />
              <ErrorMessage className={styles.checkout_form_error} component="p" name={'address'} />

              <button type="submit">Закончить оформление</button>
            </form>
          )}
        </Formik>
      </div>
    );
  }
};

export default Checkout;
