import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { selectCartData } from '../../redux/cart/selectors';
import { useAppDispatch } from '../../redux/store';
import { setType, setTypeName } from '../../redux/items/slice';
import styles from './header.module.scss';
import { selectItemData } from '../../redux/items/selectors';

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
  const sortRef = React.useRef<HTMLDivElement>(null);
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

  React.useEffect(() => {
    const locationSearch = location.search.split('=')[1]?.replace(/-/g, ' ');
    const typeItem = typeList.find((obj) => obj.name === locationSearch);
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
    <div className={styles.header}>
      <div className={styles.header_menu}>
        <a href="/" className={styles.header_menu_logo}>
          Qpick
        </a>
        {location.pathname == '/' && (
          <div ref={sortRef} className={styles.header_menu_trigger}>
            <img onClick={() => setOpen(!open)} src="./img/phone.svg" />
            <p onClick={() => setOpen(!open)}>{typeName ? typeName : 'Выбрать модель телефона'}</p>
            {open && (
              <div className={styles.header_menu_trigger_popup}>
                {typeList.map((obj, i) => (
                  <p
                    className={typeName === obj.name ? styles.active : ''}
                    key={i}
                    onClick={() => searchType(obj.name, obj.type)}>
                    {obj.name}
                  </p>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <div className={styles.header_items}>
        {location.pathname !== '/cart' && (
          <div onClick={() => navigate('/cart')} className={styles.header_items_cart}>
            <img src="./img/cart.svg" />
            {cartLength > 0 ? <span>{cartLength}</span> : ''}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
