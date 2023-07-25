import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { AdminPromocode } from '../../components';
import {
  fetchAllPromocodes,
  selectAdminData,
} from '../../redux/slices/adminSlice';
import { selectIsAuth, selectUserData } from '../../redux/slices/authSlice';

const AdminPromocodes = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const isAuth = useSelector(selectIsAuth);
  const [isOpen, setIsOpen] = useState(false);
  const { promocodes, status } = useSelector(selectAdminData);
  const { data, userStatus = status } = useSelector(selectUserData);
  useEffect(() => {
    dispatch(fetchAllPromocodes({ token }));
  }, []);
  if (userStatus === 'success' && data !== null) {
    if (data.admin !== 1) {
      return <Navigate to='/'></Navigate>;
    }
  }
  return (
    <>
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
    </>
  );
};

export default AdminPromocodes;
