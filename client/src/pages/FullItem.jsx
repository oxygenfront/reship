import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useParams } from 'react-router-dom'
import {
  addItem,
  minusItem,
  removeItem,
  selectCartItemById,
} from '../redux/slices/cartSlice'
import {
  fetchFullItem,
  selectFullItemData,
} from '../redux/slices/fullItemSlice'

import 'swiper/css'
import 'swiper/css/bundle'
import { Comment, FullItemSlider } from '../components'
import {
  fetchGetReviewsForProductId,
  selectCommentsData,
} from '../redux/slices/commentSlice'

const FullItem = () => {
  const token = localStorage.getItem('token')
  const theme = useSelector((state) => state.theme)
  const { id } = useParams()
  const { comments, arrStatus } = useSelector(selectCommentsData)
  const { item, status } = useSelector(selectFullItemData)
  const dispatch = useDispatch()
  const [navigate, setNavigate] = useState(false)
  const [parameter, setParameter] = useState('')
  const [color, setColor] = useState('')
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [switchPrice, setSwitchPrice] = useState(0)
  const [layoutPrice, setLayoutPrice] = useState(0)

  const cartItem = useSelector(selectCartItemById(item.id))
  const addedCount = cartItem ? cartItem.count : 0
  const onClickAdd = () => {
    const tovar = {
      id: item.id,
      name: item.name,
      image: item.image_link,
      price: item.price + switchPrice + layoutPrice,
      weight: item.weight,
      parametr: parameter,
      color: item.color,
      count: 0,
    }
    dispatch(addItem(tovar))
  }
  const onClickMinus = () => {
    dispatch(minusItem(item.id))
  }
  const onClickRemove = () => {
    dispatch(removeItem(item.id))
  }

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])
  useEffect(() => {
    dispatch(fetchFullItem({ id }))
    dispatch(fetchGetReviewsForProductId({ token, id }))
  }, [color])

  if (navigate) {
    return <Navigate to="/login"></Navigate>
  }
  const renderStatus = Boolean(status === 'success')
  console.log(layoutPrice)

  return (
    <>
      {windowWidth > 991 ? (
        <div className="fullitem">
          <div className="fullitem__card-wrapper">
            <div className="fullitem__card-breadcrumb container"></div>
            <div className="fullitem__card container">
              <div className="fullitem__card-sliders">
                {renderStatus && (
                  <FullItemSlider
                    image={item.image_link}
                    id={id}
                  ></FullItemSlider>
                )}
              </div>
              <div className="fullitem__card_info-wrapper">
                <div className="fullitem__card_info-name">{item.name}</div>

                <div className="fullitem__card_info-params">
                  {item.category === 'Клавиатуры' ? (
                    <>
                      {renderStatus &&
                      JSON.parse(item?.parameters_dop)[1]?.switches.length >
                        0 ? (
                        <div className="fullitem__card_info-params_block">
                          <p>Переключатели</p>

                          <div className="fullitem__card_info-params_block-wrapper">
                            {renderStatus &&
                              JSON.parse(item.parameters_dop).map((item) =>
                                item?.switches?.map((svitch) => (
                                  <button
                                    key={Object.keys(svitch)[0]}
                                    onClick={(e) =>
                                      setSwitchPrice(Number(e.target.value))
                                    }
                                    value={Object.values(svitch)[0]}
                                    className={
                                      switchPrice ===
                                      Number(Object.values(svitch)[0])
                                        ? 'fullitem__card_info-params_block_button active'
                                        : 'fullitem__card_info-params_block_button'
                                    }
                                  >
                                    {Object.keys(svitch)[0]}
                                  </button>
                                ))
                              )}
                          </div>
                        </div>
                      ) : null}
                      {renderStatus && JSON.parse(item?.colors).length > 0 ? (
                        <div className="fullitem__card_info-params_block">
                          <p>Цвет</p>
                          <div className="fullitem__card_info-params_block-wrapper">
                            {renderStatus &&
                              JSON.parse(item.colors).map((colour) => (
                                <Link
                                  to={`/item/${colour.id}`}
                                  onClick={(e) => setColor(e.target.innerHTML)}
                                  className={
                                    renderStatus
                                      ? Number(id) === colour.id
                                        ? 'fullitem__card_info-params_block_text active'
                                        : 'fullitem__card_info-params_block_text'
                                      : ''
                                  }
                                  key={colour.id}
                                  value={colour.color}
                                >
                                  {colour.color}
                                </Link>
                              ))}
                          </div>
                        </div>
                      ) : null}
                      {renderStatus &&
                      JSON.parse(item?.parameters_dop)[2]?.layouts.length >
                        0 ? (
                        <div className="fullitem__card_info-params_block">
                          <p>Раскладка</p>
                          <div className="fullitem__card_info-params_block-wrapper">
                            {renderStatus &&
                              JSON.parse(item?.parameters_dop)[2]?.layouts.map(
                                (layout) => (
                                  <button
                                    key={Object.keys(layout)[0]}
                                    value={Object.values(layout)[0]}
                                    onClick={(e) =>
                                      setLayoutPrice(Number(e.target.value))
                                    }
                                    className={
                                      layoutPrice ===
                                      Number(Object.values(layout)[0])
                                        ? 'fullitem__card_info-params_block_button active'
                                        : 'fullitem__card_info-params_block_button'
                                    }
                                  >
                                    {Object.keys(layout)[0]}
                                  </button>
                                )
                              )}
                          </div>
                        </div>
                      ) : null}
                    </>
                  ) : (
                    <div className="fullitem__card_info-params_block">
                      <p>
                        {renderStatus && JSON.parse(item?.colors)?.length > 0
                          ? 'Цвет'
                          : null}
                      </p>
                      <div className="fullitem__card_info-params_block-wrapper">
                        {renderStatus &&
                          JSON.parse(item.colors).map((colour) => (
                            <Link
                              to={`/item/${colour.id}`}
                              onClick={(e) => setColor(e.target.innerHTML)}
                              className={
                                renderStatus
                                  ? Number(id) === colour.id
                                    ? 'fullitem__card_info-params_block_text active'
                                    : 'fullitem__card_info-params_block_text'
                                  : ''
                              }
                              key={colour.id}
                              value={colour.color}
                            >
                              {colour.color}
                            </Link>
                          ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="fullitem__card_info-bottom">
                  <span>{item.price + switchPrice + layoutPrice} руб</span>
                  {addedCount > 0 ? (
                    <div className="fullitem__card_info-bottom_buttons">
                      <Link
                        className="fullitem__card_info-bottom_buttons_cart"
                        to="/cart"
                      >
                        Перейти<br></br> в корзину
                      </Link>

                      <div
                        className={'fullitem__card_info-bottom_buttons_button'}
                      >
                        <button
                          onClick={
                            addedCount > 1 ? onClickMinus : onClickRemove
                          }
                          className={
                            'fullitem__card_info-bottom_buttons_button_minus_wrapper'
                          }
                        >
                          <div
                            className={
                              'fullitem__card_info-bottom_buttons_button_minus'
                            }
                          ></div>
                        </button>
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
                      className="fullitem__card_info-bottom_btn"
                      to="/cart"
                      onClick={onClickAdd}
                    >
                      В корзину
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="fullitem__description container">
            <div className="fullitem__description_left">
              <div className="">
                <p>Описание</p>
                <div className="fullitem__description_left_description">
                  {item.description_full}
                </div>
              </div>
              <div className="">
                <p>Особенности</p>
                {renderStatus &&
                  JSON.parse(item.feature).map((feature, index) => (
                    <div
                      key={index}
                      className="fullitem__description_left_spec"
                    >
                      <div className="fullitem__description_left_spec_title">
                        {feature.title}
                      </div>
                      <div className="fullitem__description_left_spec_text">
                        {feature.desc}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="fullitem__description_right">
              <p>Характеристика</p>
              <div className="fullitem__description_right_har">
                {renderStatus &&
                  JSON.parse(item?.parameters).map((item, index) => (
                    <div
                      className="fullitem__description_right_har_item"
                      key={index}
                    >
                      <div className="fullitem__description_right_har_item_left">
                        {item.title}
                      </div>
                      <div className="fullitem__description_right_har_item_right">
                        {item.desc}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="fullitem__comments container">
            <p className="fullitem__comments_title">Отзывы</p>
            <div className="fullitem__comments_items">
              {arrStatus === 'success' && comments.items?.length > 0 ? (
                comments.items.map((comment) => (
                  <Comment
                    first_name={comment.first_name}
                    last_name={comment.last_name}
                    anon={comment.anon}
                    author_id={comment.author_id}
                    date={comment.date_timestamp}
                    rating={comment.rating}
                    text={comment.text}
                  ></Comment>
                ))
              ) : (
                <div className="personal__empty_wrapper">
                  <div className="container personal__empty_container">
                    <div
                      style={{
                        backgroundImage:
                          theme === 'dark'
                            ? `url('../assets/img/no-item black theme.png')`
                            : `url('../assets/img/no-item.png')`,
                        backgroundSize: 'cover',
                      }}
                      className="personal__empty"
                    >
                      Пусто
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="fullitem">
          <div className="fullitem__card-wrapper">
            <div className="fullitem__card-breadcrumb container"></div>
            <div className="fullitem__card container">
              <div className="fullitem__card_info-wrapper">
                <div className="fullitem__card_info-name">{item.name}</div>
                <div className="fullitem__card-sliders">
                  {renderStatus ? (
                    <FullItemSlider
                      image={item.image_link}
                      id={id}
                    ></FullItemSlider>
                  ) : null}
                </div>
                <div className="fullitem__card_info-params">
                  {item.category === 'Клавиатуры' ? (
                    <>
                      <div className="fullitem__card_info-params_block">
                        {renderStatus &&
                        JSON.parse(item.parameters_dop).length !== 0 ? (
                          <p>Переключатели</p>
                        ) : null}
                        <div className="fullitem__card_info-params_block-wrapper">
                          {renderStatus &&
                            JSON.parse(item.parameters_dop).map((item) =>
                              item?.switches?.map((svitch) => (
                                <button
                                  key={Object.keys(svitch)[0]}
                                  onClick={(e) =>
                                    setSwitchPrice(Number(e.target.value))
                                  }
                                  value={Object.values(svitch)[0]}
                                  className={
                                    switchPrice ===
                                    Number(Object.values(svitch)[0])
                                      ? 'fullitem__card_info-params_block_button active'
                                      : 'fullitem__card_info-params_block_button'
                                  }
                                >
                                  {Object.keys(svitch)[0]}
                                </button>
                              ))
                            )}
                        </div>
                      </div>
                      {/* <div className="fullitem__card_info-params_block">
                        <p>Раскладка</p>
                        <div className="fullitem__card_info-params_block-wrapper">
                          <button className="fullitem__card_info-params_block_text">
                            Русская
                          </button>
                          <button className="fullitem__card_info-params_block_text">
                            Английская
                          </button>
                        </div>
                      </div> */}
                    </>
                  ) : (
                    <div className="fullitem__card_info-params_block">
                      <p>Цвет</p>
                      <div className="fullitem__card_info-params_block-wrapper">
                        {renderStatus &&
                          JSON.parse(item.colors).map((colour) => (
                            <Link
                              to={`/item/${colour.id}`}
                              onClick={(e) => setColor(e.target.innerHTML)}
                              className={
                                renderStatus
                                  ? Number(id) === colour.id
                                    ? 'fullitem__card_info-params_block_text active'
                                    : 'fullitem__card_info-params_block_text'
                                  : ''
                              }
                              key={colour.id}
                              value={colour.color}
                            >
                              {colour.color}
                            </Link>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="fullitem__card_info-bottom">
                  <span>{item.price} руб</span>
                  {addedCount > 0 ? (
                    <div className="fullitem__card_info-bottom_buttons">
                      <Link
                        className="fullitem__card_info-bottom_buttons_cart"
                        to="/cart"
                      >
                        Перейти<br></br> в корзину
                      </Link>

                      <div
                        className={'fullitem__card_info-bottom_buttons_button'}
                      >
                        <div
                          onClick={
                            addedCount > 1 ? onClickMinus : onClickRemove
                          }
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
                      className="fullitem__card_info-bottom_btn"
                      to="/cart"
                      onClick={onClickAdd}
                    >
                      В корзину
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="fullitem__description container">
            <div className="fullitem__description_left">
              <div className="fullitem__description_left-block">
                <p>Описание</p>
                <div className="fullitem__description_left_description">
                  {item.description_full}
                </div>
              </div>
              <div className="fullitem__description_left-block">
                <p>Особенности</p>
                {renderStatus &&
                  JSON.parse(item.feature).map((feature) => (
                    <div className="fullitem__description_left_spec">
                      <div className="fullitem__description_left_spec_title">
                        {feature.title}
                      </div>
                      <div className="fullitem__description_left_spec_text">
                        {feature.desc}
                      </div>
                    </div>
                  ))}
              </div>
              <div className="fullitem__description_right">
                <p>Характеристика</p>
                <div className="fullitem__description_right_har">
                  <div className="fullitem__description_right_har_item">
                    <div className="fullitem__description_right_har_item_left">
                      Материал клавиш
                    </div>
                    <div className="fullitem__description_right_har_item_right">
                      Doubleshot
                    </div>
                  </div>
                  <div className="fullitem__description_right_har_item">
                    <div className="fullitem__description_right_har_item_left">
                      Материал клавиш
                    </div>
                    <div className="fullitem__description_right_har_item_right">
                      Doubleshot
                    </div>
                  </div>
                  <div className="fullitem__description_right_har_item">
                    <div className="fullitem__description_right_har_item_left">
                      Материал клавиш
                    </div>
                    <div className="fullitem__description_right_har_item_right">
                      Doubleshot
                    </div>
                  </div>
                  <div className="fullitem__description_right_har_item">
                    <div className="fullitem__description_right_har_item_left">
                      Материал клавиш
                    </div>
                    <div className="fullitem__description_right_har_item_right">
                      Doubleshot
                    </div>
                  </div>
                  <div className="fullitem__description_right_har_item">
                    <div className="fullitem__description_right_har_item_left">
                      Материал клавиш
                    </div>
                    <div className="fullitem__description_right_har_item_right">
                      Doubleshot
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="fullitem__comments container">
            <p className="fullitem__comments_title">Отзывы</p>
            <div className="fullitem__comments_items">
              {arrStatus === 'success' && comments.items.length > 0 ? (
                comments.items.map((comment) => (
                  <Comment
                    first_name={comment.first_name}
                    last_name={comment.last_name}
                    anon={comment.anon}
                    author_id={comment.author_id}
                    date={comment.date_timestamp}
                    rating={comment.rating}
                    text={comment.text}
                  ></Comment>
                ))
              ) : (
                <div className="personal__empty_wrapper">
                  <div className="container personal__empty_container">
                    <div
                      style={{
                        backgroundImage:
                          theme === 'dark'
                            ? `url('../assets/img/no-item black theme.png')`
                            : `url('../assets/img/no-item.png')`,
                        backgroundSize: 'cover',
                      }}
                      className="personal__empty"
                    >
                      Пусто
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default FullItem
