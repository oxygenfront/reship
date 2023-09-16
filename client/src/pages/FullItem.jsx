import { isEqual } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useParams } from "react-router-dom";
import {
	addItem,
	minusItem,
	removeItemFromFullItem,
	selectCart,
	selectCartItemById,
} from "../redux/slices/cartSlice";
import {
	fetchFullItem,
	selectFullItemData,
} from "../redux/slices/fullItemSlice";

import "swiper/css";
import "swiper/css/bundle";
import { Comment, FullItemSlider } from "../components";
import {
	fetchGetReviewsForProductId,
	selectCommentsData,
} from "../redux/slices/commentSlice";

const FullItem = () => {
	const token = localStorage.getItem("token");
	const { id } = useParams();

	const theme = useSelector((state) => state.theme);
	const { comments, arrStatus } = useSelector(selectCommentsData);
	const { cartItems } = useSelector(selectCart);

	const { item, status } = useSelector(selectFullItemData);

	const renderStatus = Boolean(status === "success");

	const [layouts, setLayouts] = useState([]);
	const [plates, setPlates] = useState([]);
	const [switches, setSwitches] = useState([]);
	const [colors, setColors] = useState([]);

	const [selectedLayout, setSelectedLayout] = useState();
	const [selectedPlate, setSelectedPlate] = useState();
	const [selectedSwitch, setSelectedSwitch] = useState();
	const [selectedColor, setSelectedColor] = useState();

	const [switchPrice, setSwitchPrice] = useState(0);
	const [platePrice, setPlatePrice] = useState(0);
	const [layoutPrice, setLayoutPrice] = useState(0);

	const [parameters, setParameter] = useState({
		layout: "",
		plate: "",
		switch: "",
	});

	const [isDifferent, setIsDifferent] = useState(false);

	const [addedCount, setAddedCount] = useState(0);

	const dispatch = useDispatch();
	const [navigate, setNavigate] = useState(false);
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	const colorItem =
		renderStatus &&
		(JSON.parse(item.colors).find((item) => item.id === Number(id)) ||
			JSON.parse(item.colors)[0]);
	console.log(colors);

	const collectedItem = {
		id: item.id,
		cartId: Math.random(),
		category: item.category,
		name: item.name,
		image: item.image_link,
		price: item.price + switchPrice + layoutPrice + platePrice,
		weight: item.weight,
		parameters: parameters,
		color: colorItem?.color,
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

	// Добавление объектов плат, свитчей и раскладок в стейты
	useEffect(() => {
		renderStatus && setColors(JSON.parse(item.colors));
		if (renderStatus && item.category === "Клавиатуры") {
			setPlates(JSON.parse(item.parameters_dop)[0].plates);
			setSwitches(JSON.parse(item.parameters_dop)[1].switches);
			setLayouts(JSON.parse(item.parameters_dop)[2].layouts);
		}
	}, [item]);

	useEffect(() => {
		plates.length > 0 && setSelectedPlate(Object.keys(plates[0])[0]);
		switches.length > 0 && setSelectedSwitch(Object.keys(switches[0])[0]);
		layouts.length > 0 && setSelectedLayout(Object.keys(layouts[0])[0]);
	}, [renderStatus, plates, switches, layouts]);

	// Выбор начальных/дефолтных значений при рендере
	useEffect(() => {
		setParameter({
			layout: selectedLayout,
			switch: selectedSwitch,
			plate: selectedPlate,
		});
	}, [selectedLayout, selectedSwitch, selectedPlate]);

	// Добавление цены параметрам
	useEffect(() => {
		const foundSwitch = switches.find(
			(item) => Object.keys(item)[0] === selectedSwitch
		);
		const foundLayout = layouts.find(
			(item) => Object.keys(item)[0] === selectedLayout
		);
		const foundPlate = plates.find(
			(item) => Object.keys(item)[0] === selectedPlate
		);

		const layoutPrice = foundLayout?.[selectedLayout];
		const switchPrice = foundSwitch?.[selectedSwitch];
		const platePrice = foundPlate?.[selectedPlate];

		setSwitchPrice(switchPrice ?? 0);
		setLayoutPrice(layoutPrice ?? 0);
		setPlatePrice(platePrice ?? 0);
	}, [
		selectedSwitch,
		selectedLayout,
		selectedPlate,
		layouts,
		plates,
		switches,
	]);

	const cartItem = useSelector(
		selectCartItemById({
			category: collectedItem.category,
			name: collectedItem.name,
			parameters: collectedItem.parameters,
			color: collectedItem.color,
			id: collectedItem.id,
		})
	);

	useEffect(() => {
		cartItem ? setAddedCount(cartItem.count) : setAddedCount(0);
	}, [cartItem]);

	useEffect(() => {
		const areEqual = cartItems.every((cartItem) =>
			isEqual(cartItem.parameters, parameters)
		);
		setIsDifferent(!areEqual);
	}, [parameters]);

	useEffect(() => {
		function handleResize() {
			setWindowWidth(window.innerWidth);
		}

		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		dispatch(fetchFullItem({ id }));
		dispatch(fetchGetReviewsForProductId({ token, id }));
	}, [selectedColor]);

	const colorSwitchForStyle = (switchText) => {
		return switchText.split(" ")[switchText.split(" ").length - 1];
	};

	const titleSwitch = (switchText) => {
		if (switchText.split(" ").length > 1) {
			return switchText.split(" ").slice(0, -1);
		} else return switchText;
	};

	if (navigate) {
		return <Navigate to="/login"></Navigate>;
	}
	return (
		<>
			{windowWidth > 991 && renderStatus ? (
				<div className="fullitem">
					<div className="fullitem__card-wrapper">
						<div className="fullitem__card-breadcrumb container"></div>
						<div className="fullitem__card container">
							<div className="fullitem__card-sliders">
								{renderStatus && (
									<FullItemSlider
										image={item.image_link}
										id={id}
									></FullItemSlider>
								)}
							</div>
							<div className="fullitem__card_info-wrapper">
								<div className="fullitem__card_info-name">{item.name}</div>

								{colors.length > 0 ||
								layouts.length > 0 ||
								plates.length > 0 ||
								switches.length > 0 ? (
									<div className="fullitem__card_info-params">
										{item.category === "Клавиатуры" ? (
											<>
												{switches.length > 0 && (
													<div className="fullitem__card_info-params_block">
														<p>Переключатели</p>

														<div className="fullitem__card_info-params_block-wrapper swithes">
															{switches &&
																switches.map((svitch) => (
																	<button
																		key={Object.keys(svitch)[0]}
																		onClick={(e) => {
																			setSwitchPrice(Number(e.target.value));
																			setSelectedSwitch(Object.keys(svitch)[0]);
																		}}
																		value={Object.values(svitch)[0]}
																		className={
																			selectedSwitch === Object.keys(svitch)[0]
																				? `fullitem__card_info-params_block_button ${colorSwitchForStyle(
																						Object.keys(svitch)[0]
																				  )} active`
																				: `fullitem__card_info-params_block_button ${colorSwitchForStyle(
																						Object.keys(svitch)[0]
																				  )}`
																		}
																	>
																		<span
																			style={{
																				backgroundColor: `${colorSwitchForStyle(
																					Object.keys(svitch)[0]
																				)}`,
																			}}
																		></span>
																		{titleSwitch(Object.keys(svitch)[0])}
																	</button>
																))}
														</div>
													</div>
												)}
												{colors.length > 0 && (
													<div className="fullitem__card_info-params_block">
														<p>Цвет</p>
														<div className="fullitem__card_info-params_block-wrapper colors">
															{colors &&
																colors.map((colour) => (
																	<Link
																		to={`/item/${colour.id}`}
																		onClick={() =>
																			setSelectedColor(colour.color)
																		}
																		className={
																			renderStatus
																				? Number(id) === colour.id
																					? `fullitem__card_info-params_block_color active ${colour?.color?.toLowerCase()}`
																					: `fullitem__card_info-params_block_color ${colour?.color?.toLowerCase()}`
																				: ""
																		}
																		key={colour.id}
																		value={colour.color}
																	></Link>
																))}
														</div>
													</div>
												)}
												{layouts.length > 0 && (
													<div className="fullitem__card_info-params_block ">
														<p>Раскладка</p>
														<div className="fullitem__card_info-params_block-wrapper layouts">
															{layouts &&
																layouts.map((layout) => (
																	<button
																		key={Object.keys(layout)[0]}
																		value={Object.values(layout)[0]}
																		onClick={(e) => {
																			setLayoutPrice(Number(e.target.value));
																			setSelectedLayout(Object.keys(layout)[0]);
																		}}
																		className={
																			selectedLayout === Object.keys(layout)[0]
																				? "fullitem__card_info-params_block_button active"
																				: "fullitem__card_info-params_block_button"
																		}
																	>
																		{Object.keys(layout)[0] === "rus"
																			? "Русская"
																			: Object.keys(layout)[0] === "eng"
																			? "Английская"
																			: Object.keys(layout)[0] === "jpn" &&
																			  "Японская"}
																	</button>
																))}
														</div>
													</div>
												)}
												{plates.length > 0 && (
													<div className="fullitem__card_info-params_block">
														<p>Материал платы</p>
														<div className="fullitem__card_info-params_block-wrapper plates">
															{plates &&
																plates.map((plate) => (
																	<button
																		key={Object.keys(plate)[0]}
																		value={Object.values(plate)[0]}
																		onClick={(e) => {
																			setPlatePrice(Number(e.target.value));
																			setSelectedPlate(Object.keys(plate)[0]);
																		}}
																		className={
																			selectedPlate === Object.keys(plate)[0]
																				? "fullitem__card_info-params_block_button active"
																				: "fullitem__card_info-params_block_button"
																		}
																	>
																		{Object.keys(plate)[0] === "allum"
																			? "Алюминий"
																			: Object.keys(plate)[0] === "poliCarb"
																			? "Поликарбонат"
																			: Object.keys(plate)[0] === "latun" &&
																			  "Латунь"}
																	</button>
																))}
														</div>
													</div>
												)}
											</>
										) : (
											<>
												{colors.length > 0 && (
													<div className="fullitem__card_info-params_block">
														<p>Цвет</p>
														<div className="fullitem__card_info-params_block-wrapper colors">
															{colors &&
																colors.map((colour) => (
																	<Link
																		to={`/item/${colour.id}`}
																		onClick={() =>
																			setSelectedColor(colour.color)
																		}
																		className={
																			renderStatus
																				? Number(id) === colour.id
																					? `fullitem__card_info-params_block_color active ${colour?.color?.toLowerCase()}`
																					: `fullitem__card_info-params_block_color ${colour?.color?.toLowerCase()}`
																				: ""
																		}
																		key={colour.id}
																		value={colour.color}
																	></Link>
																))}
														</div>
													</div>
												)}
											</>
										)}
									</div>
								) : null}

								<div className="fullitem__card_info-bottom">
									<span>
										{item.price + switchPrice + layoutPrice + platePrice} руб
									</span>
									{addedCount ? (
										<div className="fullitem__card_info-bottom_buttons">
											<Link
												className="fullitem__card_info-bottom_buttons_cart"
												to="/cart"
											>
												Перейти в корзину
											</Link>

											<div
												className={"fullitem__card_info-bottom_buttons_button"}
											>
												<button
													onClick={
														addedCount > 1 ? onClickMinus : onClickRemove
													}
													className={
														"fullitem__card_info-bottom_buttons_button_minus_wrapper"
													}
												>
													<div
														className={
															"fullitem__card_info-bottom_buttons_button_minus"
														}
													></div>
												</button>
												{addedCount}
												<button
													onClick={onClickAdd}
													className={
														"fullitem__card_info-bottom_buttons_button_pluses"
													}
												>
													<div
														className={
															"fullitem__card_info-bottom_buttons_button_pluses_block"
														}
													>
														<div
															className={
																"fullitem__card_info-bottom_buttons_button_pluses_itemv"
															}
														></div>
														<div
															className={
																"fullitem__card_info-bottom_buttons_button_pluses_itemh"
															}
														></div>
													</div>
												</button>
											</div>
										</div>
									) : (
										<button
											className="fullitem__card_info-bottom_btn"
											to="/cart"
											onClick={onClickAdd}
										>
											В корзину
										</button>
									)}
								</div>
							</div>
						</div>
					</div>
					<div className="fullitem__description container">
						<div className="fullitem__description_left">
							<div className="">
								<p>Описание</p>
								<div className="fullitem__description_left_description">
									{item.description_full}
								</div>
							</div>
							<div className="">
								<p>Особенности</p>
								{renderStatus &&
									JSON.parse(item.feature).map((feature, index) => (
										<div
											key={index}
											className="fullitem__description_left_spec"
										>
											<div className="fullitem__description_left_spec_title">
												{feature.title}
											</div>
											<div className="fullitem__description_left_spec_text">
												{feature.desc}
											</div>
										</div>
									))}
							</div>
						</div>
						<div className="fullitem__description_right">
							<p>Характеристика</p>
							<div className="fullitem__description_right_har">
								{renderStatus &&
									JSON.parse(item?.parameters).map((item, index) => (
										<div
											className="fullitem__description_right_har_item"
											key={index}
										>
											<div className="fullitem__description_right_har_item_left">
												{item.title}
											</div>
											<div className="fullitem__description_right_har_item_right">
												{item.desc}
											</div>
										</div>
									))}
							</div>
						</div>
					</div>
					<div className="fullitem__comments container">
						<p className="fullitem__comments_title">Отзывы</p>
						<div className="fullitem__comments_items">
							{arrStatus === "success" && comments.items?.length > 0 ? (
								comments.items.map((comment) => (
									<Comment
										first_name={comment.first_name}
										last_name={comment.last_name}
										anon={comment.anon}
										author_id={comment.author_id}
										date={comment.date_timestamp}
										rating={comment.rating}
										text={comment.text}
									></Comment>
								))
							) : (
								<div className="personal__empty_wrapper">
									<div className="container personal__empty_container">
										<div
											style={{
												backgroundImage:
													theme === "dark"
														? `url('../assets/img/no-item black theme.png')`
														: `url('../assets/img/no-item.png')`,
												backgroundSize: "cover",
											}}
											className="personal__empty"
										>
											Пусто
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			) : (
				renderStatus &&
				windowWidth <= 991 && (
					<div className="fullitem">
						<div className="fullitem__card-wrapper">
							<div className="fullitem__card-breadcrumb container"></div>
							<div className="fullitem__card container">
								<div className="fullitem__card_info-wrapper">
									<div className="fullitem__card_info-name">{item.name}</div>
									<div className="fullitem__card-sliders">
										{renderStatus && (
											<FullItemSlider
												image={item.image_link}
												id={id}
											></FullItemSlider>
										)}
									</div>
									{colors.length > 0 ||
									layouts.length > 0 ||
									plates.length > 0 ||
									switches.length > 0 ? (
										<div className="fullitem__card_info-params">
											{item.category === "Клавиатуры" ? (
												<>
													{switches.length > 0 && (
														<div className="fullitem__card_info-params_block">
															<p>Переключатели</p>

															<div className="fullitem__card_info-params_block-wrapper swithes">
																{switches &&
																	switches.map((svitch) => (
																		<button
																			key={Object.keys(svitch)[0]}
																			onClick={(e) => {
																				setSwitchPrice(Number(e.target.value));
																				setSelectedSwitch(
																					Object.keys(svitch)[0]
																				);
																			}}
																			value={Object.values(svitch)[0]}
																			className={
																				selectedSwitch ===
																				Object.keys(svitch)[0]
																					? `fullitem__card_info-params_block_button ${colorSwitchForStyle(
																							Object.keys(svitch)[0]
																					  )} active`
																					: `fullitem__card_info-params_block_button ${colorSwitchForStyle(
																							Object.keys(svitch)[0]
																					  )}`
																			}
																		>
																			<span
																				style={{
																					backgroundColor: `${colorSwitchForStyle(
																						Object.keys(svitch)[0]
																					)}`,
																				}}
																			></span>
																			{titleSwitch(Object.keys(svitch)[0])}
																		</button>
																	))}
															</div>
														</div>
													)}

													{layouts.length > 0 && (
														<div className="fullitem__card_info-params_block ">
															<p>Раскладка</p>
															<div className="fullitem__card_info-params_block-wrapper layouts">
																{layouts &&
																	layouts.map((layout) => (
																		<button
																			key={Object.keys(layout)[0]}
																			value={Object.values(layout)[0]}
																			onClick={(e) => {
																				setLayoutPrice(Number(e.target.value));
																				setSelectedLayout(
																					Object.keys(layout)[0]
																				);
																			}}
																			className={
																				selectedLayout ===
																				Object.keys(layout)[0]
																					? "fullitem__card_info-params_block_button active"
																					: "fullitem__card_info-params_block_button"
																			}
																		>
																			{Object.keys(layout)[0] === "rus"
																				? "Русская"
																				: Object.keys(layout)[0] === "eng"
																				? "Английская"
																				: Object.keys(layout)[0] === "jpn" &&
																				  "Японская"}
																		</button>
																	))}
															</div>
														</div>
													)}
													{plates.length > 0 && (
														<div className="fullitem__card_info-params_block">
															<p>Материал платы</p>
															<div className="fullitem__card_info-params_block-wrapper plates">
																{plates &&
																	plates.map((plate) => (
																		<button
																			key={Object.keys(plate)[0]}
																			value={Object.values(plate)[0]}
																			onClick={(e) => {
																				setPlatePrice(Number(e.target.value));
																				setSelectedPlate(Object.keys(plate)[0]);
																			}}
																			className={
																				selectedPlate === Object.keys(plate)[0]
																					? "fullitem__card_info-params_block_button active"
																					: "fullitem__card_info-params_block_button"
																			}
																		>
																			{Object.keys(plate)[0]}
																		</button>
																	))}
															</div>
														</div>
													)}
													{colors.length > 0 && (
														<div className="fullitem__card_info-params_block">
															<p>Цвет</p>
															<div className="fullitem__card_info-params_block-wrapper colors">
																{colors &&
																	colors.map((colour) => (
																		<Link
																			to={`/item/${colour.id}`}
																			onClick={() =>
																				setSelectedColor(colour.color)
																			}
																			className={
																				renderStatus
																					? Number(id) === colour.id
																						? `fullitem__card_info-params_block_color active ${colour.color.toLowerCase()}`
																						: `fullitem__card_info-params_block_color ${colour.color.toLowerCase()}`
																					: ""
																			}
																			key={colour.id}
																			value={colour.color}
																		></Link>
																	))}
															</div>
														</div>
													)}
												</>
											) : (
												<>
													{colors.length > 0 && (
														<div className="fullitem__card_info-params_block">
															<p> Цвет</p>
															<div className="fullitem__card_info-params_block-wrapper">
																{colors &&
																	colors.map((colour) => (
																		<Link
																			to={`/item/${colour.id}`}
																			onClick={() =>
																				setSelectedColor(colour.color)
																			}
																			className={
																				renderStatus
																					? Number(id) === colour.id
																						? `fullitem__card_info-params_block_color active ${colour.color.toLowerCase()}`
																						: `fullitem__card_info-params_block_color ${colour.color.toLowerCase()}`
																					: ""
																			}
																			key={colour.id}
																			value={colour.color}
																		></Link>
																	))}
															</div>
														</div>
													)}
												</>
											)}
										</div>
									) : null}
									<div className="fullitem__card_info-bottom">
										<span>
											{item.price + layoutPrice + switchPrice + platePrice} руб
										</span>
										{addedCount ? (
											<div className="fullitem__card_info-bottom_buttons">
												<Link
													className="fullitem__card_info-bottom_buttons_cart"
													to="/cart"
												>
													Перейти в корзину
												</Link>

												<div
													className={
														"fullitem__card_info-bottom_buttons_button"
													}
												>
													<div
														onClick={
															addedCount > 1 ? onClickMinus : onClickRemove
														}
														className={
															"fullitem__card_info-bottom_buttons_button_minus_wrapper"
														}
													>
														<div
															className={
																"fullitem__card_info-bottom_buttons_button_minus"
															}
														></div>
													</div>
													{addedCount}
													<button
														onClick={onClickAdd}
														className={
															"fullitem__card_info-bottom_buttons_button_pluses"
														}
													>
														<div
															className={
																"fullitem__card_info-bottom_buttons_button_pluses_block"
															}
														>
															<div
																className={
																	"fullitem__card_info-bottom_buttons_button_pluses_itemv"
																}
															></div>
															<div
																className={
																	"fullitem__card_info-bottom_buttons_button_pluses_itemh"
																}
															></div>
														</div>
													</button>
												</div>
											</div>
										) : (
											<button
												className="fullitem__card_info-bottom_btn"
												to="/cart"
												onClick={onClickAdd}
											>
												В корзину
											</button>
										)}
									</div>
								</div>
							</div>
						</div>
						<div className="fullitem__description container">
							<div className="fullitem__description_left">
								<div className="fullitem__description_left-block">
									<p>Описание</p>
									<div className="fullitem__description_left_description">
										{item.description_full}
									</div>
								</div>
								<div className="fullitem__description_left-block">
									<p>Особенности</p>
									{renderStatus &&
										JSON.parse(item.feature).map((feature) => (
											<div className="fullitem__description_left_spec">
												<div className="fullitem__description_left_spec_title">
													{feature.title}
												</div>
												<div className="fullitem__description_left_spec_text">
													{feature.desc}
												</div>
											</div>
										))}
								</div>
								<div className="fullitem__description_right">
									<p>Характеристика</p>
									<div className="fullitem__description_right_har">
										{renderStatus &&
											JSON.parse(item?.parameters).map((item, index) => (
												<div
													className="fullitem__description_right_har_item"
													key={index}
												>
													<div className="fullitem__description_right_har_item_left">
														{item.title}
													</div>
													<div className="fullitem__description_right_har_item_right">
														{item.desc}
													</div>
												</div>
											))}
									</div>
								</div>
							</div>
						</div>
						<div className="fullitem__comments container">
							<p className="fullitem__comments_title">Отзывы</p>
							<div className="fullitem__comments_items">
								{arrStatus === "success" && comments.items.length > 0 ? (
									comments.items.map((comment) => (
										<Comment
											first_name={comment.first_name}
											last_name={comment.last_name}
											anon={comment.anon}
											author_id={comment.author_id}
											date={comment.date_timestamp}
											rating={comment.rating}
											text={comment.text}
										></Comment>
									))
								) : (
									<div className="personal__empty_wrapper">
										<div className="container personal__empty_container">
											<div
												style={{
													backgroundImage:
														theme === "dark"
															? `url('../assets/img/no-item black theme.png')`
															: `url('../assets/img/no-item.png')`,
													backgroundSize: "cover",
												}}
												className="personal__empty"
											>
												Пусто
											</div>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
				)
			)}
		</>
	);
};

export default FullItem;
