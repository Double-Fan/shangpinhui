import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
import routes from "./routes";

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

export default new VueRouter({
	// 路由配置
	routes,
	// 滚动行为
	scrollBehavior(to, from, savedPosition) {
		return { x: 0, y: 0 };
	}
});
