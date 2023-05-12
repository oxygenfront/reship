import { useEffect, useState } from 'react'
import InputMask from 'react-input-mask'
import { useSelector } from 'react-redux'
import { selectUserData } from '../redux/slices/authSlice'

function Settings() {
  const { data, status } = useSelector(selectUserData)
  const [active, setActive] = useState({
    profile: true,
    contacts: false,
    adress: false,
  })
  const [changeProfile, setChangeProfile] = useState({
    first_name: '',
    last_name: '',
  })

  const [changeContacts, setChangeContacts] = useState({
    email: '',
    telephone_number: '',
    date_born: '',
    country: '',
  })
  const [changeAdress, setChangeAdress] = useState({
    country: '',
    city: '',
    street: '',
    postal_code: '',
    flat_number: '',
  })
  const [change, setChange] = useState({
    profile: false,
    contacts: false,
    adress: false,
  })
  const updateProfile = (e) => {
    setChangeProfile({
      ...changeProfile,
      [e.target.name]: e.target.value,
    })
  }
  useEffect(() => {
    if (status === 'success') {
      setChangeProfile({
        first_name: data.first_name,
        last_name: data.last_name,
      })
      setChangeContacts({
        email: data.email,
      })
    }
  }, [status])

  return (
    <>
      <div className="settings">
        <div className="settings__container container">
          <div className="settings__title">Настройки</div>
          <div className="settings__wrapper">
            <div className="settings__buttons-block">
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
            </div>

            <div className="settings__change-wrapper">
              <div className="settings__profile">
                <div className="settings__profile-preview">
                  <div className="settings__profile-preview_img-block">
                    <img src="../assets/user_img/default.jpg" alt="" />
                  </div>
                  <div className="settings__profile-preview_info-block">
                    {status === 'success' && (
                      <>
                        <div className="settings__profile-preview_info-block_name">
                          {data.first_name} {data.last_name}
                        </div>
                        <div className="settings__profile-preview_info-block_about">
                          Россия, Москва, <br /> 19 лет
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
                    className="settings__change-btn"
                  >
                    <img src="../assets/img/pen-edit.png" alt="" />
                  </button>
                </div>
              </div>

              {change.profile ? (
                <div className="settings__change">
                  <div className="settings__change_title">Профиль</div>

                  <div className="settings__change_block">
                    <div className="settings__change_block_title">Фото</div>
                    <div className="settings__change_block_img-block">
                      <img src="../assets/user_img/default.jpg" alt="" />
                    </div>
                    <div className="settings__change_block_inputs">
                      <div className="settings__change_block_inputs-wrapper">
                        <div className="settings__change_block_title">Имя</div>
                        <input
                          onChange={updateProfile}
                          value={changeProfile.first_name}
                          type="text"
                          className="settings__change_block_inputs-item"
                        />
                      </div>
                      <div className="settings__change_block_inputs-wrapper">
                        <div className="settings__change_block_title">
                          Фамилия
                        </div>
                        <input
                          onChange={updateProfile}
                          value={changeProfile.last_name}
                          type="text"
                          className="settings__change_block_inputs-item"
                        />
                      </div>
                    </div>
                    <div className="settings__change_block_buttons">
                      <button
                        className="settings__change_block_buttons_cancel"
                        onClick={() => setChange({ profile: false })}
                      >
                        Отменить
                      </button>
                      <button className="settings__change_block_buttons_save">
                        Сохранить изменения
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}

              {active.contacts ? (
                <div className="settings__change">
                  <div className="settings__change_title">
                    Контактная <br /> Информация
                  </div>

                  {change.contacts ? (
                    <div className="settings__change_block">
                      <div className="settings__change_block_inputs">
                        <div className="settings__change_block_inputs-wrapper">
                          <div className="settings__change_block_title">
                            Электронная почта
                          </div>
                          <input
                            onChange={setChangeContacts}
                            value={changeContacts.email}
                            type="text"
                            className="settings__change_block_inputs-item"
                          />
                        </div>
                        <div className="settings__change_block_inputs-wrapper">
                          <div className="settings__change_block_title">
                            Номер телефона
                          </div>
                          <InputMask
                            type="text"
                            mask="+7 (999) 999-99-99"
                            placeholder="+7 (___) ___-__-__"
                            className="settings__change_block_inputs-item"
                          />
                        </div>
                      </div>
                      <div className="settings__change_block_inputs">
                        <div className="settings__change_block_inputs-wrapper">
                          <div className="settings__change_block_title">
                            Дата рождения
                          </div>
                          <InputMask
                            mask="99.99.9999"
                            placeholder="XX-XX-XXXX"
                            type="text"
                            className="settings__change_block_inputs-item"
                          />
                        </div>
                        <div className="settings__change_block_inputs-wrapper">
                          <div className="settings__change_block_title">
                            Страна, город
                          </div>
                          <input
                            type="text"
                            className="settings__change_block_inputs-item"
                          />
                        </div>
                      </div>
                      <div className="settings__change_block_buttons">
                        <button
                          className="settings__change_block_buttons_cancel"
                          onClick={() => setChange({ contacts: false })}
                        >
                          Отменить
                        </button>
                        <button className="settings__change_block_buttons_save">
                          Сохранить изменения
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="settings__change_block">
                      <button
                        className="settings__change-btn contacts"
                        onClick={() =>
                          setChange({ contacts: !change.contacts })
                        }
                      >
                        <img src="../assets/img/pen-edit.png" alt="" />
                      </button>

                      <div className="settings__change_block_inputs">
                        <div className="settings__change_block_inputs-wrapper">
                          <div className="settings__change_block_title">
                            Электронная почта
                          </div>
                          <div className="settings__change_block_inputs-item">
                            {changeContacts.email}
                          </div>
                        </div>
                        <div className="settings__change_block_inputs-wrapper">
                          <div className="settings__change_block_title">
                            Номер телефона
                          </div>
                          <div className="settings__change_block_inputs-item"></div>
                        </div>
                      </div>
                      <div className="settings__change_block_inputs">
                        <div className="settings__change_block_inputs-wrapper">
                          <div className="settings__change_block_title">
                            Дата рождения
                          </div>
                          <div className="settings__change_block_inputs-item"></div>
                        </div>
                        <div className="settings__change_block_inputs-wrapper">
                          <div className="settings__change_block_title">
                            Страна, город
                          </div>
                          <div className="settings__change_block_inputs-item"></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : null}

              {active.adress ? (
                <div className="settings__change">
                  <div className="settings__change_title">
                    Мои адреса{' '}
                    <button className="settings__change_add-adress"></button>
                  </div>

                  {change.adress ? (
                    <div className="settings__change_block">
                      <div className="settings__change_block_inputs">
                        <div className="settings__change_block_inputs-wrapper">
                          <div className="settings__change_block_title">
                            Страна
                          </div>
                          <input
                            type="text"
                            className="settings__change_block_inputs-item"
                          />
                        </div>
                        <div className="settings__change_block_inputs-wrapper">
                          <div className="settings__change_block_title">
                            Город
                          </div>
                          <input
                            type="text"
                            className="settings__change_block_inputs-item"
                          />
                        </div>
                      </div>
                      <div className="settings__change_block_inputs">
                        <div className="settings__change_block_inputs-wrapper">
                          <div className="settings__change_block_title">
                            Улица
                          </div>
                          <input
                            type="text"
                            className="settings__change_block_inputs-item"
                          />
                        </div>
                        <div className="settings__change_block_inputs-wrapper">
                          <div className="settings__change_block_title">
                            Почтовый индекс
                          </div>
                          <input
                            type="text"
                            className="settings__change_block_inputs-item"
                          />
                        </div>
                      </div>
                      <div className="settings__change_block_inputs">
                        <div className="settings__change_block_inputs-wrapper">
                          <div className="settings__change_block_title">
                            Квартира
                          </div>
                          <input
                            type="text"
                            className="settings__change_block_inputs-item"
                          />
                        </div>
                      </div>
                      <div className="settings__change_block_buttons">
                        <button
                          className="settings__change_block_buttons_cancel"
                          onClick={() => setChange({ adress: false })}
                        >
                          Отменить
                        </button>
                        <button className="settings__change_block_buttons_save">
                          Сохранить изменения
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="settings__change_block">
                      <button
                        className="settings__change-btn contacts"
                        onClick={() => setChange({ adress: !change.adress })}
                      >
                        <img src="../assets/img/pen-edit.png" alt="" />
                      </button>

                      <div className="settings__change_block_inputs">
                        <div className="settings__change_block_inputs-wrapper">
                          <div className="settings__change_block_title">
                            Страна
                          </div>
                          <div className="settings__change_block_inputs-item" />
                        </div>
                        <div className="settings__change_block_inputs-wrapper">
                          <div className="settings__change_block_title">
                            Город
                          </div>
                          <div className="settings__change_block_inputs-item" />
                        </div>
                      </div>
                      <div className="settings__change_block_inputs">
                        <div className="settings__change_block_inputs-wrapper">
                          <div className="settings__change_block_title">
                            Улица
                          </div>
                          <div className="settings__change_block_inputs-item" />
                        </div>
                        <div className="settings__change_block_inputs-wrapper">
                          <div className="settings__change_block_title">
                            Почтовый индекс
                          </div>
                          <div className="settings__change_block_inputs-item"></div>
                        </div>
                      </div>
                      <div className="settings__change_block_inputs">
                        <div className="settings__change_block_inputs-wrapper">
                          <div className="settings__change_block_title">
                            Квартира
                          </div>
                          <div className="settings__change_block_inputs-item"></div>
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
  )
}

export default Settings
