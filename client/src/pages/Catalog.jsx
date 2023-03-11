import React from 'react';
import { Card } from '../components';

const Catalog = () => {
  return (
    <section className='catalog'>
      <div className='container catalog__container'>
        <div className='catalog__supheader'>
          <h1 className='catalog__title'>Добро пожаловать в Каталог!</h1>
          <div className='search-section catalog-section'>
            <div className=' catalog-section__container'>
              <div className='search-section__search-block catalog-section-search__search-block'>
                <input
                  type='text'
                  placeholder='Поиск товара'
                  className='search-section__search-item'
                />
                <button className='search-section__search-block_glass'>
                  <i className='fa-solid fa-magnifying-glass'></i>
                </button>
              </div>
            </div>
          </div>
          <div className='main-catalog__buttons buttons__10'>
            <button
              className='main-catalog__buttons-item buttons__10-item catalog-section__buttons-item'
              id='catalog'
            >
              <span>Каталог</span>
            </button>

            <button
              className='main-catalog__buttons-item buttons__10-item catalog-section__buttons-item'
              id='news'
            >
              <span>Новинки</span>
            </button>

            <button
              className='main-catalog__buttons-item buttons__10-item
							catalog-section__buttons-item'
              id='action'
            >
              <span>Акции</span>
            </button>

            <button
              className='main-catalog__buttons-item buttons__10-item
							catalog-section__buttons-item'
              id='leaders'
            >
              <span>Лидеры продаж</span>
            </button>
          </div>
        </div>

        <div className='catalog__block' id='apple'>
          <div className='catalog__suptitle'>
            <span>Техника Apple</span>
          </div>

          <div href='#' className='catalog__items-block'>
            <Card></Card>
          </div>
        </div>

        <div className='catalog__block' id='board'>
          <div className='catalog__suptitle'>
            <span>Клавиатуры</span>
          </div>

          <div className='catalog__items-block'>
            <Card></Card>
          </div>
        </div>

        <div className='catalog__block' id='micro'>
          <div className='catalog__suptitle'>
            <span>Микрофоны</span>
          </div>

          <div className='catalog__items-block'>
            <Card></Card>
          </div>
        </div>

        <div className='catalog__block' id='mouse'>
          <div className='catalog__suptitle'>
            <span>Мышки</span>
          </div>

          <div className='catalog__items-block'>
            <Card></Card>
          </div>
        </div>

        <div className='catalog__block' id='headphones'>
          <div className='catalog__suptitle'>
            <span>Наушники</span>
          </div>

          <div className='catalog__items-block'>
            <Card></Card>
          </div>
        </div>

        <div className='catalog__block' id='access'>
          <div className='catalog__suptitle'>
            <span>Аксессуары</span>
          </div>

          <div className='catalog__items-block'>
            <Card></Card>
          </div>
        </div>

        <div className='catalog__block' id='news-block'>
          <div className='catalog__suptitle'>
            <span>Новинки</span>
          </div>

          <div className='catalog__items-block'>
            <Card></Card>
          </div>
        </div>

        <div className='catalog__block' id='action-block'>
          <div className='catalog__suptitle'>
            <span>Акции</span>
          </div>

          <div className='catalog__items-block'>
            <Card></Card>
          </div>
        </div>

        <div className='catalog__block' id='leaders-block'>
          <div className='catalog__suptitle'>
            <span>Лидеры продаж</span>
          </div>

          <div className='catalog__items-block'>
            <Card></Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Catalog;
