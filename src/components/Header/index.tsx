import React from 'react';
import { setType } from '../../redux/items/slice';
import { useAppDispatch } from '../../redux/store';
import styles from './header.module.scss';

type typePhone = {
  name: string;
  type: string;
};

type PopupClick = MouseEvent & {
  path: Node[];
};

export const typeList: typePhone[] = [
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
  const [value, setValue] = React.useState<string>();
  const dispatch = useAppDispatch();

  const sortRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const _event = event as PopupClick;
      console.log(sortRef.current && !_event.path.includes(sortRef.current));
      if (sortRef.current && !_event.path.includes(sortRef.current)) {
        setOpen(false);
      }
    };
    console.log('click');
    document.body.addEventListener('click', handleClickOutside);
    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);

  const searchType = (name: string, type: string) => {
    setValue(name);
    dispatch(setType(type));
    setOpen(false);
  };

  return (
    <div className={styles.header}>
      <div className={styles.header_menu}>
        <h4 className={styles.header_menu_logo}>Qpick</h4>
        <div ref={sortRef} className={styles.header_menu_trigger}>
          <img onClick={() => setOpen(!open)} src="./img/phone.svg" />
          <p onClick={() => setOpen(!open)}>{value ? value : 'Выбрать модель телефона'}</p>
          {open && (
            <div className={styles.header_menu_trigger_popup}>
              {typeList.map((obj) => (
                <p
                  className={value === obj.name ? styles.active : ''}
                  key={obj.type}
                  onClick={() => searchType(obj.name, obj.type)}>
                  {obj.name}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className={styles.header_items}>
        <div className={styles.header_items_favorites}>
          <img src="./img/favorites.svg" />
          <span>0</span>
        </div>
        <div className={styles.header_items_cart}>
          <img src="./img/cart.svg" />
          <span>0</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
