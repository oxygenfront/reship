import classNames from "classnames";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addItem, minusItem, removeItem } from "../../redux/slices/cartSlice";
import styles from "./CartItem.module.sass";

const CartItem = ({
	id,
	price,
	image,
	color,
	count,
	name,
	parameters,
	cartId,
}) => {
	const dispatch = useDispatch();

	const onClickPlus = () => {
		dispatch(addItem({ cartId }));
	};
	const onClickMinus = () => {
		dispatch(minusItem({ cartId }));
	};
	const onClickRemove = () => {
		dispatch(removeItem(cartId));
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
			{image && (
				<div
					className={classNames(
						styles.person__delivery_items_item,
						styles.cart__delivery_items_item
					)}
				>
					<div className={styles.cart__delivery_items_item_left}>
						<Link
							to={`/item/${id}`}
							className={styles.cart__delivery_items_item_block_img}
						>
							<img
								src={JSON.parse(image)[0]}
								alt="item"
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
							<Link to={`/item/${id}`}>{name}</Link>
							<div className={styles.cart__delivery_items_parameters}>
								{color && (
									<div
										className={`fullitem__card_info-params_block_color active ${color?.toLowerCase()} colors`}
									>
										<span></span>
									</div>
								)}
								{parameters?.switch && (
									<div className="fullitem__card_info-params_block_button active">
										<span
											style={{
												backgroundColor: `${colorSwitchForStyle(
													parameters.switch
												)}`,
											}}
										></span>
										{titleSwitch(parameters.switch)}
									</div>
								)}
								{parameters?.layout && (
									<div className="fullitem__card_info-params_block_button active">
										{parameters?.layout === "rus"
											? "Русская"
											: parameters?.layout === "eng"
											? "Английская"
											: parameters?.layout === "jpn" && "Японская"}
									</div>
								)}
								{parameters?.plate && (
									<div className="fullitem__card_info-params_block_button active">
										{parameters?.plate === "allum"
											? "Алюминий"
											: parameters?.plate === "poliCarb"
											? "Поликарбонат"
											: parameters?.plate === "latun" && "Латунь"}
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
							{price * count} ₽
						</div>
						<div className={styles.cart__delivery_items_item_count_wrapper}>
							<button
								onClick={count > 1 ? onClickMinus : onClickRemove}
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
									{count}
								</span>
							</div>
							<button
								onClick={onClickPlus}
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
					</div>
				</div>
			)}
		</>
	);
};

export default CartItem;
