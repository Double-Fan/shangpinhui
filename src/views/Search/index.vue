<template>
	<div>
		<!-- 商品分类三级列表 -->
		<TypeNav></TypeNav>

		<div class="main">
			<div class="py-container">
				<!-- bread 面包屑 -->
				<div class="bread">
					<ul class="fl sui-breadcrumb">
						<li>
							<a href="javascript:void(0)">全部结果</a>
						</li>
					</ul>
					<ul class="fl sui-tag">
						<!-- 分类的面包屑（query参数） -->
						<li class="with-x" v-if="searchParams.categoryName">
							{{ searchParams.categoryName }}
							<i @click="removeCategoryName">×</i>
						</li>
						<!-- 关键字的面包屑（params参数） -->
						<li class="with-x" v-if="searchParams.keyword">
							{{ searchParams.keyword }}
							<i @click="removeKeyword">×</i>
						</li>
						<!-- 品牌的面包屑 -->
						<li class="with-x" v-if="searchParams.trademark">
							{{ searchParams.trademark.split(":")[1] }}
							<i @click="removeTrademark">×</i>
						</li>
						<!-- 商品属性的面包屑 -->
						<li
							class="with-x"
							v-for="(prop, index) of searchParams.props"
							:key="index"
						>
							{{ prop.split(":")[1] }}
							<i @click="removeProps(index)">×</i>
						</li>
					</ul>
				</div>

				<!-- 搜索栏 -->
				<SearchSelector
					@trademarkInfo="trademarkInfo"
					@attrInfo="attrInfo"
				></SearchSelector>

				<!-- 商品详情 -->
				<div class="details clearfix">
					<div class="sui-navbar">
						<div class="navbar-inner filter">
							<!-- 排序规则 -->
							<ul class="sui-nav">
								<li :class="{ active: isOne }" @click="changeOrder('1')">
									<a href="javascript:void(0)"
										>综合<span
											v-show="isOne"
											class="iconfont"
											:class="{
												'icon-arrowup': isAsc,
												'icon-arrowdown': isDesc
											}"
										></span
									></a>
								</li>
								<li :class="{ active: isTwo }" @click="changeOrder('2')">
									<a href="javascript:void(0)"
										>价格<span
											v-show="isTwo"
											class="iconfont"
											:class="{
												'icon-arrowup': isAsc,
												'icon-arrowdown': isDesc
											}"
										></span
									></a>
								</li>
							</ul>
						</div>
					</div>

					<!-- 销售产品列表 -->
					<div class="goods-list">
						<ul class="yui3-g">
							<li class="yui3-u-1-5" v-for="good of goodsList" :key="good.id">
								<div class="list-wrap">
									<div class="p-img">
										<router-link :to="`/detail/${good.id}`">
											<!-- 使用vue-lazyload -->
											<img v-lazy="good.defaultImg" />
										</router-link>
									</div>
									<div class="price">
										<strong>
											<em>¥ </em>
											<i>{{ good.price }}.00</i>
										</strong>
									</div>
									<div class="attr">
										<a href="javascript:void(0)" :title="good.title">{{
											good.title
										}}</a>
									</div>
									<div class="commit">
										<i class="command">已有<span>2000</span>人评价</i>
									</div>
									<div class="operate">
										<a
											href="javascript:void(0)"
											class="sui-btn btn-bordered btn-danger"
											>加入购物车</a
										>
										<a href="javascript:void(0)" class="sui-btn btn-bordered"
											>收藏</a
										>
									</div>
								</div>
							</li>
						</ul>
					</div>

					<!-- 分页 -->
					<Pagination
						:pageNo="searchParams.pageNo"
						:pageSize="searchParams.pageSize"
						:total="total"
						:continues="5"
						@getPageNo="getPageNo"
					></Pagination>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import SearchSelector from "./SearchSelector";

