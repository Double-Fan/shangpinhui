/* 引入一级路由组件 */
import Home from "@/views/Home";
import Login from "@/views/Login";
import Register from "@/views/Register";
import Search from "@/views/Search";
import Detail from "@/views/Detail";
import AddCartSuccess from "@/views/AddCartSuccess";
import ShopCart from "@/views/ShopCart";

/* 路由配置信息 */
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
	}
];
