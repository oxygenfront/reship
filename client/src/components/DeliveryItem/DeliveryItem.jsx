import React, { useEffect, useState } from 'react'
import styles from './DeliveryItem.module.sass'

const DeliveryItem = ({ name, price, trackNumber }) => {

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <div className={styles.person__delivery_items_item}>
      <div className={styles.person__delivery_items_item_img}>
        <img
          src='https://placehold.co/136x136'
          alt=''
        />
      </div>
      <div className={styles.person__delivery_items_item_name}>
        <span>
          <span>IPhone 11</span> <br />
          black <span>(128 gb)</span>
        </span>
      </div>
      <div className={styles.person__delivery_items_item_number}>
        <span>1</span>
      </div>
      <div className={styles.person__delivery_history_wrapper_item_price}>
        43,000 rub
      </div>
      <div className={styles.person__delivery_history_wrapper_item_buttons}>
        <div className={styles.person__delivery_history_wrapper_item_status}>
          <span>Отследить</span>
        </div>
        <div className={styles.person__delivery_history_wrapper_item_status}>
          <span>Копировать трек</span>
        </div>
      </div>
    </div>
  );
}

export default DeliveryItem
