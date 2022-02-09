import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "swiper/css/swiper.css";
import "@/mock/mockServer";
import * as API from "@/api";
import VueLazyload from "vue-lazyload";
import ljz from "@/assets/images/1.gif";
// 表单校验插件
import "@/plugins/validate";

// 全局组件
import TypeNav from "@/components/TypeNav";
import Carousel from "@/components/Carousel";
import Pagination from "@/components/Pagination";
// 按需引入alement-ui
import { Button, MessageBox } from "element-ui";

// 注册全局组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel);
Vue.component(Pagination.name, Pagination);
// 全局注册element-ui
Vue.component(Button.name, Button);
// 原型注册element-ui
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

Vue.config.productionTip = false;
// vue 图片懒加载
Vue.use(VueLazyload, {
	// 懒加载图片
	loading: ljz
});

new Vue({
	render: (h) => h(App),
	router,
	store,
	beforeCreate() {
		// 全局事件总线
		Vue.prototype.$bus = this;
		// 统一请求参数
		Vue.prototype.$API = API;
	}
}).$mount("#app");
