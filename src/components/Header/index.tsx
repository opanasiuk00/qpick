import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { selectCartData } from '../../redux/cart/selectors';
import { useAppDispatch } from '../../redux/store';
import { fetchType } from '../../redux/types/asyncAction';
import { selectTypeData } from '../../redux/types/selector';
import { setType, setTypeName } from '../../redux/types/slice';
import styles from './header.module.scss';

type PopupClick = MouseEvent & {
  path: Node[];
};

const Header: React.FC = () => {
  const [open, setOpen] = React.useState<boolean>(false);

  const sortRef = React.useRef<HTMLDivElement>(null);

  const { types, type, typeName } = useSelector(selectTypeData);
  const { cartLength } = useSelector(selectCartData);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    dispatch(fetchType());
    const locationSearch = location.search.split('=')[1]?.replace(/-/g, ' ');
    const typeItem = types.find((obj) => obj.name === locationSearch);
    if (typeItem === undefined && location.pathname === '/') {
      navigate('/');
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
        <h4
          onClick={() => {
            dispatch(setType(''));
            setTypeName('');
            navigate('/');
          }}
          className={styles.header_menu_logo}>
          Qpick
        </h4>
        {location.pathname == '/' && (
          <div ref={sortRef} className={styles.header_menu_trigger}>
            <img onClick={() => setOpen(!open)} src="./img/phone.svg" />
            <p onClick={() => setOpen(!open)}>{typeName ? typeName : 'Выбрать модель телефона'}</p>
            {open && (
              <div className={styles.header_menu_trigger_popup}>
                {types.map((obj) => (
                  <p
                    className={typeName === obj.name ? styles.active : ''}
                    key={obj.type}
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
        <div className={styles.header_items_favorites}>
          <img src="./img/favorites.svg" />
          <span>0</span>
        </div>
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
