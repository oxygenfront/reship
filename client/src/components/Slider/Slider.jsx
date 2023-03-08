import React from 'react';

import styles from './Slider.module.sass';
function Slider() {
  return (
    <section className={styles.slider__section}>
      <div className={styles.slider__section__item}>
        <div className={styles.slider__section__item_title}>
          iPhone 14 Pro Max
        </div>
        <div className={styles.slider__section__item_suptitle}>
          В продаже с 30 сентября
        </div>
        <a href='#!' className={styles.slider__section__item_link}>
          Перейти к товару
        </a>
      </div>
      <div className={styles.slider__section__item}>
        <div className={styles.slider__section__item_title}>Logitech G435</div>
        <div className={styles.slider__section__item_suptitle}>
          Снова в наличии
        </div>
        <a href='#!' className={styles.slider__section__item_link}>
          Перейти к товару
        </a>
      </div>
      <div className={styles.slider__section__item}>
        <div className={styles.slider__section__item_title}>Logitech G PRO</div>
        <div className={styles.slider__section__item_suptitle}>
          По самой выгодной цене
        </div>
        <a href='#!' className={styles.slider__section__item_link}>
          Перейти к товару
        </a>
      </div>
    </section>
  );
}

export default Slider;
