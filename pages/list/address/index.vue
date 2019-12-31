<template>
	<view>
			<!-- <view class="text-lg text-center zx-none"><text class="cuIcon-locationfill text-xl margin-right-xs"></text>你还没有收货地址哦</view> -->
		<list  class="zx-list">
			<cell v-for="(item,index) of 6" :key="index">
				<view class="padding-left-sm padding-right-sm padding-top-sm padding-bottom-sm flex solid-bottom">
					<view class="zx-title bg-grey text-xl round text-center">大</view>
					<view class="flex-sub margin-left-sm">
						<view>大龙<text class="text-gray text-sm margin-left">15623848281</text></view>
						<view class="margin-top-xs padding-right-xs">地址地址地址地址地址地址地址地址地址地址地址地址地址地址地址</view>
					</view>
					<view class="solid-left zx-edit text-right" @tap="jump2formAddress('update')">编辑</view>
				</view>
			</cell>
		</list>
		<view>
			<button class="text-orange cu-btn text-lg zx-btn radius bg-white margin-top-sm" @tap="jump2formAddress('add')">添加新地址</button>
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
			jump2formAddress(type) {
				uni.navigateTo({
					url: '/pages/form/address/index?type='+type
				})
			}
		}
	}
</script>

<style lang="scss">
	.zx-none{
		margin-top: 200upx;
	}
	.zx-list {
		.zx-title {
			width: 90upx;
			height: 90upx;
			line-height: 90upx;
			transform: translateY(20upx);
		}

		.zx-edit {
			line-height: 100upx;
			padding: 15upx 10upx 15upx 30upx;
		}
	}

	.zx-btn {
		position: absolute;
		bottom: 20upx;
		width: 100%;
		border: 2upx solid #FF7800
	}
</style>
