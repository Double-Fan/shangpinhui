// 路由配置信息
export default [
	{
		path: "*",
		redirect: "./home"
	},
	{
		path: "/home",
		component: () => import("@/views/Home"),
		meta: { isShowFooter: true }
	},
	{
		name: "login",
		path: "/login",
		component: () => import("@/views/Login"),
		meta: { isShowFooter: false }
	},
	{
		name: "register",
		path: "/register",
		component: () => import("@/views/Register"),
		meta: { isShowFooter: false }
	},
	{
		name: "search",
		path: "/search/:keyword?",
		component: () => import("@/views/Search"),
		meta: { isShowFooter: true }
	},
	{
		name: "detail",
		path: "/detail/:skuId",
		component: () => import("@/views/Detail"),
		meta: { isShowFooter: true }
	},
	{
		name: "addCartSuccess",
		path: "/addCartSuccess",
		component: () => import("@/views/AddCartSuccess"),
		meta: { isShowFooter: true }
	},
	{
		name: "shopCart",
		path: "/shopCart",
		component: () => import("@/views/ShopCart"),
		meta: { isShowFooter: true }
	},
	{
		name: "trade",
		path: "/trade",
		component: () => import("@/views/Trade"),
		meta: { isShowFooter: true },
		// 路由独享守卫
		beforeEnter(to, from, next) {
			if (from.path == "/shopCart") {
				next();
			} else {
				next(false);
			}
		}
	},
	{
		name: "pay",
		path: "/pay",
		component: () => import("@/views/Pay"),
		meta: { isShowFooter: true },
		// 路由独享守卫
		beforeEnter(to, from, next) {
			if (from.path == "/trade") {
				next();
			} else {
				next(false);
			}
		}
	},
	{
		name: "paySuccess",
		path: "/paySuccess",
		component: () => import("@/views/PaySuccess"),
		meta: { isShowFooter: true }
	},
	{
		name: "center",
		path: "/center",
		redirect: "/center/myOrder",
		component: () => import("@/views/Center"),
		meta: { isShowFooter: true },
		// 二级路由组件
		children: [
			{
				path: "myOrder",
				component: () => import("@/views/Center/MyOrder")
			},
			{
				path: "groupOrder",
				component: () => import("@/views/Center/GroupOrder")
			}
		]
	}
];
