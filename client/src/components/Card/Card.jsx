import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import {
	addItem,
	minusItem,
	removeItem,
	removeItemFromFullItem,
	selectCartItemById,
} from "../../redux/slices/cartSlice";
import styles from "./Card.module.sass";
import { selectIsAuth, selectUserData } from "../../redux/slices/authSlice";
import {
	addFavorite,
	removeFavorite,
	selectFavorites,
} from "../../redux/slices/favoriteSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import { isEqual } from "lodash";

const Card = (cardItem) => {
	const dispatch = useDispatch();
	const { favorites } = useSelector(selectFavorites);
	const { data, status } = useSelector(selectUserData);
	const [navigate, setNavigate] = useState(false);
	const [color, setColor] = useState("");
	const [addedCount, setAddedCount] = useState(0);
	const [parameters, setParameters] = useState({
		layout: "",
		plate: "",
		switch: "",
	});

	useEffect(() => {
		setParameters({
			plate:
				JSON.parse(cardItem.parameters_dop)[0]?.plates[0] !== undefined
					? Object.keys(JSON.parse(cardItem.parameters_dop)[0]?.plates[0])[0]
					: "",
			switch:
				JSON.parse(cardItem.parameters_dop)[1]?.switches[0] !== undefined
					? Object.keys(JSON.parse(cardItem.parameters_dop)[1]?.switches[0])[0]
					: "",
			layout:
				JSON.parse(cardItem.parameters_dop)[2]?.layouts[0] !== undefined
					? Object.keys(JSON.parse(cardItem.parameters_dop)[2]?.layouts[0])[0]
					: "",
		});
	}, [cardItem, status]);

	useEffect(() => {
		if (cardItem.colors) {
			const colorItem = JSON.parse(cardItem.colors).find(
				(obj) => Number(obj.id) === Number(cardItem.id)
			);
			if (colorItem === undefined) {
				setColor(
					JSON.parse(cardItem.colors).length > 0
						? JSON.parse(cardItem.colors)[0]
						: ""
				);
			} else {
				setColor(colorItem.color);
			}
		}
	}, [cardItem]);

	const collectedItem = {
		id: cardItem.id,
		cartId: Math.random(),
		parameters: parameters,
		name: cardItem.name,
		image: cardItem.image_link,
		price: cardItem.price,
		weight: cardItem.weight,
		color: color,
		count: 0,
	};
	const onClickAdd = () => {
		dispatch(addItem(collectedItem));
	};
	const onClickMinus = () => {
		dispatch(minusItem(collectedItem));
	};
	const onClickRemove = () => {
		dispatch(removeItemFromFullItem(collectedItem));
	};

	const cartItem = useSelector(
		selectCartItemById({
			name: collectedItem.name && collectedItem.name,
			id: collectedItem.id && collectedItem.id,
			color: collectedItem.color && collectedItem.color,
			parameters: collectedItem.parameters && collectedItem.parameters,
		})
	);

	useEffect(() => {
		cartItem ? setAddedCount(cartItem.count) : setAddedCount(0);
	}, [cartItem]);

	const [isFavorite, setIsFavorite] = useState(false);
	useEffect(() => {
		const ids = favorites.some((obj) => {
			if (obj.category === "Клавиатуры") {
				return (
					obj.id === collectedItem.id &&
					isEqual(obj.parameters, collectedItem.parameters) &&
					obj.name === collectedItem.name &&
					obj.color === collectedItem.color
				);
			}
			if (collectedItem.color !== undefined) {
				return (
					obj.id === collectedItem.id &&
					obj.color === collectedItem.color &&
					obj.name === collectedItem.name
				);
			} else {
				return obj.id === collectedItem.id && obj.name === collectedItem.name;
			}
		});
		setIsFavorite(ids);
	}, [favorites]);

	const onChangeFavorite = () => {
		if (!isFavorite) {
			dispatch(addFavorite(collectedItem));

			return setIsFavorite(true);
		}
		if (isFavorite) {
			dispatch(removeFavorite(collectedItem));

			return setIsFavorite(false);
		}
	};
	if (navigate) {
		return <Navigate to="/login"></Navigate>;
	}
	return (
		<>
			{cardItem.view === "grid" ? (
				<div className={styles.main_catalog__products_wrapper_item}>
					<button
						onClick={onChangeFavorite}
						className={styles.main_catalog__products_wrapper_item_favorite}
					>
						{isFavorite ? (
							<img src="/assets/img/active-heart-main-catalog.png" alt=""></img>
						) : (
							<img src="/assets/img/heart-main-catalog.png" alt=""></img>
						)}
					</button>
					<Link to={`/item/${cardItem.id}`}>
						{" "}
						<Swiper
							className={styles.main_catalog__products_wrapper_item_slider}
							modules={[Pagination]}
							pagination={{ clickable: true }}
							centeredSlides={true}
						>
							{cardItem.image_link &&
								JSON.parse(cardItem.image_link).map((image, index) => (
									<SwiperSlide
										key={index}
										className={
											styles.main_catalog__products_wrapper_item_slider_slide
										}
										style={{
											backgroundImage: `url('${image}')`,
											backgroundSize: "cover",
											backgroundRepeat: "no-repeat",
											backgroundPosition: "center",
										}}
									></SwiperSlide>
								))}
						</Swiper>
					</Link>

					<Link
						to={`/item/${cardItem.id}`}
						className={styles.main_catalog__products_wrapper_item_title}
					>
						{cardItem.name}
					</Link>
					<div
						className={styles.main_catalog__products_wrapper_item_bottom_block}
					>
						<span className={styles.main_catalog__products_wrapper_item_price}>
							{cardItem.category === "Клавиатуры" ? "от" : null}{" "}
							{cardItem.price} руб
						</span>
						{addedCount > 0 ? (
							<div
								className={styles.main_catalog__products_wrapper_item_button}
							>
								<button
									onClick={addedCount > 1 ? onClickMinus : onClickRemove}
									className={
										styles.main_catalog__products_wrapper_item_button_minus_wrapper
									}
								>
									<div
										className={
											styles.main_catalog__products_wrapper_item_button_minus
										}
									></div>
								</button>
								<span>{addedCount}</span>
								<button
									onClick={onClickAdd}
									className={
										styles.main_catalog__products_wrapper_item_button_pluses
									}
								>
									<div
										className={
											styles.main_catalog__products_wrapper_item_button_pluses_block
										}
									>
										<div
											className={
												styles.main_catalog__products_wrapper_item_button_pluses_itemv
											}
										></div>
										<div
											className={
												styles.main_catalog__products_wrapper_item_button_pluses_itemh
											}
										></div>
									</div>
								</button>
							</div>
						) : (
							<button
								onClick={onClickAdd}
								className={styles.main_catalog__products_wrapper_item_button}
							>
								В корзину
							</button>
						)}
					</div>
				</div>
			) : (
				<div className="catalog__main_item">
					<Link to={`/item/${cardItem.id}`} className="catalog__main_item_left">
						<img src={JSON.parse(cardItem?.image_link)[0]} alt="" />
					</Link>
					<div className="catalog__main_item_mid">
						<Link
							to={`/item/${cardItem.id}`}
							className="catalog__main_item_mid-title"
						>
							{cardItem.name}
						</Link>
						<div className="catalog__main_item_mid-subtitle">
							{cardItem.description_small}
						</div>
					</div>
					<div className="catalog__main_item_right">
						<div className="catalog__main_item_right-price">
							{cardItem.category === "Клавиатуры" ? "от " : null}
							{cardItem.price} руб
						</div>
						{/* <div className="catalog__main_item_right-rating">
              <img src="../assets/img/star-review.png" alt="" />
              <span>4.5</span>
              <span>5 отзывов</span>
            </div> */}
						{addedCount > 0 ? (
							<div
								className={styles.main_catalog__products_wrapper_item_button}
							>
								<div
									onClick={addedCount > 1 ? onClickMinus : onClickRemove}
									className={
										styles.main_catalog__products_wrapper_item_button_minus_wrapper
									}
								>
									<div
										className={
											styles.main_catalog__products_wrapper_item_button_minus
										}
									></div>
								</div>
								{addedCount}
								<button
									onClick={onClickAdd}
									className={
										styles.main_catalog__products_wrapper_item_button_pluses
									}
								>
									<div
										className={
											styles.main_catalog__products_wrapper_item_button_pluses_block
										}
									>
										<div
											className={
												styles.main_catalog__products_wrapper_item_button_pluses_itemv
											}
										></div>
										<div
											className={
												styles.main_catalog__products_wrapper_item_button_pluses_itemh
											}
										></div>
									</div>
								</button>
							</div>
						) : (
							<button
								onClick={onClickAdd}
								className="catalog__main_item_right-add"
							>
								В корзину
							</button>
						)}
					</div>
				</div>
			)}
		</>
	);
};

export default React.memo(Card);
