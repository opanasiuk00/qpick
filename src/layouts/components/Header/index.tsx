import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Cart from '../../../pages/Cart';
import { selectCartData } from '../../../redux/cart/selectors';
import { selectItemData } from '../../../redux/items/selectors';
import { setType, setTypeName } from '../../../redux/items/slice';
import { useAppDispatch } from '../../../redux/store';
import styles from './header.module.scss';

type typePhone = {
  name: string;
  type: string;
};
type PopupClick = MouseEvent & {
  path: Node[];
};

export const typeList: typePhone[] = [
  { name: 'Показать все', type: '' },
  { name: 'iPhone 12', type: '1' },
  { name: 'iPhone 12 Pro Max', type: '2' },
  { name: 'iPhone 12 Mini', type: '3' },
  { name: 'iPhone 13', type: '4' },
  { name: 'iPhone 13 Pro', type: '5' },
  { name: 'iPhone 13 Pro Max', type: '6' },
  { name: 'iPhone 13 Mini', type: '7' },
];

const Header: React.FC = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [activeCart, setActiveCart] = React.useState<boolean>(false);
  const sortRef = React.useRef<HTMLDivElement>(null);
  const cartRef = React.useRef<HTMLDivElement>(null);
  const isMounted = React.useRef(false);

  const { typeName } = useSelector(selectItemData);
  const { cartLength, cartItems } = useSelector(selectCartData);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(cartItems);
      localStorage.setItem('cart', json);
    }
    isMounted.current = true;
  }, [cartItems]);

  const locationSearch = location.search.split('=')[1]?.replace(/-/g, ' ');
  const typeItem = typeList.find((obj) => obj.name === locationSearch);

  React.useEffect(() => {
    if (typeItem === undefined && location.pathname === '/') {
      navigate('/');
      dispatch(setTypeName(''));
      dispatch(setType(''));
    } else {
      dispatch(setType(typeItem?.type));
      dispatch(setTypeName(typeItem?.name));
    }
  }, []);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const _event = event as PopupClick;
      if (cartRef.current && !_event.path.includes(cartRef.current)) {
        setActiveCart(false);
      }
      if (sortRef.current && !_event.path.includes(sortRef.current)) {
        setOpen(false);
      }
    };
    document.body.addEventListener('click', handleClickOutside);
    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);

  const searchType = (name: string, type: string) => {
    dispatch(setTypeName(name));
    dispatch(setType(type));
    setOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__menu}>
        <a className={styles.header__logo} href="/">
          Qpick
        </a>
        {location.pathname === '/' && (
          <div className={styles.header__trigger} ref={sortRef}>
            <img onClick={() => setOpen(!open)} src="./img/phone.svg" alt="phone" />
            <p onClick={() => setOpen(!open)}>{typeName ? typeName : 'Выбрать модель телефона'}</p>
            <div
              className={
                open ? styles.header__sort + ' ' + styles.header__sort__active : styles.header__sort
              }>
              {typeList.map((obj, i) => (
                <p
                  className={typeName === obj.name ? styles.active : ''}
                  key={i}
                  onClick={() => searchType(obj.name, obj.type)}>
                  {obj.name}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className={styles.header__items}>
        <div className={styles.header__cart} ref={cartRef}>
          <div onClick={() => setActiveCart(!activeCart)}>
            <img className={styles.header__cart_img} src="./img/cart.svg" alt="cart" />
            {cartLength > 0 && <span className={styles.header__cart_count}>{cartLength}</span>}
          </div>
          <Cart activeCart={activeCart} setActiveCart={setActiveCart} />
        </div>
      </div>
    </header>
  );
};

export default Header;
