import { reqGetCartList } from "@/api";

const state = {
	cartList: []
};

const mutations = {
	GETCARTLIST(state, value) {
		state.cartList = value;
	}
};

const actions = {
	async getCartList({ commit }) {
		let result = await reqGetCartList();
		if (result.code === 200) {
			commit("GETCARTLIST", result.data);
		}
	}
};

const getters = {
	cartList(state) {
		return state.cartList[0] || {};
	}
};

export default {
	state,
	mutations,
	actions,
	getters
};
