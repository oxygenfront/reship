import { Suspense, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'

import Header from './components/Header/Header'

import {
  Admin,
  AdminChange,
  AdminCreate,
  AdminCreatePromocode,
  AdminOrders,
  AdminPayments,
  AdminPromocodes,
  Favorites,
  ForgotMessage,
  Settings,
  Orders,
} from './pages'
import Cart from './pages/Cart'
import Catalog from './pages/Catalog'
import Forgot from './pages/Forgot'
import FullItem from './pages/FullItem'
import Home from './pages/Home'
import Login from './pages/Login'
import Order from './pages/Order'
import Personal from './pages/Personal'
import Register from './pages/Register'
import { fetchAuthMe } from './redux/slices/authSlice'
import './sass/index.sass'

import { Footer, Menu } from './components'
import { selectFilter } from './redux/slices/fiterSlice'
import { fetchItems } from './redux/slices/itemsSlice'

const App = () => {
  const dispatch = useDispatch()
  const theme = useSelector((state) => state.theme)

  const token = localStorage.getItem('token')

  useEffect(() => {
    dispatch(fetchAuthMe(token))
  }, [])
  const { choosenCategorie, searchValue } = useSelector(selectFilter)

  useEffect(() => {
    dispatch(fetchItems({ choosenCategorie, searchValue }))
  }, [choosenCategorie])

  return (
    <>
      <div className="App">
        <Header />
        <Menu></Menu>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route
            path="item/:id"
            element={
              <Suspense fallback={<div>Идёт загрузка...</div>}>
                <FullItem></FullItem>
              </Suspense>
            }
          ></Route>
          <Route path="/admin" element={<Admin></Admin>}></Route>
          <Route
            path="/admin/create"
            element={<AdminCreate></AdminCreate>}
          ></Route>
          <Route
            path="/admin/:id"
            element={<AdminChange></AdminChange>}
          ></Route>
          <Route
            path="/admin/payments"
            element={<AdminPayments></AdminPayments>}
          ></Route>
          <Route
            path="/admin/orders"
            element={<AdminOrders></AdminOrders>}
          ></Route>
          <Route
            path="/admin/promocodes"
            element={<AdminPromocodes></AdminPromocodes>}
          ></Route>
          <Route
            path="/admin/createPromocode"
            element={<AdminCreatePromocode></AdminCreatePromocode>}
          ></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/forgot" element={<Forgot></Forgot>}></Route>
          <Route path="/cart" element={<Cart></Cart>}></Route>
          <Route path="/personal" element={<Personal></Personal>}></Route>
          <Route path="/settings" element={<Settings></Settings>}></Route>
          <Route path="/orders" element={<Orders></Orders>}></Route>
          <Route
            path="/personal/favorites"
            element={<Favorites></Favorites>}
          ></Route>
          <Route path="/order" element={<Order></Order>}></Route>
          <Route path="/catalog" element={<Catalog></Catalog>}></Route>
          <Route path="/forgot/message" element={<ForgotMessage />}></Route>
        </Routes>
        <Footer></Footer>
      </div>
    </>
  )
}

export default App
