import Swiper, { Pagination } from 'swiper';
import styles from './AdminAllitem.module.sass';
import { SwiperSlide } from 'swiper/react';

function AdminAllItem() {
  return (
    <>
      <div className={styles.main_catalog__products_wrapper_item}>
        <button className={styles.main_catalog__products_wrapper_item_favorite}>
          {/* {isFavorite ? (
            <img src='/assets/img/active-heart-main-catalog.png'></img>
          ) : (
            <img src='/assets/img/heart-main-catalog.png'></img>
          )} */}
        </button>
        {/* <Swiper
          className={styles.main_catalog__products_wrapper_item_slider}
          modules={[Pagination]}
          pagination={{ clickable: true }}
          centeredSlides={true}
        >
          {JSON.parse(image).map((image, index) => (
            <SwiperSlide
              key={index}
              className={
                styles.main_catalog__products_wrapper_item_slider_slide
              }
              style={{
                backgroundImage: `url('${image}')`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }}
            ></SwiperSlide>
          ))}
        </Swiper> */}
        <div className={styles.main_catalog__products_wrapper_item_title}>
          {/* {name} */}
        </div>
        <div
          className={styles.main_catalog__products_wrapper_item_bottom_block}
        >
          <span className={styles.main_catalog__products_wrapper_item_price}>
            {/* {category === 'Клавиатуры' ? 'от' : null} {price} руб */}
          </span>
          {/* {addedCount > 0 ? (
            <div className={styles.main_catalog__products_wrapper_item_button}>
              <button
                onClick={addedCount > 1 ? onClickMinus : onClickRemove}
                className={
                  styles.main_catalog__products_wrapper_item_button_minus_wrapper
                }
              >
                <div
                  className={
                    styles.main_catalog__products_wrapper_item_button_minus
                  }
                ></div>
              </button>
              <span>{addedCount}</span>
              <button
                onClick={onClickAdd}
                className={
                  styles.main_catalog__products_wrapper_item_button_pluses
                }
              >
                <div
                  className={
                    styles.main_catalog__products_wrapper_item_button_pluses_block
                  }
                >
                  <div
                    className={
                      styles.main_catalog__products_wrapper_item_button_pluses_itemv
                    }
                  ></div>
                  <div
                    className={
                      styles.main_catalog__products_wrapper_item_button_pluses_itemh
                    }
                  ></div>
                </div>
              </button>
            </div>
          ) : (
            <button
              onClick={onClickAdd}
              className={styles.main_catalog__products_wrapper_item_button}
            >
              В корзину
            </button>
          )} */}
        </div>
      </div>
    </>
  );
}

export default AdminAllItem;
