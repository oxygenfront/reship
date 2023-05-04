import React, { useEffect, useState } from 'react'
import { CatalogMain, Footer, Menu, Slider } from '../components'
import Accordeon from '../components/Accordeon'
const Home = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return (
    <>
      <Menu />
      <Slider />

      <CatalogMain />
      {/* <section
        className="reviews"
        style={{
          background: `url('./assets/img/Mask group.png')`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        <div className="container reviews__container">
          {windowWidth <= 767 ? (
            <div className="reviews__main-block">
              <h1 className="reviews__main-block-title">
                Ознакомьтесь с отзывами в нашем канале Discord
              </h1>
              <div className="reviews__main-block__links-desc">
                350+ реальных отзывов с фото
              </div>
              <div className="reviews__main-block__links">
                <a
                  href="https://discord.com/channels/994699375014064198/994699375655788626"
                  className="reviews__main-block__links-link buttons__16"
                >
                  Перейти к отзывам
                </a>
              </div>
            </div>
          ) : (
            <div className="reviews__main-block">
              <h1 className="reviews__main-block-title">
                Ознакомьтесь с отзывами в нашем канале Discord
              </h1>
              <div className="reviews__main-block__links">
                <a
                  href="https://discord.com/channels/994699375014064198/994699375655788626"
                  className="reviews__main-block__links-link buttons__16"
                >
                  Перейти к отзывам
                </a>
                <div className="reviews__main-block__links-desc">
                  350+ реальных отзывов с фото
                </div>
              </div>
            </div>
          )}
        </div>
      </section> */}
      <section className="delpay" id="delpay">
        <div className="container delpay__container">
          <div className="delpay__title">Доставка и оплата</div>
          <hr className="hr delpay__hr" />
          <p className="delpay__suptitle">Полный процесс оформления заказа:</p>

          <div className="delpay__grid">
            <div className="delpay__grid-item">
              <div className="delpay__grid-item_title">
                <img src="./assets/img/check-mark 1.svg" alt="" />
                <p>Шаг 1</p>
              </div>
              <p>Зарегистрируйте аккаунт в нашем интернет-магазине</p>
            </div>
            <div className="delpay__grid-item">
              <div className="delpay__grid-item_title">
                <img src="./assets/img/check-mark 1.svg" alt="" />
                <p>Шаг 2</p>
              </div>
              <p>Добавьте интересующий вас товар в корзину</p>
            </div>
            <div className="delpay__grid-item">
              <div className="delpay__grid-item_title">
                <img src="./assets/img/check-mark 1.svg" alt="" />
                <p>Шаг 3</p>
              </div>
              <p>Перейдите в нее для дальнейшего оформления</p>
            </div>
            <div className="delpay__grid-item">
              <div className="delpay__grid-item_title">
                <img src="./assets/img/check-mark 1.svg" alt="" />
                <p>Шаг 4</p>
              </div>
              <p>
                Заполните требуемые поля и произведите оплату с помощью удобного
                способа
              </p>
            </div>
            <div className="delpay__grid-item">
              <div className="delpay__grid-item_title">
                <img src="./assets/img/check-mark 1.svg" alt="" />
                <p>Шаг 5</p>
              </div>
              <p>
                Заказ оформлен! Отследить его вы сможете в личном кабинете
                ReShip
              </p>
            </div>
            <div className="delpay__grid-item">
              <div className="delpay__grid-item_title">
                <img src="./assets/img/check-mark 1.svg" alt="" />
                <p>Шаг 6</p>
              </div>
              <p>
                После получения заказа, вы можете оставить отзыв в Личном
                кабинете
              </p>
            </div>
          </div>
        </div>
      </section>
      <Accordeon />
      <Footer />
    </>
  )
}

export default Home
