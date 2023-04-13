import React, { useEffect } from 'react'
import { AdminOrder } from '../components'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllOrders, selectAdminData } from '../redux/slices/adminSlice'
import { selectUserData } from '../redux/slices/authSlice'
import { Navigate } from 'react-router-dom'

const AdminOrders = () => {
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  const { orders, ordersStatus } = useSelector(selectAdminData)
  const { data, status } = useSelector(selectUserData)
  useEffect(() => {
    dispatch(fetchAllOrders({ token }))
  }, [])
  if (status === 'success' && data !== null) {
    if (data.admin !== 1) {
      return <Navigate to="/"></Navigate>
    }
  }
  return (
    <div className="admin-wrapper">
      <h1 className="admin-wrapper-title">Заказы </h1>
      <div className="admin-items-block">
        {ordersStatus === 'success' &&
          orders.map((item) => (
            <AdminOrder
              price={item.price}
              number={item.number}
              email={item.email}
              city={item.city}
              street={item.street}
              number_flat={item.number_flat}
              number_home={item.number_home}
              date_start={item.date_start}
              status={item.status}
              key={item.id}
              init={item.init}
              customer_id={item.customer_id}
              id={item.id}
              postal_code={item.postal_code}
              products={item.products}
            ></AdminOrder>
          ))}
      </div>
    </div>
  )
}

export default AdminOrders
