// home 仓库
import { reqGetCategoryList, reqGetBannerList, reqGetFloorList } from "@/api";

const state = {
	// 菜单
	categoryList: [],
	// 轮播图
	bannerList: [],
	// Floor
	floorList: []
};

const mutations = {
	GETCATEGORYLIST(state, value) {
		state.categoryList = value;
	},
	GETBANNERLIST(state, value) {
		state.bannerList = value;
	},
	GETFLOORLIST(state, value) {
		state.floorList = value;
	}
};

const actions = {
	// 获取三级菜单
	async getCategoryList({ commit }) {
		let result = await reqGetCategoryList();
		if (result.code === 200) {
			commit("GETCATEGORYLIST", result.data);
		}
	},
	// 获取轮播图
	async getBannerList({ commit }) {
		let result = await reqGetBannerList();
		if (result.code === 200) {
			commit("GETBANNERLIST", result.data);
		}
	},
	// 获取Floor
	async getFloorList({ commit }) {
		let result = await reqGetFloorList();
		if (result.code === 200) {
			commit("GETFLOORLIST", result.data);
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
