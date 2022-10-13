import React from 'react';
import styles from './paginator.module.scss';

type PageCountProps = {
  pageCount: number;
  page: number;
  onChangePage: (page: number) => void;
};

export const Paginator: React.FC<PageCountProps> = ({ pageCount, page, onChangePage }) => {
  return (
    <>
      {pageCount > 1 && (
        <div className={styles.paginator}>
          {[...new Array(pageCount)].map((_, index) => (
            <p
              className={
                page === index + 1
                  ? styles.paginator__item + ' ' + styles.paginator__item_active
                  : styles.paginator__item
              }
              key={index}
              onClick={() => onChangePage(index + 1)}>
              {index + 1}
            </p>
          ))}
        </div>
      )}
    </>
  );
};
