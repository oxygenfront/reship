import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  fetchFullItem,
  selectFullItemData,
} from '../redux/slices/fullItemSlice'

const FullItem = () => {
  const { id } = useParams()
  const { item } = useSelector(selectFullItemData)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(fetchFullItem({ id }))
  }, [])
  console.log(item)
  return (
    <section className="card-section">
      <div className="container card-section__container">
        <div className="card-section__img-block">
          <img
            src="../assets/img/iphone-product-card.png"
            className="fiol"
            alt="iphone"
          />
        </div>

        <div className="card-section__about">
          <div className="card-section__about-name">{item.name}</div>
          <div className="card-section__about-info">
            Диагональ экрана: 6.1 дюйм
          </div>
          <div className="card-section__about-info">
            Разрешение (пикс): 1792x828
          </div>
          <div className="card-section__about-info">
            Фотокамера (Мп): 12 + 12
          </div>
          <div className="card-section__about-info">Оптический зум: x2</div>
          <div className="card-section__about-info-more">
            <div className="card-section__about-info">
              Какая-то доп. информация
            </div>
            <div className="card-section__about-info">
              Какая-то доп. информация
            </div>
            <div className="card-section__about-info">
              Какая-то доп. информация
            </div>
            <div className="card-section__about-info">
              Какая-то доп. информация
            </div>
            <div className="card-section__about-info">
              Какая-то доп. информация
            </div>
            <div className="card-section__about-info">
              Какая-то доп. информация
            </div>
          </div>
          <button className="card-section__about-btn show">
            Полный список характеристик
          </button>
          <button className="card-section__about-btn no-show">
            Скрыть список характеристик
          </button>
        </div>

        <hr className="card-section__hr" />

        <div className="card-section__choice">
          <div className="card-section__choice-block">
            <div className="card-section__choice-purchase">
              <span>{item.price} ₽</span>
              <Link to="/order">
                <span>Купить</span>
              </Link>
            </div>
            <div className="card-section__choice-blue-blocks">
              <button className="card-section__choice-blue-blocks_item">
                <img src="../assets/img/bag-white.svg" alt="" />
              </button>
              <button className="card-section__choice-blue-blocks_item">
                <img src="../assets/img/heart-white.svg" alt="" />
              </button>
            </div>
          </div>

          <div className="card-section__choice-char">
            <button className="card-section__choice-char_item">64 GB</button>
            <button className="card-section__choice-char_item">128 GB</button>
            <button className="card-section__choice-char_item">256 GB</button>
          </div>

          <div className="card-section__choice-color">
            <button className="card-section__choice-color-item"></button>
            <button className="card-section__choice-color-item"></button>
            <button className="card-section__choice-color-item"></button>
            <button className="card-section__choice-color-item"></button>
            <button className="card-section__choice-color-item"></button>
            <button className="card-section__choice-color-item"></button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FullItem
