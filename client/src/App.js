import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import Header from './components/Header/Header'

import './index.sass'
import Cart from './pages/Cart'
import FullItem from './pages/FullItem'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  // $(document).ready(function () {
  //   $('.faq__item').click(function () {
  //     $('.faq__item').not($(this)).find($('.faq__item-about')).slideUp(500)
  //     $(this).find('.faq__item-about').slideToggle(500)

  //     if ($(this).hasClass('active')) {
  //       $(this).removeClass('active')
  //     } else {
  //       $(this).parent().find('.faq__item').removeClass('active')
  //       $(this).addClass('active')
  //     }
  //   })
  //   $('.card-section__about-btn').click(function () {
  //     $('.card-section__about')
  //       .find('.card-section__about-info-more')
  //       .slideToggle(600)
  //   })

  //   $('.card-section__about-btn.show').click(function () {
  //     $('.card-section__about-btn.show').css('display', 'none')
  //     $('.card-section__about-btn.no-show').css('display', 'block')
  //   })
  //   $('.card-section__about-btn.no-show').click(function () {
  //     $('.card-section__about-btn.show').css('display', 'block')
  //     $('.card-section__about-btn.no-show').css('display', 'none')
  //   })
  // })
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route
          path="/:id"
          element={
            <Suspense fallback={<div>Идёт загрузка...</div>}>
              <FullItem></FullItem>
            </Suspense>
          }
        ></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/cart" element={<Cart></Cart>}></Route>
      </Routes>
    </div>
  )
}

export default App
