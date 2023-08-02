import React from 'react';
import styles from './AdminPromocode.module.sass';

const AdminPromocodes = ({ id, promocode, persent, date_end }) => {
  function timeConverter(UNIX_timestamp) {
    const date = new Date(UNIX_timestamp);

    return date.toLocaleString('ru-US', {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'long',
    });
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.block__up}>{promocode}</div>
        <div className={styles.block__bottom}>
          <div className={styles.block__percent}>Скидка {persent}%</div>
          <div className={styles.block__date}>До {timeConverter(date_end)}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminPromocodes;
