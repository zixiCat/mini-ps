<template>
	<view v-if="active" class="zx-info" @animationend="animeEnd" :class="anime?'show':'hide'" @tap="closeInfo">
		<view class="zx-dialog">
			<view class="zx-content">
				<view class="zx-title">文本/图片模式</view>
				<view> 1、滑动目标中心即移动</view>
				<view> 2、滑动目标内存边缘即调整宽高 </view>
				<view style="display: flex;">
					<image src="https://s2.ax1x.com/2020/01/01/l8a92j.png" class="zx-img" mode="aspectFit"></image>
					<view style="line-height: 180rpx;color: #999999;">(不支持调整文本高度)</view>
				</view>
				<view> 3、长按目标即移动</view>
				<view style="display: flex;">
					<image src="https://s2.ax1x.com/2020/01/01/l8apGQ.png" class="zx-img" mode="aspectFit"></image>
					<view style="line-height: 180rpx;color: #999999;">(长按350ms以上判定)</view>
				</view>
				<view class="zx-title">画布模式</view>
				<view>1、手绘</view>
				<view>1、点击<text style="font-weight: bold;">保存</text>后直接保存至本地相册</view>
				<view>2、点击<text style="font-weight: bold;">确认</text>转成图片进行编辑</view>
				<view class="zx-title" style="margin-top: 20rpx;">导出</view>
				<view>1、导出的图片为PNG格式</view>
				<view>2、导出后长按即可保存/分享/收藏</view>
				<view style="margin-top: 30rpx;color: #999999;">拖动画板底部的 <text style="letter-spacing: -3rpx;color: #304156;padding: 5rpx;"> === </text> 可调整其高度</view>
				<view style="color: #999999;display: flex;">调整范围的按钮<button class="zx-btn">-</button><button class="zx-btn">+</button>支持长按</view>
				<view style="margin-top: 30rpx;color: #999999;">更多功能/彩蛋等你发现</view>
				<view style="color: #999999;">点击TensionMax再次弹出</view>
			</view>
			<!-- <button class="zx-btn" @tap="handldWin">X</button> -->
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				active: true,
				anime:true
			}
		},
		methods: {
			openInfo() {
				this.active = true
				this.anime = true
			},
			closeInfo(){
				this.anime = false
			},
			animeEnd(){
				if(!this.anime){
					this.active = false
				}
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
		// font-weight: bold;
		left: 0;
		right: 0;
		background-color: rgba(0, 0, 0, .5);
		z-index: 1000;

		.zx-dialog {
			display: flex;
			position: absolute;
			margin: auto;
			width: 600rpx;
			height: 1150rpx;
			bottom: 0;
			top: 0;
			left: 0;
			right: 0;
			border-radius: 15rpx;
			background: #FFFFFF;

			.zx-content {
				flex: 1;
				padding: 30rpx 0 40rpx 30rpx;

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
				height: 38rpx;
				width: 50rpx;
				font-size: 38rpx;
				line-height: 38rpx;
				text-align: center;
				color: #304156;
				padding: 0;
				margin: 0 10rpx;
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
