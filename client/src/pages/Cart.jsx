import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CartItem } from "../components";

import { selectCart } from "../redux/slices/cartSlice";
import { fetchAuthMe } from "../redux/slices/authSlice";
import { calcTotalPrice } from "../utils/calcTotalPrice";
import { fetchCheckPromocode } from "../redux/slices/cartSlice";

const Cart = () => {
	const dispatch = useDispatch();
	const { cartItems } = useSelector(selectCart);

	const theme = useSelector((state) => state.theme);
	const totalPrice = calcTotalPrice(cartItems);

	const totalCount = cartItems.reduce((sum, item) => sum + item.count, 0);

	const [promocode, setPromocode] = useState("");
	const token = localStorage.getItem("token");
	const [isPromocode, setIsPromocode] = useState(false);
	async function sendForm(e) {
		e.preventDefault();
		const data = await dispatch(fetchCheckPromocode({ token, promocode }));

		if (!data.payload) {
			alert("Не удалось использовать промокод");
			return setIsPromocode(true);
		}
		if (data.payload) {
			alert("Промокод применен");
			window.localStorage.setItem("promocode", data.payload.persent);
			return setIsPromocode(true);
		}

		setPromocode("");
	}

	return (
		<section className="cart">
			<div className="container cart__container">
				<div className="cart__title">
					<h1>
						Моя <span>корзина</span>
					</h1>
				</div>
				{totalCount === 0 ? (
					<div className="cart__empty_wrapper">
						<div className="container cart__empty_container">
							<div
								style={{
									backgroundImage:
										theme === "dark"
											? `url('../assets/img/no-item black theme.png')`
											: `url('../assets/img/no-item.png')`,
									backgroundSize: "cover",
								}}
								className="cart__empty"
							>
								У вас пока нет<br></br> товаров корзине
							</div>
						</div>
					</div>
				) : (
					<div className="cart__all">
						<div className="cart__wrapper">
							<div className="cart__delivery-items ">
								{cartItems.map((item) => (
									<CartItem
										key={item.cartId}
										cartId={item.cartId}
										parameters={item.parameters}
										image={item.image}
										color={item.color}
										name={item.name}
										count={item.count}
										price={item.price}
										id={item.id}
									></CartItem>
								))}
							</div>
						</div>

						<div className="cart__total">
							<div className="cart__total-wrapper">
								<div className="cart__total-wrapper-info">
									<div className="cart__total-wrapper-title">Ваши покупки</div>
									<div className="cart__total-wrapper-info_items">
										{cartItems.map((item) => (
											<div
												key={item.cartId}
												className="cart__total-wrapper-info_items_item"
											>
												<p>{item.name}</p>
												<p>{item.count} шт</p>
												<p>{item.price} руб</p>
											</div>
										))}
									</div>

									<div className="cart__total-wrapper-info_total">
										Итог{" "}
										<span>
											{window.localStorage.getItem("promocode")
												? Math.round(
														totalPrice *
															(1 -
																window.localStorage.getItem("promocode") / 100)
												  ).toLocaleString()
												: totalPrice.toLocaleString()}
											₽
										</span>
									</div>
								</div>
							</div>
							<div className="cart__total-wrapper-buttons">
								<form action="">
									<input
										value={promocode}
										onChange={(e) => setPromocode(e.target.value)}
										type="text"
										className="cart__total-wrapper-buttons_inp"
										placeholder="Введите промокод"
									/>
									<button
										className="cart__total-wrapper-buttons_button"
										onClick={sendForm}
										type="submit"
									>
										<img
											className="cart__total-wrapper-buttons_img"
											src="../assets/img/arrow-next.png"
											alt="check"
										/>
									</button>
								</form>
								<Link to="/order" className="cart__total-wrapper-buttons_link">
									Продолжить оформление
								</Link>
							</div>
						</div>
					</div>
				)}
			</div>
		</section>
	);
};

export default Cart;
