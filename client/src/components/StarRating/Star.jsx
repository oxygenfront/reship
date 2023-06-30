import React, { useContext, useState } from 'react'
import { BodyReviewContext } from '../OrdersItem/OrdersItem'

function Star({ value }) {
  const {
    emptyColor,
    fillColor,
    height,
    hover,
    rating,
    setHover,
    setRating,
    width,
  } = useContext(BodyReviewContext)
  // const [rating, setRating] = useState(0)
  // const [hover, setHover] = useState(null)

  return (
    <div
      className="star"
      onClick={() => setRating(value)}
      onMouseEnter={() => setHover(value)}
      onMouseLeave={() => setHover(null)}
    >
      {value <= (hover || rating) ? (
        <img src="../assets/img/star 14.png" alt="star" />
      ) : (
        <img src="../assets/img/star 16.png" alt="star" />
      )}
      {/* <svg
        data-rating={value}
        fill={value <= (hover || rating) ? fillColor : emptyColor}
        height={height}
        viewBox='0 0 25 25'
        width={27.9}
      >
        <polygon
          strokeWidth='0'
          points='9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78'
        />
      </svg> */}
    </div>
  )
}

export default Star
