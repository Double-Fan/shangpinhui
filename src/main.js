import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "swiper/css/swiper.css";
import TypeNav from "@/components/TypeNav";
import Carousel from "@/components/Carousel";
import "@/mock/mockServer";

Vue.config.productionTip = false;

// 注册全局组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel);

new Vue({
	render: (h) => h(App),
	router,
	store,
	beforeCreate() {
		Vue.prototype.$bus = this;
	}
}).$mount("#app");
