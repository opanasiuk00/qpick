import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCartData } from '../../redux/cart/selectors';
import { addItem, minusCount, removeItem } from '../../redux/cart/slice';
import { CartItem } from '../../redux/cart/type';
import { useAppDispatch } from '../../redux/store';
import styles from './cart.module.scss';

type CartProps = {
  activeCart: boolean;
  setActiveCart: (activeCart: boolean) => void;
};
const Cart: React.FC<CartProps> = ({ activeCart, setActiveCart }) => {
  const { cartItems, totalPrice } = useSelector(selectCartData);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onClickPlusCount = (id: string) => {
    dispatch(addItem({ id } as CartItem));
  };

  const onClickMinusCount = (id: string) => {
    dispatch(minusCount(id));
  };

  return (
    <div className={activeCart ? styles.cart + ' ' + styles.cart__active : styles.cart}>
      <p className={styles.cart__close} onClick={() => setActiveCart(false)}>
        &#10006;
      </p>
      {cartItems.length > 0 ? (
        <>
          <div>
            <h2>Корзина</h2>
          </div>
          <div className={styles.cart__items}>
            <div>
              {cartItems.map((obj) => (
                <div className={styles.cart__item} key={obj.id}>
                  <div>
                    <img className={styles.cart__item_img} src={obj.img} alt={obj.typeName} />
                    <div className={styles.cart__item_count}>
                      <button disabled={obj.count === 1} onClick={() => onClickMinusCount(obj.id)}>
                        <img src="./img/minus.svg" alt="minus" />
                      </button>
                      <span>{obj.count}</span>
                      <button onClick={() => onClickPlusCount(obj.id)}>
                        <img src="./img/plus.svg" alt="plus" />
                      </button>
                    </div>
                  </div>
                  <div className={styles.cart__item_title}>
                    <h3>{obj.title}</h3>
                    <p>{obj.price}₴</p>
                  </div>
                  <div>
                    <p
                      className={styles.cart__item_delete}
                      onClick={() => dispatch(removeItem(obj.id))}>
                      &#10006;
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.cart__total}>
              <div className={styles.cart__total_price}>
                <h3>Итого</h3>
                <p>{totalPrice}₴</p>
              </div>
              <button
                onClick={() => {
                  setActiveCart(false);
                  navigate('/checkout');
                }}>
                Перейти к оформлению
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className={styles.cart__clear}>
          <img src="./img/clearCart.png" alt="cart" />
          <h2>Корзина пуста</h2>
          <p>Но это никогда не поздно исправить :)</p>
        </div>
      )}
    </div>
  );
};

export default Cart;
