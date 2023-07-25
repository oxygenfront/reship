import React, { useEffect } from 'react';
import { AdminPayment } from '..';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchGetPayments,
  selectAdminData,
} from '../../redux/slices/adminSlice';
import { selectUserData } from '../../redux/slices/authSlice';
import { Navigate } from 'react-router-dom';

const AdminPayments = ({ select }) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');

  const { data, status } = useSelector(selectUserData);
  const { payments, paymentsStatus } = useSelector(selectAdminData);
  useEffect(() => {
    dispatch(fetchGetPayments({ token }));
  }, []);

  if (status === 'success' && data !== null) {
    if (data.admin !== 1) {
      return <Navigate to='/'></Navigate>;
    }
  }
  return (
    <>
      {paymentsStatus === 'success' &&
        select === 'unconfirmed' &&
        payments.map(
          (item) =>
            item.status === 0 && (
              <AdminPayment
                price={item.price}
                code={item.code}
                order_id={item.order_id}
                date_create={item.date_create}
                status={item.status}
                key={item.id}
                id={item.id}
              ></AdminPayment>
            )
        )}
      {paymentsStatus === 'success' &&
        select === 'confirmed' &&
        payments.map(
          (item) =>
            item.status === 1 && (
              <AdminPayment
                price={item.price}
                code={item.code}
                order_id={item.order_id}
                date_create={item.date_create}
                status={item.status}
                key={item.id}
                id={item.id}
              ></AdminPayment>
            )
        )}
      {paymentsStatus === 'success' &&
        select === 'all' &&
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
    </>
  );
};

export default AdminPayments;
