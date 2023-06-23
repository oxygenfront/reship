import React, { useContext, useState } from 'react'

function Star({ value }) {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(null)
  const obj = {
    emptyColor: '#fff',
    fillColor: '#416EF2',
    height: 33,
    hover: '',
    rating: '',
    setHover: '',
    setRating: '',
    width: '',
  }

  return (
    <div
      className="star"
      onClick={() => setRating(obj.value)}
      onMouseEnter={() => setHover(obj.value)}
      onMouseLeave={() => setHover(null)}
    >
      <svg
        data-rating={obj.value}
        fill={
          obj.value <= (obj.hover || obj.rating)
            ? obj.fillColor
            : obj.emptyColor
        }
        height={obj.height}
        viewBox="0 0 25 25"
        width={27.9}
      >
        <polygon
          strokeWidth="0"
          points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78"
        />
      </svg>
    </div>
  )
}

export default Star
