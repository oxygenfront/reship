import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { addItem } from '../redux/slices/cartSlice';
import {
  fetchFullItem,
  selectFullItemData,
} from '../redux/slices/fullItemSlice';
import {
  fetchAuthMe,
  selectIsAuth,
  selectUserData,
} from '../redux/slices/authSlice';
import {
  fetchAddFavorite,
  fetchDeleteFavorite,
} from '../redux/slices/favoriteSlice';

import { Swiper, SwiperSlide } from 'swiper/react';
import {Navigation} from 'swiper';
import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/navigation';

const FullItem = () => {
  const [openFull, setOpenFull] = useState(false);
  const { id } = useParams();
  const { item, status } = useSelector(selectFullItemData);
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const token = localStorage.getItem('token');
  const { data, userStatus = status } = useSelector(selectUserData);
  const [navigate, setNavigate] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [parametr, setParametr] = useState('');
  const [color, setColor] = useState('');
  const onClickAdd = () => {
    const tovar = {
      id: item.id,
      name: item.name,
      image: item.image,
      price: item.price,
      parametr,
      color,
      count: 0,
    };
    dispatch(addItem(tovar));
  };

  useEffect(() => {
    if (userStatus === 'success' && isAuth) {
      const ids = data.favorites.map((item) => item.product_id);
      console.log(ids);
      setIsFavorite(ids.includes(Number(id)));
    }
  }, [data]);
  const onChangeFavorite = async () => {
    if (!isAuth) {
      console.log('not auth');
      return setNavigate(true);
    }
    if (!isFavorite) {
      const data = await dispatch(
        fetchAddFavorite({ product_id: Number(id), token })
      );
      if (!data.payload) {
        return alert('Не удалось добавить товар в избранные');
      } else {
        dispatch(fetchAuthMe(token));
        return setIsFavorite(true);
      }
    }
    if (isFavorite) {
      const data = await dispatch(
        fetchDeleteFavorite({ product_id: Number(id), token })
      );
      dispatch(fetchAuthMe(token));
      if (!data.payload) {
        return alert('Не удалось удалить товар из избранных');
      } else {
        dispatch(fetchAuthMe(token));
        return setIsFavorite(false);
      }
    }
  };
  useEffect(() => {
    dispatch(fetchFullItem({ id }));
  }, []);
  if (navigate) {
    return <Navigate to='/login'></Navigate>;
  }
  const renderStatus = Boolean(status === 'success');

  return (
    <section className='card-section'>
      <div className='container card-section__container'>
        <div className='card-section__slider_wrapper'>
          <div className='card-section__slider'>
            {/* <img src={`../assets/products_img/${id}.png`} alt="" /> */}
            <Swiper
              direction='vertical'
              slidesPerView={3}
              spaceBetween={17}
              modules={[Navigation]}
              navigation
              centeredSlides={true}
              // loop={true}
              className='card-section__slider'
            >
              <SwiperSlide className='card-section__slider_item'>1</SwiperSlide>
              <SwiperSlide className='card-section__slider_item'>2</SwiperSlide>
              <SwiperSlide className='card-section__slider_item'>3</SwiperSlide>
              <SwiperSlide className='card-section__slider_item'>4</SwiperSlide>
              <SwiperSlide className='card-section__slider_item'>5</SwiperSlide>
              <SwiperSlide className='card-section__slider_item'>6</SwiperSlide>
              <SwiperSlide className='card-section__slider_item'>7</SwiperSlide>
            </Swiper>
          </div>
          <div className='card-section__img-block'>
            <img
              src={`../assets/products_img/${id}.png`}
              className='fiol'
              alt='iphone'
            />
          </div>
        </div>

        <div className='card-section__about'>
          <div className='card-section__about-name'>{item.name}</div>
          <div className='card-section__about-info'>
            {renderStatus &&
              JSON.stringify(item.description_small)
                .replaceAll('"', '')
                .split('\\n')
                .map((str, index) => <p key={index}>{str}</p>)}
          </div>

          <div
            className={
              openFull
                ? 'card-section__about-info-more-active'
                : 'card-section__about-info-more'
            }
          >
            <div className='card-section__about-info'>
              {renderStatus &&
                JSON.stringify(item.description_full)
                  .replaceAll('"', '')
                  .split('\\n')
                  .map((str, index) => <p key={index}>{str}</p>)}
            </div>
          </div>
          <button
            onClick={() => setOpenFull(!openFull)}
            className='card-section__about-btn show'
          >
            Полный список характеристик
          </button>
          <button className='card-section__about-btn no-show'>
            Скрыть список характеристик
          </button>
        </div>

        <hr className='card-section__hr' />

        <div className='card-section__choice'>
          <div className='card-section__choice-block'>
            <div className='card-section__choice-purchase'>
              <span>{item.price} ₽</span>
              <Link to='/cart' onClick={onClickAdd}>
                <span>Купить</span>
              </Link>
            </div>
            <div className='card-section__choice-blue-blocks'>
              <button
                onClick={onClickAdd}
                className='card-section__choice-blue-blocks_item'
              >
                <img src='../assets/img/bag-white.svg' alt='' />
              </button>
              <button
                onClick={onChangeFavorite}
                className='card-section__choice-blue-blocks_item'
              >
                <img
                  width={'26px'}
                  src={
                    isFavorite
                      ? '../assets/img/heart-white.svg'
                      : '../assets/img/heart-empty.svg'
                  }
                  alt=''
                />
              </button>
            </div>
          </div>

          <div className='card-section__choice-char'>
            {renderStatus && item.category === 'клавиатуры' ? (
              JSON.parse(item.parameters).svitchi.map((param) => (
                <button
                  onClick={() => setParametr(param)}
                  key={param}
                  className={
                    parametr === param
                      ? 'card-section__choice-char_item-active'
                      : 'card-section__choice-char_item'
                  }
                >
                  {param}
                </button>
              ))
            ) : (
              <></>
            )}
          </div>

          {renderStatus && JSON.parse(item.colors_avail).length > 0 ? (
            <div className='card-section__choice-color'>
              {JSON.parse(item.colors_avail).map((param, index) => (
                <button
                  className={
                    color === param
                      ? 'card-section__choice-color-item-active'
                      : 'card-section__choice-color-item'
                  }
                  key={param}
                  onClick={() => setColor(param)}
                >
                  {param}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default FullItem;
