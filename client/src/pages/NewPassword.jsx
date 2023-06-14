import React from 'react'

const NewPassword = () => {
  return (
    <div>
      <section className="auth">
        <div className="container auth__container">
          <div className="main-form">
            <h1 className="auth__title">Новый пароль</h1>

            <form className="main-form__form" action="">
              <input
                className="main-form__form-input"
                name="new_password"
                type="text"
                placeholder="Новый пароль"
              />
              <input
                className="main-form__form-input"
                name="conf_password"
                type="password"
                placeholder="Повторите пароль"
              />
              <button className="buttons__19" type="submit">
                Изменить пароль
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default NewPassword
