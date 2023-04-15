import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { CartItem } from '../components'

import { selectCart } from '../redux/slices/cartSlice'
import { fetchAuthMe } from '../redux/slices/authSlice'
import { calcTotalPrice } from '../utils/calcTotalPrice'
import { fetchCheckPromocode } from '../redux/slices/cartSlice'

const Cart = () => {
  const dispatch = useDispatch()
  const { items } = useSelector(selectCart)

  const totalPrice = calcTotalPrice(items)

  const totalCount = items.reduce((sum, item) => sum + item.count, 0)
  const deliveryPrice = totalCount === 1 ? 500 : 500 + (totalCount - 1) * 250
  const [promocode, setPromocode] = useState('')
  const token = localStorage.getItem('token')
  const [isPromocode, setIsPromocode] = useState(false)
  async function sendForm(e) {
    e.preventDefault()
    const data = await dispatch(fetchCheckPromocode({ token, promocode }))

    if (!data.payload) {
      alert('Не удалось использовать промокод')
      return setIsPromocode(true)
    }
    if (data.payload) {
      alert('Промокод применен')
      window.localStorage.setItem('promocode', data.payload.persent)
      return setIsPromocode(true)
    }

    setPromocode('')
  }

  if (!totalCount) {
    return (
      <div className="person__delivery-history">
        <div className="container person__delivery-history__container">
          <div className="person__delivery-history-mess">
            Вернитесь сюда позднее, а пока можете{' '}
            <Link to="/catalog">перейти в каталог</Link>, для выбора товара
          </div>
        </div>
      </div>
    )
  }

  return (
    <section className="cart">
      <div className="container cart__container">
        <div className="cart__title">
          Всего товаров: <span>{totalCount}</span>
        </div>

        <div className="cart__wrapper">
          <div className="person__delivery-items cart__delivery-items">
            {items.map((item) => (
              <CartItem
                key={item.id}
                color={item.color}
                name={item.name}
                count={item.count}
                price={item.price}
                id={item.id}
              ></CartItem>
            ))}
          </div>
        </div>

        <div className="cart__total">
          <div className="cart__total-wrapper">
            <div className="cart__total-wrapper-info">
              <div className="cart__total-wrapper-info_suptotal">
                Стоимость доставки: <span> {deliveryPrice} ₽</span>
              </div>
              <div className="cart__total-wrapper-info_suptotal">
                Стоимость заказа: <span> {totalPrice} ₽</span>
              </div>
              <div className="cart__total-wrapper-info_total">
                Итого к оплате:
              </div>
            </div>
            <div className="cart__total-wrapper-price">
              <span>
                {window.localStorage.getItem('promocode')
                  ? (totalPrice + deliveryPrice) *
                    (1 - window.localStorage.getItem('promocode') / 100)
                  : totalPrice + deliveryPrice}{' '}
                ₽
              </span>
            </div>
          </div>
          <div className="cart__total-wrapper-buttons">
            <Link
              to="/order"
              className="cart__total-wrapper-buttons_link buttons__16"
            >
              Оформить заказ
            </Link>
            <form action="">
              <input
                value={promocode}
                onChange={(e) => setPromocode(e.target.value)}
                type="text"
                className="cart__total-wrapper-buttons_inp"
                placeholder="Ввести промокод"
              />
              <button onClick={sendForm} type="submit">
                <img src="" alt="check" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Cart
