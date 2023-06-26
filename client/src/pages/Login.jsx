import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import {
  fetchAuth,
  fetchAuthMe,
  selectIsAuth,
} from '../redux/slices/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const [authForm, setAuthForm] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);

  const handleChildFocus = () => {
    setHasFocus(true);
  };

  const handleChildBlur = () => {
    setHasFocus(false);
  };
  const inputsRef = useRef([]);
  const handleKeyDown = (event, index) => {
    if (event.key === 'Enter') {
      if (index < inputsRef.current.length - 1) {
        inputsRef.current[index + 1].focus();
      } else {
        sendForm(event);
      }
    }
  };

  const updateAuthForm = (e) => {
    setAuthForm({
      ...authForm,
      [e.target.name]: e.target.value,
    });
  };

  async function sendForm(e) {
    e.preventDefault();
    const data = await dispatch(fetchAuth(authForm));

    if (!data.payload) {
      return alert('Не удалось авторизоваться');
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
      dispatch(fetchAuthMe(data.payload.token));
    }

    setAuthForm({
      email: '',
      password: '',
    });
  }

  if (isAuth) {
    return <Navigate to='/' />;
  }

  return (
    <div>
      <section className='auth'>
        <div className='container auth__container'>
          <div className='auth_wrapper'>
            <h1 className='auth__title'>Войти</h1>
            <hr className='hr'></hr>
            <form className='auth__form' action=''>
              <input
                autoFocus
                className='auth__form-input'
                name='email'
                value={authForm.email}
                onChange={updateAuthForm}
                type='text'
                placeholder='Адрес электронной почты'
                ref={(ref) => (inputsRef.current[0] = ref)}
                onKeyDown={(event) => handleKeyDown(event, 0)}
              />
              <div
                className='auth__form-input'
                style={{ border: hasFocus ? '2px solid #416EF2' : null }}
              >
                <input
                  name='password'
                  value={authForm.password}
                  onChange={updateAuthForm}
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Пароль'
                  ref={(ref) => (inputsRef.current[1] = ref)}
                  onKeyDown={(event) => handleKeyDown(event, 1)}
                  onFocus={handleChildFocus}
                  onBlur={handleChildBlur}
                ></input>
                {showPassword ? (
                  <HiOutlineEye
                    style={{ cursor: 'pointer', fontSize: '25px' }}
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <HiOutlineEyeOff
                    style={{ cursor: 'pointer', fontSize: '25px' }}
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>
            </form>
            <div className='auth__links'>
              Новый пользователь?
              <Link to='/register' className='auth__reg'>
                Зарегистрируйтесь
              </Link>
            </div>
            <div className='auth__bottom'>
              <Link to='/forgot' className='auth__reg'>
                Забыл пароль
              </Link>
              <button className='auth__button' onClick={sendForm}>
                Выполнить вход
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
