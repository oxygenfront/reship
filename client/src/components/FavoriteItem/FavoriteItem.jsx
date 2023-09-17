import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectIsAuth } from "../../redux/slices/authSlice";
import {
	addItem,
	minusItem,
	removeItem,
	removeItemFromFullItem,
	selectCartItemById,
} from "../../redux/slices/cartSlice";
import { removeFavorite } from "../../redux/slices/favoriteSlice";
import styles from "./FavoriteItem.module.sass";

const FavoriteItem = ({ params }) => {
	const dispatch = useDispatch();
	const [addedCount, setAddedCount] = useState(0);
	const cartItem = useSelector(
		selectCartItemById({
			category: params.category,
			name: params.name,
			parameters: params.parameters,
			color: params.color,
			id: params.id,
		})
	);

	useEffect(() => {
		cartItem ? setAddedCount(cartItem.count) : setAddedCount(0);
	}, [cartItem]);
	console.log(addedCount);

	const onClickAdd = () => {
		dispatch(addItem(params));
	};
	const onClickMinus = () => {
		dispatch(minusItem(params));
	};
	const onClickRemove = () => {
		dispatch(removeFavorite(params));
	};
	const onClickRemoveCart = () => {
		dispatch(removeItemFromFullItem(params));
	};

	return (
		<div className={styles.favorite__item}>
			<Link
				to={`/params/${params.id}`}
				className={styles.favorite__item_imgBlock}
			>
				<img src={JSON.parse(params.image)[0]} alt="product" />
			</Link>
			<div className={styles.favorite__item_columnBlock}>
				<Link to={`/params/${params.id}`}>
					<div className={styles.favorite__item_columnBlock_upBlock}>
						<span className={styles.favorite__item_columnBlock_upBlock_name}>
							{params.name}
						</span>
						<span className={styles.favorite__item_columnBlock_upBlock_price}>
							{params.price} руб
						</span>
					</div>
				</Link>

				<div className={styles.favorite__item_midBlock}>
					<span className={styles.favorite__item_midBlock_color}>
						{params.color}
					</span>
				</div>
				<div className={styles.favorite__item_bottomBlock}>
					<button
						className={styles.favorite__item_bottomBlock_delete}
						onClick={onClickRemove}
					>
						<span>Удалить</span>
					</button>
					{addedCount > 0 ? (
						<div className={styles.favorite__item_bottomBlock_button}>
							<button
								onClick={addedCount > 1 ? onClickMinus : onClickRemoveCart}
								className={styles.favorite__item_bottomBlock_minus_wrapper}
							>
								<div className={styles.favorite__item_bottomBlock_minus}></div>
							</button>
							{addedCount}
							<button
								onClick={onClickAdd}
								className={styles.favorite__item_bottomBlock_pluses}
							>
								<div className={styles.favorite__item_bottomBlock_pluses_block}>
									<div
										className={styles.favorite__item_bottomBlock_pluses_itemv}
									></div>
									<div
										className={styles.favorite__item_bottomBlock_pluses_itemh}
									></div>
								</div>
							</button>
						</div>
					) : (
						<button
							className={styles.favorite__item_bottomBlock_addToCart}
							onClick={onClickAdd}
						>
							В корзину
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default FavoriteItem;
