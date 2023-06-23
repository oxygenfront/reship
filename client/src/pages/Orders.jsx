import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchGetOrdersById, selectOrderData } from '../redux/slices/orderSlice'
import { selectIsAuth, selectUserData } from '../redux/slices/authSlice'
import { OrdersItem } from '../components'
import { Navigate } from 'react-router-dom'

function Orders() {
  const dispatch = useDispatch()
  const isAuth = useSelector(selectIsAuth)
  const { orders, ordersStatus } = useSelector(selectOrderData)
  const { data, status } = useSelector(selectUserData)
  const theme = useSelector((state) => state.theme)
  useEffect(() => {
    status === 'success' &&
      dispatch(fetchGetOrdersById({ customer_id: data.id, type: 'all' }))
  }, [status])
  if (!isAuth) {
    return <Navigate to="/"></Navigate>
  }

  return (
    <div className="orders">
      <div className="orders__container container">
        <div className="orders__title">
          Мои <span>заказы</span>
        </div>
        {ordersStatus === 'success' && orders.length > 0 ? (
          orders.map((order) =>
            order.products.map((product) => (
              <OrdersItem
                image={product.image}
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                color={product.color}
                count={product.count}
              ></OrdersItem>
            ))
          )
        ) : (
          <div className="cart__empty_wrapper">
            <div className="container cart__empty_container">
              <div
                style={{
                  backgroundImage:
                    theme === 'dark'
                      ? `url('../assets/img/no-item black theme.png')`
                      : `url('../assets/img/no-item.png')`,
                  backgroundSize: 'cover',
                }}
                className="cart__empty"
              >
                У вас пока нет<br></br> заказов
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Orders
