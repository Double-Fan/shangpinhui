// 引入一级路由组件
import Home from "@/views/Home";
import Login from "@/views/Login";
import Register from "@/views/Register";
import Search from "@/views/Search";
import Detail from "@/views/Detail";
import AddCartSuccess from "@/views/AddCartSuccess";
import ShopCart from "@/views/ShopCart";
import Trade from "@/views/Trade";
import Pay from "@/views/Pay";
import PaySuccess from "@/views/PaySuccess";
import Center from "@/views/Center";
// 引入二级路由组件
import MyOrder from "@/views/Center/MyOrder";
import GroupOrder from "@/views/Center/GroupOrder";

// 路由配置信息
export default [
	{
		path: "*",
		redirect: "./home"
	},
	{
		path: "/home",
		component: Home,
		meta: { isShowFooter: true }
	},
	{
		name: "login",
		path: "/login",
		component: Login,
		meta: { isShowFooter: false }
	},
	{
		name: "register",
		path: "/register",
		component: Register,
		meta: { isShowFooter: false }
	},
	{
		name: "search",
		path: "/search/:keyword?",
		component: Search,
		meta: { isShowFooter: true }
	},
	{
		name: "detail",
		path: "/detail/:skuId",
		component: Detail,
		meta: { isShowFooter: true }
	},
	{
		name: "addCartSuccess",
		path: "/addCartSuccess",
		component: AddCartSuccess,
		meta: { isShowFooter: true }
	},
	{
		name: "shopCart",
		path: "/shopCart",
		component: ShopCart,
		meta: { isShowFooter: true }
	},
	{
		name: "trade",
		path: "/trade",
		component: Trade,
		meta: { isShowFooter: true }
	},
	{
		name: "pay",
		path: "/pay",
		component: Pay,
		meta: { isShowFooter: true }
	},
	{
		name: "paySuccess",
		path: "/paySuccess",
		component: PaySuccess,
		meta: { isShowFooter: true }
	},
	{
		name: "center",
		path: "/center",
		redirect: "/center/myOrder",
		component: Center,
		meta: { isShowFooter: true },
		// 二级路由组件
		children: [
			{
				path: "myOrder",
				component: MyOrder
			},
			{
				path: "groupOrder",
				component: GroupOrder
			}
		]
	}
];
