import React from 'react';
import styles from './AdminOrder.module.sass';

const AdminOrder = ({ obj }) => {
  console.log(obj.summ_price, JSON.parse(obj.products), obj.customer_id);
  const address = [JSON.parse(obj.adress).adress];
  const words = address[0].replace(/[^\p{L}\d\s]+/gu, '').split(' ');

  function timeConverter(UNIX_timestamp) {
    const date = new Date(UNIX_timestamp);

    return date.toLocaleString('ru-US', {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',

      month: 'long',
    });
  }

  function selectDel(obj) {
    if (obj.tariff_code === 368) {
      return 'Посылка склад-постамат';
    }
  }
  return (
    
    <div className={styles.wrapper}>
      <div className={styles.info_buyer}>
        <div className={styles.info_title}>Информация о заказе</div>
        <div className={styles.info_suptitle}>
          {timeConverter(obj.date_start)}
        </div>
        <hr className='hr' />
        <p className={styles.info_item}>
          ФИО: <br />{' '}
          <li>
            {obj.first_name} {obj.last_name}
          </li>
        </p>
        <p className={styles.info_item}>
          Номер телефона: <br />
          <li>{obj.number}</li>
        </p>
        <ul className={styles.info_item}>
          <span>Адресс доставки:</span>
          <li>Город: {words[0]}</li>
          <li>
            Улица: {words[1]} {words[2]} {words[3]}
          </li>
          <li>
            Область: {words[4]} {words[5]}
          </li>
          <li>Индекс: {words[6]}</li>
          <span>Вид доставки:</span>
          <li>{selectDel(obj)}</li>
        </ul>
        <div className={styles.info_item}>
          Общая сумма заказа: <br />
          <li>{obj.summ_price}</li>
        </div>
        <div className={styles.info_item}>
          Статус подтверждения заказа: <br />
          {obj.status === -1 ? (
            <li>Не подтвержден</li>
          ) : obj.status === 1 ? (
            <li>Подтвержден</li>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default AdminOrder;
