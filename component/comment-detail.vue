<template>
	<view>
		<!-- 详情 -->
		<view class="bg-white zx-detail padding-sm">
			<view class="flex margin-top">
				<image class="zx-avatar round" src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg"></image>
				<view class="flex-sub text-gray padding-left-sm">
					<view class="text-pink">一宫绘留奈<text class="text-orange text-lg cuIcon-crown"></text></view>
					<view>2019-03-29</view>
				</view>
				<view>
					<text class="cuIcon-favorfill text-yellow"></text>
					<text class="cuIcon-favorfill text-yellow"></text>
					<text class="cuIcon-favorfill text-yellow"></text>
					<text class="cuIcon-favor text-gray"></text>
					<text class="cuIcon-favor text-gray"></text>
				</view>
			</view>
			<view class="margin-top-xs flex text-gray text-sm">
				<view>浏览 111 次</view>
				<text class="padding-left">红色，L</text>
				<view class="padding-left">11人觉得很棒</view>
			</view>
			<view class="margin-top-sm line-height-xs">评价评价评价评价评价评价评价评价评价评价评价评价评价评价评价评价评价评价评价评价评价</view>
			<view class="margin-top-sm zx-comment-img">
				<image class="radius " :src="item.url" mode="widthFix" v-for="(item,index) of commentImgList" :key="index" @tap="previewImage(commentImgList,index)"></image>
			</view>
			<view class="text-center">
				<button class=" round cu-btn bg-orange shadow margin-top-sm cuIcon-appreciate padding-left-xl padding-right-xl">已点赞
					+1</button>
			</view>
		</view>
		<!-- 次级评论 -->
		<view class="zx-sub-comment bg-white padding-sm margin-top-sm">
			<view class="cuIcon-comment text-lg text-blue padding-bottom-sm solid-bottom">
				<text class="padding-left-sm text-black">全部评价(2)</text>
			</view>
			<view class="flex margin-top">
				<image class="zx-avatar round" src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg"></image>
				<view class="flex-sub text-gray padding-left-sm">
					<view class="text-pink">一宫绘留奈<text class="text-orange text-lg cuIcon-crown"></text><text class="margin-left-xs padding-left-xs padding-right-xs  radius bg-blue text-white">楼主</text></view>
					<view>2019-03-29</view>
				</view>
				<view>
					<text class="cuIcon-appreciate">12</text>
				</view>
			</view>
			<view class="margin-top-sm line-height-xs padding-bottom solid-bottom">评价评价评价评价评价评价评价评价评价评价评</view>
			<view class="flex margin-top">
				<image class="zx-avatar round" src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg"></image>
				<view class="flex-sub text-gray padding-left-sm">
					<view class="text-pink">北斗<text class="text-orange text-lg cuIcon-crown"></text></view>
					<view>2019-03-29</view>
				</view>
				<view>
					<text class="cuIcon-appreciate">12</text>
				</view>
			</view>
			<view class="margin-top-sm line-height-xs padding-bottom solid-bottom">回复 <text class="text-blue"> 一宫绘留奈： </text>还行吧
			</view>

			<!-- <view class="margin-top text-center text-gray">~ 快来抢占沙发吧 ~</view> -->
			<view class="margin-top text-center text-gray">~ 我的有底线的 ~</view>
		</view>
		<!-- 发送评论 -->
		<view class="cu-bar foot input">
			<input class="solid-bottom" v-model="inputContent" maxlength="300" cursor-spacing="10"></input>
			<view class="action">
				<text class="cuIcon-emojifill text-grey"></text>
			</view>
			<button class="cu-btn bg-orange shadow">发送</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				InputBottom: 0,
				commentImgList: [{
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
				}, {

					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
				}],
				inputContent: ''
			}
		},
		methods: {
			previewImage(srcArray, index) {
				let imgArray = srcArray.map(e => e.url)
				uni.previewImage({
					current: index,
					urls: imgArray,
					indicator: true,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				})
			},
			inputBlur() {

			},
			inputFocus() {

			}
		}
	}
</script>

<style lang="scss">
	.zx-detail {
		.zx-avatar {
			width: 75upx;
			height: 75upx;
		}

		.zx-comment-img {
			image {
				width: 100%;
			}
		}
	}

	.zx-sub-comment {
		padding-bottom: 130upx;

		.zx-avatar {
			width: 75upx;
			height: 75upx;
		}
	}
</style>
