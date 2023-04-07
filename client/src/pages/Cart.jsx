import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { CartItem } from '../components'

import { clearItems, fetchCart, selectCart } from '../redux/slices/cartSlice'
import { fetchAuthMe, selectUserData } from '../redux/slices/authSlice'

const Cart = () => {
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  const { data, status } = useSelector(selectUserData)

  const items = status === 'success' ? data.basket : []
  if (status === 'success') {
    console.log(data.basket)
    console.log(items)
  }

  const totalPrice = items.reduce(
    (sum, item) => item.price * item.count + sum,
    0
  )
  console.log(totalPrice)
  const totalCount = items.reduce((sum, item) => sum + item.count, 0)
  const deliveryPrice = totalCount === 1 ? 500 : 500 + (totalCount - 1) * 250
  useEffect(() => {
    dispatch(fetchAuthMe(token))
  }, [])
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
            {status === 'success' &&
              data.basket.map((item) => (
                <CartItem
                  key={item.product_id}
                  name={item.name}
                  count={item.count}
                  price={item.price}
                  id={item.product_id}
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
              <span>{totalPrice + deliveryPrice} ₽</span>
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
                type="text"
                className="cart__total-wrapper-buttons_inp"
                placeholder="Ввести промокод"
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Cart
