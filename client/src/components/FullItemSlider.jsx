import React, { useRef, useState } from "react";
import { Navigation, Thumbs } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

const FullItemSlider = ({
	paramsItem,
	isFavorite,
	onChangeFavorite,
	handleBigImage,
}) => {
	const parsedImage = JSON.parse(paramsItem?.image_link);
	const [currentSlide, setCurrentSlide] = useState(0);
	const swiperRef = useRef(null);

	const handleSlideChange = (swiper) => {
		const currentIndex = swiper.realIndex;
		setCurrentSlide(currentIndex);
	};

	const goToPreviousSlide = () => {
		if (swiperRef.current) {
			const swiperInstance = swiperRef.current.swiper;
			swiperInstance.slidePrev();
			setCurrentSlide(swiperInstance.realIndex);
		}
	};

	const goToNextSlide = () => {
		if (swiperRef.current) {
			const swiperInstance = swiperRef.current.swiper;
			swiperInstance.slideNext();
			setCurrentSlide(swiperInstance.realIndex);
		}
	};

	return (
		<>
			<div className="fullitem__card-slider_big-wrapper">
				<button
					onClick={onChangeFavorite}
					className="fullitem__card-slider_big-favorite"
				>
					{isFavorite ? (
						<img
							src="../assets/img/active-heart-main-catalog.png"
							alt="Иконка избранного"
						></img>
					) : (
						<img
							src="../assets/img/heart-main-catalog.png"
							alt="Иконка избранного"
						></img>
					)}
				</button>
				<img
					src={parsedImage[currentSlide]}
					onClick={() => handleBigImage(parsedImage[currentSlide])}
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
	);
};

export default FullItemSlider;
