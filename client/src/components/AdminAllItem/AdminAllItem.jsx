import { Pagination } from 'swiper';
import styles from './AdminAllitem.module.sass';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { fetchDeleteItem } from '../../redux/slices/adminSlice';

function AdminAllItem({ props, onEdit, onProps }) {
  
  const dispatch = useDispatch()
  const fnClickEdit = (props) => {
    onEdit()
    onProps(props)
  }
  const onClickDelete = () => {
    if (window.confirm('Вы действительно хотите удалить товар?')) {
      dispatch(fetchDeleteItem({ id: props.id }))
    }
  }
  
  return (
    <>
      <div className={styles.item}>
        <div className={styles.item_slider_wrapper}>
          {JSON.parse(props.type).length !== 0 && (
            <div className={styles.item_type_ticket}>
              {JSON.parse(props.type)}
            </div>
          )}
          <Swiper
            className={styles.item_slider}
            modules={[Pagination]}
            pagination={{ clickable: true }}
            centeredSlides={true}
          >
            {JSON.parse(props.image_link)?.map((image, index) => (
              <SwiperSlide
                key={index}
                className={styles.item_slider_slide}
                style={{
                  backgroundImage: `url('${image}')`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                }}
              ></SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className={styles.item_title}>{props.name}</div>
        <div className={styles.item_flex_block}>
          <div className={styles.item_info}>
            <div className={styles.item_availability}>
              {props.availability === 1 ? 'Есть' : 'Нет'} в наличии
            </div>
          </div>
          <div className={styles.item_prices}>
            <div className={styles.item_prices_old_price}>
              <strike>{props.old_price}</strike> руб
            </div>
            <div className={styles.item_prices_actual}>{props.price} руб</div>
          </div>
        </div>
        <div className={styles.item_buttons}>
          <button className={styles.item_buttons_item} onClick={() => fnClickEdit(props)}>
            Редактировать
          </button>
          <button
          onClick={onClickDelete}
            className={classNames(styles.item_buttons_item, styles.delete)}
          >
            Удалить
          </button>
        </div>
      </div>
    </>
  );
}

export default AdminAllItem;
