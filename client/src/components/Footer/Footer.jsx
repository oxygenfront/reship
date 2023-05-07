import classNames from 'classnames'
import React from 'react'
import styles from './Footer.module.sass'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={classNames(styles.container, styles.footer__container)}>
        <div className={styles.footer__titles}>
          <div className={styles.footer__title}>Магазин</div>
          <div className={styles.footer__title}>Покупателям</div>
          <div className={styles.footer__title}>Поддержка</div>
          <div className={styles.footer__title}>Соцсети</div>
        </div>
        <div className={styles.footer__blocks}>
          <div className={styles.footer__block}>
            <a href="#" className={styles.footer__block_suptitle}>
              Клавиатуры
            </a>
            <a href="#" className={styles.footer__block_suptitle}>
              Аксессуары
            </a>
            <a href="#" className={styles.footer__block_suptitle}>
              Мышки
            </a>
            <a href="#" className={styles.footer__block_suptitle}>
              Ремонт и апгрейд
            </a>
          </div>
          <div className={styles.footer__block}>
            <a href="#" className={styles.footer__block_suptitle}>
              Доставка и оплата
            </a>
            <a href="#" className={styles.footer__block_suptitle}>
              Гарантия и возврат
            </a>
            <a href="#" className={styles.footer__block_suptitle}>
              Политика конфиденцильности
            </a>
            <a href="#" className={styles.footer__block_suptitle}>
              Пользовательское соглашение
            </a>
            <a href="#" className={styles.footer__block_suptitle}>
              Договор-оферта
            </a>
          </div>
          <div className={styles.footer__block}>
            <a href="#" className={styles.footer__block_suptitle}>
              Каждый день
            </a>
            <a href="#" className={styles.footer__block_suptitle}>
              11:00-20:00
            </a>
            <a href="#" className={styles.footer__block_suptitle}>
              Номер телефона
            </a>
          </div>
          <div className={styles.footer__block_social}>
            <a href="#" className={styles.footer__block_suptitle}>
              <img src="../assets/img/vk.svg" alt="vk" />
            </a>
            <a href="#" className={styles.footer__block_suptitle}>
              <img src="../assets/img/discord.svg" alt="discord" />
            </a>
            <a href="#" className={styles.footer__block_suptitle}>
              <img
                src="../assets/img/tg-decor.png"
                alt="telegram"
                width={'31px'}
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
