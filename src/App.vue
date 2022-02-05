<template>
	<div id="app">
		<Header></Header>
		<!-- 路由组件出口的地方 -->
		<router-view></router-view>
		<!-- 登录、注册时隐藏 -->
		<Footer v-show="$route.meta.isShowFooter"></Footer>
	</div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default {
	name: "App",
	components: {
		Header,
		Footer
	},
	mounted() {
		// 派发一个action 获取商品分类的三级列表数据
		this.$store.dispatch("getCategoryList");
		// 派发一个action 获取首页轮播图
		this.$store.dispatch("getBannerList");
	}
};
</script>
