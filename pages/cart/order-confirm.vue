<template>
	<view>
		<!-- 地址 -->
		<view class="zx-address radius padding bg-white solid-bottom" @tap="jump2listAddress">
			<view>
				<text class="padding-left-xs padding-right-xs zx-df margin-right-xs bg-red">默认</text>
				湖南省常德市武陵区
			</view>
			<view class="flex text-xl margin-top-sm">
				<view class="flex-sub">龙港路 白马湖安置小区 好店</view>
				<view class="cuIcon-right"></view>
			</view>
			<view class="margin-top-sm">
				大龙 156****4334
			</view>
		</view>
		<!-- 商品 -->
		<view class="padding-sm bg-white radius margin-top-sm zx-item solid-top solid-bottom">
			<view class="text-l padding-bottom-xs">
				共3件
			</view>
			<view class="padding-bottom-sm padding-top-sm solid-bottom" v-for="(item,index) of 3" :key="index">
				<view class="flex zx-content">
					<image class="zx-item-img radius" src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg" mode="aspectFill"
					 @tap="jump2item">

					</image>
					<view class="flex-sub padding-left-sm">
						<view @tap="jump2item">描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述</view>
						<view class="text-lg text-red text-bold">￥999<text class="text-sm">.00</text></view>
					</view>
				</view>
				<view class="flex justify-end margin-top-xs zx-type">
					<view class="basis-ms radius solid border-color-gray margin-right padding-right-xs padding-left-xs" data-target="SPmodal">
						<text class="padding-left-xs padding-right-xs">红色,L</text>
					</view>
					<view class="basis-ms flex margin-left  overflow-hidden">
						x 1
					</view>
				</view>
			</view>
		</view>
		<!-- 补充 -->
		<view class="flex padding-sm bg-white margin-top-sm solid-bottom">
			<view class="flex-sub">运费</view>
			<view>包邮</view>
		</view>
		<view class="cu-form-group padding-sm">
			<view class="title">备注:</view>
			<input placeholder="请输入备注信息" v-model.trim="username"></input>
		</view>
		<!-- 总计 -->
		<view class="text-right margin-top-sm padding-right-sm">共3件商品 合计：<text class="text-red text-l">￥999.00</text></view>
		<!-- 底部栏目 -->
		<view class="zx-foot bg-white flex text-center">
			<view class="padding-left-sm zx-line-height">
				<view class="text-lg">实付: <text class="text-red text-bold text-lg">￥199<text class="text-sm">.00</text></text></view>
			</view>
			<view class="flex-sub text-right zx-btn">
				<button v-show="!isEdit" class="margin-left-xs cu-btn round bg-red text-l zx-pay" @tap="pay">微信支付</button>
			</view>
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
			pay() {

			},
			jump2listAddress() {
				uni.navigateTo({
					url: '/pages/list/address/index'
				})
			}
		}
	}
</script>

<style lang="scss">
	.zx-address {
		.zx-df {
			line-height: 30upx;
			border-radius: 5upx;
		}
	}
	.zx-item{
		.zx-content {
		
			.zx-item-img {
				width: 120upx;
				height: 120upx;
			}
		}
	}


	.zx-foot {
		position: fixed;
		bottom: 8upx;
		bottom: 8upx;
		left: 0upx;
		right: 0upx;
		z-index: 999;
		padding: 18upx 27upx 18upx 15upx;
		border-radius: 15upx;
		box-shadow: 0 10upx 20upx 10upx rgba($color: #000000, $alpha: .3);

		.zx-line-height {
			line-height: 60upx;
		}

		.zx-btn {
			.zx-pay {
				padding: 3upx 33upx;
			}
		}
	}
</style>
