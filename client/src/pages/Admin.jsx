import React, { useEffect, useState } from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import {
  BsGrid3X3Gap,
  BsListColumnsReverse,
  BsPlusCircle,
  BsTag,
  BsTags,
} from 'react-icons/bs';
import { LuPanelLeftClose, LuPanelLeftOpen } from 'react-icons/lu';
import { MdOutlineKeyboardArrowDown, MdOutlinePayments } from 'react-icons/md';
import { RiAdminLine } from 'react-icons/ri';
import { RxCrossCircled } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import {
  AdminChange,
  AdminCreate,
  AdminCreatePromocode,
  AdminOrders,
  AdminPayments,
  AdminPromocodes,
} from '../components';
// import AdminPromocodes from '../components/AdminPromocode/AdminPromocodes';
import { selectUserData } from '../redux/slices/authSlice';
import { fetchItems, selectItemsData } from '../redux/slices/itemsSlice';
const Admin = () => {
  const dispatch = useDispatch();
  const { items, status } = useSelector(selectItemsData);

  const { data, userStatus = status } = useSelector(selectUserData);
  const [isOpen, setIsOpen] = useState(true);
  const [paymentsMulti, setPaymentsMulti] = useState('all')
  const [content, setContent] = useState({
    create: true,
    payments: false,
    orders: false,
    promocodes: false,
    createPromocode: false,
    allItems: false,
  });
  const [multiLevel, setMultiLevel] = useState(content.payments);
  
  useEffect(() => {
    setMultiLevel(content.payments);
    content.payments === true && setPaymentsMulti('all')
  }, [content.payments]);

  function paymentFn() {
    setPaymentsMulti('all')
    setContent({ payments: true });
  }
  useEffect(() => {
    dispatch(fetchItems({}));
  }, []);
  const set = new Set();

  if (status === 'success') {
    items.map((item) => set.add(item.category));
  }
  if (userStatus === 'success' && data !== null) {
    if (data.admin !== 1) {
      return <Navigate to='/'></Navigate>;
    }
  }
  const categories = [...set];
  const contentBoolean =
    content.payments ||
    content.orders ||
    content.promocodes ||
    content.allItems;
  return (
    <div className='admin-wrapper'>
      <div
        className={
          isOpen ? 'admin-wrapper__menu' : 'admin-wrapper__menu active'
        }
      >
        <span className='admin-wrapper__menu-item title'>
          {isOpen ? <RiAdminLine /> : null}
          {isOpen && <span>Панель</span>}
          {isOpen ? (
            <button onClick={() => setIsOpen(!isOpen)}>
              <LuPanelLeftClose />
            </button>
          ) : (
            <button onClick={() => setIsOpen(!isOpen)}>
              <LuPanelLeftOpen />
            </button>
          )}
        </span>
        <div className='admin-wrapper__menu-buttons'>
          <button
            className={
              content.create
                ? 'admin-wrapper__menu-item active '
                : 'admin-wrapper__menu-item'
            }
            onClick={() => setContent({ create: true })}
          >
            <BsPlusCircle />
            {isOpen && <span>Создать новый товар</span>}
          </button>
          <button
            className={
              content.createPromocode
                ? 'admin-wrapper__menu-item active'
                : 'admin-wrapper__menu-item'
            }
            onClick={() => setContent({ createPromocode: true })}
          >
            <BsTag />
            {isOpen && <span>Создать промокод</span>}
          </button>
          <button
            className={
              content.payments
                ? 'admin-wrapper__menu-item active'
                : 'admin-wrapper__menu-item'
            }
            onClick={paymentFn}
          >
            <MdOutlinePayments />
            {isOpen && <span> Оплата {<MdOutlineKeyboardArrowDown />}</span>}
          </button>
          {multiLevel && (
            <ul className='admin-wrapper__menu-multilevel'>
              <button
                className={
                  paymentsMulti === 'confirmed'
                    ? 'admin-wrapper__menu-multilevel-item active'
                    : 'admin-wrapper__menu-multilevel-item'
                }
                onClick={() => setPaymentsMulti('confirmed')}
                style={
                  !isOpen
                    ? {
                        marginLeft: '25px',
                        height: '60px',
                        fontSize: '30px',
                      }
                    : null
                }
              >
                <AiOutlineCheckCircle />{' '}
                {isOpen && <span>Подтвержденная оплата</span>}
              </button>
              <button
                className={
                  paymentsMulti === 'unconfirmed'
                    ? 'admin-wrapper__menu-multilevel-item active'
                    : 'admin-wrapper__menu-multilevel-item'
                }
                onClick={() => setPaymentsMulti('unconfirmed')}
                style={
                  !isOpen
                    ? {
                        marginLeft: '25px',
                        height: '60px',
                        fontSize: '30px',
                      }
                    : null
                }
              >
                <RxCrossCircled />
                {isOpen && <span>Неподтвержденная оплата</span>}
              </button>
            </ul>
          )}
          <button
            className={
              content.orders
                ? 'admin-wrapper__menu-item active'
                : 'admin-wrapper__menu-item'
            }
            onClick={() => setContent({ orders: true })}
          >
            <BsListColumnsReverse />
            {isOpen && <span>Заказы</span>}
          </button>
          <button
            className={
              content.promocodes
                ? 'admin-wrapper__menu-item active'
                : 'admin-wrapper__menu-item'
            }
            onClick={() => setContent({ promocodes: true })}
          >
            <BsTags />
            {isOpen && <span>Промокоды</span>}
          </button>
          <button
            className={
              content.allItems
                ? 'admin-wrapper__menu-item active'
                : 'admin-wrapper__menu-item'
            }
            onClick={() => setContent({ allItems: true })}
          >
            <BsGrid3X3Gap />
            {isOpen && <span>Все товары</span>}
          </button>
        </div>
      </div>
      <div
        className={
          contentBoolean
            ? 'admin-wrapper__content grid'
            : 'admin-wrapper__content'
        }
        style={!isOpen ? { width: '87%', marginLeft: '50px' } : content.orders ? {gridTemplateColumns: 'repeat(2, 2fr)'}  : null}
      >
        {content.create ? <AdminCreate /> : null}
        {content.payments ? <AdminPayments select={paymentsMulti} /> : null}
        {content.orders ? <AdminOrders /> : null}
        {content.promocodes ? <AdminPromocodes /> : null}
        {content.createPromocode ? <AdminCreatePromocode /> : null}
        {content.allItems ? <AdminChange /> : null}
      </div>
      {/* {status === 'loading'
        ? null
        : items.map((item) => (
            <AdminItem
              image={item.image_link}
              key={item.id}
              id={item.id}
              name={item.name}
              price={item.price}
            ></AdminItem>
          ))} */}
    </div>
  );
};
export default Admin;
