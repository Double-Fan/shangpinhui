<template>
	<div class="pagination">
		<!-- 上 -->
		<button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">
			上一页
		</button>
		<button v-show="startNumAndEndNum.start > 1" @click="$emit('getPageNo', 1)">
			1
		</button>
		<button v-show="startNumAndEndNum.start > 2">...</button>

		<!-- 中间 -->
		<template v-for="(page, index) of startNumAndEndNum.end">
			<button
				:key="index"
				v-if="page >= startNumAndEndNum.start"
				@click="$emit('getPageNo', page)"
				:class="{ active: pageNo == page }"
			>
				{{ page }}
			</button>
		</template>

		<!-- 下 -->
		<button v-show="startNumAndEndNum.end < totalPage - 1">···</button>
		<button
			v-show="startNumAndEndNum.end < totalPage"
			@click="$emit('getPageNo', totalPage)"
		>
			{{ totalPage }}
		</button>
		<button
			:disabled="pageNo == totalPage"
			@click="$emit('getPageNo', pageNo + 1)"
		>
			下一页
		</button>
		<button style="margin-left: 30px">共 {{ total }} 条</button>
	</div>
</template>

<script>
export default {
	name: "Pagination",
	// pageNo：当前页  pageSize：页大小  total：总数  continues：连续页数
	props: ["pageNo", "pageSize", "total", "continues"],
	computed: {
		// 总页数
		totalPage() {
			return Math.ceil(this.total / this.pageSize);
		},
		// 连续页码数的开始与结束
		startNumAndEndNum() {
			const { pageNo, totalPage, continues } = this;
			let start = 1,
				end = 1;
			// 连续页数大于总页数
			if (continues > totalPage) {
				end = totalPage;
			} else {
				start = pageNo - parseInt(continues / 2);
				end = pageNo + parseInt(continues / 2);
				// 起始数不得小于1
				if (start < 1) {
					start = 1;
					end = continues;
				}
				// 结束数不得大于总页数
				if (end > totalPage) {
					end = totalPage;
					start = totalPage - continues + 1;
				}
			}
			return { start, end };
		}
	},
	methods: {}
};
</script>

<style lang="less" scoped>
.pagination {
	text-align: center;

	button {
		margin: 0 5px;
		background-color: #f4f4f5;
		color: #606266;
		outline: none;
		border-radius: 2px;
		padding: 0 4px;
		vertical-align: top;
		display: inline-block;
		font-size: 13px;
		min-width: 35.5px;
		height: 28px;
		line-height: 28px;
		cursor: pointer;
		box-sizing: border-box;
		text-align: center;
		border: 0;

		&[disabled] {
			color: #c0c4cc;
			cursor: not-allowed;
		}

		&.active {
			cursor: not-allowed;
			background-color: #409eff;
			color: #fff;
		}
	}
}
</style>
