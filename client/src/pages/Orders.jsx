import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchGetOrdersById, selectOrderData } from '../redux/slices/orderSlice'
import { selectUserData } from '../redux/slices/authSlice'
import { OrdersItem } from '../components'

function Orders() {
  const dispatch = useDispatch()
  const { orders, ordersStatus } = useSelector(selectOrderData)
  const { data, status } = useSelector(selectUserData)

  useEffect(() => {
    status === 'success' &&
      dispatch(fetchGetOrdersById({ customer_id: data.id, type: 'all' }))
  }, [status])

  return (
    <div className="orders">
      <div className="orders__container container">
        <div className="orders__title">
          Мои <span>заказы</span>
        </div>
        {ordersStatus === 'success' &&
          orders.map((order) =>
            order.products.map((product) => (
              <OrdersItem
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                color={product.color}
                count={product.count}
              ></OrdersItem>
            ))
          )}
      </div>
    </div>
  )
}

export default Orders
