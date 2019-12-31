<template>
	<view class="round padding-sm text-xxl cuIcon-cart bg-orange zx-cart" @tap="jump2cart">
		<view class="zx-num text-center bg-red text-sm round">9</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			jump2cart() {
				uni.navigateTo({
					url: '/pages/cart/index'
				})
			}
		}
	}
</script>

<style lang="scss">
	.zx-cart {
		position: fixed;
		bottom: 150upx;
		right: 20upx;
		z-index: 9;
	}

	.zx-num {
		position: absolute;
		width: 40upx;
		height: 40upx;
		line-height: 40upx;
		right: -5upx;
		top: -5upx;
		z-index: 10;
	}
</style>
