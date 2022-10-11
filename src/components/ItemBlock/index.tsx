import React from 'react';
import { CartItem } from '../../redux/cart/type';
import { Item } from '../../redux/items/types';
import styles from './itemblock.module.scss';
import SkeletonItem from './SkeletonItem';

type ItemBlockProps = {
  items: Item[];
  cartItems: CartItem[];
  addItemToCart: (item: CartItem) => void;
  status: string;
};

const ItemBlock: React.FC<ItemBlockProps> = ({ items, cartItems, addItemToCart, status }) => {
  return (
    <div className={styles.content}>
      {status === 'error' ? (
        <h2>error</h2>
      ) : (
        <>
          <h2 className={styles.content__title}>Чехлы</h2>
          <div className={styles.content__items}>
            {status === 'loading'
              ? [...new Array(6)].map((_, index) => <SkeletonItem key={index} />)
              : items.map((obj) => (
                  <div className={styles.content__item} key={obj.id}>
                    <img src={obj.img} alt={obj.typeName} />
                    <h3>{obj.title}</h3>
                    <div className={styles.content__item_info}>
                      <p>{obj.price}₴</p>
                      <button
                        onClick={() => {
                          const item: CartItem = {
                            id: obj.id,
                            img: obj.img,
                            typeName: obj.typeName,
                            title: obj.title,
                            price: obj.price,
                            count: 1,
                          };
                          addItemToCart(item);
                        }}>
                        Добавить в корзину
                        {cartItems?.find((item) => obj.id === item.id) ? (
                          <span>{cartItems?.find((item) => obj.id === item.id)?.count}</span>
                        ) : (
                          ''
                        )}
                      </button>
                    </div>
                  </div>
                ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ItemBlock;
