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
		method: "post",
		data: params
	});
