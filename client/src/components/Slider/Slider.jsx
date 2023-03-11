import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/autoplay';

import styles from './Slider.module.sass';

SwiperCore.use([Autoplay]);
function Slider() {
  return (
    <Swiper
      modules={[Autoplay]}
      loop={true}
      speed={1000}
      autoplay={{
        delay: 5000
      }}
      className={styles.slider__section}
    >
      <SwiperSlide
        className={styles.slider__section__item}
        style={{ backgroundImage: `url('/assets/img/iphone bg.png')` }}
      >
        <div className={styles.slider__section__item_title}>
          iPhone 14 Pro Max
        </div>
        <div className={styles.slider__section__item_suptitle}>
          В продаже с 30 сентября
        </div>
        <a href='#!' className={styles.slider__section__item_link}>
          Перейти к товару
        </a>
      </SwiperSlide>
      <SwiperSlide
        className={styles.slider__section__item}
        style={{ backgroundImage: `url('/assets/img/headphones bg.png')` }}
      >
        <div className={styles.slider__section__item_title}>Logitech G435</div>
        <div className={styles.slider__section__item_suptitle}>
          Снова в наличии
        </div>
        <a href='#!' className={styles.slider__section__item_link}>
          Перейти к товару
        </a>
      </SwiperSlide>
      <SwiperSlide
        className={styles.slider__section__item}
        style={{ backgroundImage: `url('/assets/img/mouse bg.png')` }}
      >
        <div className={styles.slider__section__item_title}>Logitech G PRO</div>
        <div className={styles.slider__section__item_suptitle}>
          По самой выгодной цене
        </div>
        <a href='#!' className={styles.slider__section__item_link}>
          Перейти к товару
        </a>
      </SwiperSlide>
    </Swiper>
  );
}

export default Slider;
