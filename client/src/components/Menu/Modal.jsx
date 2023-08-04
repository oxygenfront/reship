import { useCallback, useEffect, useState } from 'react'
import { Dialog } from '@headlessui/react'
import styles from './Menu.module.sass'
import {
  setChoosenCategorie,
  setChoosenType,
} from '../../redux/slices/fiterSlice'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

const Modal = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch()

  const [localCategory, setLocalCategory] = useState('Мышки')
  const [localCategoryEn, setLocalCategoryEn] = useState('mouse')
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  const onChangeCategory = useCallback((sort) => {
    dispatch(setChoosenCategorie(sort))
  }, [])

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return (
    <Dialog
      as="div"
      className={styles.modal}
      open={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <div className={styles.modal_bg} aria-hidden="true"></div>
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
                          setLocalCategoryEn('mouse')
                          setLocalCategory('Мышки')
                        }}
                      >
                        <img src="../assets/img/mouse.svg" alt="mouse" />
                        Мышки
                      </li>
                      <li
                        className={
                          localCategory === 'Клавиатуры'
                            ? styles.modal_leftcol_active
                            : null
                        }
                        onClick={() => {
                          setLocalCategoryEn('boards')
                          setLocalCategory('Клавиатуры')
                        }}
                      >
                        <img src="../assets/img/keyboard.svg" alt="keyboard" />
                        Клавиатуры
                      </li>
                      <li
                        className={
                          localCategory === 'Наушники'
                            ? styles.modal_leftcol_active
                            : null
                        }
                        onClick={() => {
                          setLocalCategoryEn('headphones')
                          setLocalCategory('Наушники')
                        }}
                      >
                        <img
                          src="../assets/img/headphones.svg"
                          alt="headphones"
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
                          setLocalCategoryEn('microphone')
                          setLocalCategory('Микрофоны')
                        }}
                      >
                        <img
                          src="../assets/img/microfone.svg"
                          alt="microfone"
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
                          setLocalCategoryEn('accessory')
                          setLocalCategory('Аксессуары')
                        }}
                      >
                        <img src="../assets/img/accessory.svg" alt="access" />
                        Аксессуары
                      </li>
                      <li
                        className={
                          localCategory === 'Веб-камеры'
                            ? styles.modal_leftcol_active
                            : null
                        }
                        onClick={() => {
                          setLocalCategoryEn('camera')
                          setLocalCategory('Веб-камеры')
                        }}
                      >
                        <img src="../assets/img/camera.svg" alt="camera" />
                        Веб-камеры
                      </li>
                    </ul>
                  </div>
                  <div className={styles.modal_right}>
                    <Link
                      to="/catalog"
                      onClick={() => {
                        setIsOpen(false)
                        onChangeCategory(localCategory)
                      }}
                    >
                      <img
                        src={`../assets/img/${localCategoryEn}-main-catalog.png`}
                        alt="mouse"
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
                    <ul>
                      <li>Беспроводные</li>
                      <li>С русскими букавами</li>
                      <li>RGB-подсветка</li>
                      <li>Эргономичные </li>
                    </ul>
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
                        setLocalCategoryEn('mouse')
                        setLocalCategory('Мышки')
                      }}
                    >
                      <img src="../assets/img/mouse.svg" alt="mouse" />
                      Мышки
                    </li>
                    <li
                      className={
                        localCategory === 'Клавиатуры'
                          ? styles.modal_leftcol_active
                          : null
                      }
                      onClick={() => {
                        setLocalCategoryEn('boards')
                        setLocalCategory('Клавиатуры')
                      }}
                    >
                      <img src="../assets/img/keyboard.svg" alt="keyboard" />
                      Клавиатуры
                    </li>
                    <li
                      className={
                        localCategory === 'Наушники'
                          ? styles.modal_leftcol_active
                          : null
                      }
                      onClick={() => {
                        setLocalCategoryEn('headphones')
                        setLocalCategory('Наушники')
                      }}
                    >
                      <img
                        src="../assets/img/headphones.svg"
                        alt="headphones"
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
                        setLocalCategoryEn('microphone')
                        setLocalCategory('Микрофоны')
                      }}
                    >
                      <img src="../assets/img/microfone.svg" alt="microfone" />
                      Микрофоны
                    </li>
                    <li
                      className={
                        localCategory === 'Аксессуары'
                          ? styles.modal_leftcol_active
                          : null
                      }
                      onClick={() => {
                        setLocalCategoryEn('accessory')
                        setLocalCategory('Аксессуары')
                      }}
                    >
                      <img src="../assets/img/accessory.svg" alt="access" />
                      Аксессуары
                    </li>
                    <li
                      className={
                        localCategory === 'Веб-камеры'
                          ? styles.modal_leftcol_active
                          : null
                      }
                      onClick={() => {
                        setLocalCategoryEn('camera')
                        setLocalCategory('Веб-камеры')
                      }}
                    >
                      <img src="../assets/img/camera.svg" alt="camera" />
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
                    <ul>
                      <li>Беспроводные</li>
                      <li>С русскими букавами</li>
                      <li>RGB-подсветка</li>
                      <li>Эргономичные </li>
                    </ul>
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
                <div className={styles.modal_right}>
                  <Link
                    to="/catalog"
                    onClick={() => {
                      setIsOpen(false)
                      onChangeCategory(localCategory)
                      dispatch(setChoosenType(''))
                    }}
                  >
                    <img
                      src={`../assets/img/${localCategoryEn}-main-catalog.png`}
                      alt="mouse"
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
  )
}

export default Modal
