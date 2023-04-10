import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { addItem } from '../redux/slices/cartSlice'
import {
  fetchFullItem,
  selectFullItemData,
} from '../redux/slices/fullItemSlice'

const FullItem = () => {
  const [openFull, setOpenFull] = useState(false)
  const { id } = useParams()
  const { item, status } = useSelector(selectFullItemData)
  const dispatch = useDispatch()
  const onClickAdd = () => {
    const tovar = {
      id: item.id,
      name: item.name,
      image: item.image,
      price: item.price,
      count: 0,
    }
    dispatch(addItem(tovar))
  }
  useEffect(() => {
    dispatch(fetchFullItem({ id }))
  }, [])
  const renderStatus = Boolean(status === 'success')
  if (renderStatus) console.log()
  return (
    <section className="card-section">
      <div className="container card-section__container">
        <div className="card-section__img-block">
          <img
            src={`../assets/products_img/${id}.png`}
            className="fiol"
            alt="iphone"
          />
        </div>

        <div className="card-section__about">
          <div className="card-section__about-name">{item.name}</div>
          <div className="card-section__about-info">
            {renderStatus &&
              JSON.stringify(item.description_small)
                .replaceAll('"', '')
                .split('\\n')
                .map((str, index) => <p key={index}>{str}</p>)}
          </div>

          <div
            className={
              openFull
                ? 'card-section__about-info-more-active'
                : 'card-section__about-info-more'
            }
          >
            <div className="card-section__about-info">
              {renderStatus &&
                JSON.stringify(item.description_full)
                  .replaceAll('"', '')
                  .split('\\n')
                  .map((str, index) => <p key={index}>{str}</p>)}
            </div>
          </div>
          <button
            onClick={() => setOpenFull(!openFull)}
            className="card-section__about-btn show"
          >
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
              <Link to="/cart" onClick={onClickAdd}>
                <span>Купить</span>
              </Link>
            </div>
            <div className="card-section__choice-blue-blocks">
              <button
                onClick={onClickAdd}
                className="card-section__choice-blue-blocks_item"
              >
                <img src="../assets/img/bag-white.svg" alt="" />
              </button>
              <button className="card-section__choice-blue-blocks_item">
                <img src="../assets/img/heart-white.svg" alt="" />
              </button>
            </div>
          </div>

          <div className="card-section__choice-char">
            {renderStatus && item.category === 'клавиатуры' ? (
              JSON.parse(item.parameters).svitchi.map((param) => (
                <button key={param} className="card-section__choice-char_item">
                  {param}
                </button>
              ))
            ) : (
              <></>
            )}
          </div>

          {renderStatus && JSON.parse(item.colors_avail).length > 0 ? (
            <div className="card-section__choice-color">
              {JSON.parse(item.colors_avail).map((color, index) => (
                <button className="card-section__choice-color-item" key={index}>
                  {color}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}

export default FullItem
