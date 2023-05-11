import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import {
  Card,
  DeliveryItem,
  FavoriteItem,
  Footer,
  Menu,
  PersonItem,
} from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth, selectUserData } from '../redux/slices/authSlice';
import {
  fetchChangeEmail,
  fetchChangePassword,
} from '../redux/slices/changeSlice';
import { selectItemsData } from '../redux/slices/itemsSlice';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
const Personal = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const { data, status } = useSelector(selectUserData);
  const { items, itemsStatus = status } = useSelector(selectItemsData);
  const token = localStorage.getItem('token');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    mail: 'email',
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
    password: '',
    new_password: '',
    token,
  });

  const updatePassword = (e) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };

  const [email, setEmail] = useState({
    new_email: '',
    password: '',
    token,
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
  const onClickSavePassword = async () => {
    const data = await dispatch(fetchChangePassword(password));
    if (!data.payload) {
      return alert('Не удалось изменить пароль');
    }
    if (data.payload) {
      return alert('Пароль успешно изменен');
    }

    setChangeState({
      changePassword: !changeState.changePassword,
    });
    setPassword({ lastPassword: '', newPassword: '' });
  };
  const onClickSaveEmail = async () => {
    const data = await dispatch(fetchChangeEmail(email));
    if (!data.payload) {
      return alert('Не удалось изменить электронную почту');
    }
    if (data.payload) {
      return alert('Электронная почта успешно изменена');
    }
    setChangeState({ changeEmail: !changeState.changeEmail });
    setPersonMail({ mail: '' });
  };
  function timeConverter(UNIX_timestamp) {
    const date = new Date(UNIX_timestamp);

    return date.toLocaleString('ru-US', {
      day: 'numeric',
      year: 'numeric',
      month: 'long',
    });
  }

  useEffect(() => {
    if (status === 'success') {
      setPersonName({
        firstName: data.first_name,
        lastName: data.last_name,
      });
      setPersonMail({ mail: data.email });
    }
  }, [status]);

  useEffect(() => {
    setPersonPages({ delHistory: true });
  }, []);
  if (status === 'success' && !isAuth) {
    return <Navigate to='/'></Navigate>;
  }
  if (status === 'success') {
    data.favorites.map((order) => console.log(order));
  }
  return (
    // <>
    //   <section className="person">
    //     <div className="container person__container">
    //       <div className="person_top">
    //         <p className="person__title">
    //           Добрый день,<br></br>
    //           {status === 'success' && data.first_name ? (
    //             <span>
    //               {data.first_name[0].toUpperCase() + data.first_name.slice(1)}
    //             </span>
    //           ) : null}
    //         </p>
    //         <div className="person__card">
    //           <div className="person__img-block">
    //             <img
    //               src="../assets/user_img/default.jpg"
    //               alt="avatar"
    //               className="person__img"
    //             />
    //           </div>
    //           <div className="person__info">
    //             {changeName ? (
    //               <div className="person__info-item">
    //                 {personName.lastName} {personName.firstName}
    //               </div>
    //             ) : (
    //               <div className="person__info-input-button">
    //                 <input
    //                   className="person__info-input"
    //                   value={personName.lastName}
    //                   onChange={updateName}
    //                   placeholder="Введите фамилию"
    //                   name="lastName"
    //                 />
    //                 <input
    //                   className="person__info-input"
    //                   value={personName.firstName}
    //                   onChange={updateName}
    //                   placeholder="Введите имя"
    //                   name="firstName"
    //                 />
    //                 <button
    //                   className="person__info-input_button"
    //                   onClick={() => setChangeName(!changeName)}
    //                 >
    //                   Сохранить
    //                 </button>
    //               </div>
    //             )}

    //             {changeMail ? null : (
    //               // <div className="person__info-item">{personMail.mail}</div>
    //               <div className="person__info-input-button">
    //                 <input
    //                   className="person__info-input mail"
    //                   value={personMail.mail}
    //                   onChange={updateMail}
    //                   placeholder="Введите свой email"
    //                   name="mail"
    //                 />
    //                 <button
    //                   className="person__info-input_button"
    //                   onClick={() => setChangeMail(!changeMail)}
    //                 >
    //                   Сохранить
    //                 </button>
    //               </div>
    //             )}

    //             {/* <button className="person__info-item">
    //             Укажите адрес доставки
    //           </button> */}

    //             <button
    //               className="person__info-item"
    //               id="settings-conf"
    //               onClick={() => setChangeSecret(!changeSecret)}
    //             >
    //               Изменить профиль
    //             </button>
    //           </div>
    //         </div>
    //       </div>

    //       {changeSecret ? (
    //         <div className="person__secret">
    //           <div className="person__secret-wrapper">
    //             {windowWidth <= 575 ? (
    //               <div className="person__secret-wrapper_adaptive">
    //                 <button
    //                   className="person__secret-change-btn"
    //                   id="change-pass"
    //                   onClick={() =>
    //                     setChangeState({
    //                       changePassword: !changeState.changePassword,
    //                     })
    //                   }
    //                 >
    //                   Изменить пароль
    //                 </button>
    //                 <button
    //                   className="person__secret-change-btn"
    //                   id="change-mail"
    //                   onClick={() =>
    //                     setChangeState({
    //                       changeEmail: !changeState.changeEmail,
    //                     })
    //                   }
    //                 >
    //                   Изменить E-mail
    //                 </button>
    //               </div>
    //             ) : (
    //               <>
    //                 <button
    //                   className="person__secret-change-btn"
    //                   id="change-pass"
    //                   onClick={() =>
    //                     setChangeState({
    //                       changePassword: !changeState.changePassword,
    //                     })
    //                   }
    //                 >
    //                   Изменить пароль
    //                 </button>
    //                 <button
    //                   className="person__secret-change-btn"
    //                   id="change-mail"
    //                   onClick={() =>
    //                     setChangeState({
    //                       changeEmail: !changeState.changeEmail,
    //                     })
    //                   }
    //                 >
    //                   Изменить E-mail
    //                 </button>
    //               </>
    //             )}
    //             <button
    //               className="person__secret-close"
    //               id="close-secret"
    //               onClick={onCloseAll}
    //             >
    //               <div className="person__secret-close__cross">
    //                 <div className="person__secret-close__cross_item"></div>
    //                 <div className="person__secret-close__cross_item"></div>
    //               </div>
    //             </button>
    //           </div>
    //         </div>
    //       ) : null}

    //       {changeState.changePassword ? (
    //         <div className="person__secret-change-block person__secret-change-block-pass">
    //           <div
    //             className={
    //               windowWidth <= 767
    //                 ? 'person__secret-change-block-wrapper adaptive'
    //                 : 'person__secret-change-block-wrapper'
    //             }
    //           >
    //             {windowWidth <= 767 ? (
    //               <div className="person__secret-change-block-adaptive">
    //                 <input
    //                   className="person__secret-change-inp-pass"
    //                   onChange={updatePassword}
    //                   value={password.last_password}
    //                   name="password"
    //                   type="password"
    //                   placeholder="Введите старый пароль"
    //                 />
    //                 <input
    //                   className="person__secret-change-inp-pass"
    //                   name="new_password"
    //                   onChange={updatePassword}
    //                   value={password.new_password}
    //                   type="password"
    //                   placeholder="Введите новый пароль"
    //                 />
    //                 <button
    //                   className="person__secret-change-confirm"
    //                   id="person-confirm-pass"
    //                   onClick={onClickSavePassword}
    //                 >
    //                   Сохранить изменения
    //                 </button>
    //               </div>
    //             ) : (
    //               <>
    //                 <input
    //                   className="person__secret-change-inp-pass"
    //                   onChange={updatePassword}
    //                   value={password.last_password}
    //                   name="password"
    //                   type="password"
    //                   placeholder="Введите старый пароль"
    //                 />
    //                 <input
    //                   className="person__secret-change-inp-pass"
    //                   name="new_password"
    //                   onChange={updatePassword}
    //                   value={password.new_password}
    //                   type="password"
    //                   placeholder="Введите новый пароль"
    //                 />
    //                 <button
    //                   className="person__secret-change-confirm"
    //                   id="person-confirm-pass"
    //                   onClick={onClickSavePassword}
    //                 >
    //                   Сохранить изменения
    //                 </button>
    //               </>
    //             )}
    //             <button
    //               className="person__secret-close"
    //               id="person-close-pass"
    //               onClick={() =>
    //                 setChangeState({
    //                   changePassword: !changeState.changePassword,
    //                 })
    //               }
    //             >
    //               <div className="person__secret-close__cross">
    //                 <div className="person__secret-close__cross_item"></div>
    //                 <div className="person__secret-close__cross_item"></div>
    //               </div>
    //             </button>
    //           </div>
    //         </div>
    //       ) : null}

    //       {changeState.changeEmail ? (
    //         <div className="person__secret-change-block person__secret-change-block-mail">
    //           <div
    //             className={
    //               windowWidth <= 767
    //                 ? 'person__secret-change-block-wrapper adaptive'
    //                 : 'person__secret-change-block-wrapper'
    //             }
    //           >
    //             {windowWidth <= 767 ? (
    //               <div className="person__secret-change-block-adaptive">
    //                 <input
    //                   className="person__secret-change-inp-pass"
    //                   onChange={updateEmail}
    //                   value={email.new_email}
    //                   name="new_email"
    //                   placeholder="Введите новый E-mail"
    //                 />
    //                 <input
    //                   className="person__secret-change-inp-pass"
    //                   onChange={updateEmail}
    //                   value={email.password}
    //                   name="password"
    //                   type="password"
    //                   placeholder="Введите пароль"
    //                 />
    //                 <button
    //                   className="person__secret-change-confirm"
    //                   id="person-confirm-mail"
    //                   onClick={onClickSaveEmail}
    //                 >
    //                   Сохранить изменения
    //                 </button>
    //               </div>
    //             ) : (
    //               <>
    //                 <input
    //                   className="person__secret-change-inp-pass"
    //                   onChange={updateEmail}
    //                   value={email.new_email}
    //                   name="new_email"
    //                   placeholder="Введите новый E-mail"
    //                 />
    //                 <input
    //                   className="person__secret-change-inp-pass"
    //                   onChange={updateEmail}
    //                   value={email.password}
    //                   name="password"
    //                   type="password"
    //                   placeholder="Введите пароль"
    //                 />
    //                 <button
    //                   className="person__secret-change-confirm"
    //                   id="person-confirm-mail"
    //                   onClick={onClickSaveEmail}
    //                 >
    //                   Сохранить изменения
    //                 </button>
    //               </>
    //             )}
    //             <button
    //               className="person__secret-close"
    //               id="person-close-mail"
    //               onClick={() =>
    //                 setChangeState({ changeEmail: !changeState.changeEmail })
    //               }
    //             >
    //               <div className="person__secret-close__cross">
    //                 <div className="person__secret-close__cross_item"></div>
    //                 <div className="person__secret-close__cross_item"></div>
    //               </div>
    //             </button>
    //           </div>
    //         </div>
    //       ) : null}

    //       <div
    //         className={
    //           changeSecret ? 'person__opacity active' : 'person__opacity'
    //         }
    //       >
    //         {windowWidth > 767 ? (
    //           <div className="person__center_wrapper">
    //             <div className="person__buttons" id="person-btn">
    //               <Link
    //                 to="/favorites"
    //                 className={'person__buttons-item buttons__10-item_personal'}
    //                 id="lk-history"
    //               >
    //                 <span>Избранные</span>
    //               </Link>
    //               <Link
    //                 to="/cart"
    //                 className={'person__buttons-item buttons__10-item_personal'}
    //                 id="lk-wait"
    //               >
    //                 <span>Корзина</span>
    //               </Link>
    //               <Link
    //                 to="/settings"
    //                 className={'person__buttons-item buttons__10-item_personal'}
    //                 id="lk-favorites"
    //               >
    //                 <span>Настройки</span>
    //               </Link>
    //               <Link
    //                 to="orders"
    //                 className={'person__buttons-item buttons__10-item_personal'}
    //                 id="lk-reviews"
    //               >
    //                 <span>Мои заказы</span>
    //               </Link>
    //             </div>
    //             <div className="person__orders">
    //               <div className="person__orders-title">
    //                 <p>Последние заказы</p>
    //                 <img src="" alt="settings" />
    //               </div>
    //               <div className="person__orders-items"></div>
    //             </div>
    //           </div>
    //         ) : (
    //           <div className="person__buttons buttons__10" id="person-btn">
    //             <div className="person__buttons-flex">
    //               <Link
    //                 to="/favorites"
    //                 className={'person__buttons-item buttons__10-item_personal'}
    //                 id="lk-history"
    //               >
    //                 <span>Избранные</span>
    //               </Link>
    //               <Link
    //                 to="/cart"
    //                 className={'person__buttons-item buttons__10-item_personal'}
    //                 id="lk-wait"
    //               >
    //                 <span>Корзина</span>
    //               </Link>
    //               <Link
    //                 to="/settings"
    //                 className={'person__buttons-item buttons__10-item_personal'}
    //                 id="lk-favorites"
    //               >
    //                 <span>Настройки</span>
    //               </Link>
    //               <Link
    //                 to="orders"
    //                 className={'person__buttons-item buttons__10-item_personal'}
    //                 id="lk-reviews"
    //               >
    //                 <span>Мои заказы</span>
    //               </Link>
    //             </div>
    //           </div>
    //         )}

    //         {personPages.delHistory
    //           ? status === 'success' && data.orders.length > 0
    //             ? data.orders.map((order) => (
    //                 <div
    //                   key={order.id}
    //                   className="person__delivery-history_wrapper"
    //                 >
    //                   <div className="person__delivery-history_wrapper-title">
    //                     Дата покупки: {timeConverter(order.date_start)}
    //                   </div>
    //                   {order.products.map((product) => (
    //                     <PersonItem
    //                       count={product.count}
    //                       name={product.name}
    //                       id={product.product_id}
    //                       price={product.price}
    //                       key={product.product_id}
    //                     ></PersonItem>
    //                   ))}
    //                 </div>
    //               ))
    //             : null
    //           : null}

    //         {personPages.delInfo ? (
    //           data.orders.length > 0 ? (
    //             <div className="person__delivery-info_wrapper">
    //               <div className="person__delivery-info_block">
    //                 <div className="person__delivery-info">
    //                   <div className="person__delivery-info_main">
    //                     Ближайшая доставка ожидается <span>...</span>
    //                   </div>
    //                   <hr className="hr" />
    //                   <div className="person__delivery-info_main">
    //                     Количество товаров к получению: <span>3 шт</span>
    //                   </div>
    //                   <hr className="hr" />
    //                   <div className="person__delivery-info_text">
    //                     При себе обязательно иметь документ удостоверяющий
    //                     личность
    //                   </div>
    //                 </div>
    //               </div>

    //               <div className="person__delivery-links">
    //                 <a className="person__delivery-links_track" href="/#">
    //                   <span>Отследить заказ</span>
    //                 </a>
    //                 <a className="person__delivery-links_deliv" href="/#">
    //                   <span>Задать вопрос по доставке</span>
    //                 </a>
    //               </div>

    //               <div className="person__delivery-items">
    //                 {status === 'success' &&
    //                   data.orders.map((order) =>
    //                     order.products.map((product) => (
    //                       <DeliveryItem
    //                         name={product.name}
    //                         price={product.price}
    //                         count={product.count}
    //                         id={product.product_id}
    //                         key={product.product_id}
    //                       />
    //                     ))
    //                   )}
    //               </div>
    //             </div>
    //           ) : (
    //             <div className="person__history-wrapper">
    //               <div className="person__reviews_text-block">
    //                 <p>
    //                   Вы еще не совершали покупок - вернитесь сюда позднее, а
    //                   пока можете <Link to="/catalog">перейти в каталог</Link>,
    //                   для выбора товара
    //                 </p>
    //               </div>
    //             </div>
    //           )
    //         ) : null}

    //         {personPages.favorites && status === 'success' ? (
    //           data.favorites.length > 0 ? (
    //             <div className="person__favorites-wrapper">
    //               <div className="person__favorites-wrapper-items">
    //                 {data.favorites.map((item) => (
    //                   <FavoriteItem
    //                     key={item.product_id}
    //                     id={item.product_id}
    //                     price={item.price}
    //                     name={item.name}
    //                   ></FavoriteItem>
    //                 ))}
    //               </div>
    //             </div>
    //           ) : (
    //             <div className="person__wait-wrapper">
    //               <div className="person__reviews_text-block">
    //                 <p>
    //                   Вы еще не добавляли товары в “Избранное” - вернитесь сюда
    //                   позднее, а пока можете <br />
    //                   <Link to="/catalog">перейти в каталог</Link>, для выбора
    //                   товара
    //                 </p>
    //               </div>
    //             </div>
    //           )
    //         ) : null}

    //         {personPages.reviews ? (
    //           <div className="person__reviews">
    //             <div className="person__reviews_text-block">
    //               <p>
    //                 <span>Мы любим своих клиентов</span> и хотим, чтобы вы
    //                 делились своими реальными <br /> отзывами о “ReShip” и нас
    //                 становилось все больше
    //               </p>
    //             </div>

    //             {windowWidth <= 992 ? (
    //               <div className="person__reviews-buttons buttons__10 ">
    //                 <div className="person__reviews-buttons_flex">
    //                   <a
    //                     href="https://vk.com/topic-214661020_49238528"
    //                     className="person__reviews-buttons-item buttons__10-item"
    //                   >
    //                     <span>Оставить отзыв в ВКонтакте</span>
    //                   </a>
    //                   <a
    //                     href="/#"
    //                     className="person__reviews-buttons-item buttons__10-item"
    //                   >
    //                     <span>Оставить отзыв в Discord</span>
    //                   </a>
    //                 </div>
    //                 <div className="person__reviews-buttons_flex">
    //                   <a
    //                     rel="noreferrer"
    //                     target="_blank"
    //                     href="https://vk.com/topic-214661020_49238528"
    //                     className="person__reviews-buttons-item buttons__10-item"
    //                   >
    //                     <span>ВКонтакте отзывы</span>
    //                   </a>
    //                   <a
    //                     rel="noreferrer"
    //                     target="_blank"
    //                     href="https://discord.com/channels/994699375014064198/994699375655788626"
    //                     className="person__reviews-buttons-item buttons__10-item"
    //                   >
    //                     <span>Discord отзывы</span>
    //                   </a>
    //                 </div>
    //               </div>
    //             ) : (
    //               <div className="person__reviews-buttons buttons__10 ">
    //                 <a
    //                   rel="noreferrer"
    //                   target="_blank"
    //                   href="https://vk.com/topic-214661020_49238528"
    //                   className="person__reviews-buttons-item buttons__10-item"
    //                 >
    //                   <span>Оставить отзыв в ВКонтакте</span>
    //                 </a>
    //                 <a
    //                   href="/#"
    //                   className="person__reviews-buttons-item buttons__10-item"
    //                 >
    //                   <span>Оставить отзыв в Discord</span>
    //                 </a>
    //                 <a
    //                   rel="noreferrer"
    //                   target="_blank"
    //                   href="https://vk.com/topic-214661020_49238528"
    //                   className="person__reviews-buttons-item buttons__10-item"
    //                 >
    //                   <span>ВКонтакте отзывы</span>
    //                 </a>
    //                 <a
    //                   rel="noreferrer"
    //                   target="_blank"
    //                   href="https://discord.com/channels/994699375014064198/994699375655788626"
    //                   className="person__reviews-buttons-item buttons__10-item"
    //                 >
    //                   <span>Discord отзывы</span>
    //                 </a>
    //               </div>
    //             )}
    //           </div>
    //         ) : null}
    //       </div>
    //       <div className="person__like">
    //         <p className="person__like-title">Возможно вам понравятся</p>
    //         <div className="person__like-cards">
    //           {itemsStatus === 'success' &&
    //             items
    //               .slice(0, 3)
    //               .map((item) => (
    //                 <Card
    //                   key={item.id}
    //                   id={item.id}
    //                   name={item.name}
    //                   price={item.price}
    //                 ></Card>
    //               ))}
    //         </div>
    //       </div>
    //     </div>
    //   </section>
    //   <Footer></Footer>
    // </>
    <>
      <div className='personal'>
        <div className='personal__container container'>
          <div className='personal__user-block'>
            <div className='personal__user-block_name'>
              Добрый день, <br />{' '}
              {status === 'success' && data.first_name ? (
                <span>
                  {data.first_name[0].toUpperCase() + data.first_name.slice(1)}
                </span>
              ) : null}
            </div>
            <div className='personal__user-block_profile'>
              <div className='personal__user-block_profile_img-block'>
                <img
                  src='../assets/user_img/default.jpg'
                  alt='avatar'
                  className='person__img'
                />
              </div>
              <div className='personal__user-block_profile_right-block'>
                <div className='personal__user-block_profile_right-block_name'>
                  {personName.firstName} {personName.lastName}
                </div>
                <Link
                  to='/settings'
                  className='personal__user-block_profile_right-block_button'
                >
                  Изменить профиль
                </Link>
              </div>
            </div>
          </div>

          <div className='personal__middle-block'>
            <div className='personal__middle-block_buttons'>
              <div className='personal__middle-block_buttons_item'>
                Избранные
              </div>
              <div className='personal__middle-block_buttons_item'>Корзина</div>
              <div className='personal__middle-block_buttons_item'>
                Настройки
              </div>
              <div className='personal__middle-block_buttons_item'>
                Мои заказы
              </div>
            </div>
            <div className='personal__middle-block_latest-orders'>
              <div className='personal__middle-block_latest-orders_header'>
                <span>Последние заказы</span>
                <button>
                  <img src='../assets/img/settings-button.png' alt='' />
                </button>
              </div>
              <div className='personal__middle-block_latest-orders_items-block'>
                <div className='personal__middle-block_latest-orders_items-block_item'>
                  <div className='personal__middle-block_latest-orders_items-block_item-up'>
                    <div className='personal__middle-block_latest-orders_items-block_item-up_img-block'>
                      <img src='../assets/products_img/1.png' alt='' />
                    </div>
                    <div className='personal__middle-block_latest-orders_items-block_item-up_info'>
                      <div className='personal__middle-block_latest-orders_items-block_item-up_info-name'>
                        Logitech G Pro
                      </div>
                      <div className='personal__middle-block_latest-orders_items-block_item-up_info-color'>
                        Черная
                      </div>
                    </div>
                    <div className='personal__middle-block_latest-orders_items-block_item-up_info-more'>
                      <div className='personal__middle-block_latest-orders_items-block_item-up_info-more_status'>
                        Получено
                      </div>
                      <div className='personal__middle-block_latest-orders_items-block_item-up_info-more_price'>
                        6 800 руб
                      </div>
                    </div>
                  </div>
                  <div className='personal__middle-block_latest-orders_items-block_item-bottom'>
                    <div className='personal__middle-block_latest-orders_items-block_item-bottom_date'>
                      Сен 26, 2023
                    </div>
                    <div className='personal__middle-block_latest-orders_items-block_item-bottom_count'>
                      1шт
                    </div>
                  </div>
                </div>

                <button className='personal__middle-block_latest-orders_items-block_all'>
                  Все заказы <span></span>
                </button>
              </div>
            </div>
          </div>

          <div className='personal__reviews-block'>
            <div className='personal__reviews-block_title'>Мои отзывы</div>
            <Swiper
              modules={[Navigation]}
              navigation
              speed={1300}
              slidesPerView={2}
              spaceBetween={40}
              className='personal__reviews-block_slider'
            >
              <SwiperSlide className='personal__reviews-block_slider-item'>
                <div className='personal__reviews-block_slider-item_header'>
                  <div className='personal__reviews-block_slider-item_header_left-block'>
                    <div className='personal__reviews-block_slider-item_header_img-block'>
                      <img src='../assets/img/logitech-lk.png' alt='' />
                    </div>
                    <div className='personal__reviews-block_slider-item_header_info'>
                      <div className='personal__reviews-block_slider-item_header_info_name'>
                        Logitech G Pro
                      </div>
                      <div className='personal__reviews-block_slider-item_header_info_color'>
                        Черный
                      </div>
                    </div>
                  </div>
                  <div className='personal__reviews-block_slider-item_header_right-block'>
                    <div className='personal__reviews-block_slider-item_header_stars'>
                      <img src='../assets/img/star-review.png' alt='' />
                      <img src='../assets/img/star-review.png' alt='' />
                      <img src='../assets/img/star-review.png' alt='' />
                      <img src='../assets/img/star-review.png' alt='' />
                      <img src='../assets/img/star-review.png' alt='' />
                    </div>
                    <div className='personal__reviews-block_slider-item_header_date'>
                      Сен 26, 2023
                    </div>
                  </div>
                </div>
                <hr className='hr' />
                <div className='personal__reviews-block_slider-item_review'>
                  <span>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Dolore itaque labore minima culpa porro eligendi sed error
                    modi accusantium, dolores doloribus at. Corporis sed alias
                    non quis debitis veritatis quisquam.
                  </span>
                </div>
              </SwiperSlide>
              <SwiperSlide className='personal__reviews-block_slider-item'>
                <div className='personal__reviews-block_slider-item_header'>
                  <div className='personal__reviews-block_slider-item_header_left-block'>
                    <div className='personal__reviews-block_slider-item_header_img-block'>
                      <img src='../assets/img/logitech-lk.png' alt='' />
                    </div>
                    <div className='personal__reviews-block_slider-item_header_info'>
                      <div className='personal__reviews-block_slider-item_header_info_name'>
                        Logitech G Pro
                      </div>
                      <div className='personal__reviews-block_slider-item_header_info_color'>
                        Черный
                      </div>
                    </div>
                  </div>
                  <div className='personal__reviews-block_slider-item_header_right-block'>
                    <div className='personal__reviews-block_slider-item_header_stars'>
                      <img src='../assets/img/star-review.png' alt='' />
                      <img src='../assets/img/star-review.png' alt='' />
                      <img src='../assets/img/star-review.png' alt='' />
                      <img src='../assets/img/star-review.png' alt='' />
                      <img src='../assets/img/star-review.png' alt='' />
                    </div>
                    <div className='personal__reviews-block_slider-item_header_date'>
                      Сен 26, 2023
                    </div>
                  </div>
                </div>
                <hr className='hr' />
                <div className='personal__reviews-block_slider-item_review'>
                  <span>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Dolore itaque labore minima culpa porro eligendi sed error
                    modi accusantium, dolores doloribus at. Corporis sed alias
                    non quis debitis veritatis quisquam.
                  </span>
                </div>
              </SwiperSlide>
              <SwiperSlide className='personal__reviews-block_slider-item'>
                <div className='personal__reviews-block_slider-item_header'>
                  <div className='personal__reviews-block_slider-item_header_left-block'>
                    <div className='personal__reviews-block_slider-item_header_img-block'>
                      <img src='../assets/img/logitech-lk.png' alt='' />
                    </div>
                    <div className='personal__reviews-block_slider-item_header_info'>
                      <div className='personal__reviews-block_slider-item_header_info_name'>
                        Logitech G Pro
                      </div>
                      <div className='personal__reviews-block_slider-item_header_info_color'>
                        Черный
                      </div>
                    </div>
                  </div>
                  <div className='personal__reviews-block_slider-item_header_right-block'>
                    <div className='personal__reviews-block_slider-item_header_stars'>
                      <img src='../assets/img/star-review.png' alt='' />
                      <img src='../assets/img/star-review.png' alt='' />
                      <img src='../assets/img/star-review.png' alt='' />
                      <img src='../assets/img/star-review.png' alt='' />
                      <img src='../assets/img/star-review.png' alt='' />
                    </div>
                    <div className='personal__reviews-block_slider-item_header_date'>
                      Сен 26, 2023
                    </div>
                  </div>
                </div>
                <hr className='hr' />
                <div className='personal__reviews-block_slider-item_review'>
                  <span>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Dolore itaque labore minima culpa porro eligendi sed error
                    modi accusantium, dolores doloribus at. Corporis sed alias
                    non quis debitis veritatis quisquam.
                  </span>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>

          <div className='personal__interesting'>
            <Card></Card>
            <Card></Card>
            <Card></Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Personal;
