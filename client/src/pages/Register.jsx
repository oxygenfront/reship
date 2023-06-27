import React, { useEffect, useRef, useState } from 'react';
import InputMask from 'react-input-mask';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import {
  fetchAuthMe,
  fetchRegister,
  selectIsAuth,
} from '../redux/slices/authSlice';

import { AddressSuggestions } from 'react-dadata';
const Register = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const [checkPass, setCheckPass] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [nextPage, setNextPage] = useState(false);
  const [adress, setAdress] = useState('');
  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmPassword: false,
  });
  const [hasFocus, setHasFocus] = useState({
    newPassword: false,
    confirmPassword: false,
  });

  const [regForm, setRegForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    newPassword: '',
    confirmPassword: '',
    birthdate: '',
    adress_delivery: adress,
  });
  const inputsRef = useRef([]);

  const handleKeyDown = (event, index) => {
    if (event.key === 'Enter') {
      const nextIndex = index + 1;
      if (nextIndex < inputsRef.current.length) {
        if (
          inputsRef.current[nextIndex] &&
          inputsRef.current[nextIndex].focus
        ) {
          inputsRef.current[nextIndex].focus();
        }
      }
    }
  };
  const handleNextPage = (event) => {
    if (event.key === 'Enter') {
      setNextPage(!nextPage);
    }
  };
  const timeStamp = new Date(
    regForm.birthdate.toLocaleString().split('-').reverse().join('.')
  ).getTime();
  const form = {
    first_name: regForm.firstName,
    last_name: regForm.lastName,
    password: regForm.confirmPassword,
    email: regForm.email,
    date_of_birth_unix: timeStamp,
    adress_delivery: adress,
  };
  const updateForm = (e) => {
    setRegForm({
      ...regForm,
      [e.target.name]: e.target.value,
    });
  };

  const closeError = (e) => {
    e.preventDefault();
    setCheckPass(true);
  };

  const handleChildFocus = (e) => {
    setHasFocus({ [e.target.name]: !hasFocus[e.target.name] });
    // console.log(!hasFocus[e.target.name]);
  };

  const handleChildBlur = (e) => {
    setHasFocus({ [e.target.name]: !hasFocus[e.target.name] });
  };

  const sendForm = async (e) => {
    e.preventDefault();

    if (regForm.newPassword === regForm.confirmPassword) {
      setCheckPass(true);
      console.log(form);
      const data = await dispatch(
        fetchRegister({ ...form, adress_delivery: JSON.stringify({ adress }) })
      );
      if (!data.payload) {
        return alert('Не удалось зарегистрироваться');
      }

      if ('token' in data.payload) {
        window.localStorage.setItem('token', data.payload.token);

        await dispatch(fetchAuthMe(data.payload.token));
      }
      setRegForm({
        firstName: '',
        lastName: '',
        email: '',
        password: { newPassword: '', confirmPassword: '' },
        birthdate: '',
        adress_delivery: '',
      });
    } else {
      setCheckPass(false);
    }
  };

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isAuth) {
    return <Navigate to='/' />;
  }
  // console.log(adress);
  return (
    <section className='register'>
      <div className='container register__container'>
        {!nextPage ? (
          <div className='register__wrapper'>
            <div className='register__wrapper-title'>Регистрация</div>
            <hr className='hr' />
            <form action=''>
              <input
                autoFocus
                className='register__wrapper-input'
                type='text'
                name='email'
                placeholder='Адрес электронной почты'
                value={regForm.email}
                onChange={updateForm}
                onKeyDown={(e) => handleKeyDown(e, 0)}
                ref={(el) => (inputsRef.current[0] = el)}
              />
              <div
                className='register__wrapper-input pass'
                style={{
                  border: hasFocus.newPassword ? '2px solid #416EF2' : null,
                }}
              >
                <input
                  type={showPassword.newPassword ? 'text' : 'password'}
                  name='newPassword'
                  placeholder='Пароль'
                  value={regForm.newPassword}
                  onChange={updateForm}
                  onKeyDown={(e) => handleKeyDown(e, 1)}
                  ref={(el) => (inputsRef.current[1] = el)}
                  onFocus={(e) => handleChildFocus(e)}
                  onBlur={(e) => handleChildBlur(e)}
                />
                {showPassword.newPassword ? (
                  <HiOutlineEye
                    style={{ cursor: 'pointer', fontSize: '25px' }}
                    onClick={() =>
                      setShowPassword({ ...showPassword, newPassword: false })
                    }
                  />
                ) : (
                  <HiOutlineEyeOff
                    style={{ cursor: 'pointer', fontSize: '25px' }}
                    onClick={() =>
                      setShowPassword({ ...showPassword, newPassword: true })
                    }
                  />
                )}
              </div>
              <div
                className='register__wrapper-input pass'
                style={{
                  border: hasFocus.confirmPassword ? '2px solid #416EF2' : null,
                }}
              >
                <input
                  type={showPassword.confirmPassword ? 'text' : 'password'}
                  name='confirmPassword'
                  placeholder='Повторите пароль'
                  value={regForm.confirmPassword}
                  onChange={updateForm}
                  onKeyDown={(e) => handleNextPage(e, 2)}
                  ref={(el) => (inputsRef.current[2] = el)}
                  onFocus={(e) => handleChildFocus(e)}
                  onBlur={(e) => handleChildBlur(e)}
                />
                {showPassword.confirmPassword ? (
                  <HiOutlineEye
                    style={{ cursor: 'pointer', fontSize: '25px' }}
                    onClick={() =>
                      setShowPassword({
                        ...showPassword,
                        confirmPassword: false,
                      })
                    }
                  />
                ) : (
                  <HiOutlineEyeOff
                    style={{ cursor: 'pointer', fontSize: '25px' }}
                    onClick={() =>
                      setShowPassword({
                        ...showPassword,
                        confirmPassword: true,
                      })
                    }
                  />
                )}
              </div>
            </form>
            <div className='register__wrapper-link'>
              Уже есть аккаунт? <Link to='/login'>Войти</Link>
            </div>

            <div className='register__wrapper-buttons'>
              <Link to='/forgot' className='register__wrapper-buttons_forgot'>
                Забыл пароль
              </Link>
              <button
                className='register__wrapper-buttons_next'
                onClick={() => setNextPage(!nextPage)}
              >
                Продолжить
              </button>
            </div>
          </div>
        ) : (
          <div className='register__wrapper second-page'>
            <div className='register__wrapper-title'>Регистрация</div>
            <hr className='hr' />
            <form
              action=''
                style={{ display: windowWidth <= 575 ? 'flex' : 'block', flexDirection: windowWidth <= 575 ? 'column' : 'row', }}
            >
              <input
                autoFocus
                className='register__wrapper-input second-page sm'
                type='text'
                name='firstName'
                placeholder='Имя'
                value={regForm.firstName}
                onChange={updateForm}
                onKeyDown={(e) => handleKeyDown(e, 3)}
                // ref={(el) => (inputsRef.current[3] = el)}
              />
              <input
                className='register__wrapper-input second-page sm'
                type='text'
                name='lastName'
                placeholder='Фамилия'
                value={regForm.lastName}
                onChange={updateForm}
                onKeyDown={(e) => handleKeyDown(e, 4)}
                ref={(el) => (inputsRef.current[4] = el)}
              />
              <InputMask
                mask='99-99-9999'
                className='register__wrapper-input second-page sm db'
                type='text'
                name='birthdate'
                placeholder='XX-XX-XXXX'
                value={regForm.birthdate}
                onChange={updateForm}
              />
              <AddressSuggestions
                className='register__wrapper-input second-page'
                setInputValue={regForm.adress_delivery}
                token='82173f834fc389954239d4414514d3ce2634ae1e'
                value={regForm.adress_delivery}
                onChange={(event) => {
                  setAdress(event.value);
                }}
                inputProps={{
                  placeholder: 'Страна, город',
                  value: adress,
                  onKeyDown: () => sendForm,
                  onChange: (event) => {
                    setAdress(event.target.value);
                  },
                }}
              />
            </form>
            <div className='register__wrapper-link'>
              Уже есть аккаунт? <Link to='/login'>Войти</Link>
            </div>

            <div className='register__wrapper-buttons second-page'>
              <button
                className='register__wrapper-buttons_prev'
                onClick={() => setNextPage(!nextPage)}
              >
                Назад
              </button>
              <button
                className='register__wrapper-buttons_next second-page'
                onClick={sendForm}
              >
                Готово
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Register;
