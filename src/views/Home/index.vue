<template>
	<div>
		<!-- 三级联动全局组件 -->
		<TypeNav></TypeNav>
		<ListContainer></ListContainer>
		<TodayRecommend></TodayRecommend>
		<Rank></Rank>
		<Like></Like>
		<Floor :floor="floor" v-for="floor of floorList" :key="floor.id"></Floor>
		<Brand></Brand>
	</div>
</template>

<script>
import { mapState } from "vuex";
import ListContainer from "@/views/Home/ListContainer";
import TodayRecommend from "@/views/Home/TodayRecommend";
import Rank from "@/views/Home/Rank";
import Like from "@/views/Home/Like";
import Floor from "@/views/Home/Floor";
import Brand from "@/views/Home/Brand";

export default {
	name: "",
	components: {
		ListContainer,
		TodayRecommend,
		Rank,
		Like,
		Floor,
		Brand
	},
	computed: {
		...mapState({ floorList: (state) => state.home.floorList })
	},
	mounted() {
		// 派发一个action 获取Floor数据
		this.$store.dispatch("getFloorList");
	}
};
</script>

<style scoped></style>
