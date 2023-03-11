import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import CartItem from '../components/CartItem/CartItem'
import { clearItems, selectCart } from '../redux/slices/cartSlice'

const Cart = () => {
  const dispatch = useDispatch()
  // const { items, totalPrice } = useSelector(selectCart)
  const onClickClear = () => {
    dispatch(clearItems())
  }
  // const totalCount = items.reduce((sum, item) => sum + item.count, 0)
  return (
    <section className="cart">
      <div className="container cart__container">
        <div className="cart__title">
          Корзина: <span>3 товара</span>
        </div>
        <div
          className="cart__title cart__title_none"
          style={{ display: 'none' }}
        >
          Ваша корзина пока пуста
        </div>

        <div className="cart__wrapper">
          <div className="person__delivery-items cart__delivery-items">
            <CartItem></CartItem>
            <CartItem></CartItem>
            <CartItem></CartItem>
            <CartItem></CartItem>
          </div>
        </div>

        <div className="cart__total">
          <div className="cart__total-wrapper">
            <div className="cart__total-wrapper-info">
              <div className="cart__total-wrapper-info_suptotal">
                Общая стоимость заказа: <span> 545,545 ₽</span>
              </div>
              <div className="cart__total-wrapper-info_suptotal">
                Стоимость доставки: <span> 4334 ₽</span>
              </div>
              <div className="cart__total-wrapper-info_total">
                Итого к оплате:{' '}
              </div>
            </div>
            <div className="cart__total-wrapper-price">
              <span>56 150 ₽</span>{' '}
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

        <div className="cart__buttons" style={{ display: 'none' }}>
          <div className="cart__buttons-confirm buttons__29 cart__buttons-confirm_button">
            <button className="cart__buttons-confirm-item buttons__29-item">
              Оформить заказ
            </button>
          </div>
          <div className="cart__buttons-confirm buttons__29 cart__buttons-confirm_input">
            <input
              className="cart__buttons-confirm-input"
              placeholder="Ввести промокод (при наличии)"
            />
          </div>
        </div>

        <div className="person__delivery-history" style={{ display: 'none' }}>
          <div
            className="person__delivery-history-mess"
            style={{ textAlign: 'center' }}
          >
            Вернитесь сюда позднее, а пока можете{' '}
            <a href="#">перейти в каталог</a>, для выбора товара
          </div>
        </div>
      </div>
    </section>
  )
}

export default Cart