export default {
	name: "Search",
	components: {
		SearchSelector
	},
	data() {
		return {
			// 带给服务器的参数
			searchParams: {
				// 一级分类Id
				category1Id: "",
				// 二级分类Id
				category2Id: "",
				// 三级分类Id
				category3Id: "",
				// 分类的名字
				categoryName: "",
				// 关键字
				keyword: "",
				// 排序  1:desc  初始状态应该是默认且降序
				order: "1:desc",
				// 分页起始页
				pageNo: 1,
				// 页大小
				pageSize: 10,
				// 售卖商品的属性   ["属性ID:属性值:属性名"]
				props: [],
				// 品牌   "ID:名称"
				trademark: ""
			}
		};
	},
	computed: {
		// 获取商品列表
		...mapGetters(["goodsList"]),
		// 排序-综合
		isOne() {
			return this.searchParams.order.indexOf("1") != -1;
		},
		// 排序-价格
		isTwo() {
			return this.searchParams.order.indexOf("2") != -1;
		},
		// 排序-升降箭头
		isAsc() {
			return this.searchParams.order.indexOf("asc") != -1;
		},
		isDesc() {
			return this.searchParams.order.indexOf("desc") != -1;
		},
		// 获取search模块展示商品的数量
		...mapState({ total: (state) => state.search.searchList.total })
	},
	watch: {
		// 监听路由信息
		$route: {
			handler(newVal, oldVal) {
				Object.assign(this.searchParams, this.$route.query, this.$route.params);
				this.getData();
			}
		}
	},
	methods: {
		// 向服务器发送请求，获取search模块数据
		getData() {
			this.$store.dispatch("getSearchList", this.searchParams);
			this.searchParams.category1Id = undefined;
			this.searchParams.category2Id = undefined;
			this.searchParams.category3Id = undefined;
		},
		// 删除分类的面包屑
		removeCategoryName() {
			this.searchParams.categoryName = undefined;
			this.getData();
			// 进行路由跳转，地址栏也需要修改，删除的是query参数，需要保留原来的params参数
			if (this.$route.params) {
				this.$router.push({ name: "search", params: this.$route.params });
			}
		},
		// 删除关键字的面包屑
		removeKeyword() {
			this.searchParams.keyword = undefined;
			this.getData();
			// 通知兄弟组件Header去删除关键字
			this.$bus.$emit("clear");
			// 进行路由跳转，地址栏也需要修改，删除的是params参数，需要保留原来的query参数
			this.$router.push({ name: "search", query: this.$route.query });
		},
		// 定义自定义事件，子组件向父组件传值（品牌）
		trademarkInfo(trademark) {
			// "ID:名称"
			this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
			this.getData();
		},
		// 删除品牌面包屑
		removeTrademark() {
			this.searchParams.trademark = undefined;
			this.getData();
		},
		// 定义自定义事件，子组件向父组件传值（商品属性）
		attrInfo(attr, attrValue) {
			// ["属性ID:属性值:属性名"]
			let prop = `${attr.attrId}:${attrValue}:${attr.attrName}`;
			// 数组去重
			if (this.searchParams.props.indexOf(prop) === -1) {
				this.searchParams.props.push(prop);
				this.getData();
			}
		},
		// 删除商品属性
		removeProps(index) {
			this.searchParams.props.splice(index, 1);
			this.getData();
		},
		// 排序操作 flag:标志，综合（1）、价格（2）
		changeOrder(flag) {
			// 获取起始状态
			let originFlag = this.searchParams.order.split(":")[0];
			let originSort = this.searchParams.order.split(":")[1];
			// 准备一个新的排序规则
			let newOrder = "";
			// 判断是不是同一个标志
			if (originFlag === flag) {
				newOrder = `${originFlag}:${originSort == "desc" ? "asc" : "desc"}`;
			} else {
				newOrder = `${flag}:desc`;
			}
			this.searchParams.order = newOrder;
			this.getData();
		},
		// 自定义事件，获取当前第几页
		getPageNo(pageNo) {
			this.searchParams.pageNo = pageNo;
			this.getData();
		}
	},
	beforeMount() {
		Object.assign(this.searchParams, this.$route.query, this.$route.params);
	},
	mounted() {
		this.getData();
	}
};
</script>

