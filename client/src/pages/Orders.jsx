import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Timeline } from 'rsuite'

function Orders() {
  const [info, setInfo] = useState('')
  useEffect(() => {}, [])
  return (
    <div className="orders">
      <div className="orders__container container">
        <div className="orders__title">
          Мои <span>заказы</span>
        </div>
        <div className="orders__item">
          <div className="orders__item_card">
            <div className="orders__item_left-block_wrapper">
              <div className="orders__item_img-block">
                <img src="../assets/img/nigger.jpg" alt="" />
              </div>
              <div className="orders__item_left-block">
                <p className="orders__item_left-block_name">
                  Афроамериканец Уфува
                </p>
                <p className="orders__item_left-block_color">Черный</p>
                <p className="orders__item_left-block_date">Сен 26, 2023</p>
              </div>
            </div>
            <div className="orders__item_right-block">
              <div className="orders__item_right-block_status">
                <span>Получено</span>
              </div>
              <p className="orders__item_right-block_price">6 800 руб</p>
              <p className="orders__item_right-block_count">1шт</p>

              <div className="orders__item_right-block_buttons">
                <button className="orders__item_right-block_buttons_review">
                  <span>Оставить отзыв</span>
                </button>
                <button className="orders__item_right-block_buttons_add">
                  <div className="orders__item_right-block_buttons_add_plush"></div>
                  <div className="orders__item_right-block_buttons_add_plusv"></div>
                </button>
              </div>
            </div>
          </div>
          <div className="orders__item_about">
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
                <div className="orders__item_about-block_suptitle">
                  Давид Филов
                </div>
              </div>
              <div className="orders__item_about-block">
                <div className="orders__item_about-block_title">
                  Вес посылки
                </div>
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
                <div className="orders__item_about-block_title">
                  Этапы отправки
                </div>

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
                <Link to="/item">
                  Перейти к товару <span></span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="orders__item">
          <div className="orders__item_card">
            <div className="orders__item_left-block_wrapper">
              <div className="orders__item_img-block">
                <img src="../assets/img/nigger.jpg" alt="" />
              </div>
              <div className="orders__item_left-block">
                <p className="orders__item_left-block_name">
                  Афроамериканец Уфува
                </p>
                <p className="orders__item_left-block_color">Черный</p>
                <p className="orders__item_left-block_date">Сен 26, 2023</p>
              </div>
            </div>
            <div className="orders__item_right-block">
              <div className="orders__item_right-block_status">
                <span>Получено</span>
              </div>
              <p className="orders__item_right-block_price">6 800 руб</p>
              <p className="orders__item_right-block_count">1шт</p>

              <div className="orders__item_right-block_buttons">
                <button className="orders__item_right-block_buttons_review">
                  <span>Оставить отзыв</span>
                </button>
                <button className="orders__item_right-block_buttons_add">
                  <div className="orders__item_right-block_buttons_add_plush"></div>
                  <div className="orders__item_right-block_buttons_add_plusv"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Orders
