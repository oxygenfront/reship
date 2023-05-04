import React from 'react';
import { Link } from 'react-router-dom';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import './Slider.sass';

function Slider() {
  return (
    <Swiper
      modules={[Pagination, Navigation]}
      pagination={{clickable: true}}
      navigation
      loop={true}
      speed={1200}
      className='slider__section'
    >
      <SwiperSlide
        className='slider__section__item'
        style={{ backgroundImage: `url('/assets/img/iphone bg.png')` }}
      >
        <div className='slider__section__item_title'>
          iPhone 14 Pro Max
        </div>
        <div className='slider__section__item_suptitle'>
          В продаже с 30 сентября
        </div>
        <Link to='item/1' className='slider__section__item_link'>
          Перейти к товару
        </Link>
      </SwiperSlide>
      <SwiperSlide
        className='slider__section__item'
        style={{ backgroundImage: `url('/assets/img/headphones bg.png')` }}
      >
        <div className='slider__section__item_title'>
          Logitech
          <br /> G435
        </div>
        <div className='slider__section__item_suptitle'>
          Теперь снова в наличии
        </div>
        <Link to='item/20' className='slider__section__item_link'>
          Перейти к товару
        </Link>
      </SwiperSlide>
      <SwiperSlide
        className='slider__section__item'
        style={{ backgroundImage: `url('/assets/img/mouse bg.png')` }}
      >
        <div className='slider__section__item_title'>Logitech G PRO</div>
        <div className='slider__section__item_suptitle'>
          По самой выгодной цене
        </div>
        <Link to='item/1' className='slider__section__item_link'>
          Перейти к товару
        </Link>
      </SwiperSlide>
    </Swiper>
  );
}

export default Slider
