import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setChoosenCategorie } from '../redux/slices/fiterSlice'

function CatalogMain() {
  const dispatch = useDispatch()

  const onChangeCategory = useCallback((sort) => {
    dispatch(setChoosenCategorie(sort))
  }, [])
  return (
    <section className="main-catalog">
      <div className="container main-catalog__container">
        <h1 className="main-catalog__title">Каталог продукции</h1>
        <div className="main-catalog__buttons buttons__10">
          <Link
            to="/catalog"
            className="main-catalog__buttons-item buttons__10-item"
            id="main-catalog"
          >
            <span>Каталог</span>
          </Link>
          <button
            className="main-catalog__buttons-item buttons__10-item"
            id="main-news"
          >
            <span>Новинки</span>
          </button>
          <button
            className="main-catalog__buttons-item buttons__10-item"
            id="main-action"
          >
            <span>Акции</span>
          </button>
          <button
            className="main-catalog__buttons-item buttons__10-item"
            id="main-leaders"
          >
            <span>Лидеры продаж</span>
          </button>
        </div>
        <hr className="hr" />
        <div className="main-catalog__preview">
          <Link
            to="/catalog"
            onClick={() => onChangeCategory('apple')}
            value={'apple'}
            className="main-catalog__preview-lg"
          >
            <div className="main-catalog__preview-lg_title">
              <span>Apple</span>
            </div>
            <img
              className="main-catalog__preview-lg_img"
              src="./assets/img/apple1.png"
              alt="apple"
            />
          </Link>
          <div className="main-catalog__preview-sm">
            <Link
              onClick={() => onChangeCategory('microphone')}
              to="/catalog#микрофоны"
              className="main-catalog__preview-sm-item"
            >
              <img
                src="./assets/img/free-icon-microphone-7548497 1.svg"
                alt="microphone"
              />
              <span>Микрофоны</span>
            </Link>
            <Link
              onClick={() => onChangeCategory('mouse')}
              to="/catalog"
              className="main-catalog__preview-sm-item"
            >
              <img
                src="./assets/img/free-icon-mouse-7545452 1.svg"
                alt="mouse"
              />
              <span>Мышки</span>
            </Link>
          </div>
          <div className="main-catalog__preview-sm">
            <Link
              onClick={() => onChangeCategory('headphone')}
              to="/catalog"
              className="main-catalog__preview-sm-item"
            >
              <img
                src="./assets/img/free-icon-headphone-1785480 1.svg"
                alt="headphones"
              />
              <span>Наушники</span>
            </Link>
            <Link
              onClick={() => onChangeCategory('access')}
              to="/catalog"
              className="main-catalog__preview-sm-item"
            >
              <img src="./assets/img/smartwatch 1.svg" alt="smartwatch" />
              <span>Аксессуары</span>
            </Link>
          </div>
          <Link
            onClick={() => onChangeCategory('board')}
            to="/catalog"
            className="main-catalog__preview-lg"
          >
            <div className="main-catalog__preview-lg_title">
              <span>Клавиатуры</span>
            </div>
            <img
              className="main-catalog__preview-lg_img"
              src="./assets/img/board1.png"
              alt="board"
            />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CatalogMain
