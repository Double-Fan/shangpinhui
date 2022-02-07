// 登录与注册
import {
	reqGetCode,
	reqUserRegister,
	reqUserLogin,
	reqGetUserInfo,
	reqLogout
} from "@/api";
import { setToken, getToken, removeToken } from "@/utils/token";

const state = {
	code: "",
	token: getToken(),
	userInfo: {}
};

const mutations = {
	GETCODE(state, value) {
		state.code = value;
	},
	USERLOGIN(state, value) {
		state.token = value;
	},
	GETUSERINFO(state, value) {
		state.userInfo = value;
	},
	LOGOUT(state, value) {
		state.token = "";
		state.userInfo = {};
		removeToken()
	}
};

const actions = {
	// 获取验证码
	async getCode({ commit }, phone) {
		let result = await reqGetCode(phone);
		if (result.code === 200) {
			commit("GETCODE", result.data);
			return "ok";
		} else {
			return Promise.reject(new Error("faile"));
		}
	},
	// 用户注册
	async userRegister({ commit }, user) {
		let result = await reqUserRegister(user);
		console.log(result);
		if (result.code === 200) {
			return "注册成功";
		} else {
			return Promise.reject(new Error("注册失败！"));
		}
	},
	// 用户登录
	async userLogin({ commit }, user) {
		let result = await reqUserLogin(user);
		console.log(result);
		if (result.code === 200) {
			commit("USERLOGIN", result.data.token);
			// 持久化存储token
			setToken(result.data.token);
			return "登录成功";
		} else {
			return Promise.reject(new Error("登录失败"));
		}
	},
	// 获取用户信息
	async getUserInfo({ commit }) {
		let result = await reqGetUserInfo();
		if (result.code === 200) {
			commit("GETUSERINFO", result.data);
			return "ok";
		} else {
			return Promise.reject(new Error("faile"));
		}
	},
	// 退出登录
	async logout({ commit }) {
		let result = await reqLogout();
		console.log(result);
		if (result.code === 200) {
			commit("LOGOUT");
			return "退出成功";
		} else {
			return Promise.reject(new Error("退出失败"));
		}
	}
};

const getters = {};

export default {
	state,
	mutations,
	actions,
	getters
};
