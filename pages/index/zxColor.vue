<template>
	<view class="zx-color" :class="active?'show':'hide'">
		<view class="zx-dialog">
			<view class="zx-item" v-for="(item,index) of colorList" :key="index">
				<view class="zx-stuff" :style="{backgroundColor:item.color}" @tap="selectColor(item)"></view>
			</view>
		</view>
		<view>
			<button class="zx-btn" @tap="handldWin">X</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				active: false,
				colorList: [{
						title: '嫣红',
						name: 'red',
						color: '#e54d42'
					},
					{
						title: '桔橙',
						name: 'orange',
						color: '#f37b1d'
					},
					{
						title: '明黄',
						name: 'yellow',
						color: '#fbbd08'
					},
					{
						title: '橄榄',
						name: 'olive',
						color: '#8dc63f'
					},
					{
						title: '森绿',
						name: 'green',
						color: '#39b54a'
					},
					{
						title: '天青',
						name: 'cyan',
						color: '#1cbbb4'
					},
					{
						title: '海蓝',
						name: 'blue',
						color: '#0081ff'
					},
					{
						title: '姹紫',
						name: 'purple',
						color: '#6739b6'
					},
					{
						title: '木槿',
						name: 'mauve',
						color: '#9c26b0'
					},
					{
						title: '桃粉',
						name: 'pink',
						color: '#e03997'
					},
					{
						title: '棕褐',
						name: 'brown',
						color: '#a5673f'
					},
					{
						title: '玄灰',
						name: 'grey',
						color: '#8799a3'
					},
					{
						title: '草灰',
						name: 'gray',
						color: '#aaaaaa'
					},
					{
						title: '墨黑',
						name: 'black',
						color: '#333333'
					},
					{
						title: '雅白',
						name: 'white',
						color: '#ffffff'
					}
				]
			}
		},
		methods: {
			handldWin() {
				this.active = !this.active
			},
			selectColor(item){
				this.handldWin()
				this.$emit('getColor',item.color)
			}
		}
	}
</script>

<style lang="scss">
	.zx-color {
		position: fixed;
		display: flex;
		bottom: 0;
		top: 0;
		left: 0;
		right: 0;
		background-color: rgba(0, 0, 0, .5);
		z-index: 9999;

		.zx-dialog {
			padding: 5rpx 10rpx 10rpx 10rpx;
			flex: 1;
			width: 600rpx;
			display: flex;
			flex-wrap: wrap;

			.zx-item {
				padding: 10rpx 10rpx 0 10rpx;
				flex-basis: 100rpx;

				.zx-stuff {
					border-radius: 15rpx;
					width: 100rpx;
					height: 50rpx;
					background-color: #FFFFFF;
					box-shadow: 0 5rpx 30rpx 0 rgba(0, 0, 0, .3);
				}
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
