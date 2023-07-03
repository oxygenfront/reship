import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchGetOrdersById, selectOrderData } from '../redux/slices/orderSlice'
import { selectIsAuth, selectUserData } from '../redux/slices/authSlice'
import { OrdersItem } from '../components'
import { Navigate } from 'react-router-dom'
import ContentLoader from 'react-content-loader'

function Orders() {
  const dispatch = useDispatch()
  const isAuth = useSelector(selectIsAuth)
  const { orders, ordersStatus } = useSelector(selectOrderData)
  const { data, status } = useSelector(selectUserData)
  const theme = useSelector((state) => state.theme)
  useEffect(() => {
    status === 'success' &&
      dispatch(
        fetchGetOrdersById({ customer_id: data.id, type: 'all', price: '' })
      )
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
        {ordersStatus !== 'success' ? (
          [...new Array(3)].map((_, index) => (
            <ContentLoader
              key={index}
              speed={1.5}
              width={736}
              height={250}
              viewBox="0 0 736 250"
              backgroundColor="#f2f2f2"
              foregroundColor="#7db3ed"
            >
              <rect x="17" y="32" rx="8" ry="8" width="144" height="113" />
              <rect x="188" y="40" rx="7" ry="7" width="170" height="21" />
              <rect x="197" y="98" rx="7" ry="7" width="100" height="17" />
              <rect x="455" y="162" rx="15" ry="15" width="120" height="34" />
              <rect x="564" y="70" rx="7" ry="7" width="81" height="22" />
              <rect x="605" y="130" rx="5" ry="5" width="23" height="18" />
              <circle cx="616" cy="176" r="20" />
              <rect x="574" y="33" rx="7" ry="7" width="50" height="17" />
            </ContentLoader>
          ))
        ) : ordersStatus === 'success' && orders.length > 0 ? (
          orders.map((order) =>
            order.products.map((product) => (
              <OrdersItem
                image={product.image}
                key={product.id}
                date_create={product.date_create}
                sdek_order={order.sdek_order}
                uuid={order.uuid_sdek}
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
