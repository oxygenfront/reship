import React, { useState, useRef, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Thumbs } from 'swiper'
import 'swiper/swiper-bundle.css'
import { useDispatch, useSelector } from 'react-redux'
import {
  addFavorite,
  removeFavorite,
  selectFavorites,
} from '../redux/slices/favoriteSlice'
import { selectFullItemData } from '../redux/slices/fullItemSlice'

const FullItemSlider = ({ id, image }) => {
  console.log(id)
  const dispatch = useDispatch()
  const parsedImage = JSON.parse(image)
  const { favorites } = useSelector(selectFavorites)
  const { item, status } = useSelector(selectFullItemData)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const swiperRef = useRef(null)

  const onChangeFavorite = () => {
    if (!isFavorite) {
      dispatch(
        addFavorite({
          id,
          name: item.name,
          image: item.image_link,
          price: item.price,
          color: item.color,
        })
      )

      return setIsFavorite(true)
    }
    if (isFavorite) {
      dispatch(removeFavorite(id))

      return setIsFavorite(false)
    }
  }

  const handleSlideChange = (swiper) => {
    const currentIndex = swiper.realIndex
    setCurrentSlide(currentIndex)
  }

  const goToPreviousSlide = () => {
    if (swiperRef.current) {
      const swiperInstance = swiperRef.current.swiper
      swiperInstance.slidePrev()
      setCurrentSlide(swiperInstance.realIndex)
    }
  }

  const goToNextSlide = () => {
    if (swiperRef.current) {
      console.log(swiperRef.current)

      const swiperInstance = swiperRef.current.swiper
      swiperInstance.slideNext()
      setCurrentSlide(swiperInstance.realIndex)
    }
  }

  useEffect(() => {
    const ids = favorites.map((item) => item.id)

    setIsFavorite(ids.includes(id))
    console.log(isFavorite)
  }, [])

  return (
    <>
      <div className="fullitem__card-slider_big-wrapper">
        <button
          onClick={onChangeFavorite}
          className="fullitem__card-slider_big-favorite"
        >
          {isFavorite ? (
            <img src="../assets/img/active-heart-main-catalog.png"></img>
          ) : (
            <img src="../assets/img/heart-main-catalog.png"></img>
          )}
        </button>
        <img
          src={parsedImage[currentSlide]}
          alt="Большая картинка"
          className="fullitem__card-slider_big-item"
        />
      </div>
      <div className="fullitem__card-slider_small-wrapper_overflow">
        <Swiper
          className="fullitem__card-slider_small-wrapper"
          modules={[Navigation, Thumbs]}
          slideToClickedSlide
          slidesPerView="auto"
          loop
          spaceBetween={20}
          speed={800}
          onSlideChange={handleSlideChange}
          ref={swiperRef}
        >
          {parsedImage.map((image, index) => (
            <SwiperSlide
              key={index}
              className="fullitem__card-slider_small-item"
            >
              <img src={image} alt={`Маленькая картинка`} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <button
        onClick={goToPreviousSlide}
        className="fullitem__card-slider_small-wrapper_button-prev"
      ></button>
      <button
        onClick={goToNextSlide}
        className="fullitem__card-slider_small-wrapper_button-next"
      ></button>
    </>
  )
}

export default FullItemSlider
