import { reqGetCartList, reqDeleteCartById, reqUpdateCheckedById } from "@/api";

const state = {
	cartList: []
};

const mutations = {
	GETCARTLIST(state, value) {
		state.cartList = value;
	}
};

const actions = {
	// 获取购物车列表数据
	async getCartList({ commit }) {
		let result = await reqGetCartList();
		if (result.code === 200) {
			commit("GETCARTLIST", result.data);
		}
	},
	// 删除购物车中的某一产品
	async deleteCartById(context, skuId) {
		let result = await reqDeleteCartById(skuId);
		if (result.code === 200) {
			return "删除成功";
		} else {
			return Promise.reject(new Error("删除失败"));
		}
	},
	// 修改购物车某一个产品的选中状态
	async updateCheckedById(context, { skuId, isChecked }) {
		let result = await reqUpdateCheckedById(skuId, isChecked);
		if (result.code === 200) {
			return "ok";
		} else {
			return Promise.reject(new Error("fail"));
		}
	},
	// 删除全部勾选的产品
	deleteAllCheckedCart({ dispatch, getters }) {
		// 获取购物车中全部产品
		let promiseAll = [];
		getters.cartList.cartInfoList.forEach((item) => {
			let promise =
				item.isChecked == 1 ? dispatch("deleteCartById", item.skuId) : "";
			promiseAll.push(promise);
		});
		// 只要全部的p1|p2...都成功，返回结果成功；如果一个失败，返回即失败
		return Promise.all(promiseAll);
	},
	// 修改全部产品的选中状态
	updateAllCartChecked({ dispatch, state }, isChecked) {
		let promiseAll = [];
		state.cartList[0].cartInfoList.forEach((item) => {
			let promise = dispatch("updateCheckedById", {
				skuId: item.skuId,
				isChecked
			});
			promiseAll.push(promise);
		});
		return Promise.all(promiseAll);
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
