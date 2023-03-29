import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { CartItem } from '../components'

import { clearItems, selectCart } from '../redux/slices/cartSlice'

const Cart = () => {
  const dispatch = useDispatch()
  const { items, totalPrice } = useSelector(selectCart)
  const onClickClear = () => {
    dispatch(clearItems())
  }

  const totalCount = items.reduce((sum, item) => sum + item.count, 0)
  const deliveryPrice = totalCount === 1 ? 500 : 500 + (totalCount - 1) * 250

  if (!totalPrice) {
    return (
      <div className="person__delivery-history">
        <div
          className="person__delivery-history-mess"
          style={{ textAlign: 'center' }}
        >
          Вернитесь сюда позднее, а пока можете{' '}
          <Link to="/catalog">перейти в каталог</Link>, для выбора товара
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
        {!totalPrice ? (
          <div className="cart__title cart__title_none">
            Ваша корзина пока пуста
          </div>
        ) : null}

        <div className="cart__wrapper">
          <div className="person__delivery-items cart__delivery-items">
            {items.map((item) => (
              <CartItem key={item.id} {...item}></CartItem>
            ))}
          </div>
        </div>

        <div className="cart__total">
          <div className="cart__total-wrapper">
            <div className="cart__total-wrapper-info">
              <div className="cart__total-wrapper-info_suptotal">
                Общая стоимость заказа: <span> {totalPrice} ₽</span>
              </div>
              <div className="cart__total-wrapper-info_suptotal">
                Стоимость доставки: <span> {deliveryPrice} ₽</span>
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
