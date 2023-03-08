import Accordeon from './components/Accordeon';
import CatalogMain from './components/CatalogMain';
import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';
import Slider from './components/Slider/Slider';
import './index.sass';

function App() {
  return (
    <div className='App'>
      <Header />
      <Menu />
      <Slider />
      <CatalogMain />
      <section className='reviews'>
        <div className='container reviews__container'>
          <div className='reviews__main-block'>
            <h1 className='reviews__main-block-title'>
              Ознакомьтесь с отзывами в нашем канале Discord
            </h1>
            <div className='reviews__main-block__links'>
              <a
                href='https://discord.com/channels/994699375014064198/994699375655788626'
                className='reviews__main-block__links-link buttons__16'
              >
                Перейти к отзывам
              </a>
              <div className='reviews__main-block__links-desc'>
                350+ реальных отзывов с фото
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='delpay' id='delpay'>
        <div className='container delpay__container'>
          <div className='delpay__title'>Доставка и оплата</div>
          <hr className='hr delpay__hr' />
          <p className='delpay__suptitle'>Полный процесс оформления заказа:</p>

          <div className='delpay__grid'>
            <div className='delpay__grid-item'>
              <div className='delpay__grid-item_title'>
                <img src='/img/check-mark 1.svg' alt='' />
                <p>Шаг 1</p>
              </div>
              <p>Зарегистрируйте аккаунт в нашем интернет-магазине</p>
            </div>
            <div className='delpay__grid-item'>
              <div className='delpay__grid-item_title'>
                <img src='/img/check-mark 1.svg' alt='' />
                <p>Шаг 2</p>
              </div>
              <p>Добавьте интересующий вас товар в корзину</p>
            </div>
            <div className='delpay__grid-item'>
              <div className='delpay__grid-item_title'>
                <img src='/img/check-mark 1.svg' alt='' />
                <p>Шаг 3</p>
              </div>
              <p>Перейдите в нее для дальнейшего оформления</p>
            </div>
            <div className='delpay__grid-item'>
              <div className='delpay__grid-item_title'>
                <img src='/img/check-mark 1.svg' alt='' />
                <p>Шаг 4</p>
              </div>
              <p>
                Заполните требуемые поля и произведите оплату с помощью удобного
                способа
              </p>
            </div>
            <div className='delpay__grid-item'>
              <div className='delpay__grid-item_title'>
                <img src='/img/check-mark 1.svg' alt='' />
                <p>Шаг 5</p>
              </div>
              <p>
                Заказ оформлен! Отследить его вы сможете в личном кабинете
                ReShip
              </p>
            </div>
            <div className='delpay__grid-item'>
              <div className='delpay__grid-item_title'>
                <img src='/img/check-mark 1.svg' alt='' />
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
      <footer className='footer'>
        <div className='container footer__container'>
          <div className='footer__titles'>
            <div className='footer__title'>Магазин</div>
            <div className='footer__title'>Покупателям</div>
            <div className='footer__title'>Поддержка</div>
            <div className='footer__title'>Соцсети</div>
          </div>
          <div className='footer__blocks'>
            <div className='footer__block'>
              <a href='#' className='footer__block-suptitle'>
                Клавиатуры
              </a>
              <a href='#' className='footer__block-suptitle'>
                Аксессуары
              </a>
              <a href='#' className='footer__block-suptitle'>
                Мышки
              </a>
              <a href='#' className='footer__block-suptitle'>
                Ремонт и апгрейд
              </a>
            </div>
            <div className='footer__block'>
              <a href='#' className='footer__block-suptitle'>
                Доставка и оплата
              </a>
              <a href='#' className='footer__block-suptitle'>
                Гарантия и возврат
              </a>
              <a href='#' className='footer__block-suptitle'>
                Политика конфиденцильности
              </a>
              <a href='#' className='footer__block-suptitle'>
                Пользовательское соглашение
              </a>
              <a href='#' className='footer__block-suptitle'>
                Договор-оферта
              </a>
            </div>
            <div className='footer__block'>
              <a href='#' className='footer__block-suptitle'>
                Каждый день
              </a>
              <a href='#' className='footer__block-suptitle'>
                11:00-20:00
              </a>
              <a href='#' className='footer__block-suptitle'>
                Номер телефона
              </a>
            </div>
            <div className='footer__block'>
              <a href='#' className='footer__block-suptitle'>
                Telegram
              </a>
              <a href='#' className='footer__block-suptitle'>
                ВКонтакте
              </a>
              <a href='#' className='footer__block-suptitle'>
                Discord
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
