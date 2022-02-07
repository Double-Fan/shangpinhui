import { reqGetAddressInfo, reqGetOrderInfo } from "@/api";

const state = {
	address: [],
	orderInfo: {}
};

const mutations = {
	GETADDRESSINFO(state, value) {
		state.address = value;
	},
	GETORDERINFO(state, value) {
		state.orderInfo = value;
	}
};

const actions = {
	// 获取用户地址信息
	async getAddressInfo({ commit }) {
		let result = await reqGetAddressInfo();
		if (result.code === 200) {
			commit("GETADDRESSINFO", result.data);
		}
	},
	// 获取商品清单
	async getOrderInfo({ commit }) {
		let result = await reqGetOrderInfo();
		if (result.code === 200) {
			commit("GETORDERINFO", result.data);
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
