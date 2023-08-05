import React, { useEffect } from 'react'
import { AdminOrder } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllOrders, selectAdminData } from '../../redux/slices/adminSlice'
import { selectUserData } from '../../redux/slices/authSlice'
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
    <>
      {ordersStatus === 'success' &&
        orders.map((item, index) => (
          
          <AdminOrder
          key={index}
            obj={item}
          ></AdminOrder>
        ))}
    </>
  )
}

export default AdminOrders
