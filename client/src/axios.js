import axios from "axios";

const instance = axios.create({
	// baseURL: "https://reship1.ru:5000/api",
	baseURL: 'http://localhost:5000/api',
});

instance.interceptors.request.use((config) => {
	config.headers.Authorization = window.localStorage.getItem("token");

	return config;
});

export default instance;
