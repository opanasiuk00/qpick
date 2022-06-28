import React from 'react';
import { useNavigate } from 'react-router-dom';
import { setPage, setType, setTypeName } from '../../redux/items/slice';
import { useAppDispatch } from '../../redux/store';
import styles from './notfound.module.scss';

const NotFound: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div className={styles.notfound}>
      <h2>Извините, страница не найдена</h2>
      <p>Вы можете вернутся на главную</p>
      <button
        onClick={() => {
          dispatch(setType(''));
          dispatch(setTypeName(''));
          dispatch(setPage(1));
          navigate('/');
        }}>
        На главную
      </button>
    </div>
  );
};

export default NotFound;
