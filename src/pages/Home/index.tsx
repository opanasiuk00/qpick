import React from 'react';
import { useSelector } from 'react-redux';
import { fetchItems } from '../../redux/items/asyncActions';
import { selectItemData } from '../../redux/items/selectors';
import { setPage } from '../../redux/items/slice';
import { useAppDispatch } from '../../redux/store';
import styles from './home.module.scss';
import SkeletonItem from './SkeletonItem';

const Home: React.FC = () => {
  const { items, status, page, type, pageCount } = useSelector(selectItemData);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(fetchItems({ page, type }));
  }, [page, type]);
  console.log(type);

  return (
    <>
      <div className={styles.title}>
        <h1 className={styles.title_name}>Аксессуары для Iphone 13 Pro Max</h1>
        <img className={styles.title_img} src="./img/iPhone13promax.png" alt="iphone 13 pro max" />
      </div>
      <div className={styles.content}>
        {status === 'error' ? (
          <h2>error</h2>
        ) : (
          <>
            <h2 className={styles.content_title}>Чехлы</h2>
            <div className={styles.content_items}>
              {status === 'loading'
                ? [...new Array(6)].map((_, index) => <SkeletonItem key={index} />)
                : items.map((obj) => (
                    <div key={obj.id} className={styles.content_item}>
                      <img src={obj.img} alt={obj.type} />
                      <h3>{obj.title}</h3>
                      <div>
                        <p>{obj.price}₴</p>
                        <button>
                          Добавить в корзину
                          <span>0</span>
                        </button>
                      </div>
                    </div>
                  ))}
            </div>
          </>
        )}
      </div>
      {pageCount > 1 && (
        <div className={styles.paginator}>
          {[...new Array(pageCount)].map((_, index) => (
            <p
              key={index}
              className={
                page === index + 1
                  ? styles.paginator_item + ' ' + styles.active
                  : styles.paginator_item
              }
              onClick={() => dispatch(setPage(index + 1))}>
              {index + 1}
            </p>
          ))}
        </div>
      )}
    </>
  );
};

export default Home;
