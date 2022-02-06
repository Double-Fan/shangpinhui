<template>
	<div class="cart">
		<h4>全部商品</h4>
		<div class="cart-main">
			<div class="cart-th">
				<div class="cart-th1">全部</div>
				<div class="cart-th2">商品</div>
				<div class="cart-th3">单价（元）</div>
				<div class="cart-th4">数量</div>
				<div class="cart-th5">小计（元）</div>
				<div class="cart-th6">操作</div>
			</div>
			<div class="cart-body">
				<ul
					class="cart-list"
					v-for="cartInfo of cartInfoList"
					:key="cartInfo.id"
				>
					<li class="cart-list-con1">
						<input
							type="checkbox"
							name="chk_list"
							:checked="cartInfo.isChecked == 1"
							@change="updateChecked(cartInfo, $event)"
						/>
					</li>
					<li class="cart-list-con2">
						<img :src="cartInfo.imgUrl" />
						<div class="item-msg">
							{{ cartInfo.skuName }}
						</div>
					</li>

					<li class="cart-list-con4">
						<span class="price">{{ cartInfo.skuPrice }}.00</span>
					</li>
					<li class="cart-list-con5">
						<a
							href="javascript:void(0)"
							class="mins"
							@click="handler('minus', -1, cartInfo)"
							>-</a
						>
						<input
							autocomplete="off"
							type="text"
							minnum="1"
							class="itxt"
							:value="cartInfo.skuNum"
							@change="handler('change', $event.target.value * 1, cartInfo)"
						/>
						<a
							href="javascript:void(0)"
							class="plus"
							@click="handler('add', 1, cartInfo)"
							>+</a
						>
					</li>
					<li class="cart-list-con6">
						<span class="sum">{{ cartInfo.skuNum * cartInfo.skuPrice }}</span>
					</li>
					<li class="cart-list-con7">
						<a
							href="javascript:void(0)"
							class="sindelet"
							@click="deleteCartById(cartInfo)"
							>删除</a
						>
						<br />
						<a href="javascript:void(0)">移到收藏</a>
					</li>
				</ul>
			</div>
		</div>
		<div class="cart-tool">
			<div class="select-all">
				<input
					class="chooseAll"
					type="checkbox"
					:checked="isAllCheck && cartInfoList.length > 0"
					@change="updateAllCartChecked"
				/>
				<span>全选</span>
			</div>
			<div class="option">
				<a href="javascript:void(0)" @click="deleteAllCheckedCart"
					>删除选中的商品</a
				>
				<a href="javascript:void(0)">移到我的关注</a>
				<a href="javascript:void(0)">清除下柜商品</a>
			</div>
			<div class="money-box">
				<div class="chosed">已选择 <span>0</span>件商品</div>
				<div class="sumprice">
					<em>总价（不含运费） ：</em>
					<i class="summoney">{{ totalPrice }}</i>
				</div>
				<div class="sumbtn">
					<a class="sum-btn" href="###" target="_blank">结算</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import throttle from "lodash/throttle";

export default {
	name: "ShopCart",
	computed: {
		...mapGetters(["cartList"]),
		// 购物车数据
		cartInfoList() {
			return this.cartList.cartInfoList || [];
		},
		// 购买产品的总价
		totalPrice() {
			//累加操作
			let filterArr = this.cartInfoList.filter((item) => {
				return item.isChecked == 1;
			});
			return filterArr.reduce((pre, current) => {
				return pre + current.skuNum * current.cartPrice;
			}, 0);
		},
		// 是否全选
		isAllCheck() {
			return this.cartInfoList.every((item) => item.isChecked == 1);
		}
	},
	methods: {
		// 获取个人购物车数据
		getData() {
			this.$store.dispatch("getCartList");
		},
		// 处理购物车中某一产品数量
		handler: throttle(async function (type, skuNum, cartInfo) {
			switch (type) {
				case "add":
					// 点击+，数量+1
					break;
				case "minus":
					// 点击-，若原数量大于1，数量-1
					if (cartInfo.skuNum <= 1) {
						skuNum = 0;
					}
					break;
				case "change":
					if (isNaN(skuNum) || skuNum < 1) {
						// 非法修改（汉字|负数），撤销操作
						skuNum = 0;
					} else {
						// 正常修改（小数取整），数量修改
						skuNum = parseInt(skuNum) - cartInfo.skuNum;
					}
					break;
			}
			try {
				await this.$store.dispatch("addOrUpdateShopCart", {
					skuId: cartInfo.skuId,
					skuNum
				});
				this.getData();
			} catch (error) {
				//异常处理
				console.log(error);
			}
		}, 1000),
		// 删除购物车中某一产品
		deleteCartById: throttle(async function (cartInfo) {
			try {
				await this.$store.dispatch("deleteCartById", cartInfo.skuId);
				this.getData();
			} catch (error) {
				//异常处理
				console.log(error);
			}
		}, 1000),
		// 修改某个产品的勾选状态
		async updateChecked(cartInfo, $event) {
			try {
				await this.$store.dispatch("updateCheckedById", {
					skuId: cartInfo.skuId,
					isChecked: $event.target.checked ? "1" : "0"
				});
				this.getData();
			} catch (error) {
				//异常处理
				console.log(error);
			}
		},
		// 删除所有选中的产品
		async deleteAllCheckedCart() {
			try {
				await this.$store.dispatch("deleteAllCheckedCart");
				this.getData();
			} catch (error) {
				console.log(error);
			}
		},
		// 修改全部产品的选中状态
		async updateAllCartChecked($event) {
			try {
				let isChecked = $event.target.checked ? 1 : 0;
				await this.$store.dispatch("updateAllCartChecked", isChecked);
				this.getData();
			} catch (error) {
				console.log(error);
			}
		}
	},
	mounted() {
		this.getData();
	}
};
</script>

