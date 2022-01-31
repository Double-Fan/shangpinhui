// search 仓库
import { reqGetSearchList } from "@/api";

const state = {
	// 商品列表
	searchList: {}
};

const mutations = {
	GETSEARCHLIST(state, value) {
		state.searchList = value;
	}
};

const actions = {
	async getSearchList({ commit }, params) {
		let result = await reqGetSearchList(params);
		if (result.code === 200) {
			commit("GETSEARCHLIST", result.data);
		}
	}
};

const getters = {
	attrsList(state) {
		return state.searchList.attrsList || [];
	},
	goodsList(state) {
		return state.searchList.goodsList || [];
	},
	trademarkList(state) {
		return state.searchList.trademarkList || [];
	}
};

export default {
	state,
	mutations,
	actions,
	getters
};
