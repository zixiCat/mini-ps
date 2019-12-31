<template>
	<view class="flex-sub text-center">
		<view class="solid-bottom text-xsl">
			<text class=" cuIcon-roundcheckfill text-green"></text>
		</view>
		<view class="padding text-lg">您的订单已支付成功</view>
		<button class="cu-btn shadow-blur bg-gradual-orange margin-right" @tap="home">返 回 首 页</button>
	</view>
	</view>
</template>

<script>
	export default {
		methods: {
			home() {
				uni.reLaunch({
					url: '/pages/index/index'
				});
			}
		}
	}
</script>

<style lang="scss">
	
</style>
