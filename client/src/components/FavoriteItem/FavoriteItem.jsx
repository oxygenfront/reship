import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
	addItem,
	minusItem,
	removeItemFromFullItem,
	selectCartItemById,
} from "../../redux/slices/cartSlice";
import { removeFavorite } from "../../redux/slices/favoriteSlice";
import styles from "../CartItem/CartItem.module.sass";

import classNames from "classnames";
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

	const colorSwitchForStyle = (switchText) => {
		return switchText.split(" ")[switchText.split(" ").length - 1];
	};

	const titleSwitch = (switchText) => {
		if (switchText.split(" ").length > 1) {
			return switchText.split(" ").slice(0, -1);
		} else return switchText;
	};

	return (
		<>
			{params.image && (
				<div
					className={classNames(
						styles.person__delivery_items_item,
						styles.cart__delivery_items_item
					)}
				>
					<div className={styles.cart__delivery_items_item_left}>
						<Link
							to={`/item/${params.id}`}
							className={styles.cart__delivery_items_item_block_img}
						>
							<img
								src={JSON.parse(params.image)[0]}
								alt="product"
								className={classNames(
									styles.person__delivery_items_item_img,
									styles.cart__delivery_items_item_block_img_img
								)}
							/>
						</Link>

						<div
							className={classNames(
								styles.person__delivery_items_item_name,
								styles.cart__delivery_items_item_name
							)}
						>
							<Link to={`/item/${params.id}`}>{params.name}</Link>
							<div className={styles.cart__delivery_items_parameters}>
								{params.color && (
									<div
										className={`fullitem__card_info-params_block_color active ${params.color?.toLowerCase()} colors`}
									>
										<span></span>
									</div>
								)}
								{params.parameters?.switch && (
									<div className="fullitem__card_info-params_block_button active">
										<span
											style={{
												backgroundColor: `${colorSwitchForStyle(
													params.parameters.switch
												)}`,
											}}
										></span>
										{titleSwitch(params.parameters.switch)}
									</div>
								)}
								{params.parameters?.layout && (
									<div className="fullitem__card_info-params_block_button active">
										{params.parameters?.layout === "rus"
											? "Русская"
											: params.parameters?.layout === "eng"
											? "Английская"
											: params.parameters?.layout === "jpn" && "Японская"}
									</div>
								)}
								{params.parameters?.plate && (
									<div className="fullitem__card_info-params_block_button active">
										{params.parameters?.plate === "allum"
											? "Алюминий"
											: params.parameters?.plate === "poliCarb"
											? "Поликарбонат"
											: params.parameters?.plate === "latun" && "Латунь"}
									</div>
								)}
							</div>
						</div>
					</div>

					<div className={styles.cart__delivery_items_item_right}>
						<div
							className={classNames(
								styles.person__delivery_items_item_price,
								styles.cart__delivery_items_item_price
							)}
						>
							{params.price} руб
						</div>
						<div
							className={styles.cart__delivery_items_item_favorite_block_delete}
						>
							<button
								onClick={onClickRemove}
								className={
									styles.cart__delivery_items_item_favorite_block_delete_button
								}
							>
								Удалить
							</button>
							{addedCount > 0 ? (
								<div className={styles.cart__delivery_items_item_count_wrapper}>
									<button
										onClick={addedCount > 1 ? onClickMinus : onClickRemoveCart}
										className={styles.cart__delivery_items_item_count_minus}
									>
										<div></div>
									</button>
									<div
										className={classNames(
											styles.person__delivery_items_item_count_number_block,
											styles.cart__delivery_items_item_count_number_block
										)}
									>
										<span
											className={classNames(
												styles.person__delivery_items_item_count_number_block_item,
												styles.cart__delivery_items_item_count_number_block_item
											)}
										>
											{addedCount}
										</span>
									</div>
									<button
										onClick={onClickAdd}
										className={styles.cart__delivery_items_item_count_pluses}
									>
										<div
											className={
												styles.cart__delivery_items_item_count_pluses_block
											}
										>
											<div
												className={
													styles.cart__delivery_items_item_count_pluses_itemv
												}
											></div>
											<div
												className={
													styles.cart__delivery_items_item_count_pluses_itemh
												}
											></div>
										</div>
									</button>
								</div>
							) : (
								<button
									onClick={onClickAdd}
									className={
										styles.cart__delivery_items_item_favorite_block_delete_button
									}
								>
									В корзину
								</button>
							)}
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default FavoriteItem;
