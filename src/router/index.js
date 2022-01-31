import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import Home from "@/views/Home";
import Login from "@/views/Login";
import Register from "@/views/Register";
import Search from "@/views/Search";

//重写push
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
	routes: [
		{
			path: "*",
			redirect: "./home"
		},
		{
			path: "/home",
			component: Home,
			meta: { show: true }
		},
		{
			path: "/login",
			component: Login,
			meta: { show: false }
		},
		{
			path: "/register",
			component: Register,
			meta: { show: false }
		},
		{
			name: "search",
			path: "/search/:keyword?",
			component: Search,
			meta: { isShow: true }
		}
	]
});