<style lang="less" scoped>
.main {
	margin: 10px 0;

	.py-container {
		width: 1200px;
		margin: 0 auto;

		.bread {
			margin-bottom: 5px;
			overflow: hidden;

			.sui-breadcrumb {
				padding: 3px 15px;
				margin: 0;
				font-weight: 400;
				border-radius: 3px;
				float: left;

				li {
					display: inline-block;
					line-height: 18px;

					a {
						color: #666;
						text-decoration: none;

						&:hover {
							color: #4cb9fc;
						}
					}
				}
			}

			.sui-tag {
				margin-top: -5px;
				list-style: none;
				font-size: 0;
				line-height: 0;
				padding: 5px 0 0;
				margin-bottom: 18px;
				float: left;

				.with-x {
					font-size: 12px;
					margin: 0 5px 5px 0;
					display: inline-block;
					overflow: hidden;
					color: #000;
					background: #f7f7f7;
					padding: 0 7px;
					height: 20px;
					line-height: 20px;
					border: 1px solid #dedede;
					white-space: nowrap;
					transition: color 400ms;
					cursor: pointer;

					i {
						margin-left: 10px;
						cursor: pointer;
						font: 400 14px tahoma;
						display: inline-block;
						height: 100%;
						vertical-align: middle;
					}

					&:hover {
						color: #28a3ef;
					}
				}
			}
		}

		.details {
			margin-bottom: 5px;

			.sui-navbar {
				overflow: visible;
				margin-bottom: 0;

				.filter {
					min-height: 40px;
					padding-right: 20px;
					background: #fbfbfb;
					border: 1px solid #e2e2e2;
					padding-left: 0;
					border-radius: 0;
					box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

					.sui-nav {
						position: relative;
						left: 0;
						display: block;
						float: left;
						margin: 0 10px 0 0;

						li {
							float: left;
							line-height: 18px;

							a {
								display: block;
								cursor: pointer;
								padding: 11px 15px;
								color: #777;
								text-decoration: none;
							}

							&.active {
								a {
									background: #e1251b;
									color: #fff;
								}
							}
						}
					}
				}
			}

			.goods-list {
				margin: 20px 0;

				ul {
					display: flex;
					flex-wrap: wrap;

					li {
						height: 100%;
						width: 20%;
						margin-top: 10px;
						line-height: 28px;

						.list-wrap {
							.p-img {
								padding-left: 15px;
								width: 215px;
								height: 255px;

								a {
									color: #666;

									img {
										max-width: 100%;
										height: auto;
										vertical-align: middle;
									}
								}
							}

							.price {
								padding-left: 15px;
								font-size: 18px;
								color: #c81623;

								strong {
									font-weight: 700;

									i {
										margin-left: -5px;
									}
								}
							}

							.attr {
								padding-left: 15px;
								width: 85%;
								overflow: hidden;
								margin-bottom: 8px;
								min-height: 38px;
								cursor: pointer;
								line-height: 1.8;
								display: -webkit-box;
								-webkit-box-orient: vertical;
								-webkit-line-clamp: 2;

								a {
									color: #333;
									text-decoration: none;
								}
							}

							.commit {
								padding-left: 15px;
								height: 22px;
								font-size: 13px;
								color: #a7a7a7;

								span {
									font-weight: 700;
									color: #646fb0;
								}
							}

							.operate {
								padding: 12px 15px;

								.sui-btn {
									display: inline-block;
									padding: 2px 14px;
									box-sizing: border-box;
									margin-bottom: 0;
									font-size: 12px;
									line-height: 18px;
									text-align: center;
									vertical-align: middle;
									cursor: pointer;
									border-radius: 0;
									background-color: transparent;
									margin-right: 15px;
								}

								.btn-bordered {
									min-width: 85px;
									background-color: transparent;
									border: 1px solid #8c8c8c;
									color: #8c8c8c;

									&:hover {
										border: 1px solid #666;
										color: #fff !important;
										background-color: #666;
										text-decoration: none;
									}
								}

								.btn-danger {
									border: 1px solid #e1251b;
									color: #e1251b;

									&:hover {
										border: 1px solid #e1251b;
										background-color: #e1251b;
										color: white !important;
										text-decoration: none;
									}
								}
							}
						}
					}
				}
			}
		}
	}
}
</style>
