import { isEqual } from "lodash";
import React, { useEffect, useRef, useState } from "react";
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
import { Comment, FullItemSlider, InfoSwitch } from "../components";
import {
	fetchGetReviewsForProductId,
	selectCommentsData,
} from "../redux/slices/commentSlice";
import {
	addFavorite,
	removeFavorite,
	selectFavorites,
} from "../redux/slices/favoriteSlice";
import { AiOutlineClose } from "react-icons/ai";

const FullItem = () => {
	const token = localStorage.getItem("token");

	const { id } = useParams();
	const { favorites } = useSelector(selectFavorites);
	const theme = useSelector((state) => state.theme);
	const { comments, arrStatus } = useSelector(selectCommentsData);
	const { cartItems } = useSelector(selectCart);

	const { item, status } = useSelector(selectFullItemData);

	const renderStatus = Boolean(status === "success");

	const [isFavorite, setIsFavorite] = useState(false);

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

	const [parameters, setParameters] = useState({
		layout: "",
		plate: "",
		switch: "",
	});

	const [bigImage, setBigImage] = useState("");

	const [isDifferent, setIsDifferent] = useState(false);

	const [addedCount, setAddedCount] = useState(0);

	const dispatch = useDispatch();
	const [navigate, setNavigate] = useState(false);
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	const [isHovered, setIsHovered] = useState({
		isHovered: false,
		id: "",
	});

	const colorItem =
		renderStatus &&
		(JSON.parse(item.colors).find((item) => item.id === Number(id)) ||
			JSON.parse(item.colors)[0]);

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

	const handleBigImage = (image) => {
		setBigImage(image);
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

	const mouseRef = useRef();

	const handlerMouseEnter = (svitch) => {
		mouseRef.current = setTimeout(() => {
			setIsHovered({
				isHovered: true,
				id: svitch.id,
			});
		}, 750);
	};
	const handlerMouseLeave = () => {
		clearTimeout(mouseRef.current);
		setIsHovered({
			isHovered: false,
			id: "",
		});
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
		plates.length > 0 && setSelectedPlate(plates[0]?.value);
		switches.length > 0 && setSelectedSwitch(switches[0]?.name);
		layouts.length > 0 && setSelectedLayout(layouts[0]?.value);
	}, [renderStatus, plates, switches, layouts]);

	// Выбор начальных/дефолтных значений при рендере
	useEffect(() => {
		setParameters({
			layout: selectedLayout,
			switch: selectedSwitch,
			plate: selectedPlate,
		});
	}, [selectedLayout, selectedSwitch, selectedPlate]);

	// Добавление цены параметрам
	useEffect(() => {
		const foundSwitch = switches.find((item) => item.name === selectedSwitch);
		const foundLayout = layouts.find((item) => item.value === selectedLayout);
		const foundPlate = plates.find((item) => item.value === selectedPlate);

		const layoutPrice = foundLayout?.price;
		const switchPrice = foundSwitch?.price;
		const platePrice = foundPlate?.price;

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
			if (collectedItem.color !== undefined && obj.category !== "Клавиатуры") {
				return (
					obj.id === collectedItem.id &&
					obj.color === collectedItem.color &&
					obj.name === collectedItem.name
				);
			} else {
				return (
					obj.id === collectedItem.id &&
					obj.name === collectedItem.name
				);
			}
		});

		setIsFavorite(ids);
	}, [favorites, collectedItem]);

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
			{windowWidth > 991 && renderStatus ? (
				<div className="fullitem">
					<div className="fullitem__card-wrapper">
						<div className="fullitem__card-breadcrumb container"></div>
						{bigImage && (
							<div className="fullitem__card-sliders_big-wrapper">
								<div className="fullitem__card-sliders_big-image_wrapper">
									<img
										className="fullitem__card-sliders_big-image"
										src={bigImage}
										alt="Большое изображение"
									></img>
								</div>
								<button
									onClick={() => setBigImage("")}
									className="fullitem__card-sliders_big-close"
								>
									<AiOutlineClose />
								</button>
							</div>
						)}
						<div className="fullitem__card container">
							<div className="fullitem__card-sliders">
								{renderStatus && (
									<FullItemSlider
										paramsItem={item}
										isFavorite={isFavorite}
										onChangeFavorite={onChangeFavorite}
										handleBigImage={handleBigImage}
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

														<div className="fullitem__card_info-params_block-wrapper switches">
															{isHovered.isHovered ? (
																<InfoSwitch id={isHovered.id} />
															) : null}
															{switches &&
																switches.map((svitch, index) => (
																	<button
																		key={index}
																		onClick={(e) => {
																			setSwitchPrice(Number(e.target.value));
																			setSelectedSwitch(svitch.name);
																		}}
																		value={svitch.price}
																		style={{
																			position: "relative",
																		}}
																		className={
																			selectedSwitch === svitch.name
																				? `fullitem__card_info-params_block_button ${colorSwitchForStyle(
																						svitch.color
																				  )} active`
																				: `fullitem__card_info-params_block_button ${colorSwitchForStyle(
																						svitch.color
																				  )}`
																		}
																		onMouseEnter={() =>
																			handlerMouseEnter(svitch)
																		}
																		onMouseLeave={() => handlerMouseLeave()}
																	>
																		<span
																			style={{
																				backgroundColor: `${colorSwitchForStyle(
																					svitch.color
																				)}`,
																			}}
																		></span>
																		{titleSwitch(svitch.name)}
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
																				? Number(id) === Number(colour.id)
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
																layouts.map((layout, index) => (
																	<button
																		key={index}
																		value={layout.price}
																		onClick={(e) => {
																			setLayoutPrice(Number(e.target.value));
																			setSelectedLayout(layout.value);
																		}}
																		className={
																			selectedLayout === layout.value
																				? "fullitem__card_info-params_block_button active"
																				: "fullitem__card_info-params_block_button"
																		}
																	>
																		{layout.value === "rus"
																			? "Русская"
																			: layout.value === "eng"
																			? "Английская"
																			: layout.value === "jpn" && "Японская"}
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
																plates.map((plate, index) => (
																	<button
																		key={index}
																		value={plate.price}
																		onClick={(e) => {
																			setPlatePrice(Number(e.target.value));
																			setSelectedPlate(plate.value);
																		}}
																		className={
																			selectedPlate === plate.value
																				? "fullitem__card_info-params_block_button active"
																				: "fullitem__card_info-params_block_button"
																		}
																	>
																		{plate.title}
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
																				? Number(id) === Number(colour.id)
																					? `fullitem__card_info-params_block_color active ${
																							colour?.color?.toLowerCase() ||
																							colour.toLowerCase()
																					  }`
																					: `fullitem__card_info-params_block_color ${
																							colour?.color?.toLowerCase() ||
																							colour.toLowerCase()
																					  }`
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
							{bigImage && (
								<div className="fullitem__card-sliders_big-wrapper">
									<div className="fullitem__card-sliders_big-image_wrapper">
										<img
											className="fullitem__card-sliders_big-image"
											src={bigImage}
											alt="Большое изображение"
										></img>
									</div>
									<button
										onClick={() => setBigImage("")}
										className="fullitem__card-sliders_big-close"
									>
										<AiOutlineClose />
									</button>
								</div>
							)}
							<div className="fullitem__card container">
								<div className="fullitem__card_info-wrapper">
									<h1 className="fullitem__card_info-name">{item.name}</h1>
									<div className="fullitem__card-sliders">
										{renderStatus && (
											<FullItemSlider
												paramsItem={item}
												isFavorite={isFavorite}
												onChangeFavorite={onChangeFavorite}
												handleBigImage={handleBigImage}
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

															<div className="fullitem__card_info-params_block-wrapper switches">
																{switches &&
																	switches.map((svitch, index) => (
																		<button
																			key={index}
																			onClick={(e) => {
																				setSwitchPrice(Number(e.target.value));
																				setSelectedSwitch(svitch.name);
																			}}
																			value={svitch.price}
																			className={
																				selectedSwitch === svitch.name
																					? `fullitem__card_info-params_block_button ${colorSwitchForStyle(
																							svitch.color
																					  )} active`
																					: `fullitem__card_info-params_block_button ${colorSwitchForStyle(
																							svitch.color
																					  )}`
																			}
																			// onMouseEnter={() =>
																			// 	handlerMouseEnter(svitch)
																			// }
																			// onMouseLeave={() =>
																			// 	handlerMouseLeave(svitch)
																			// }
																		>
																			<span
																				style={{
																					backgroundColor: `${colorSwitchForStyle(
																						svitch.color
																					)}`,
																				}}
																			></span>
																			{titleSwitch(svitch.name)}
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
																	layouts.map((layout, index) => (
																		<button
																			key={index}
																			value={layout.price}
																			onClick={(e) => {
																				setLayoutPrice(Number(e.target.value));
																				setSelectedLayout(layout.value);
																			}}
																			className={
																				selectedLayout === layout.value
																					? "fullitem__card_info-params_block_button active"
																					: "fullitem__card_info-params_block_button"
																			}
																		>
																			{layout.value === "rus"
																				? "Русская"
																				: layout.value === "eng"
																				? "Английская"
																				: layout.value === "jpn" && "Японская"}
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
																	plates.map((plate, index) => (
																		<button
																			key={index}
																			value={plate.price}
																			onClick={(e) => {
																				setPlatePrice(Number(e.target.value));
																				setSelectedPlate(plate.value);
																			}}
																			className={
																				selectedPlate === plate.value
																					? "fullitem__card_info-params_block_button active"
																					: "fullitem__card_info-params_block_button"
																			}
																		>
																			{plate.title}
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
