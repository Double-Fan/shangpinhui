// axios 二次封装
import axios from "axios";
// 引入进度条
import nprogress from "nprogress";
import "nprogress/nprogress.css";

let requests = axios.create({
	baseURL: "/mock",
	timeout: 5000
});

// 请求拦截器
requests.interceptors.request.use(
	(config) => {
		// 进度条开始
		nprogress.start();
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// 响应拦截器
requests.interceptors.response.use(
	(response) => {
		// 进度条结束
		nprogress.done();
		return response.data;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default requests;
