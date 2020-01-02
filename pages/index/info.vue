<template>
	<view class="zx-info" :class="active?'show':'hide'">
		<view class="zx-dialog">
			<view class="zx-content">
				<view class="zx-title">文本/图片模式</view>
				<view> 1、滑动目标中心则调整位置</view>
				<view> 2、滑动目标边缘即调整宽高 </view>
				<view style="display: flex;">
					<image src="https://s2.ax1x.com/2020/01/01/l8a92j.png" class="zx-img" mode="aspectFit"></image> <view style="line-height: 180rpx;color: #999999;">(不支持调整文本高度)</view>
				</view>
				<view> 3、长按目标即删除</view>
				<view style="display: flex;">
				<image src="https://s2.ax1x.com/2020/01/01/l8apGQ.png" class="zx-img" mode="aspectFit"></image><view style="line-height: 180rpx;color: #999999;">(长按350ms以上判定)</view>
					</view>
				<view class="zx-title">画布模式</view>
				<view>1、手绘，可选择保存或编辑</view>
				<view style="margin-top: 30rpx;color: #999999;">（更多功能等你发掘~）</view>
			</view>
			<button class="zx-btn" @tap="handldWin">X</button>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				active: false,
			}
		},
		methods: {
			handldWin() {
				this.active = !this.active
			},
			selectColor(item) {
				this.handldWin()
				this.$emit('getColor', item.color)
			}
		}
	}
</script>

<style lang="scss">
	.zx-info {
		position: absolute;
		margin: auto;
		bottom: 0;
		top: 0;
		left: 0;
		right: 0;
		background-color: rgba(0, 0, 0, .5);
		z-index: 9999;

		.zx-dialog {
			display: flex;
			position: absolute;
			margin: auto;
			width: 600rpx;
			height: 720rpx;
			bottom: 0;
			top: 0;
			left: 0;
			right: 0;
			border-radius: 15rpx;
			background: #FFFFFF;

			.zx-content {
				flex: 1;
				padding: 20rpx 0 30rpx 30rpx;

				.zx-title {
					font-size: 32rpx;
					font-weight: bold;
					padding-bottom: 10rpx;
				}

				.zx-img {
					width: 180rpx;
					height: 180rpx;
					padding-left: 20rpx;
				}
			}

			.zx-btn {
				display: inline-block;
				font-size: 30rpx;
				height: 50rpx;
				width: 50rpx;
				margin: 13rpx;
				color: #555555;
				text-align: center;
				line-height: 50rpx;
				padding: 0;
			}
		}


	}

	/* 动画效果 animation effect */
	.show {
		animation: show .5s forwards;
	}

	.hide {
		animation: hide .5s forwards;
	}

	@keyframes hide {
		0% {
			transform: translateY(0);
			opacity: 1;
		}

		100% {
			display: none;
			transform: translateY(100%);
			opacity: 0;
		}
	}

	@keyframes show {
		0% {
			display: block;
			transform: translateY(100%);
			opacity: 0;
		}

		100% {
			transform: translateY(0);
			opacity: 1;
		}
	}
</style>
