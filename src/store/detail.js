import { reqGetGoodInfo, reqAddOrUpdateShopCart } from "@/api";
import { getUUID } from "@/utils/uuid_token";

const state = {
	goodInfo: {},
	// 游客临时身份
	uuid_token: getUUID()
};

const mutations = {
	GETGOODINFO(state, value) {
		state.goodInfo = value;
	}
};

const actions = {
	// 获取产品信息
	async getGoodInfo({ commit }, skuId) {
		let result = await reqGetGoodInfo(skuId);
		if (result.code === 200) {
			commit("GETGOODINFO", result.data);
		}
	},
	// 将产品添加到购物车中
	async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
		let result = await reqAddOrUpdateShopCart(skuId, skuNum);
		if (result.code === 200) {
			// 服务器加入购物车成功
			return "ok";
		} else {
			// 服务器加入购物车失败
			return Promise.reject(new Error("加入购物车失败"));
		}
	}
};

const getters = {
	// 路径导航
	categoryView(state) {
		return state.goodInfo.categoryView || {};
	},
	// 产品信息
	skuInfo(state) {
		return state.goodInfo.skuInfo || {};
	},
	// 售卖属性
	spuSaleAttrList(state) {
		return state.goodInfo.spuSaleAttrList || [];
	}
};

export default {
	state,
	mutations,
	actions,
	getters
};
