<template>
	<view>
		<view class="solid-bottom text-right shadow shadow-blur">
			<view class="padding-sm zx-detail" @tap="jump2listCreditDetail">明细</view>
		</view>
		<view class="text-center zx-card margin-top shadow shadow-blur radius bg-white padding">
			<view class="text-lg">我的积分</view>
			<view class="text-l margin-top-sm">1000</view>
			<view class="zx-use text-l radius bg-red" @tap="jump2credit">去使用</view>
		</view>
		<view class="margin-left-sm margin-right-sm zx-ad margin-top">
			<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg" mode="aspectFill" @tap="jump2item"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			/* 页面跳转 */
			jump2credit() {
				uni.navigateTo({
					url: '/pages/credit/index'
				})
			},
			jump2item() {
				uni.navigateTo({
					url: '/pages/item/index'
				})
			},
			jump2listCreditDetail(){
				uni.navigateTo({
					url: '/pages/list/credit/detail'
				})
			}
				
		}
	}
</script>

<style lang="scss">
	.zx-detail {
		display: inline-block;
	}

	.zx-card {
		margin-left: 50upx;
		margin-right: 50upx;

		.zx-use {
			width: 200upx;
			margin: 20upx auto 0 auto;
			padding: 8upx 16upx;
		}
	}

	.zx-ad {
		image {
			width: 100%;
			height: 250upx;
		}
	}
</style>
