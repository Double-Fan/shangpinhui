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
export const reqGetSearchList = (data) =>
	requests({
		url: "/list",
		method: "POST",
		data
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
export const reqDeleteCartById = (skuId) =>
	requests({
		url: `/cart/deleteCart/${skuId}`,
		method: "DELETE"
	});

// 切换商品选中状态  /api/cart/checkCart/{skuId}/{isChecked}  GET  参数：skuId、isChecked（0：未选中，1：选中）
export const reqUpdateCheckedById = (skuId, isChecked) =>
	requests({
		url: `/cart/checkCart/${skuId}/${isChecked}`,
		method: "GET"
	});

// 获取验证码  api/user/passport/sendCode/{phone}  GET  参数：phone
export const reqGetCode = (phone) =>
	requests({
		url: `/user/passport/sendCode/${phone}`,
		method: "GET"
	});

// 注册用户  /api/user/passport/register  POST  参数：phone、code、password
export const reqUserRegister = (data) =>
	requests({
		url: "/user/passport/register",
		method: "POST",
		data
	});

// 用户登录  /api/user/passport/login  POST  参数：phone、password
export const reqUserLogin = (data) =>
	requests({
		url: `/user/passport/login`,
		method: "POST",
		data
	});

// 获取用户信息  /api/user/passport/auth/getUserInfo
export const reqGetUserInfo = () =>
	requests({
		url: `/user/passport/auth/getUserInfo`,
		method: "GET"
	});

// 退出登录  /api/user/passport/logout  GET
export const reqLogout = () =>
	requests({
		url: `/user/passport/logout`,
		method: "GET"
	});

// 获取用户地址信息  /api/user/userAddress/auth/findUserAddressList  GET
export const reqGetAddressInfo = () =>
	requests({
		url: `/user/userAddress/auth/findUserAddressList`,
		method: "GET"
	});

// 获取商品清单  /api/order/auth/trade  GET
export const reqGetOrderInfo = () =>
	requests({
		url: `/order/auth/trade`,
		method: "GET"
	});

// 提交订单  /api/order/auth/submitOrder?tradeNo={tradeNo}  POST  参数：tradeNo、consignee、consigneeTel、deliveryAddress、paymentWay、orderComment、OrderDetailList
export const reqSubmitOrder = (tradeNo, data) =>
	requests({
		url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
		method: "POST",
		data
	});

// 获取支付信息  /api/payment/weixin/createNative/{orderId}  GET  参数：orderId
export const reqGetPayInfo = (orderId) =>
	requests({
		url: `/payment/weixin/createNative/${orderId}`,
		method: "GET"
	});

// 获取支付付订单状态  /api/payment/weixin/queryPayStatus/{orderId}  GET  参数：orderId
export const reqGetPayStatus = (orderId) =>
	requests({
		url: `/payment/weixin/queryPayStatus/${orderId}`,
		method: "GET"
	});
