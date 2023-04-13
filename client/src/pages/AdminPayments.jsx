import React, { useEffect } from 'react'
import AdminPayment from '../components/AdminPayment/AdminPayment'
import { useDispatch, useSelector } from 'react-redux'
import { fetchGetPayments, selectAdminData } from '../redux/slices/adminSlice'
import { selectUserData } from '../redux/slices/authSlice'
import { Navigate } from 'react-router-dom'

const AdminOrders = () => {
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')

  const { data, status } = useSelector(selectUserData)
  useEffect(() => {
    dispatch(fetchGetPayments({ token }))
  }, [])
  const payments = [
    {
      id: 1,
      order_id: 10,
      price: 15000,
      data_create: '11.22.2022',
      status: 0,
    },
    {
      id: 2,
      order_id: 10,
      price: 12000,
      data_create: '11.22.2022',
      status: 0,
    },
  ]
  if (status === 'success' && data !== null) {
    if (data.admin !== 1) {
      return <Navigate to="/"></Navigate>
    }
  }
  return (
    <div className="admin-wrapper">
      <h1 className="admin-wrapper-title">Заказы ожидающие оплаты</h1>
      <div className="admin-items-block">
        {payments.map((item) => (
          <AdminPayment
            price={item.price}
            order_id={item.order_id}
            data_create={item.data_create}
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
