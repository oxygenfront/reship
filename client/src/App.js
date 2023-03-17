import { Suspense, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { Footer } from './components'

import Header from './components/Header/Header'

import './index.sass'
import { ForgotMessage } from './pages'
import Cart from './pages/Cart'
import Catalog from './pages/Catalog'
import Forgot from './pages/Forgot'
import FullItem from './pages/FullItem'
import Home from './pages/Home'
import Login from './pages/Login'
import Order from './pages/Order'
import Personal from './pages/Personal'
import Register from './pages/Register'
import { selectIsAuth } from './redux/slices/authSlice'

function App() {
  const dispatch = useDispatch()
  const isAuth = useSelector(selectIsAuth)
  // useEffect(() => {
  //   dispatch(fetchAuthMe())
  // })
  return (
    <div className="App">
      <Header />
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
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/forgot" element={<Forgot></Forgot>}></Route>
        <Route path="/cart" element={<Cart></Cart>}></Route>
        <Route path="/personal" element={<Personal></Personal>}></Route>
        <Route path="/order" element={<Order></Order>}></Route>
        <Route path="/catalog" element={<Catalog></Catalog>}></Route>
        <Route path="/forgot/message" element={<ForgotMessage />}></Route>
      </Routes>
    </div>
  )
}

export default App
