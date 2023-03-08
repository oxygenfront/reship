import React from 'react';

function CatalogMain() {
  return (
    <section className='main-catalog'>
      <div className='container main-catalog__container'>
        <h1 className='main-catalog__title'>Каталог продукции</h1>
        <div className='main-catalog__buttons buttons__10'>
          <button
            className='main-catalog__buttons-item buttons__10-item'
            id='main-catalog'
          >
            <span>Каталог</span>
          </button>
          <button
            className='main-catalog__buttons-item buttons__10-item'
            id='main-news'
          >
            <span>Новинки</span>
          </button>
          <button
            className='main-catalog__buttons-item buttons__10-item'
            id='main-action'
          >
            <span>Акции</span>
          </button>
          <button
            className='main-catalog__buttons-item buttons__10-item'
            id='main-leaders'
          >
            <span>Лидеры продаж</span>
          </button>
        </div>
        <hr className='hr' />
        <div className='main-catalog__preview'>
          <a href='/catalog.html#apple' className='main-catalog__preview-lg'>
            <div className='main-catalog__preview-lg_title'>
              <span>Apple</span>
            </div>
            <img
              className='main-catalog__preview-lg_img'
              src='./img/apple1.png'
              alt=''
            />
          </a>
          <div className='main-catalog__preview-sm'>
            <a href='/catalog.html#micro' className='main-catalog__preview-sm-item'>
              <img src='/img/free-icon-microphone-7548497 1.svg' alt='' />
              <span>Микрофоны</span>
            </a>
            <a href='/catalog.html#mouse' className='main-catalog__preview-sm-item'>
              <img src='/img/free-icon-mouse-7545452 1.svg' alt='' />
              <span>Мышки</span>
            </a>
          </div>
          <div className='main-catalog__preview-sm'>
            <a
              href='/catalog.html#headphones'
              className='main-catalog__preview-sm-item'
            >
              <img src='/img/free-icon-headphone-1785480 1.svg' alt='' />
              <span>Наушники</span>
            </a>
            <a
              href='/catalog.html#access'
              className='main-catalog__preview-sm-item'
            >
              <img src='/img/smartwatch 1.svg' alt='' />
              <span>Аксессуары</span>
            </a>
          </div>
          <a href='/catalog.html#board' className='main-catalog__preview-lg'>
            <div className='main-catalog__preview-lg_title'>
              <span>Клавиатуры</span>
            </div>
            <img
              className='main-catalog__preview-lg_img'
              src='/img/board1.png'
              alt=''
            />
          </a>
        </div>
      </div>
    </section>
  );
}

export default CatalogMain;