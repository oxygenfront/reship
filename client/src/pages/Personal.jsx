import React from 'react'
import Menu from '../components/Menu/Menu'
import PersonItem from '../components/PersonItem/PersonItem'

const Personal = () => {
  return (
    <>
      <Menu></Menu>
      <section className="person">
        <div className="container person__container">
          <div className="person__card">
            <img
              src="./assets/img/photo_2022-03-30_21-45-34.jpg"
              alt=""
              className="person__img"
            />
            <div className="person__info">
              <button className="person__info-item">
                Беляев Семен
                <img src="./assets/img/pen-edit.png" alt="" />
              </button>
              <div className="person__info-item">belyaev@gmail.com</div>
              <button className="person__info-item">
                Укажите адресс доставки
              </button>
              <button className="person__info-item" id="settings-conf">
                Настройки конфиденциальности
                <img src="./assets/img/gear.svg" alt="" />
              </button>
            </div>
          </div>

          <div className="person__secret">
            <div className="person__secret-wrapper">
              <button className="person__secret-change-btn" id="change-pass">
                Изменить пароль
              </button>
              <button className="person__secret-change-btn" id="change-mail">
                Изменить E-mail
              </button>
              <button className="person__secret-close" id="close-secret">
                <div className="person__secret-close__cross">
                  <div className="person__secret-close__cross_item"></div>
                  <div className="person__secret-close__cross_item"></div>
                </div>
              </button>
            </div>
          </div>
          <div className="person__secret-change-block person__secret-change-block-pass">
            <div className="person__secret-change-block-wrapper">
              <input
                className="person__secret-change-inp-pass"
                type="text"
                placeholder="Введите старый пароль"
              />
              <input
                className="person__secret-change-inp-pass"
                type="text"
                placeholder="Введите новый пароль"
              />
              <button
                className="person__secret-change-confirm"
                id="person-confirm-pass"
              >
                Сохранить изменения
              </button>
              <button className="person__secret-close" id="person-close-pass">
                <div className="person__secret-close__cross">
                  <div className="person__secret-close__cross_item"></div>
                  <div className="person__secret-close__cross_item"></div>
                </div>
              </button>
            </div>
          </div>

          <div className="person__secret-change-block person__secret-change-block-mail">
            <div className="person__secret-change-block-wrapper">
              <input
                className="person__secret-change-inp-pass"
                type="text"
                placeholder="Введите новый E-mail"
              />
              <input
                className="person__secret-change-inp-pass"
                type="text"
                placeholder="Введите пароль"
              />
              <button
                className="person__secret-change-confirm"
                id="person-confirm-mail"
              >
                Сохранить изменения
              </button>
              <button className="person__secret-close" id="person-close-mail">
                <div className="person__secret-close__cross">
                  <div className="person__secret-close__cross_item"></div>
                  <div className="person__secret-close__cross_item"></div>
                </div>
              </button>
            </div>
          </div>
          <div className="person__opacity">
            <div className="person__buttons buttons__10" id="person-btn">
              <button
                className="person__buttons-item buttons__10-item active"
                id="lk-history"
              >
                <span>История заказов</span>
              </button>
              <button
                className="person__buttons-item buttons__10-item"
                id="lk-wait"
              >
                <span>Ожидают доставки</span>
              </button>
              <button
                className="person__buttons-item buttons__10-item"
                id="lk-favorites"
              >
                <span>Избранные товары</span>
              </button>
              <button
                className="person__buttons-item buttons__10-item"
                id="lk-reviews"
              >
                <span>Оставить отзыв</span>
              </button>
            </div>

            <div className="person__delivery-history_wrapper active">
              <div className="person__delivery-history_wrapper-title">
                Дата покупки: 28 января 2022 года
              </div>
              <PersonItem></PersonItem>
              <div className="person__delivery-history_wrapper-title">
                Дата покупки: 25 января 2022 года
              </div>
              <PersonItem></PersonItem>
              <PersonItem></PersonItem>
              <PersonItem></PersonItem>
            </div>

            <div className="person__delivery-info_wrapper">
              <div className="person__delivery-info_block">
                <div className="person__delivery-info">
                  <div className="person__delivery-info_main">
                    Ближайшая доставка ожидается <span>...</span>
                  </div>
                  <hr className="hr" />
                  <div className="person__delivery-info_main">
                    Количество товаров к получению: <span>3 шт</span>
                  </div>
                  <hr className="hr" />
                  <div className="person__delivery-info_text">
                    При себе обязательно иметь документ удостоверяющий личность
                  </div>
                </div>
              </div>

              <div className="person__delivery-links">
                <a className="person__delivery-links_track" href="">
                  <span>Отследить заказ</span>
                </a>
                <a className="person__delivery-links_deliv" href="">
                  <span>Задать вопрос по доставке</span>
                </a>
              </div>

              <div className="person__delivery-items">
                <div className="person__delivery-items_item">
                  <img
                    className="person__delivery-items_item-img"
                    src="https://placehold.co/136x136"
                    alt=""
                  />
                  <div className="person__delivery-items_item-name">
                    <span>
                      <span>IPhone 11</span> <br />
                      black <span>(128 gb)</span>
                    </span>
                  </div>
                  <div className="person__delivery-items_item-number">
                    <span>1</span>
                  </div>
                  <div className="person__delivery-history_wrapper-item_price">
                    43,000 rub
                  </div>
                  <div className="person__delivery-history_wrapper-item_buttons">
                    <div className="person__delivery-history_wrapper-item_status">
                      <span>Отследить</span>
                    </div>
                    <div className="person__delivery-history_wrapper-item_status">
                      <span>Копировать трек</span>
                    </div>
                  </div>
                </div>
                <div className="person__delivery-items_item">
                  <img
                    className="person__delivery-items_item-img"
                    src="https://placehold.co/136x136"
                    alt=""
                  />
                  <div className="person__delivery-items_item-name">
                    <span>
                      <span>IPhone 11</span> <br />
                      black <span>(128 gb)</span>
                    </span>
                  </div>
                  <div className="person__delivery-items_item-number">
                    <span>1</span>
                  </div>
                  <div className="person__delivery-history_wrapper-item_price">
                    43,000 rub
                  </div>
                  <div className="person__delivery-history_wrapper-item_buttons">
                    <div className="person__delivery-history_wrapper-item_status">
                      <span>Отследить</span>
                    </div>
                    <div className="person__delivery-history_wrapper-item_status">
                      <span>Копировать трек</span>
                    </div>
                  </div>
                </div>
                <div className="person__delivery-items_item">
                  <img
                    className="person__delivery-items_item-img"
                    src="https://placehold.co/136x136"
                    alt=""
                  />
                  <div className="person__delivery-items_item-name">
                    <span>
                      <span>IPhone 11</span> <br />
                      black <span>(128 gb)</span>
                    </span>
                  </div>
                  <div className="person__delivery-items_item-number">
                    <span>1</span>
                  </div>
                  <div className="person__delivery-history_wrapper-item_price">
                    43,000 rub
                  </div>
                  <div className="person__delivery-history_wrapper-item_buttons">
                    <div className="person__delivery-history_wrapper-item_status">
                      <span>Отследить</span>
                    </div>
                    <div className="person__delivery-history_wrapper-item_status">
                      <span>Копировать трек</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="person__favorites-wrapper">
              <div className="person__favorites-wrapper-items">
                <div className="person__favorites-wrapper-items-item">
                  <img
                    className="person__favorites-wrapper-items-item_img"
                    src="https://placehold.co/300"
                  />
                  <div className="person__favorites-wrapper-items-item_name">
                    Iphone 11 pro (128)
                  </div>
                  <div className="person__favorites-wrapper-items-item_price">
                    <span>Всего за 44,999 rub</span>
                  </div>
                  <button className="person__favorites-wrapper-items-item_add-cart">
                    Добавить в корзину
                  </button>
                </div>
                <div className="person__favorites-wrapper-items-item">
                  <img
                    className="person__favorites-wrapper-items-item_img"
                    src="https://placehold.co/300"
                  />
                  <div className="person__favorites-wrapper-items-item_name">
                    Iphone 11 pro (128)
                  </div>
                  <div className="person__favorites-wrapper-items-item_price">
                    <span>Всего за 44,999 rub</span>
                  </div>
                  <button className="person__favorites-wrapper-items-item_add-cart">
                    Добавить в корзину
                  </button>
                </div>
                <div className="person__favorites-wrapper-items-item">
                  <img
                    className="person__favorites-wrapper-items-item_img"
                    src="https://placehold.co/300"
                  />
                  <div className="person__favorites-wrapper-items-item_name">
                    Iphone 11 pro (128)
                  </div>
                  <div className="person__favorites-wrapper-items-item_price">
                    <span>Всего за 44,999 rub</span>
                  </div>
                  <button className="person__favorites-wrapper-items-item_add-cart">
                    Добавить в корзину
                  </button>
                </div>
              </div>
            </div>

            <div
              className="person__history-wrapper"
              style={{ display: 'none' }}
            >
              <div className="person__reviews_text-block">
                <p>
                  Вы еще не совершали покупок - вернитесь сюда позднее, а пока
                  можете <a href="/catalog.html">перейти в каталог</a>, <br />{' '}
                  для выбора товара
                </p>
              </div>
            </div>

            <div className="person__wait-wrapper" style={{ display: 'none' }}>
              <div className="person__reviews_text-block">
                <p>
                  Вы еще не добавляли товары в “Избранное” - вернитесь сюда
                  позднее, а пока можете <br />
                  <a href="/catalog.html">перейти в каталог</a>, для выбора
                  товара
                </p>
              </div>
            </div>

            <div
              className="person__favorites-wrapper_none"
              style={{ display: 'none' }}
            >
              <div className="person__reviews_text-block">
                <p>
                  Вы еще не добавляли товары в “Избранное” - вернитесь сюда
                  позднее, а пока можете <br />
                  <a href="/catalog.html">перейти в каталог</a>, для выбора
                  товара
                </p>
              </div>
            </div>
            <div className="person__reviews">
              <div className="person__reviews_text-block">
                <p>
                  <span>Мы любим своих клиентов</span> и хотим, чтобы вы
                  делились своими реальными <br /> отзывами о “ReShip” и нас
                  становилось все больше
                </p>
              </div>

              <div className="person__reviews-buttons buttons__10 ">
                <a
                  href="#"
                  className="person__reviews-buttons-item buttons__10-item"
                >
                  <span>Оставить отзыв в ВКонтакте</span>
                </a>
                <a
                  href="#"
                  className="person__reviews-buttons-item buttons__10-item"
                >
                  <span>Оставить отзыв в Discord</span>
                </a>
                <a
                  href="#"
                  className="person__reviews-buttons-item buttons__10-item"
                >
                  <span>ВКонтакте отзывы</span>
                </a>
                <a
                  href="#"
                  className="person__reviews-buttons-item buttons__10-item"
                >
                  <span>Discord отзывы</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Personal
