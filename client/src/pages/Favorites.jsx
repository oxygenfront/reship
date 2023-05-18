import React, { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { FavoriteItem } from '../components'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchAuthMe,
  selectIsAuth,
  selectUserData,
} from '../redux/slices/authSlice'
import { fetchDeleteFavorite } from '../redux/slices/favoriteSlice'
import { getFavoritesFromLs } from '../utils/getFavoritesFromLs'

const Favorites = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector(selectIsAuth)
  const token = localStorage.getItem('token')
  const { data, status } = useSelector(selectUserData)
  const { favorites } =
    status === 'success' ? getFavoritesFromLs(data.favorites) : []
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      <section className="favorites">
        <div className="favorites_wrapper container">
          <div className="favorites_container">
            <div className="favorites_title">
              <h1>Избранное</h1>
            </div>
            <div className="favorites_items">
              {status === 'success' &&
                favorites.map((item) => (
                  <FavoriteItem
                    name={item.name}
                    id={item.product_id}
                    key={item.product_id}
                    price={item.price}
                  ></FavoriteItem>
                ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Favorites