<style lang="less" scoped>
.cart {
	width: 1200px;
	margin: 0 auto;

	h4 {
		margin: 9px 0;
		font-size: 14px;
		line-height: 21px;
	}

	.cart-main {
		.cart-th {
			background: #f5f5f5;
			border: 1px solid #ddd;
			padding: 10px;
			overflow: hidden;

			& > div {
				float: left;
			}

			.cart-th1 {
				width: 25%;

				input {
					vertical-align: middle;
				}

				span {
					vertical-align: middle;
				}
			}

			.cart-th2 {
				width: 25%;
			}

			.cart-th3,
			.cart-th4,
			.cart-th5,
			.cart-th6 {
				width: 12.5%;
			}
		}

		.cart-body {
			margin: 15px 0;
			border: 1px solid #ddd;

			.cart-list {
				padding: 10px;
				border-bottom: 1px solid #ddd;
				overflow: hidden;

				& > li {
					float: left;
				}

				.cart-list-con1 {
					width: 15%;
				}

				.cart-list-con2 {
					width: 35%;

					img {
						width: 82px;
						height: 82px;
						float: left;
					}

					.item-msg {
						float: left;
						width: 150px;
						margin: 0 10px;
						line-height: 18px;
					}
				}

				.cart-list-con4 {
					width: 10%;
				}

				.cart-list-con5 {
					width: 17%;

					.mins {
						border: 1px solid #ddd;
						border-right: 0;
						float: left;
						color: #666;
						width: 6px;
						text-align: center;
						padding: 8px;
					}

					input {
						border: 1px solid #ddd;
						width: 40px;
						height: 33px;
						float: left;
						text-align: center;
						font-size: 14px;
					}

					.plus {
						border: 1px solid #ddd;
						border-left: 0;
						float: left;
						color: #666;
						width: 6px;
						text-align: center;
						padding: 8px;
					}
				}

				.cart-list-con6 {
					width: 10%;

					.sum {
						font-size: 16px;
					}
				}

				.cart-list-con7 {
					width: 13%;

					a {
						color: #666;
					}
				}
			}
		}
	}

	.cart-tool {
		overflow: hidden;
		border: 1px solid #ddd;

		.select-all {
			padding: 10px;
			overflow: hidden;
			float: left;

			span {
				vertical-align: middle;
			}

			input {
				vertical-align: middle;
			}
		}

		.option {
			padding: 10px;
			overflow: hidden;
			float: left;

			a {
				float: left;
				padding: 0 10px;
				color: #666;
			}
		}

		.money-box {
			float: right;

			.chosed {
				line-height: 26px;
				float: left;
				padding: 0 10px;
			}

			.sumprice {
				width: 200px;
				line-height: 22px;
				float: left;
				padding: 0 10px;

				.summoney {
					color: #c81623;
					font-size: 16px;
				}
			}

			.sumbtn {
				float: right;

				a {
					display: block;
					position: relative;
					width: 96px;
					height: 52px;
					line-height: 52px;
					color: #fff;
					text-align: center;
					font-size: 18px;
					font-family: "Microsoft YaHei";
					background: #e1251b;
					overflow: hidden;
				}
			}
		}
	}
}
</style>
