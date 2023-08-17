import { useCallback, useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import styles from './Menu.module.sass';
import {
  setChoosenCategorie,
  setChoosenType,
} from '../../redux/slices/fiterSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const Modal = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch();

  const [localCategory, setLocalCategory] = useState('Мышки');
  const [localCategoryEn, setLocalCategoryEn] = useState('mouse');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const onChangeCategory = useCallback((sort) => {
    dispatch(setChoosenCategorie(sort));
  }, []);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  console.log(localCategory);

  return (
    <Dialog
      as='div'
      className={styles.modal}
      open={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <div className={styles.modal_bg} aria-hidden='true'></div>
      <div className={styles.modal_scroll}>
        <div className={styles.modal_container}>
          <Dialog.Panel>
            {windowWidth < 767 ? (
              <div className={styles.modal_items}>
                <div className={styles.modal_top}>
                  <div className={styles.modal_leftcol}>
                    <ul>
                      <li
                        className={
                          localCategory === 'Мышки'
                            ? styles.modal_leftcol_active
                            : null
                        }
                        onClick={() => {
                          setLocalCategoryEn('mouse');
                          setLocalCategory('Мышки');
                        }}
                      >
                        <img src='../assets/img/mouse.svg' alt='mouse' />
                        Мышки
                      </li>
                      <li
                        className={
                          localCategory === 'Клавиатуры'
                            ? styles.modal_leftcol_active
                            : null
                        }
                        onClick={() => {
                          setLocalCategoryEn('boards');
                          setLocalCategory('Клавиатуры');
                        }}
                      >
                        <img src='../assets/img/keyboard.svg' alt='keyboard' />
                        Клавиатуры
                      </li>
                      <li
                        className={
                          localCategory === 'Наушники'
                            ? styles.modal_leftcol_active
                            : null
                        }
                        onClick={() => {
                          setLocalCategoryEn('headphones');
                          setLocalCategory('Наушники');
                        }}
                      >
                        <img
                          src='../assets/img/headphones.svg'
                          alt='headphones'
                        />
                        Наушники
                      </li>
                      <li
                        className={
                          localCategory === 'Микрофоны'
                            ? styles.modal_leftcol_active
                            : null
                        }
                        onClick={() => {
                          setLocalCategoryEn('microphone');
                          setLocalCategory('Микрофоны');
                        }}
                      >
                        <img
                          src='../assets/img/microfone.svg'
                          alt='microfone'
                        />
                        Микрофоны
                      </li>
                      <li
                        className={
                          localCategory === 'Аксессуары'
                            ? styles.modal_leftcol_active
                            : null
                        }
                        onClick={() => {
                          setLocalCategoryEn('accessory');
                          setLocalCategory('Аксессуары');
                        }}
                      >
                        <img src='../assets/img/accessory.svg' alt='access' />
                        Аксессуары
                      </li>
                      <li
                        className={
                          localCategory === 'Веб-камеры'
                            ? styles.modal_leftcol_active
                            : null
                        }
                        onClick={() => {
                          setLocalCategoryEn('camera');
                          setLocalCategory('Веб-камеры');
                        }}
                      >
                        <img src='../assets/img/camera.svg' alt='camera' />
                        Веб-камеры
                      </li>
                    </ul>
                  </div>
                  <div className={styles.modal_right}>
                    <Link
                      to='/catalog'
                      onClick={() => {
                        setIsOpen(false);
                        onChangeCategory(localCategory);
                      }}
                    >
                      <img
                        src={`../assets/img/${localCategoryEn}-main-catalog.png`}
                        alt='mouse'
                      />
                      <span>Просмотреть все {localCategory}</span>
                      <div className={styles.swiper_button_next_wrapper}>
                        <div className={styles.swiper_button_next}></div>
                      </div>
                    </Link>
                  </div>
                </div>

                <div className={styles.modal_center}>
                  <div className={styles.modal_center_title}>
                    <div>
                      <p>Особенности</p>
                    </div>
                    <div>
                      <p>Бренды</p>
                    </div>
                  </div>
                  <div className={styles.modal_center_items}>
                    {localCategory === '' ? (
                      <ul>
                        <li>Беспроводные</li>
                        <li>С русскими букавами</li>
                        <li>RGB-подсветка</li>
                        <li>Эргономичные </li>
                      </ul>
                    ) : null}

                    <ul>
                      <li>Varmilo</li>
                      <li>С русскими букавами</li>
                      <li>RGB-подсветка</li>
                      <li>Эргономичные </li>
                    </ul>
                  </div>
                  <div className={styles.modal_center_title}>
                    <div>
                      <p>Размер</p>
                    </div>
                  </div>
                  <div className={styles.modal_center_items}>
                    <ul>
                      <li>Полноразмерные 100%</li>
                      <li>Без нампада 75-80% </li>
                      <li>Без F-ряда 60-65%</li>
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.modal_items}>
                <div className={styles.modal_leftcol}>
                  <ul>
                    <li
                      className={
                        localCategory === 'Мышки'
                          ? styles.modal_leftcol_active
                          : null
                      }
                      onClick={() => {
                        setLocalCategoryEn('mouse');
                        setLocalCategory('Мышки');
                      }}
                    >
                      <img src='../assets/img/mouse.svg' alt='mouse' />
                      Мышки
                    </li>
                    <li
                      className={
                        localCategory === 'Клавиатуры'
                          ? styles.modal_leftcol_active
                          : null
                      }
                      onClick={() => {
                        setLocalCategoryEn('boards');
                        setLocalCategory('Клавиатуры');
                      }}
                    >
                      <img src='../assets/img/keyboard.svg' alt='keyboard' />
                      Клавиатуры
                    </li>
                    <li
                      className={
                        localCategory === 'Наушники'
                          ? styles.modal_leftcol_active
                          : null
                      }
                      onClick={() => {
                        setLocalCategoryEn('headphones');
                        setLocalCategory('Наушники');
                      }}
                    >
                      <img
                        src='../assets/img/headphones.svg'
                        alt='headphones'
                      />
                      Наушники
                    </li>
                    <li
                      className={
                        localCategory === 'Микрофоны'
                          ? styles.modal_leftcol_active
                          : null
                      }
                      onClick={() => {
                        setLocalCategoryEn('microphone');
                        setLocalCategory('Микрофоны');
                      }}
                    >
                      <img src='../assets/img/microfone.svg' alt='microfone' />
                      Микрофоны
                    </li>
                    <li
                      className={
                        localCategory === 'Аксессуары'
                          ? styles.modal_leftcol_active
                          : null
                      }
                      onClick={() => {
                        setLocalCategoryEn('accessory');
                        setLocalCategory('Аксессуары');
                      }}
                    >
                      <img src='../assets/img/accessory.svg' alt='access' />
                      Аксессуары
                    </li>
                    <li
                      className={
                        localCategory === 'Веб-камеры'
                          ? styles.modal_leftcol_active
                          : null
                      }
                      onClick={() => {
                        setLocalCategoryEn('camera');
                        setLocalCategory('Веб-камеры');
                      }}
                    >
                      <img src='../assets/img/camera.svg' alt='camera' />
                      Веб-камеры
                    </li>
                  </ul>
                </div>
                <div className={styles.modal_center}>
                  <div className={styles.modal_center_title}>
                    <div>
                      <p>Особенности</p>
                    </div>
                    <div>
                      <p>Бренды</p>
                    </div>
                  </div>
                  <div className={styles.modal_center_items}>
                    {localCategory === 'Мышки' ? (
                      <ul>
                        <li>Беспроводные</li>
                        <li>Проводные</li>
                        <li>С подсветкой</li>
                        <li>Эргономичные </li>
                      </ul>
                    ) : localCategory === 'Клавиатуры' ? (
                      <ul>
                        <li>Проводные</li>
                        <li>Беспроводные</li>
                        <li>С русскими букавами</li>
                        <li>RGB-подсветка </li>
                      </ul>
                    ) : localCategory === 'Наушники' ? (
                      <ul>
                        <li>Беспроводные</li>
                        <li>Проводные</li>
                        <li>С радиоканалом</li>
                        <li>С микрофоном</li>
                        <li>Со звуком 7.1</li>
                      </ul>
                    ) : localCategory === 'Микрофоны' ? (
                      <ul>
                        <li>С подсветкой</li>
                        <li>С пантографом</li>
                        <li>Подключение USB</li>
                        <li>Подключение XLR</li>
                      </ul>
                    ) : localCategory === 'Веб-камеры' ? (
                      <ul>
                        <li>1080p</li>
                        <li>1440p</li>
                        <li>30 FPS</li>
                        <li>60 FPS</li>
                      </ul>
                    ) : localCategory === 'Аксессуары' ? (
                      <ul>
                        <li>1080p</li>
                        <li>1440p</li>
                        <li>30 FPS</li>
                        <li>60 FPS</li>
                      </ul>
                    ) : null}

                    {localCategory === 'Мышки' ? (
                      <ul>
                        <li>Logitech </li>
                        <li>Razer</li>
                        <li>HyperX</li>
                        <li>Dragonfly </li>
                      </ul>
                    ) : localCategory === 'Клавиатуры' ? (
                      <ul>
                        <li>Akko</li>
                        <li>Steelseries</li>
                        <li>REDRAGON</li>
                        <li>MATHEW FL</li>
                        <li>ESPORTS</li>
                        <li>NuPhy</li>
                        <li>Wooting</li>
                        <li>CIDOO</li>
                        <li>SKYLOONG</li>
                        <li>Machenike</li>
                        <li>EPOMAKER</li>
                      </ul>
                    ) : localCategory === 'Наушники' ? (
                      <ul>
                        <li>Logitech</li>
                        <li>HyperX</li>
                        <li>Fifine</li>
                        <li>Havit</li>
                      </ul>
                    ) : localCategory === 'Микрофоны' ? (
                      <ul>
                        <li>Fifine</li>
                        <li>HyperX</li>
                      </ul>
                    ) : localCategory === 'Веб-камеры' ? (
                      <ul>
                        <li>Logitech</li>
                        <li>Fifine</li>
                      </ul>
                    ) : null}
                  </div>
                  {localCategory === 'Клавиатуры' && (
                    <div className={styles.modal_center_title}>
                      <div>
                        <p>Размер</p>
                      </div>
                    </div>
                  )}
                  <div className={styles.modal_center_items}>
                    {localCategory === 'Клавиатуры' ? (
                      <ul>
                        <li>Полноразмерные 100%</li>
                        <li>Без цифрового блока 75-80% </li>
                        <li>Без F-ряда 60-65%</li>
                      </ul>
                    ) : null}
                  </div>
                </div>
                <div className={styles.modal_right}>
                  <Link
                    to='/catalog'
                    onClick={() => {
                      setIsOpen(false);
                      onChangeCategory(localCategory);
                      dispatch(setChoosenType(''));
                    }}
                  >
                    <img
                      src={`../assets/img/${localCategoryEn}-main-catalog.png`}
                      alt='mouse'
                    />
                    <span>Просмотреть все {localCategory}</span>
                    <div className={styles.swiper_button_next_wrapper}>
                      <div className={styles.swiper_button_next}></div>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};

export default Modal;
