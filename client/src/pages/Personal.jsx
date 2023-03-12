import React, { useEffect, useState } from 'react';
import { Menu, PersonItem } from '../components';

const Personal = () => {

  
  const [personPages, setPersonPages] = useState({
    delHistory: false,
    delInfo: false,
    favorites: false,
    reviews: false,
  });

  const [changeName, setChangeName] = useState(true);
  const [personName, setPersonName] = useState({
    firstName: 'Имя',
    lastName: 'Фамилия',
  });

  const updateName = (e) => {
    setPersonName({
      ...personName,
      [e.target.name]: e.target.value,
    });
  };

  const [changeMail, setChangeMail] = useState(true);
  const [personMail, setPersonMail] = useState({
    mail: 'markyurkulskiy@gmail.com',
  });

  const updateMail = (e) => {
    setPersonMail({
      ...personMail,
      [e.target.name]: e.target.value,
    });
  };

  const [changeSecret, setChangeSecret] = useState(false);
  const [changeState, setChangeState] = useState({
    changePassword: false,
    changeEmail: false,
  });

  const [password, setPassword] = useState({
    lastPassword: '',
    newPassword: '',
  });

  const updatePassword = (e) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };

  const [email, setEmail] = useState({
    email: '',
    password: '',
  });

  const updateEmail = (e) => {
    setEmail({
      ...email,
      [e.target.name]: e.target.value,
    });
  };

  const onCloseAll = () => {
    setChangeState({ changeEmail: false, changePassword: false });
    setChangeSecret(false);
  };

  useEffect(() => {
    setPersonPages({ delHistory: true });
  }, []);

  return (
    <>
      <Menu></Menu>
      <section className='person'>
        <div className='container person__container'>
          <div className='person__card'>
            <img
              src='./assets/img/photo_2022-03-30_21-45-34.jpg'
              alt=''
              className='person__img'
            />
            <div className='person__info'>
              {changeName ? (
                <button
                  className='person__info-item'
                  onClick={() => setChangeName(!changeName)}
                >
                  {personName.lastName} {personName.firstName}
                  <img src='./assets/img/pen-edit.png' alt='' />
                </button>
              ) : (
                <div className='person__info-input-button'>
                  <input
                    className='person__info-input'
                    value={personName.lastName}
                    onChange={updateName}
                    placeholder='Введите фамилию'
                    name='lastName'
                  />
                  <input
                    className='person__info-input'
                    value={personName.firstName}
                    onChange={updateName}
                    placeholder='Введите имя'
                    name='firstName'
                  />
                  <button
                    className='person__info-input_button'
                    onClick={() => setChangeName(!changeName)}
                  >
                    Сохранить
                  </button>
                </div>
              )}

              {changeMail ? (
                <button
                  className='person__info-item'
                  onClick={() => setChangeMail(!changeMail)}
                >
                  {personMail.mail}
                  <img src='./assets/img/pen-edit.png' alt='' />
                </button>
              ) : (
                <div className='person__info-input-button'>
                  <input
                    className='person__info-input mail'
                    value={personMail.mail}
                    onChange={updateMail}
                    placeholder='Введите свой email'
                    name='mail'
                  />
                  <button
                    className='person__info-input_button'
                    onClick={() => setChangeMail(!changeMail)}
                  >
                    Сохранить
                  </button>
                </div>
              )}

              <button className='person__info-item'>
                Укажите адресс доставки
              </button>

              <button
                className='person__info-item'
                id='settings-conf'
                onClick={() => setChangeSecret(!changeSecret)}
              >
                Настройки конфиденциальности
                <img src='./assets/img/gear.svg' alt='' />
              </button>
            </div>
          </div>

          {changeSecret ? (
            <div className='person__secret'>
              <div className='person__secret-wrapper'>
                <button
                  className='person__secret-change-btn'
                  id='change-pass'
                  onClick={() =>
                    setChangeState({
                      changePassword: !changeState.changePassword,
                    })
                  }
                >
                  Изменить пароль
                </button>
                <button
                  className='person__secret-change-btn'
                  id='change-mail'
                  onClick={() =>
                    setChangeState({
                      changeEmail: !changeState.changeEmail,
                    })
                  }
                >
                  Изменить E-mail
                </button>
                <button
                  className='person__secret-close'
                  id='close-secret'
                  onClick={onCloseAll}
                >
                  <div className='person__secret-close__cross'>
                    <div className='person__secret-close__cross_item'></div>
                    <div className='person__secret-close__cross_item'></div>
                  </div>
                </button>
              </div>
            </div>
          ) : null}

          {changeState.changePassword ? (
            <div className='person__secret-change-block person__secret-change-block-pass'>
              <div className='person__secret-change-block-wrapper'>
                <input
                  className='person__secret-change-inp-pass'
                  onChange={updatePassword}
                  value={password.lastPassword}
                  name='lastPassword'
                  placeholder='Введите старый пароль'
                />
                <input
                  className='person__secret-change-inp-pass'
                  name='newPassword'
                  onChange={updatePassword}
                  value={password.newPassword}
                  placeholder='Введите новый пароль'
                />
                <button
                  className='person__secret-change-confirm'
                  id='person-confirm-pass'
                  onClick={() =>
                    setChangeState({
                      changePassword: !changeState.changePassword,
                    })
                  }
                >
                  Сохранить изменения
                </button>
                <button
                  className='person__secret-close'
                  id='person-close-pass'
                  onClick={() =>
                    setChangeState({
                      changePassword: !changeState.changePassword,
                    })
                  }
                >
                  <div className='person__secret-close__cross'>
                    <div className='person__secret-close__cross_item'></div>
                    <div className='person__secret-close__cross_item'></div>
                  </div>
                </button>
              </div>
            </div>
          ) : null}

          {changeState.changeEmail ? (
            <div className='person__secret-change-block person__secret-change-block-mail'>
              <div className='person__secret-change-block-wrapper'>
                <input
                  className='person__secret-change-inp-pass'
                  onChange={updateEmail}
                  value={email.email}
                  name='email'
                  placeholder='Введите новый E-mail'
                />
                <input
                  className='person__secret-change-inp-pass'
                  onChange={updateEmail}
                  value={email.password}
                  name='password'
                  placeholder='Введите пароль'
                />
                <button
                  className='person__secret-change-confirm'
                  id='person-confirm-mail'
                  onClick={() =>
                    setChangeState({ changeEmail: !changeState.changeEmail })
                  }
                >
                  Сохранить изменения
                </button>
                <button
                  className='person__secret-close'
                  id='person-close-mail'
                  onClick={() =>
                    setChangeState({ changeEmail: !changeState.changeEmail })
                  }
                >
                  <div className='person__secret-close__cross'>
                    <div className='person__secret-close__cross_item'></div>
                    <div className='person__secret-close__cross_item'></div>
                  </div>
                </button>
              </div>
            </div>
          ) : null}

          <div
            className={
              changeSecret ? 'person__opacity active' : 'person__opacity'
            }
          >
            <div className='person__buttons buttons__10' id='person-btn'>
              <button
                className={
                  personPages.delHistory
                    ? 'person__buttons-item buttons__10-item active'
                    : 'person__buttons-item buttons__10-item'
                }
                id='lk-history'
                onClick={() => setPersonPages({ delHistory: true })}
              >
                <span>История заказов</span>
              </button>
              <button
                className={
                  personPages.delInfo
                    ? 'person__buttons-item buttons__10-item active'
                    : 'person__buttons-item buttons__10-item'
                }
                id='lk-wait'
                onClick={() => setPersonPages({ delInfo: true })}
              >
                <span>Ожидают доставки</span>
              </button>
              <button
                className={
                  personPages.favorites
                    ? 'person__buttons-item buttons__10-item active'
                    : 'person__buttons-item buttons__10-item'
                }
                id='lk-favorites'
                onClick={() => setPersonPages({ favorites: true })}
              >
                <span>Избранные товары</span>
              </button>
              <button
                className={
                  personPages.reviews
                    ? 'person__buttons-item buttons__10-item active'
                    : 'person__buttons-item buttons__10-item'
                }
                id='lk-reviews'
                onClick={() => setPersonPages({ reviews: true })}
              >
                <span>Оставить отзыв</span>
              </button>
            </div>

            {personPages.delHistory ? (
              <div className='person__delivery-history_wrapper'>
                <div className='person__delivery-history_wrapper-title'>
                  Дата покупки: 28 января 2022 года
                </div>
                <PersonItem></PersonItem>
                <div className='person__delivery-history_wrapper-title'>
                  Дата покупки: 25 января 2022 года
                </div>
                <PersonItem></PersonItem>
                <PersonItem></PersonItem>
                <PersonItem></PersonItem>
              </div>
            ) : null}

            {personPages.delInfo ? (
              <div className='person__delivery-info_wrapper'>
                <div className='person__delivery-info_block'>
                  <div className='person__delivery-info'>
                    <div className='person__delivery-info_main'>
                      Ближайшая доставка ожидается <span>...</span>
                    </div>
                    <hr className='hr' />
                    <div className='person__delivery-info_main'>
                      Количество товаров к получению: <span>3 шт</span>
                    </div>
                    <hr className='hr' />
                    <div className='person__delivery-info_text'>
                      При себе обязательно иметь документ удостоверяющий
                      личность
                    </div>
                  </div>
                </div>

                <div className='person__delivery-links'>
                  <a className='person__delivery-links_track' href=''>
                    <span>Отследить заказ</span>
                  </a>
                  <a className='person__delivery-links_deliv' href=''>
                    <span>Задать вопрос по доставке</span>
                  </a>
                </div>

                <div className='person__delivery-items'>
                  <div className='person__delivery-items_item'>
                    <img
                      className='person__delivery-items_item-img'
                      src='https://placehold.co/136x136'
                      alt=''
                    />
                    <div className='person__delivery-items_item-name'>
                      <span>
                        <span>IPhone 11</span> <br />
                        black <span>(128 gb)</span>
                      </span>
                    </div>
                    <div className='person__delivery-items_item-number'>
                      <span>1</span>
                    </div>
                    <div className='person__delivery-history_wrapper-item_price'>
                      43,000 rub
                    </div>
                    <div className='person__delivery-history_wrapper-item_buttons'>
                      <div className='person__delivery-history_wrapper-item_status'>
                        <span>Отследить</span>
                      </div>
                      <div className='person__delivery-history_wrapper-item_status'>
                        <span>Копировать трек</span>
                      </div>
                    </div>
                  </div>
                  <div className='person__delivery-items_item'>
                    <img
                      className='person__delivery-items_item-img'
                      src='https://placehold.co/136x136'
                      alt=''
                    />
                    <div className='person__delivery-items_item-name'>
                      <span>
                        <span>IPhone 11</span> <br />
                        black <span>(128 gb)</span>
                      </span>
                    </div>
                    <div className='person__delivery-items_item-number'>
                      <span>1</span>
                    </div>
                    <div className='person__delivery-history_wrapper-item_price'>
                      43,000 rub
                    </div>
                    <div className='person__delivery-history_wrapper-item_buttons'>
                      <div className='person__delivery-history_wrapper-item_status'>
                        <span>Отследить</span>
                      </div>
                      <div className='person__delivery-history_wrapper-item_status'>
                        <span>Копировать трек</span>
                      </div>
                    </div>
                  </div>
                  <div className='person__delivery-items_item'>
                    <img
                      className='person__delivery-items_item-img'
                      src='https://placehold.co/136x136'
                      alt=''
                    />
                    <div className='person__delivery-items_item-name'>
                      <span>
                        <span>IPhone 11</span> <br />
                        black <span>(128 gb)</span>
                      </span>
                    </div>
                    <div className='person__delivery-items_item-number'>
                      <span>1</span>
                    </div>
                    <div className='person__delivery-history_wrapper-item_price'>
                      43,000 rub
                    </div>
                    <div className='person__delivery-history_wrapper-item_buttons'>
                      <div className='person__delivery-history_wrapper-item_status'>
                        <span>Отследить</span>
                      </div>
                      <div className='person__delivery-history_wrapper-item_status'>
                        <span>Копировать трек</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {personPages.favorites ? (
              <div className='person__favorites-wrapper'>
                <div className='person__favorites-wrapper-items'>
                  <div className='person__favorites-wrapper-items-item'>
                    <img
                      className='person__favorites-wrapper-items-item_img'
                      src='https://placehold.co/300'
                    />
                    <div className='person__favorites-wrapper-items-item_name'>
                      Iphone 11 pro (128)
                    </div>
                    <div className='person__favorites-wrapper-items-item_price'>
                      <span>Всего за 44,999 rub</span>
                    </div>
                    <button className='person__favorites-wrapper-items-item_add-cart'>
                      Добавить в корзину
                    </button>
                  </div>
                  <div className='person__favorites-wrapper-items-item'>
                    <img
                      className='person__favorites-wrapper-items-item_img'
                      src='https://placehold.co/300'
                    />
                    <div className='person__favorites-wrapper-items-item_name'>
                      Iphone 11 pro (128)
                    </div>
                    <div className='person__favorites-wrapper-items-item_price'>
                      <span>Всего за 44,999 rub</span>
                    </div>
                    <button className='person__favorites-wrapper-items-item_add-cart'>
                      Добавить в корзину
                    </button>
                  </div>
                  <div className='person__favorites-wrapper-items-item'>
                    <img
                      className='person__favorites-wrapper-items-item_img'
                      src='https://placehold.co/300'
                    />
                    <div className='person__favorites-wrapper-items-item_name'>
                      Iphone 11 pro (128)
                    </div>
                    <div className='person__favorites-wrapper-items-item_price'>
                      <span>Всего за 44,999 rub</span>
                    </div>
                    <button className='person__favorites-wrapper-items-item_add-cart'>
                      Добавить в корзину
                    </button>
                  </div>
                </div>
              </div>
            ) : null}

            {personPages.reviews ? (
              <div className='person__reviews'>
                <div className='person__reviews_text-block'>
                  <p>
                    <span>Мы любим своих клиентов</span> и хотим, чтобы вы
                    делились своими реальными <br /> отзывами о “ReShip” и нас
                    становилось все больше
                  </p>
                </div>

                <div className='person__reviews-buttons buttons__10 '>
                  <a
                    href='#'
                    className='person__reviews-buttons-item buttons__10-item'
                  >
                    <span>Оставить отзыв в ВКонтакте</span>
                  </a>
                  <a
                    href='#'
                    className='person__reviews-buttons-item buttons__10-item'
                  >
                    <span>Оставить отзыв в Discord</span>
                  </a>
                  <a
                    href='#'
                    className='person__reviews-buttons-item buttons__10-item'
                  >
                    <span>ВКонтакте отзывы</span>
                  </a>
                  <a
                    href='#'
                    className='person__reviews-buttons-item buttons__10-item'
                  >
                    <span>Discord отзывы</span>
                  </a>
                </div>
              </div>
            ) : null}

            <div
              className='person__history-wrapper'
              style={{ display: 'none' }}
            >
              <div className='person__reviews_text-block'>
                <p>
                  Вы еще не совершали покупок - вернитесь сюда позднее, а пока
                  можете <a href='/catalog.html'>перейти в каталог</a>, <br />{' '}
                  для выбора товара
                </p>
              </div>
            </div>

            <div className='person__wait-wrapper' style={{ display: 'none' }}>
              <div className='person__reviews_text-block'>
                <p>
                  Вы еще не добавляли товары в “Избранное” - вернитесь сюда
                  позднее, а пока можете <br />
                  <a href='/catalog.html'>перейти в каталог</a>, для выбора
                  товара
                </p>
              </div>
            </div>

            <div
              className='person__favorites-wrapper_none'
              style={{ display: 'none' }}
            >
              <div className='person__reviews_text-block'>
                <p>
                  Вы еще не добавляли товары в “Избранное” - вернитесь сюда
                  позднее, а пока можете <br />
                  <a href='/catalog.html'>перейти в каталог</a>, для выбора
                  товара
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Personal;
