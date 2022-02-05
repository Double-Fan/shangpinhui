import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "swiper/css/swiper.css";
import "@/mock/mockServer";

/* 全局组件 */
import TypeNav from "@/components/TypeNav";
import Carousel from "@/components/Carousel";
import Pagination from "@/components/Pagination"


Vue.config.productionTip = false;

// 注册全局组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel);
Vue.component(Pagination.name, Pagination);

new Vue({
	render: (h) => h(App),
	router,
	store,
	beforeCreate() {
		Vue.prototype.$bus = this;
	}
}).$mount("#app");
