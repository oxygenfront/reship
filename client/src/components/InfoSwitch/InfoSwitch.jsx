import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchInfoSwitch,
	selectSwitchInfoData,
} from "../../redux/slices/switchInfoSlice";

const InfoSwitch = () => {
	const id = 1;
	const dispatch = useDispatch();
	const data = useSelector(selectSwitchInfoData);
	useEffect(() => {
		dispatch(fetchInfoSwitch({ id }));
	}, []);
	console.log(data);

	return <div>InfoSwitch</div>;
};

export default InfoSwitch;
