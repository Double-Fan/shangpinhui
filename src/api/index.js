// 对 API 接口进行统一管理
import requests from "@/api/ajax";
import mockRequests from "@/api/mockAjax";

// 首页三级分类  /api/product/getBaseCategoryList  GET  无参数
export const reqGetCategoryList = () =>
	requests.get(`/product/getBaseCategoryList`);

// 获取banner（首页轮播图）  /mock/banner
export const reqGetBannerList = () => mockRequests.get(`/banner`);

// 获取floor数据  /mock/floor
export const reqGetFloorList = () => mockRequests.get(`/floor`);

// 获取搜索数据  /api/list  POST  参数：非必须
export const reqGetSearchList = (params) =>
	requests({
		url: "/list",
		method: "POST",
		data: params
	});

// 获取商品详情  /api/item/{skuId}  GET  参数：skuId
export const reqGetGoodInfo = (skyId) =>
	requests({
		url: `/item/${skyId}`,
		method: "GET"
	});

// 将产品添加到购物车中（获取更新某一产品的个数）  /api/cart/addToCart/{skuId}/{skuNum}  POST  参数：skuId、skuNum（正数增加，负数减少）
export const reqAddOrUpdateShopCart = (skuId, skuNum) =>
	requests({
		url: `/cart/addToCart/${skuId}/${skuNum}`,
		method: "POST"
	});

// 获取购物车列表  /api/cart/cartList  GET
export const reqGetCartList = () =>
	requests({
		url: `/cart/cartList`,
		method: "GET"
	});

// 删除购物车产品  /api/cart/deleteCart/{skuId}  DELETE  参数：skuId
export const reqDeleteCartById = (skuId) => {
	requests({
		url: `/cart/deleteCart/${skuId}`,
		method: "DELETE"
	});
};

// 切换商品选中状态  /api/cart/checkCart/{skuId}/{isChecked}  GET  参数：skuId、isChecked（0：未选中，1：选中）
export const reqUpdateCheckedById = (skuId, isChecked) => {
	requests({
		url: `/cart/checkCart/${skuId}/${isChecked}`,
		method: "GET"
	});
};
