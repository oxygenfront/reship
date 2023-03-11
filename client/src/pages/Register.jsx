import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <section className='auth'>
      <div className='container auth__container'>
        <h1 className='auth__title auth__title-reg'>
          <img src='./assets/img/reg.svg' alt='reg' />
          Добро пожаловать в ReShip!
        </h1>
        <div className='main-form'>
          <form className='main-form__form main-form__grid' action=''>
            <input
              className='main-form__form-input main-form__grid-input'
              type='text'
              placeholder='Имя'
            />
            <input
              className='main-form__form-input main-form__grid-input'
              type='password'
              placeholder='Придумайте пароль'
            />
            <input
              className='main-form__form-input main-form__grid-input'
              type='text'
              placeholder='Фамилия'
            />
            <input
              className='main-form__form-input main-form__grid-input'
              type='password'
              placeholder='Повторите пароль'
            />
            <input
              className='main-form__form-input main-form__grid-input'
              type='text'
              placeholder='Адресс эл. почты'
            />
            <input
              className='buttons__19 main-form__grid-input-btn'
              type='submit'
              value='Создать аккаунт'
            />
            <label className='main-form__form__label main-form__grid-input-label'>
              <p>
                Регистрируя аккаунт, вы принимаете
                <a href='#'> пользовательское соглашение</a> и даете согласие на
                обработку персональных данных
              </p>
            </label>
          </form>

          <div className='auth__links auth__links-auth'>
            <p className='auth__forgot'>Уже есть аккаунт?</p>
            <Link to='/login' className='auth__reg'>
              Войти
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
