import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCartData } from '../../redux/cart/selectors';
import { addItem, minusCount, removeItem } from '../../redux/cart/slice';
import { CartItem } from '../../redux/cart/type';
import { setPage, setType, setTypeName } from '../../redux/items/slice';
import { useAppDispatch } from '../../redux/store';
import styles from './cart.module.scss';
const Cart = () => {
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
    <div className={styles.cart}>
      {cartItems.length > 0 ? (
        <>
          <h2>Корзина</h2>
          <div className={styles.cart_items}>
            <div>
              {cartItems.map((obj) => (
                <div key={obj.id} className={styles.cart_items_item}>
                  <div className={styles.cart_items_item_img}>
                    <img src={obj.img} alt={obj.typeName} />
                    <div className={styles.cart_items_item_img_count}>
                      <button disabled={obj.count === 1} onClick={() => onClickMinusCount(obj.id)}>
                        <img src="./img/minus.svg" alt="minus" />
                      </button>
                      <span>{obj.count}</span>
                      <button onClick={() => onClickPlusCount(obj.id)}>
                        <img src="./img/plus.svg" alt="plus" />
                      </button>
                    </div>
                  </div>
                  <div className={styles.cart_items_item_title}>
                    <h3>{obj.title}</h3>
                    <p>{obj.price}₴</p>
                  </div>
                  <div className={styles.cart_items_item_delete}>
                    <p onClick={() => dispatch(removeItem(obj.id))}>&#10006;</p>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.cart_total}>
              <div className={styles.cart_total_price}>
                <h3>Итого</h3>
                <p>{totalPrice}₴</p>
              </div>
              <button onClick={() => navigate('/checkout')}>Перейти к оформлению</button>
            </div>
          </div>
        </>
      ) : (
        <div className={styles.cart_clear}>
          <img src="./img/clearCart.png" alt="cart" />
          <h2>Корзина пуста</h2>
          <p>Но это никогда не поздно исправить :)</p>
          <button
            onClick={() => {
              dispatch(setType(''));
              dispatch(setTypeName(''));
              dispatch(setPage(1));
              navigate('/');
            }}>
            В каталог товаров
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
