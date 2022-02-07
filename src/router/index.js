import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
import routes from "./routes";
import store from "@/store";

// 重写push
let originPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location, resolve, reject) {
	if (resolve && reject) {
		originPush.call(this, location, reject, resolve);
	} else {
		originPush.call(
			this,
			location,
			() => {},
			() => {}
		);
	}
};

//重写replace
let originReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function (location, resolve, reject) {
	if (resolve && reject) {
		originReplace.call(this, location, reject, resolve);
	} else {
		originReplace.call(
			this,
			location,
			() => {},
			() => {}
		);
	}
};

const router = new VueRouter({
	// 路由配置
	routes,
	// 滚动行为
	scrollBehavior(to, from, savedPosition) {
		return { x: 0, y: 0 };
	}
});

// 全局守卫：前置守卫（路由跳转前）
router.beforeEach(async (to, from, next) => {
	let token = store.state.user.token;
	let name = store.state.user.userInfo.name;
	if (token) {
		// 如果已经登陆了，就无法继续登录|注册了
		if (to.path == "/login" || to.path == "/register") {
			next("/");
		} else {
			if (name) {
				// 登录且包含用户信息
				next();
			} else {
				// 登录但包含用户信息
				try {
					// 获取用户信息 
					await store.dispatch("getUserInfo");
					next();
				} catch (error) {
					// token失效，获取不到用户信息，需要重新登录
					// 清除token
					await store.dispatch("logout");
					// 跳转登录
					next("/login");
				}
			}
		}
	} else {
		next();
	}
});

export default router;
