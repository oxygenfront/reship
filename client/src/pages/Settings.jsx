import { useEffect, useState } from 'react'
import InputMask from 'react-input-mask'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserData } from '../redux/slices/authSlice'
import {
  fetchChangeBasic,
  fetchChangeDelivery,
  fetchChangePassword,
} from '../redux/slices/changeSlice'

function Settings() {
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  const { data, status } = useSelector(selectUserData)
  const [active, setActive] = useState({
    profile: true,
    contacts: false,
    adress: false,
    password: false,
  })
  const [changePassword, setChangePassword] = useState({
    curr_password: '',
    new_password: '',
    conf_password: '',
  })
  function timeConverter(UNIX_timestamp) {
    const date = new Date(UNIX_timestamp)

    return date.toLocaleString('ru-US', {
      day: 'numeric',
      year: 'numeric',
      month: 'numeric',
    })
  }
  const [changeProfile, setChangeProfile] = useState({
    first_name: '',
    last_name: '',
  })

  const [changeContacts, setChangeContacts] = useState({
    new_email: '',
    new_number_tel: '',
    new_date_of_birth: '',
    new_date: '',
    new_country: '',
  })
  const [changeAdress, setChangeAdress] = useState({
    country: '',
    city: '',
    street: '',
    flat_number: '',
    postal_code: '',
  })
  const [change, setChange] = useState({
    profile: false,
    contacts: false,
    adress: false,
    password: false,
  })

  const updateProfile = (e) => {
    setChangeProfile({
      ...changeProfile,
      [e.target.name]: e.target.value,
    })
  }
  const updateContacts = (e) => {
    setChangeContacts({
      ...changeContacts,
      [e.target.name]: e.target.value,
    })
  }
  const updateAdress = (e) => {
    setChangeAdress({
      ...changeAdress,
      [e.target.name]: e.target.value,
    })
  }
  const updatePassword = (e) => {
    setChangePassword({
      ...changePassword,
      [e.target.name]: e.target.value,
    })
  }
  const timeStamp = new Date(
    changeContacts.new_date
      .toLocaleString()
      .slice(0, 10)
      .split('.')
      .reverse()
      .join('.')
  ).getTime()

  const onClickSaveContacts = async () => {
    console.log(timeStamp)
    console.log(changeContacts)

    const data = await dispatch(fetchChangeBasic({ ...changeContacts, token }))
    console.log(data)
    if (!data.payload) {
      return alert('Не удалось изменить контактную информацию')
    }
    if (data.payload) {
      return alert('Контактная информация успешно изменена')
    }
  }

  const onClickSaveDelivery = async () => {
    const data = await dispatch(
      fetchChangeDelivery({
        new_delivery: JSON.stringify({
          adress: Object.values(changeAdress).join(', '),
        }),
        token,
      })
    )
    console.log(data)
    if (!data.payload) {
      return alert('Не удалось изменить адрес')
    }
    if (data.payload) {
      return alert('Адрес успешно изменен')
    }
  }
  const onClickSavePassword = async () => {
    const data = await dispatch(
      fetchChangePassword({
        password: changePassword.curr_password,
        new_password: changePassword.new_password,
        token,
      })
    )
    if (!data.payload) {
      return alert('Не удалось изменить пароль')
    }
    if (data.payload) {
      return alert('Пароль успешно изменен')
    }

    setChangePassword({ curr_password: '', new_password: '' })
  }

  useEffect(() => {
    if (status === 'success') {
      const adress = JSON.parse(data.adress_delivery)?.adress.split(',')
      setChangeProfile({
        first_name: data.first_name,
        last_name: data.last_name,
      })
      setChangeContacts({
        new_email: data.email,
        new_country: JSON.parse(data.adress_delivery).adress,

        new_date: timeConverter(data.date_of_birth),
        new_number_tel: '',
      })

      setChangeAdress({
        country: 'Россия',
        city: adress[0] === 'Россия' ? adress[1] : adress[0],
        street: adress[0] === 'Россия' ? adress[2] : adress[1] || '',
        flat_number: adress[0] === 'Россия' ? adress[3] : adress[2] || '',
        postal_code: adress[0] === 'Россия' ? adress[4] : adress[3] || '',
      })
    }
  }, [status])

  const formatPhoneNumber = (phoneNumberString) =>  {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(?:7|8)?(\d{3})(\d{3})(\d{2})(\d{2})$/);
    if (match) {
      return (
        '+7 (' + match[1] + ') ' + match[2] + '-' + match[3] + '-' + match[4]
      );
    }
    return null;
  }
  return (
    <>
      <div className='settings'>
        <div className='settings__container container'>
          <div className='settings__title'>Настройки</div>
          <div className='settings__wrapper'>
            <div className='settings__buttons-block'>
              <div
                onClick={() => (
                  setActive({ profile: true }), setChange({ profile: false })
                )}
                className={
                  active.profile
                    ? 'settings__buttons-block_item active'
                    : 'settings__buttons-block_item'
                }
              >
                <span>Профиль</span>
              </div>
              <div
                onClick={() => (
                  setActive({ contacts: true }), setChange({ profile: false })
                )}
                className={
                  active.contacts
                    ? 'settings__buttons-block_item active'
                    : 'settings__buttons-block_item'
                }
              >
                <span>Контактная информация</span>
              </div>
              <div
                onClick={() => (
                  setActive({ adress: true }), setChange({ profile: false })
                )}
                className={
                  active.adress
                    ? 'settings__buttons-block_item active'
                    : 'settings__buttons-block_item'
                }
              >
                <span>Мои адреса</span>
              </div>
              <div
                onClick={() => (
                  setActive({ password: true }), setChange({ profile: false })
                )}
                className={
                  active.password
                    ? 'settings__buttons-block_item active'
                    : 'settings__buttons-block_item'
                }
              >
                <span>Изменение пароля</span>
              </div>
            </div>

            <div className='settings__change-wrapper'>
              <div className='settings__profile'>
                <div className='settings__profile-preview'>
                  <div className='settings__profile-preview_img-block'>
                    <img src='../assets/user_img/default.jpg' alt='' />
                  </div>
                  <div className='settings__profile-preview_info-block'>
                    {status === 'success' && (
                      <>
                        <div className='settings__profile-preview_info-block_name'>
                          {data.first_name} {data.last_name}
                        </div>
                        <div className='settings__profile-preview_info-block_about'>
                          {changeAdress.country}, {changeAdress.city} <br />
                          {new Date(Date.now()).getFullYear() -
                            new Date(data.date_of_birth).getFullYear()}{' '}
                          лет
                        </div>
                      </>
                    )}
                  </div>
                  <button
                    onClick={() => (
                      setChange({
                        profile: !change.profile,
                        contacts: false,
                        adress: false,
                      }),
                      setActive({ profile: true, adress: false })
                    )}
                    className='settings__change-btn'
                  >
                    <img src='../assets/img/pen-edit.png' alt='' />
                  </button>
                </div>
              </div>

              {change.profile ? (
                <div className='settings__change'>
                  <div className='settings__change_title'>Профиль</div>

                  <div className='settings__change_block'>
                    <div className='settings__change_block_title'>Фото</div>
                    <div className='settings__change_block_img-block'>
                      <img src='../assets/user_img/default.jpg' alt='' />
                    </div>
                    <div className='settings__change_block_inputs'>
                      <div className='settings__change_block_inputs-wrapper'>
                        <div className='settings__change_block_title'>Имя</div>
                        <input
                          onChange={updateProfile}
                          value={changeProfile.first_name}
                          type='text'
                          className='settings__change_block_inputs-item'
                        />
                      </div>
                      <div className='settings__change_block_inputs-wrapper'>
                        <div className='settings__change_block_title'>
                          Фамилия
                        </div>
                        <input
                          onChange={updateProfile}
                          value={changeProfile.last_name}
                          type='text'
                          className='settings__change_block_inputs-item'
                        />
                      </div>
                    </div>
                    <div className='settings__change_block_buttons'>
                      <button
                        className='settings__change_block_buttons_cancel'
                        onClick={() => setChange({ profile: false })}
                      >
                        Отменить
                      </button>
                      <button className='settings__change_block_buttons_save'>
                        Сохранить изменения
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}

              {active.contacts ? (
                <div className='settings__change'>
                  <div className='settings__change_title'>
                    Контактная <br /> Информация
                  </div>

                  {change.contacts ? (
                    <div className='settings__change_block'>
                      <div className='settings__change_block_inputs'>
                        <div className='settings__change_block_inputs-wrapper'>
                          <div className='settings__change_block_title'>
                            Электронная почта
                          </div>
                          <input
                            onChange={updateContacts}
                            value={changeContacts.new_email}
                            name='new_email'
                            type='text'
                            className='settings__change_block_inputs-item'
                          />
                        </div>
                        <div className='settings__change_block_inputs-wrapper'>
                          <div className='settings__change_block_title'>
                            Номер телефона
                          </div>
                          <InputMask
                            name='new_number_tel'
                            type='text'
                            mask='+7 (999) 999-99-99'
                            onChange={updateContacts}
                            value={changeContacts.new_number_tel}
                            placeholder='+7 (___) ___-__-__'
                            className='settings__change_block_inputs-item'
                          />
                        </div>
                      </div>
                      <div className='settings__change_block_inputs'>
                        <div className='settings__change_block_inputs-wrapper'>
                          <div className='settings__change_block_title'>
                            Дата рождения
                          </div>

                          <InputMask
                            name='new_date'
                            onChange={updateContacts}
                            value={changeContacts.new_date}
                            mask='99.99.9999'
                            placeholder='XX-XX-XXXX'
                            type='text'
                            className='settings__change_block_inputs-item'
                          />
                        </div>
                        <div className='settings__change_block_inputs-wrapper'>
                          <div className='settings__change_block_title'>
                            Страна, город
                          </div>
                          <input
                            name='new_country'
                            onChange={updateContacts}
                            value={changeContacts.new_country}
                            type='text'
                            className='settings__change_block_inputs-item'
                          />
                        </div>
                      </div>
                      <div className='settings__change_block_buttons'>
                        <button
                          className='settings__change_block_buttons_cancel'
                          onClick={() => setChange({ contacts: false })}
                        >
                          Отменить
                        </button>
                        <button
                          onClick={onClickSaveContacts}
                          onClickCapture={() =>
                            setChangeContacts({
                              ...changeContacts,
                              new_date_of_birth: timeStamp,
                            })
                          }
                          className='settings__change_block_buttons_save'
                        >
                          Сохранить изменения
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className='settings__change_block'>
                      <button
                        className='settings__change-btn contacts'
                        onClick={() =>
                          setChange({ contacts: !change.contacts })
                        }
                      >
                        <img src='../assets/img/pen-edit.png' alt='' />
                      </button>

                      <div className='settings__change_block_inputs'>
                        <div className='settings__change_block_inputs-wrapper'>
                          <div className='settings__change_block_title'>
                            Электронная почта
                          </div>
                          <div className='settings__change_block_inputs-item'>
                            <span>{changeContacts.new_email}</span>
                          </div>
                        </div>
                        <div className='settings__change_block_inputs-wrapper'>
                          <div className='settings__change_block_title'>
                            Номер телефона
                          </div>
                          <div className='settings__change_block_inputs-item'>
                            <span>
                              {formatPhoneNumber(changeContacts.new_number_tel)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className='settings__change_block_inputs'>
                        <div className='settings__change_block_inputs-wrapper'>
                          <div className='settings__change_block_title'>
                            Дата рождения
                          </div>
                          <div className='settings__change_block_inputs-item'>
                            <span>{changeContacts.new_date}</span>
                          </div>
                        </div>
                        <div className='settings__change_block_inputs-wrapper'>
                          <div className='settings__change_block_title'>
                            Страна, город
                          </div>
                          <div className='settings__change_block_inputs-item'>
                            <span>{changeContacts.new_country}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : null}

              {active.adress ? (
                <div className='settings__change'>
                  <div className='settings__change_title'>
                    Мои адреса{' '}
                    <button className='settings__change_add-adress'></button>
                  </div>

                  {change.adress ? (
                    <div className='settings__change_block'>
                      <div className='settings__change_block_inputs'>
                        <div className='settings__change_block_inputs-wrapper'>
                          <div className='settings__change_block_title'>
                            Страна
                          </div>
                          <input
                            value={changeAdress.country}
                            onChange={updateAdress}
                            name='country'
                            type='text'
                            className='settings__change_block_inputs-item'
                          />
                        </div>
                        <div className='settings__change_block_inputs-wrapper'>
                          <div className='settings__change_block_title'>
                            Город
                          </div>
                          <input
                            value={changeAdress.city}
                            onChange={updateAdress}
                            name='city'
                            type='text'
                            className='settings__change_block_inputs-item'
                          />
                        </div>
                      </div>
                      <div className='settings__change_block_inputs'>
                        <div className='settings__change_block_inputs-wrapper'>
                          <div className='settings__change_block_title'>
                            Улица
                          </div>
                          <input
                            value={changeAdress.street}
                            onChange={updateAdress}
                            name='street'
                            type='text'
                            className='settings__change_block_inputs-item'
                          />
                        </div>
                        <div className='settings__change_block_inputs-wrapper'>
                          <div className='settings__change_block_title'>
                            Почтовый индекс
                          </div>
                          <input
                            value={changeAdress.postal_code}
                            onChange={updateAdress}
                            name='postal_code'
                            type='text'
                            className='settings__change_block_inputs-item'
                          />
                        </div>
                      </div>
                      <div className='settings__change_block_inputs'>
                        <div className='settings__change_block_inputs-wrapper'>
                          <div className='settings__change_block_title'>
                            Дом
                          </div>
                          <input
                            value={changeAdress.flat_number}
                            onChange={updateAdress}
                            name='flat_number'
                            type='text'
                            className='settings__change_block_inputs-item'
                          />
                        </div>
                      </div>
                      <div className='settings__change_block_buttons'>
                        <button
                          className='settings__change_block_buttons_cancel'
                          onClick={() => setChange({ adress: false })}
                        >
                          Отменить
                        </button>
                        <button
                          className='settings__change_block_buttons_save'
                          onClick={onClickSaveDelivery}
                        >
                          Сохранить изменения
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className='settings__change_block'>
                      <button
                        className='settings__change-btn contacts'
                        onClick={() => setChange({ adress: !change.adress })}
                      >
                        <img src='../assets/img/pen-edit.png' alt='' />
                      </button>

                      <div className='settings__change_block_inputs'>
                        <div className='settings__change_block_inputs-wrapper'>
                          <div className='settings__change_block_title'>
                            Страна
                          </div>

                          <div className='settings__change_block_inputs-item'>
                            {changeAdress.country}
                          </div>
                        </div>
                        <div className='settings__change_block_inputs-wrapper'>
                          <div className='settings__change_block_title'>
                            Город
                          </div>
                          <div className='settings__change_block_inputs-item'>
                            {changeAdress.city}
                          </div>
                        </div>
                      </div>
                      <div className='settings__change_block_inputs'>
                        <div className='settings__change_block_inputs-wrapper'>
                          <div className='settings__change_block_title'>
                            Улица
                          </div>
                          <div className='settings__change_block_inputs-item'>
                            {changeAdress.street}
                          </div>
                        </div>
                        <div className='settings__change_block_inputs-wrapper'>
                          <div className='settings__change_block_title'>
                            Почтовый индекс
                          </div>
                          <div className='settings__change_block_inputs-item'>
                            {changeAdress.postal_code}
                          </div>
                        </div>
                      </div>
                      <div className='settings__change_block_inputs'>
                        <div className='settings__change_block_inputs-wrapper'>
                          <div className='settings__change_block_title'>
                            Дом
                          </div>
                          <div className='settings__change_block_inputs-item'>
                            {changeAdress.flat_number}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : null}
              {active.password ? (
                <div className='settings__change'>
                  <div className='settings__change_title'>Изменение пароля</div>

                  {change.password ? (
                    <div className='settings__change_block'>
                      <div className='settings__change_block_inputs'>
                        <div className='settings__change_block_inputs-wrapper'>
                          <div className='settings__change_block_title'>
                            Текущий пароль
                          </div>
                          <input
                            onChange={updatePassword}
                            value={changePassword.curr_password}
                            name='curr_password'
                            type='text'
                            className='settings__change_block_inputs-item'
                          />
                        </div>
                        <div className='settings__change_block_inputs-wrapper'>
                          <div className='settings__change_block_title'>
                            Новый пароль
                          </div>
                          <input
                            onChange={updatePassword}
                            value={changePassword.new_password}
                            name='new_password'
                            type='text'
                            className='settings__change_block_inputs-item'
                          />
                        </div>
                      </div>
                      <div className='settings__change_block_inputs'>
                        <div className='settings__change_block_inputs-wrapper'>
                          <div className='settings__change_block_title'>
                            Повторите пароль
                          </div>

                          <input
                            onChange={updatePassword}
                            value={changePassword.conf_password}
                            name='conf_password'
                            type='text'
                            className='settings__change_block_inputs-item'
                          />
                        </div>
                      </div>
                      <div className='settings__change_block_buttons'>
                        <button
                          className='settings__change_block_buttons_cancel'
                          onClick={() => setChange({ password: false })}
                        >
                          Отменить
                        </button>
                        <button
                          onClick={onClickSavePassword}
                          className='settings__change_block_buttons_save'
                        >
                          Сохранить изменения
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className='settings__change_block'>
                      <button
                        className='settings__change-btn contacts'
                        onClick={() =>
                          setChange({ password: !change.password })
                        }
                      >
                        <img src='../assets/img/pen-edit.png' alt='' />
                      </button>

                      <div className='settings__change_block_inputs'>
                        <div className='settings__change_block_inputs-wrapper'>
                          <div className='settings__change_block_title'>
                            Текущий пароль
                          </div>
                          <div className='settings__change_block_inputs-item'></div>
                        </div>
                        <div className='settings__change_block_inputs-wrapper'>
                          <div className='settings__change_block_title'>
                            Новый пароль
                          </div>
                          <div className='settings__change_block_inputs-item'></div>
                        </div>
                      </div>
                      <div className='settings__change_block_inputs'>
                        <div className='settings__change_block_inputs-wrapper'>
                          <div className='settings__change_block_title'>
                            Повторите пароль
                          </div>
                          <div className='settings__change_block_inputs-item'></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Settings
