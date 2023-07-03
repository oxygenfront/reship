import React, { createContext } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import styles from './OrdersItem.module.sass'
import { Dialog } from '@headlessui/react'
import StarsList from '../StarRating/StarList'
import { fetchCreateReview } from '../../redux/slices/commentSlice'
import { useDispatch } from 'react-redux'
export const BodyReviewContext = createContext()

const OrdersItem = ({
  id,
  uuid,
  sdek_order,
  image,
  name,
  color,
  count,
  price,
  defaultState,
  emptyColor,
  fillColor,
  height,
  labelText,
  maxValue,
  readOnly,
  width,
}) => {
  
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')

  const [rating, setRating] = useState(defaultState)
  const [hover, setHover] = useState(null)
  const [anon, setAnon] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [review, setReview] = useState({
    token,
    rating: defaultState,
    text: '',
    product_id: Number(id),
  })
  console.log(sdek_order)

  const setRatingFn = (value) => {
    if (readOnly) return

    setRating(value)
    setReview({
      ...review,
      rating: value,
    })
  }

  const setHoverFn = (value) => {
    if (readOnly) return

    setHover(value)
  }
  function updateReview(e) {
    setReview({
      ...review,
      [e.target.name]: e.target.value,
    })
  }
  async function sendForm(e) {
    e.preventDefault()

    console.log(review)
    const data = await dispatch(
      fetchCreateReview({
        ...review,
        rating: rating,
        anon: anon ? 1 : 0,
      })
    )
    if (!data.payload) {
      alert('Не удалось оставить отзыв')
    } else {
      alert('Отзыв о товаре оставлен')
      setModalOpen(false)
    }
  }

  return (
    <BodyReviewContext.Provider
      value={{
        emptyColor,
        fillColor,
        height,
        hover,
        labelText,
        rating,
        setHover: setHoverFn,
        setRating: setRatingFn,
        width,
        maxValue,
      }}
    >
      <div className='orders__item'>
        <div className='orders__item_card'>
          <div className='orders__item_left-block_wrapper'>
            <div className='orders__item_img-block'>
              {/* <img src={JSON.parse(image)[0]} alt="" /> */}
            </div>
            <div className='orders__item_left-block'>
              <p className='orders__item_left-block_name'>{name}</p>
              <p className='orders__item_left-block_color'>{color}</p>
              <p className='orders__item_left-block_date'>Сен 26, 2023</p>
            </div>
          </div>
          <div className='orders__item_right-block'>
            <div className='orders__item_right-block_status'>
              <span>Получено</span>
            </div>
            <p className='orders__item_right-block_price'>{price}руб</p>
            <p className='orders__item_right-block_count'>{count}шт</p>

            <div className='orders__item_right-block_buttons'>
              <Dialog
                as='div'
                className={styles.modal}
                open={modalOpen}
                onClose={() => setModalOpen(false)}
              >
                <div className={styles.modal_bg} aria-hidden='true'></div>
                <div className={styles.modal_scroll}>
                  <div className={styles.modal_container}>
                    <Dialog.Panel>
                      <div className={styles.modal_title}>Оставить отзыв</div>
                      <div className={styles.item_wrapper}>
                        <div className={styles.item_titles}>
                          <p>Товар</p>
                          <Link to={`/item/${id}`}>Перейти к товару</Link>
                        </div>
                        <div className={styles.item}>
                          <div className={styles.item_left}>
                            <div className={styles.item_img}>
                              {/* <img src={image[0]} alt="product" /> */}
                            </div>
                            <div className={styles.item_title}>
                              <p>{name}</p>
                              <span>{color}</span>
                            </div>
                          </div>
                          <div className={styles.item_right}>
                            <span>{price} руб</span>
                          </div>
                        </div>
                        <div className={styles.item_title}>
                          <p>Оцените товар</p>
                        </div>
                        <StarsList />
                        <textarea
                          onChange={updateReview}
                          value={review.text}
                          type='text'
                          name='text'
                          id=''
                          className={styles.item_inp}
                          placeholder='Комментарий к отзыву...'
                        />
                        <label htmlFor='anon' className={styles.item_checkbox}>
                          Анонимный отзыв
                          <input
                            checked={anon}
                            onChange={() => setAnon(!anon)}
                            type='checkbox'
                            name=''
                            id='anon'
                          />
                        </label>
                        <div className={styles.btns}>
                          <button
                            onClick={() => setModalOpen(false)}
                            className={styles.btns_cancel}
                          >
                            Отменить
                          </button>
                          <button
                            onClick={sendForm}
                            className={styles.btns_submit}
                          >
                            Подтвердить
                          </button>
                        </div>
                      </div>
                    </Dialog.Panel>
                  </div>
                </div>
              </Dialog>
              <button
                onClick={() => setModalOpen(true)}
                className='orders__item_right-block_buttons_review'
              >
                <span>Оставить отзыв</span>
              </button>
              <button
                className={
                  !isOpen
                    ? 'orders__item_right-block_buttons_add'
                    : 'orders__item_right-block_buttons_add active'
                }
                onClick={() => setIsOpen(!isOpen)}
              >
                <div className='orders__item_right-block_buttons_add_plush'></div>
                <div className='orders__item_right-block_buttons_add_plusv'></div>
              </button>
            </div>
          </div>
        </div>
        <div
          className={
            isOpen ? 'orders__item_about active' : 'orders__item_about'
          }
        >
          <div className='orders__item_about-block_wrapper'>
            <div className='orders__item_about-block'>
              <div className='orders__item_about-block_title'>
                Адрес получателя
              </div>
              <div className='orders__item_about-block_suptitle'>
                {sdek_order.to_location.city}, {sdek_order.to_location.address}
              </div>
            </div>
            <div className='orders__item_about-block'>
              <div className='orders__item_about-block_title'>Получатель</div>
              <div className='orders__item_about-block_suptitle'>
                {sdek_order.recipient.name}
              </div>
            </div>
            <div className='orders__item_about-block'>
              <div className='orders__item_about-block_title'>Вес посылки</div>
              <div className='orders__item_about-block_suptitle'>
                {sdek_order.packages[0].weight} г
              </div>
            </div>
            <div className='orders__item_about-block'>
              <div className='orders__item_about-block_title'>Трек номер</div>
              <div className='orders__item_about-block_suptitle'>
                RH155087446CN
              </div>
            </div>
            <div className='orders__item_about-block'>
              <div className='orders__item_about-block_title'>
                Характеристика товара
              </div>
              <Link
                to={`/item/${id}`}
                className='orders__item_about-block_suptitle'
              >
                Перейти к товару <span></span>
              </Link>
            </div>
          </div>
          <div className='orders__item_about-block_wrapper'>
            <div className='orders__item_about-block'>
              <div className='orders__item_about-block_title'>
                Этапы отправки
              </div>

              <div className='orders__item_about-block_timline'>
                <ul className='orders__item_about-block_timline_line'>
                  {sdek_order.statuses.map((_, index) => (
                    <>
                      <li></li>
                      <li></li>
                    </>
                  ))}
                </ul>
                <div className='orders__item_about-block_timline_text'>
                  {sdek_order.statuses.map((status) => (
                    <div
                      key={status.code}
                      className='orders__item_about-block_timline_text-block'
                    >
                      <div className='orders__item_about-block_timline_text-block_up-block'>
                        <div className='orders__item_about-block_timline_text-block_up-block_title'>
                          {status.code}
                        </div>
                        <div className='orders__item_about-block_timline_text-block_up-block_date'>
                          {status.date_time.slice(0, 10)}
                        </div>
                      </div>
                      <div className='orders__item_about-block_timline_text-block_description'>
                        {status.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BodyReviewContext.Provider>
  );
}
OrdersItem.propTypes = {
  defaultState: PropTypes.number,
  emptyColor: PropTypes.string,
  fillColor: PropTypes.string,
  height: PropTypes.number,
  labelText: PropTypes.func,
  maxValue: PropTypes.number,
  onChangeHover: PropTypes.func,
  onChangeValue: PropTypes.func,
  readOnly: PropTypes.bool,
  width: PropTypes.number,
}

OrdersItem.defaultProps = {
  defaultState: 0,
  emptyColor: 'white',
  fillColor: '#0540F2',
  height: 34,
  width: 35,
  maxValue: 5,
  readOnly: false,
}
export default OrdersItem
