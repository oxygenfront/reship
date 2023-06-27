import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useParams } from 'react-router-dom';
import {
  addItem,
  minusItem,
  removeItem,
  selectCartItemById,
} from '../redux/slices/cartSlice';
import {
  fetchFullItem,
  selectFullItemData,
} from '../redux/slices/fullItemSlice';

import {
  addFavorite,
  removeFavorite,
  selectFavorites,
} from '../redux/slices/favoriteSlice';

import 'swiper/css';
import 'swiper/css/bundle';
import { Comment, FullItemSlider } from '../components';
import {
  fetchGetReviewsForProductId,
  selectCommentsData,
} from '../redux/slices/commentSlice';
import { getTheme } from '../utils/getTheme';

const FullItem = () => {
  const token = localStorage.getItem('token');
  const theme = useSelector((state) => state.theme);
  const { id } = useParams();
  const { comments, commentsStatus } = useSelector(selectCommentsData);
  const { item, status } = useSelector(selectFullItemData);
  const dispatch = useDispatch();
  const { favorites } = useSelector(selectFavorites);
  const [navigate, setNavigate] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [parametr, setParametr] = useState('');
  const [color, setColor] = useState('');
  const cartItem = useSelector(selectCartItemById(item.id));
  const addedCount = cartItem ? cartItem.count : 0;
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
  const onClickMinus = () => {
    dispatch(minusItem(item.id));
  };
  const onClickRemove = () => {
    dispatch(removeItem(item.id));
  };

  useEffect(() => {
    const ids = favorites.map((item) => item.id);

    setIsFavorite(ids.includes(Number(id)));
  }, []);
  const onChangeFavorite = () => {
    if (!isFavorite) {
      dispatch(
        addFavorite({
          id,
          name: item.name,
          image: item.image,
          price: item.price,
          color: item.color,
        })
      );

      return setIsFavorite(true);
    }
    if (isFavorite) {
      dispatch(removeFavorite(id));

      return setIsFavorite(false);
    }
  };
  useEffect(() => {
    dispatch(fetchFullItem({ id }));
    dispatch(fetchGetReviewsForProductId(token, id));
  }, []);
  if (navigate) {
    return <Navigate to='/login'></Navigate>;
  }

  const renderStatus = Boolean(status === 'success');
  return (
    <div className='fullitem'>
      <div className='fullitem__card-wrapper'>
        <div className='fullitem__card-breadcrumb container'></div>
        <div className='fullitem__card container'>
          <div className='fullitem__card-sliders'>
            <FullItemSlider id={id}></FullItemSlider>
          </div>
          <div className='fullitem__card_info-wrapper'>
            <div className='fullitem__card_info-name'>{item.name}</div>
            <div className='fullitem__card_info-params'>
              {item.category === 'клавиатуры' ? (
                <>
                  <div className='fullitem__card_info-params_block'>
                    <p>Переключатели</p>
                    <div className='fullitem__card_info-params_block-wrapper'>
                      <button className='fullitem__card_info-params_block_button'>
                        <span>br</span>
                      </button>
                      <button className='fullitem__card_info-params_block_button noItem'>
                        <span>r</span>
                      </button>
                    </div>
                  </div>
                  <div className='fullitem__card_info-params_block'>
                    <p>Раскладка</p>
                    <div className='fullitem__card_info-params_block-wrapper'>
                      <button className='fullitem__card_info-params_block_text'>
                        Русская
                      </button>
                      <button className='fullitem__card_info-params_block_text'>
                        Английская
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className='fullitem__card_info-params_block'>
                  <p>Цвет</p>
                  <div className='fullitem__card_info-params_block-wrapper'>
                    {renderStatus &&
                      JSON.parse(item.colors).map((color) => (
                        <button
                          onClick={(e) => setColor(e.target.value)}
                          className='fullitem__card_info-params_block_text'
                          key={color}
                          value={color}
                        >
                          {color[0].toUpperCase() + color.slice(1)}
                        </button>
                      ))}
                  </div>
                </div>
              )}
            </div>
            <div className='fullitem__card_info-bottom'>
              <span>{item.price} руб</span>
              {addedCount > 0 ? (
                <div className='fullitem__card_info-bottom_buttons'>
                  <Link
                    className='fullitem__card_info-bottom_buttons_cart'
                    to='/cart'
                  >
                    Перейти<br></br> в корзину
                  </Link>

                  <div className={'fullitem__card_info-bottom_buttons_button'}>
                    <div
                      onClick={addedCount > 1 ? onClickMinus : onClickRemove}
                      className={
                        'fullitem__card_info-bottom_buttons_button_minus_wrapper'
                      }
                    >
                      <div
                        className={
                          'fullitem__card_info-bottom_buttons_button_minus'
                        }
                      ></div>
                    </div>
                    {addedCount}
                    <button
                      onClick={onClickAdd}
                      className={
                        'fullitem__card_info-bottom_buttons_button_pluses'
                      }
                    >
                      <div
                        className={
                          'fullitem__card_info-bottom_buttons_button_pluses_block'
                        }
                      >
                        <div
                          className={
                            'fullitem__card_info-bottom_buttons_button_pluses_itemv'
                          }
                        ></div>
                        <div
                          className={
                            'fullitem__card_info-bottom_buttons_button_pluses_itemh'
                          }
                        ></div>
                      </div>
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  className='fullitem__card_info-bottom_btn'
                  to='/cart'
                  onClick={onClickAdd}
                >
                  В корзину
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='fullitem__description container'>
        <div className='fullitem__description_left'>
          <div className=''>
            <p>Описание</p>
            <div className='fullitem__description_left_description'>
              {item.description_full}
            </div>
          </div>
          <div className=''>
            <p>Особенности</p>
            <div className='fullitem__description_left_spec'>
              <div className='fullitem__description_left_spec_title'>
                Раздельный форм фактор
              </div>
              <div className='fullitem__description_left_spec_text'>
                Позволит вам повелевать расположением ваших рук как угодно. Всё
                ради наилучшей эргономичности.
              </div>
            </div>
            <div className='fullitem__description_left_spec'>
              <div className='fullitem__description_left_spec_title'>
                Программируемая
              </div>
              <div className='fullitem__description_left_spec_text'>
                Вся клавиатура программируется, включая разделённую клавишу
                пробела, каждую из частей которого можно настроить отдельно.
                Поддерживаются 3 слоя макросов.
              </div>
            </div>
            <div className='fullitem__description_left_spec'>
              <div className='fullitem__description_left_spec_title'>
                Программируемая
              </div>
              <div className='fullitem__description_left_spec_text'>
                Вся клавиатура программируется, включая разделённую клавишу
                пробела, каждую из частей которого можно настроить отдельно.
                Поддерживаются 3 слоя макросов.
              </div>
            </div>
          </div>
        </div>
        <div className='fullitem__description_right'>
          <p>Характеристика</p>
          <div className='fullitem__description_right_har'>
            <div className='fullitem__description_right_har_item'>
              <div className='fullitem__description_right_har_item_left'>
                Материал клавиш
              </div>
              <div className='fullitem__description_right_har_item_right'>
                Doubleshot
              </div>
            </div>
            <div className='fullitem__description_right_har_item'>
              <div className='fullitem__description_right_har_item_left'>
                Материал клавиш
              </div>
              <div className='fullitem__description_right_har_item_right'>
                Doubleshot
              </div>
            </div>
            <div className='fullitem__description_right_har_item'>
              <div className='fullitem__description_right_har_item_left'>
                Материал клавиш
              </div>
              <div className='fullitem__description_right_har_item_right'>
                Doubleshot
              </div>
            </div>
            <div className='fullitem__description_right_har_item'>
              <div className='fullitem__description_right_har_item_left'>
                Материал клавиш
              </div>
              <div className='fullitem__description_right_har_item_right'>
                Doubleshot
              </div>
            </div>
            <div className='fullitem__description_right_har_item'>
              <div className='fullitem__description_right_har_item_left'>
                Материал клавиш
              </div>
              <div className='fullitem__description_right_har_item_right'>
                Doubleshot
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='fullitem__comments container'>
        <p className='fullitem__comments_title'>Отзывы</p>
        <div className='fullitem__comments_items'>
          {commentsStatus === 'success' && comments.items.length > 0 ? (
            comments.items.map((comment) => <Comment></Comment>)
          ) : (
            <div className='personal__empty_wrapper'>
              <div className='container personal__empty_container'>
                <div
                  style={{
                    backgroundImage:
                      theme === 'dark'
                        ? `url('../assets/img/no-item black theme.png')`
                        : `url('../assets/img/no-item.png')`,
                    backgroundSize: 'cover',
                  }}
                  className='personal__empty'
                >
                  Пусто
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FullItem;
