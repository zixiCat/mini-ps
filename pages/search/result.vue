<template>
	<view>
		<!-- 顶部固定栏目 -->
		<view class="zx-header">
		<view class="cu-bar zx-search bg-orange padding-right-sm radius">
			<view class="search-form round" style="background-color: #fff">
				<text class="cuIcon-search text-orange text-bold text-xl"></text>
				<input type="text" placeholder="搜索商品名等" style="font-size: 30upx;" disabled @tap="jump2search" />
			</view>
			<button class="cu-btn shadow-blur round bg-white">搜 索</button>
		</view>
			<view class="flex bg-white zx-filter padding-sm">
				<view class="flex-treble">
					综合排序
					<!-- <text class="cuIcon-triangleupfill text-lg"></text> -->
					<text class="cuIcon-triangledownfill text-lg"></text>
				</view>
				<view class="flex-twice">
					销量
				</view>
				<view class="flex-twice">
					价格
				</view>
				<view class="flex-twice">
					最新
				</view>
				<view class="flex-twice text-center">
					筛选
					<text class="cuIcon-filter text-lg"></text>
				</view>
			</view>
		</view>
		<!-- 主体 -->
		<view class="zx-body">
			<itemList></itemList>
			<itemList></itemList>
			<itemList></itemList>
			<view class="text-gray text-center padding">~ 我是有底线的 ~</view>
		</view>
	</view>
</template>

<script>
	import itemList from "component/item-list.vue"
	export default {
		components: {
			itemList
		},
		data() {
			return {

			}
		},
		methods:{
			/* 页面跳转 */
			jump2search(){
				uni.navigateTo({
					url:'/pages/search/index'
				})
			}
		}
	}
</script>

<style lang="scss">
	.zx-header {
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 1;

		.zx-search {
		}
	}

	.zx-body {
		position: relative;
		top: 185upx
	}
</style>
