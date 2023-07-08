import classNames from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';
import styles from './Footer.module.sass';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectFilter,
  setChoosenCategorie,
} from '../../redux/slices/fiterSlice';
const Footer = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const dispatch = useDispatch();
  const { choosenCategorie } = useSelector(selectFilter);
  const onChangeCategory = useCallback((sort) => {
    dispatch(setChoosenCategorie(sort));
  }, []);
  return (
    <footer className={styles.footer}>
      <div className={classNames(styles.container, styles.footer__container)}>
        {windowWidth > 991 ? (
          <div className={styles.footer__titles}>
            <div className={styles.footer__block}>
              <div className={styles.footer__title}>Магазин</div>
              <Link
                onClick={() => onChangeCategory('клавиатуры')}
                to='/catalog'
                className={styles.footer__block_suptitle}
              >
                Клавиатуры
              </Link>
              <Link
                to='/catalog'
                onClick={() => onChangeCategory('аксессуары')}
                className={styles.footer__block_suptitle}
              >
                Аксессуары
              </Link>
              <Link
                onClick={() => onChangeCategory('мышки')}
                to='/catalog'
                className={styles.footer__block_suptitle}
              >
                Мышки
              </Link>
            </div>
            <div className={styles.footer__block}>
              <div className={styles.footer__title}>Покупателям</div>
              <a href='/' className={styles.footer__block_suptitle}>
                Доставка и оплата
              </a>
              <a href='/' className={styles.footer__block_suptitle}>
                Гарантия и возврат
              </a>
              <a href='/' className={styles.footer__block_suptitle}>
                Политика конфиденцильности
              </a>
              <a href='/' className={styles.footer__block_suptitle}>
                Пользовательское соглашение
              </a>
              <a href='/' className={styles.footer__block_suptitle}>
                Договор-оферта
              </a>
            </div>
            <div className={styles.footer__block}>
              <div className={styles.footer__title}>Поддержка</div>
              <a href='/' className={styles.footer__block_suptitle}>
                Каждый день
              </a>
              <a href='/' className={styles.footer__block_suptitle}>
                11:00-20:00
              </a>
              <a href='/' className={styles.footer__block_suptitle}>
                Номер телефона
              </a>
            </div>
            <div className={styles.footer__block}>
              <div className={styles.footer__title}>Соцсети</div>
              <div className={styles.footer__block_social}>
                <a href='/' className={styles.footer__block_suptitle}>
                  <img src='../assets/img/vk.svg' alt='vk' />
                </a>
                <a href='/' className={styles.footer__block_suptitle}>
                  <img src='../assets/img/discord.svg' alt='discord' />
                </a>
                <a href='/' className={styles.footer__block_suptitle}>
                  <img
                    src='../assets/img/tg-decor.png'
                    alt='telegram'
                    width={'31px'}
                  />
                </a>
              </div>
            </div>
          </div>
        ) : windowWidth >= 767 && windowWidth <= 991 ? (
          <>
            <div className={styles.footer__titles}>
              <div className={styles.footer__block}>
                <div className={styles.footer__title}>Магазин</div>
                <Link
                  onClick={() => onChangeCategory('клавиатуры')}
                  to='/catalog'
                  className={styles.footer__block_suptitle}
                >
                  Клавиатуры
                </Link>
                <Link
                  to='/catalog'
                  onClick={() => onChangeCategory('аксессуары')}
                  className={styles.footer__block_suptitle}
                >
                  Аксессуары
                </Link>
                <Link
                  onClick={() => onChangeCategory('мышки')}
                  to='/catalog'
                  className={styles.footer__block_suptitle}
                >
                  Мышки
                </Link>
              </div>
              <div className={styles.footer__block}>
                <div className={styles.footer__title}>Покупателям</div>
                <a href='/' className={styles.footer__block_suptitle}>
                  Доставка и оплата
                </a>
                <a href='/' className={styles.footer__block_suptitle}>
                  Гарантия и возврат
                </a>
                <a href='/' className={styles.footer__block_suptitle}>
                  Политика конфиденцильности
                </a>
                <a href='/' className={styles.footer__block_suptitle}>
                  Пользовательское соглашение
                </a>
                <a href='/' className={styles.footer__block_suptitle}>
                  Договор-оферта
                </a>
              </div>
            </div>
            <div className={styles.footer__titles}>
              <div className={styles.footer__block}>
                <div className={styles.footer__title}>Поддержка</div>
                <a href='/' className={styles.footer__block_suptitle}>
                  Каждый день
                </a>
                <a href='/' className={styles.footer__block_suptitle}>
                  11:00-20:00
                </a>
                <a href='/' className={styles.footer__block_suptitle}>
                  Номер телефона
                </a>
              </div>
              <div className={styles.footer__block}>
                <div className={styles.footer__title}>Соцсети</div>
                <div className={styles.footer__block_social}>
                  <a href='/' className={styles.footer__block_suptitle}>
                    <img src='../assets/img/vk.svg' alt='vk' />
                  </a>
                  <a href='/' className={styles.footer__block_suptitle}>
                    <img src='../assets/img/discord.svg' alt='discord' />
                  </a>
                  <a href='/' className={styles.footer__block_suptitle}>
                    <img
                      src='../assets/img/tg-decor.png'
                      alt='telegram'
                      width={'31px'}
                    />
                  </a>
                </div>
              </div>
            </div>
          </>
        ) : windowWidth >= 575 && windowWidth <= 767 ? (
          <>
            <div className={styles.footer__titles}>
              <div className={styles.footer__block}>
                <div className={styles.footer__title}>Магазин</div>
                <Link
                  onClick={() => onChangeCategory('клавиатуры')}
                  to='/catalog'
                  className={styles.footer__block_suptitle}
                >
                  Клавиатуры
                </Link>
                <Link
                  to='/catalog'
                  onClick={() => onChangeCategory('аксессуары')}
                  className={styles.footer__block_suptitle}
                >
                  Аксессуары
                </Link>
                <Link
                  onClick={() => onChangeCategory('мышки')}
                  to='/catalog'
                  className={styles.footer__block_suptitle}
                >
                  Мышки
                </Link>
              </div>
              <div className={styles.footer__block}>
                <div className={styles.footer__title}>Покупателям</div>
                <a href='/' className={styles.footer__block_suptitle}>
                  Доставка и оплата
                </a>
                <a href='/' className={styles.footer__block_suptitle}>
                  Гарантия и возврат
                </a>
                <a href='/' className={styles.footer__block_suptitle}>
                  Политика конфиденцильности
                </a>
                <a href='/' className={styles.footer__block_suptitle}>
                  Пользовательское соглашение
                </a>
                <a href='/' className={styles.footer__block_suptitle}>
                  Договор-оферта
                </a>
              </div>
            </div>
            <div className={styles.footer__titles}>
              <div className={styles.footer__block}>
                <div className={styles.footer__title}>Поддержка</div>
                <a href='/' className={styles.footer__block_suptitle}>
                  Каждый день
                </a>
                <a href='/' className={styles.footer__block_suptitle}>
                  11:00-20:00
                </a>
                <a href='/' className={styles.footer__block_suptitle}>
                  Номер телефона
                </a>
              </div>
              <div className={styles.footer__block}>
                <div className={styles.footer__title}>Соцсети</div>
                <div className={styles.footer__block_social}>
                  <a href='/' className={styles.footer__block_suptitle}>
                    <img src='../assets/img/vk.svg' alt='vk' />
                  </a>
                  <a href='/' className={styles.footer__block_suptitle}>
                    <img src='../assets/img/discord.svg' alt='discord' />
                  </a>
                  <a href='/' className={styles.footer__block_suptitle}>
                    <img
                      src='../assets/img/tg-decor.png'
                      alt='telegram'
                      width={'31px'}
                    />
                  </a>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className={styles.footer__titles}>
              <div className={styles.footer__block}>
                <div className={styles.footer__title}>Магазин</div>
                <Link
                  onClick={() => onChangeCategory('клавиатуры')}
                  to='/catalog'
                  className={styles.footer__block_suptitle}
                >
                  Клавиатуры
                </Link>
                <Link
                  to='/catalog'
                  onClick={() => onChangeCategory('аксессуары')}
                  className={styles.footer__block_suptitle}
                >
                  Аксессуары
                </Link>
                <Link
                  onClick={() => onChangeCategory('мышки')}
                  to='/catalog'
                  className={styles.footer__block_suptitle}
                >
                  Мышки
                </Link>
              </div>
            </div>
            <div className={styles.footer__titles}>
              <div className={styles.footer__block}>
                <div className={styles.footer__title}>Покупателям</div>
                <a href='/' className={styles.footer__block_suptitle}>
                  Доставка и оплата
                </a>
                <a href='/' className={styles.footer__block_suptitle}>
                  Гарантия и возврат
                </a>
                <a href='/' className={styles.footer__block_suptitle}>
                  Политика конфиденцильности
                </a>
                <a href='/' className={styles.footer__block_suptitle}>
                  Пользовательское соглашение
                </a>
                <a href='/' className={styles.footer__block_suptitle}>
                  Договор-оферта
                </a>
              </div>
              <div className={styles.footer__block}>
                <div className={styles.footer__title}>Поддержка</div>
                <a href='/' className={styles.footer__block_suptitle}>
                  Каждый день
                </a>
                <a href='/' className={styles.footer__block_suptitle}>
                  11:00-20:00
                </a>
                <a href='/' className={styles.footer__block_suptitle}>
                  Номер телефона
                </a>
              </div>
              <div className={styles.footer__block}>
                <div className={styles.footer__title}>Соцсети</div>
                <div className={styles.footer__block_social}>
                  <a href='/' className={styles.footer__block_suptitle}>
                    <img src='../assets/img/vk.svg' alt='vk' />
                  </a>
                  <a href='/' className={styles.footer__block_suptitle}>
                    <img src='../assets/img/discord.svg' alt='discord' />
                  </a>
                  <a href='/' className={styles.footer__block_suptitle}>
                    <img
                      src='../assets/img/tg-decor.png'
                      alt='telegram'
                      width={'31px'}
                    />
                  </a>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </footer>
  );
};

export default Footer;
