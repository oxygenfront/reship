import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { fetchAllPromocodes, selectAdminData } from '../redux/slices/adminSlice'
import { AdminPromocode } from '../components'
import { selectIsAuth, selectUserData } from '../redux/slices/authSlice'
import {  Menu as Popup } from '@headlessui/react'

const AdminPromocodes = () => {
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  const isAuth = useSelector(selectIsAuth)
  const [isOpen, setIsOpen] = useState(false)
  const { promocodes, status } = useSelector(selectAdminData)
  const { data, userStatus = status } = useSelector(selectUserData)
  useEffect(() => {
    dispatch(fetchAllPromocodes({ token }))
  }, [])
  console.log(promocodes)
  if (userStatus === 'success' && data !== null) {
    if (data.admin !== 1) {
      return <Navigate to="/"></Navigate>
    }
  }
  return (
    <div className="admin-wrapper">
      {/* <Popup>
        <Popup.Button>More</Popup.Button>
        <Popup.Items className="popup">
          <Popup.Item className="popup_item">
            {({ active }) => (
              <a
                className={`${active && 'bg-blue-500'}`}
                href="/account-settings"
              >
                Личный кабинет
              </a>
            )}
          </Popup.Item>
          <Popup.Item>
            {({ active }) => (
              <a
                className={`${active && 'bg-blue-500'}`}
                href="/account-settings"
              >
                Корзина
              </a>
            )}
          </Popup.Item>
          <Popup.Item>
            {({ active }) => (
              <a
                className={`${active && 'bg-blue-500'}`}
                href="/account-settings"
              >
                Избранные
              </a>
            )}
          </Popup.Item>
          <Popup.Item>
            {({ active }) => (
              <a
                className={`${active && 'bg-blue-500'}`}
                href="/account-settings"
              >
                История заказов
              </a>
            )}
          </Popup.Item>
          <Popup.Item disabled>
            <span className="opacity-75">Выход</span>
          </Popup.Item>
        </Popup.Items>
      </Popup> */}

      <Link to="/admin/createPromocode" className="admin-wrapper-createbtn">
        Создать промокод
      </Link>
      <h1 className="admin-wrapper-title">Промокоды</h1>

      <div className="admin-items-block">
        {promocodes &&
          promocodes.map((item) => (
            <AdminPromocode
              key={item.id}
              id={item.id}
              promocode={item.promocode}
              persent={item.persent}
              date_end={item.date_end}
            ></AdminPromocode>
          ))}
      </div>
    </div>
  )
}

export default AdminPromocodes
