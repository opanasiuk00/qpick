import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCartData } from '../../redux/cart/selectors';
import { setPage } from '../../redux/items/slice';
import { useAppDispatch } from '../../redux/store';
import { setType, setTypeName } from '../../redux/types/slice';
import styles from './cart.module.scss';
const Cart = () => {
  const { cartItems } = useSelector(selectCartData);
  console.log(cartItems);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <div className={styles.cart}>
      {cartItems.length > 0 ? (
        <div className={styles.cart_items}>
          <h2>Корзина</h2>
          {cartItems.map((obj) => (
            <div key={obj.id} className={styles.cart_items_item}>
              <div className={styles.cart_items_item_img}>
                <img src={obj.img} alt={obj.typeName} />
                <div className={styles.cart_items_item_img_count}>
                  <button>
                    <img src="./img/minus.svg" alt="minus" />
                  </button>
                  <span>{obj.count}</span>
                  <button>
                    <img src="./img/plus.svg" alt="plus" />
                  </button>
                </div>
              </div>
              <div className={styles.cart_items_item_title}>
                <h3>{obj.title}</h3>
                <p>{obj.price}₴</p>
              </div>
            </div>
          ))}
        </div>
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
