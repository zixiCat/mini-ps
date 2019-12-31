<template>
	<view class="bg-white zx-comment padding-sm">
		<list>
			<cell v-for="(item,index) of commentList" :key="index" @tap="jump2commentDetail">
				<view class="flex margin-top">
					<image class="zx-avatar round" src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg"></image>
					<view class="flex-sub text-gray padding-left-sm">
						<view><text class="text-pink">一宫绘留奈</text><text class="text-orange text-lg cuIcon-crown"></text></view>
						<view class="text-sm margin-top-xs">2019-03-29</view>
					</view>
					<view>
						<text class="cuIcon-favorfill text-yellow"></text>
						<text class="cuIcon-favorfill text-yellow"></text>
						<text class="cuIcon-favorfill text-yellow"></text>
						<text class="cuIcon-favor text-gray"></text>
						<text class="cuIcon-favor text-gray"></text>
					</view>
				</view>
				<view class="margin-top-sm line-height-xs">评价评价评价评价评价评价评价评价评价评价评价评价评价评价评价评价评价评价评价评价评价</view>
				<view class="flex flex-wrap margin-top-sm">
					<view class="zx-comment-img padding-left-xs" v-for="(item1,index1) of item.commentImgList" :key="index1">
						<image class="radius" :src="item1.url" mode="aspectFill" @tap.stop="" @tap="previewImage(item.commentImgList,index1)"></image>
					</view>
				</view>
				<view class="solid-bottom margin-top-xs padding-bottom margin-bottom-sm flex text-gray text-sm">
					<view class="flex-sub">浏览 111 次 <text class="padding-left">红色，L</text></view>
					<view class="cuIcon-comment padding-left padding-right">评论(2)</view>
					<view class="cuIcon-appreciate"  @tap.stop="">66</view>
				</view>
			</cell>
		</list>
		<view class="margin-top text-center text-gray">~ 我的有底线的 ~</view>
		<!-- 发送评论 -->
		<view class="cu-bar foot input">
			<input class="solid-bottom" v-model="inputContent" maxlength="300"
			 cursor-spacing="10"></input>
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
				commentList: [{},
					{	
						commentImgList: [{
							url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
						}, {

							url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
						}],
					},
					{
						commentImgList: [{
								url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
							}, {
								url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg',
							}, {
								url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
							},
							{
								url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
							},
							{
								url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
							}
						]
					},
					{
						commentImgList: [ {
								url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
							},
							{
								url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
							},
							{
								url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
							}
						],
					}
				]
			}
		},
		methods: {
			jump2commentDetail(){//跳转到评论详情
				uni.navigateTo({
					url:'/pages/item/comment-detail'
				})
			},
			previewImage(srcArray, index) {
				let imgArray = srcArray.map(e => e.url)
				uni.previewImage({
					current: index,
					urls: imgArray,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.zx-comment {
		.zx-avatar {
			width: 75upx;
			height: 75upx;
		}

		.zx-comment-img {
			flex-basis: 33.3%;

			image {
				height: 180upx;
				width: 100%;
			}
		}
	}
</style>
