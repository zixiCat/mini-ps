<template>
	<view class="">
		<view class="cu-bar zx-search bg-orange padding-right-sm radius">
			<view class="search-form round" style="background-color: #fff">
				<text class="cuIcon-search text-orange text-bold text-xl"></text>
				<input type="text" placeholder="搜索商品名等" v-model.trim="searchContent" />
			</view>
			<button class="cu-btn bg-gray round bg-white">搜 索</button>
		</view>
		<view class="padding-sm zx-history">
			<view class=" flex">
				<view class="text-bold flex-sub text-l">搜索历史</view>
				<view class="cuIcon-delete text-xl"></view>
			</view>
			<view class="margin-top-xs grid col-5 text-center">
				<view class="zx-item" v-for="(item,index) of historyList" :key="index">
				<view class="bg-gray  round padding-xs text-sm">历史</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchContent: '',
				historyList:[{},{},{},{},{},{},{}]
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.zx-history {
		.zx-item{
			padding: 10upx;
		}
	}
</style>
