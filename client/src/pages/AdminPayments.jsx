import React, { useEffect } from 'react'
import { AdminPayment } from '../components'
import { useDispatch, useSelector } from 'react-redux'
import { fetchGetPayments, selectAdminData } from '../redux/slices/adminSlice'
import { selectUserData } from '../redux/slices/authSlice'
import { Navigate } from 'react-router-dom'

const AdminOrders = () => {
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')

  const { data, status } = useSelector(selectUserData)
  const { payments, paymentsStatus } = useSelector(selectAdminData)
  useEffect(() => {
    dispatch(fetchGetPayments({ token }))
  }, [])

  if (status === 'success' && data !== null) {
    if (data.admin !== 1) {
      return <Navigate to="/"></Navigate>
    }
  }
  return (
    <div className="admin-wrapper">
      <h1 className="admin-wrapper-title">Заказы ожидающие оплаты</h1>
      <div className="admin-items-block">
        {paymentsStatus === 'success' &&
          payments.map((item) => (
            <AdminPayment
              price={item.price}
              code={item.code}
              order_id={item.order_id}
              date_create={item.date_create}
              status={item.status}
              key={item.id}
              id={item.id}
            ></AdminPayment>
          ))}
      </div>
    </div>
  )
}

export default AdminOrders
