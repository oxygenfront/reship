import React, { useEffect, useState } from 'react'

import { FavoriteItem } from '../components'
import { useSelector } from 'react-redux'

import { selectFavorites } from '../redux/slices/favoriteSlice'

const Favorites = () => {
  const { favorites } = useSelector(selectFavorites)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const theme = useSelector((state) => state.theme)
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
              {favorites.length > 0 ? (
                favorites.map((item) => (
                  <FavoriteItem
                    name={item.name}
                    id={item.id}
                    key={item.id}
                    price={item.price}
                  ></FavoriteItem>
                ))
              ) : (
                <div className="cart__empty_wrapper">
                  <div className="container cart__empty_container">
                    <div
                      style={{
                        backgroundImage:
                          theme === 'dark'
                            ? `url('../assets/img/no-item black theme.png')`
                            : `url('../assets/img/no-item.png')`,
                        backgroundSize: 'cover',
                      }}
                      className="cart__empty"
                    >
                      У вас пока нет<br></br> товара в избранном
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Favorites
