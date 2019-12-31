<template>
	<view>
		<!-- 商品列表 -->
		<list class="grid col-2 padding-left-sm padding-right-sm">
			<view v-for="(item,index) of itemList" :key="index">
				<view class="zx-card radius overflow-hidden bg-white" @tap="jump2item(item,index)">
					<image class="zx-card-img" :src="item.url"></image>
					<view class="padding-xs">
						<view class="">描述描述描述描述描述描述描述描述描述描...</view>
						<view>
							<text class="text-red text-xx">￥999</text>
							<text class="text-df text-red">.00</text>
							<text class="text-center bg-red text-white text-xs zx-safe margin-left-xs">正品保证</text>
						</view>
						<view class="text-gray">1000人付款</view>
					</view>
				</view>
			</view>
		</list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				itemList: [{
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
					}, {
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
					}, {
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
					},
					{
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
					}
				]
			}
		},
		methods: {
			jump2item(item, index) {
				uni.navigateTo({
					url: '/pages/item/index'
				})
			}
		}
	}
</script>

<style lang="scss">
	.zx-card {
		margin: 10upx 15upx;
		box-shadow: 0 2upx 25upx 2upx rgba(0, 0, 0, 0.2);

		.zx-card-img {
			height: 250upx;
		}

		.zx-safe {
			padding: 3upx;
			border-radius: 6upx;
		}
	}
</style>
