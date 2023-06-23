import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import styles from './OrdersItem.module.sass'
import { Dialog } from '@headlessui/react'
import StarsList from '../StarRating/StarList'
import { fetchCreateReview } from '../../redux/slices/commentSlice'
import { useDispatch } from 'react-redux'

const OrdersItem = ({ id, image, name, color, count, price }) => {
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false)
  const token = localStorage.getItem('token')
  const [modalOpen, setModalOpen] = useState(false)
  const [review, setReview] = useState({
    token,
    rating: 5,
    text: '',
    order_product: JSON.stringify({
      name,
      color: 'white',
      price,
      parameters: JSON.stringify([]),
      product_id: id.toString(),
      parameters_dop: JSON.stringify({}),
    }),
  })

  function updateReview(e) {
    setReview({
      ...review,
      [e.target.name]: e.target.value,
    })
  }
  async function sendForm(e) {
    e.preventDefault()

    console.log(review)
    const data = await dispatch(fetchCreateReview(review))
    if (!data.payload) {
      alert('Не удалось оставить отзыв')
    } else {
      alert('Отзыв о товаре оставлен')
    }
  }

  return (
    <div className="orders__item">
      <div className="orders__item_card">
        <div className="orders__item_left-block_wrapper">
          <div className="orders__item_img-block">
            <img src={image[0]} alt="" />
          </div>
          <div className="orders__item_left-block">
            <p className="orders__item_left-block_name">{name}</p>
            <p className="orders__item_left-block_color">{color}</p>
            <p className="orders__item_left-block_date">Сен 26, 2023</p>
          </div>
        </div>
        <div className="orders__item_right-block">
          <div className="orders__item_right-block_status">
            <span>Получено</span>
          </div>
          <p className="orders__item_right-block_price">{price}руб</p>
          <p className="orders__item_right-block_count">{count}шт</p>

          <div className="orders__item_right-block_buttons">
            <Dialog
              as="div"
              className={styles.modal}
              open={modalOpen}
              onClose={() => setModalOpen(false)}
            >
              <div className={styles.modal_bg} aria-hidden="true"></div>
              <div className={styles.modal_scroll}>
                <div className={styles.modal_container}>
                  <Dialog.Panel>
                    <div className={styles.modal_title}>Оставить отзыв</div>
                    <div className={styles.item_wrapper}>
                      <div className={styles.item_titles}>
                        <p>Товар</p>
                        <Link>Перейти к товару</Link>
                      </div>
                      <div className={styles.item}>
                        <div className={styles.item_left}>
                          <div className={styles.item_img}>
                            <img src={image[0]} alt="product" />
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
                        type="text"
                        name="text"
                        id=""
                        className={styles.item_inp}
                        placeholder="Комментарий к отзыву..."
                      />
                      <label htmlFor="anon" className={styles.item_checkbox}>
                        Анонимный отзыв
                        <input type="checkbox" name="" id="anon" />
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
              className="orders__item_right-block_buttons_review"
            >
              <span>Оставить отзыв</span>
            </button>
            <button
              className="orders__item_right-block_buttons_add"
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="orders__item_right-block_buttons_add_plush"></div>
              <div className="orders__item_right-block_buttons_add_plusv"></div>
            </button>
          </div>
        </div>
      </div>
      <div
        className={isOpen ? 'orders__item_about active' : 'orders__item_about'}
      >
        <div className="orders__item_about-block_wrapper">
          <div className="orders__item_about-block">
            <div className="orders__item_about-block_title">
              Адрес получателя
            </div>
            <div className="orders__item_about-block_suptitle">
              Петергофское ш., 51, Санкт-Петербург (этаж 3)
            </div>
          </div>
          <div className="orders__item_about-block">
            <div className="orders__item_about-block_title">Получатель</div>
            <div className="orders__item_about-block_suptitle">Давид Филов</div>
          </div>
          <div className="orders__item_about-block">
            <div className="orders__item_about-block_title">Вес посылки</div>
            <div className="orders__item_about-block_suptitle">220г</div>
          </div>
          <div className="orders__item_about-block">
            <div className="orders__item_about-block_title">Трек номер</div>
            <div className="orders__item_about-block_suptitle">
              RH155087446CN
            </div>
          </div>
        </div>
        <div className="orders__item_about-block_wrapper">
          <div className="orders__item_about-block">
            <div className="orders__item_about-block_title">Этапы отправки</div>

            <div className="orders__item_about-block_timline">
              <ul className="orders__item_about-block_timline_line">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
              <div className="orders__item_about-block_timline_text">
                <div className="orders__item_about-block_timline_text-block">
                  <div className="orders__item_about-block_timline_text-block_up-block">
                    <div className="orders__item_about-block_timline_text-block_up-block_title">
                      Оплата
                    </div>
                    <div className="orders__item_about-block_timline_text-block_up-block_date">
                      13.05.22
                    </div>
                  </div>
                  <div className="orders__item_about-block_timline_text-block_description">
                    Ваш заказ успешно прошел оплату!
                  </div>
                </div>
                <div className="orders__item_about-block_timline_text-block">
                  <div className="orders__item_about-block_timline_text-block_up-block">
                    <div className="orders__item_about-block_timline_text-block_up-block_title">
                      Сборка
                    </div>
                    <div className="orders__item_about-block_timline_text-block_up-block_date">
                      13.05.22
                    </div>
                  </div>
                  <div className="orders__item_about-block_timline_text-block_description">
                    Мы начали собирать ваш заказ!
                  </div>
                </div>
                <div className="orders__item_about-block_timline_text-block">
                  <div className="orders__item_about-block_timline_text-block_up-block">
                    <div className="orders__item_about-block_timline_text-block_up-block_title">
                      Доставка
                    </div>
                    <div className="orders__item_about-block_timline_text-block_up-block_date">
                      13.05.22
                    </div>
                  </div>
                  <div className="orders__item_about-block_timline_text-block_description">
                    Ваш заказ отправлен! Чтобы узнать подробное расположение
                    посылки используйте трек-номер
                  </div>
                </div>
                <div className="orders__item_about-block_timline_text-block">
                  <div className="orders__item_about-block_timline_text-block_up-block">
                    <div className="orders__item_about-block_timline_text-block_up-block_title">
                      Прибытие
                    </div>
                    <div className="orders__item_about-block_timline_text-block_up-block_date">
                      13.05.22
                    </div>
                  </div>
                  <div className="orders__item_about-block_timline_text-block_description">
                    Заказ прибыл на место получение
                  </div>
                </div>
                <div className="orders__item_about-block_timline_text-block">
                  <div className="orders__item_about-block_timline_text-block_up-block">
                    <div className="orders__item_about-block_timline_text-block_up-block_title">
                      Получен
                    </div>
                    <div className="orders__item_about-block_timline_text-block_up-block_date">
                      13.05.22
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="orders__item_about-block">
            <div className="orders__item_about-block_title">
              Характеристика товара
            </div>
            <Link to={`/item/${id}`}>
              Перейти к товару <span></span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrdersItem
