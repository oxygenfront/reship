import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchInfoSwitch,
	selectSwitchInfoData,
} from "../../redux/slices/switchInfoSlice";
import styles from "./infoSwitch.module.sass";
const InfoSwitch = ({ id }) => {
	const dispatch = useDispatch();
	const data = useSelector(selectSwitchInfoData)?.item;
	useEffect(() => {
		dispatch(fetchInfoSwitch({ id }));
	}, []);

	const maxScales = 3;

	const scalesArray = [...Array(data.weight)];
	const emptyScalesArray = [...Array(maxScales - (data.weight || 0))];

	return (
		<>
			{data && (
				<div className={styles.wrapper}>
					<div className={styles.up_block}>
						<div className={styles.image_block}>
							<img
								className={styles.image}
								src="https://placehold.co/70x70"
								alt=""
							/>
						</div>
						<div className={styles.up_block_title}>
							<span className={styles.title}>{data.title}</span>
							<span className={styles.type}>{data.type}</span>
						</div>
					</div>
					<div className={styles.middle_block}>{data.description}</div>
					<div className={styles.bottom_block}>
						<div className={styles.bottom_block_left}>
							<div className={styles.bottom_block_scales}>
								{scalesArray.map((_, index) => (
									<span
										key={index}
										className={`${styles.bottom_block_scale} ${
											index < data.weight ? styles.white : ""
										}`}
									></span>
								))}
								{emptyScalesArray.map((_, index) => (
									<span
										key={index + scalesArray.length}
										className={`${styles.bottom_block_scale}`}
									></span>
								))}
							</div>
							<span>Вес</span>
						</div>
						<div className={styles.bottom_block_right}>
							<div className={styles.bottom_block_right_titles}>
								<span>Сила срабатывания</span>
								<span>Сила до упора</span>
								<span>Сила тактильности</span>
								<span>Длина пути</span>
							</div>
							<div className={styles.bottom_block_right_values}>
								<span>{data.force_actuation}</span>
								<span>{data.force_limit}</span>
								<span>{data.power_tactical}</span>
								<span>{data.path_length}</span>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default InfoSwitch;
