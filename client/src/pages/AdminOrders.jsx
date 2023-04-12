import React, { useEffect } from 'react'
import { AdminOrder } from '../components'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllOrders, selectAdminData } from '../redux/slices/adminSlice'

const AdminOrders = () => {
	const dispatch = useDispatch()
	const token = localStorage.getItem('token')
	const {orders, status} = useSelector(selectAdminData)
	useEffect(() => {
		dispatch(fetchAllOrders({token}))
	},[])
	return (
		<div className="admin-wrapper">
			<h1 className="admin-wrapper-title">Заказы </h1>
      <div className="admin-items-block">
        {status === 'success' && 
          orders.map((item) => (
            <AdminOrder price={item.price} number={item.number} email={item.email} city={item.city} street={item.street} number_flat={item.number_flat} number_home={item.number_home} date_start={item.date_start} status={item.status} key={item.id} init={item.init} customer_id={item.customer_id} id={item.id} postal_code={item.postal_code} products={item.products}></AdminOrder>
          ))}
      </div>
    </div>
	)
}

export default AdminOrders