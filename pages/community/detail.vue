<template>
	<view>
		<!-- 顶部 -->
		<view class="flex zx-header padding-left-sm padding-right-sm solid-bottom bg-white padding-top-xs">
			<view>
				<image class="round zx-avatar" src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg"></image>
			</view>
			<view class="flex-sub zx-text text-bold padding-left-xs" @tap="jump2shopsDetail">商家110</view>
			<view class="bg-red cu-btn radius padding-left padding-right">关注</view>
		</view>
		<!-- 内容 -->
		<view class="zx-content bg-white">
			<view class="text-gray padding-sm">发表于 2019-11-11 23:00</view>
			<list>
				<cell v-for="(item,index) of imgList" :key="index" @tap="previewImage(imgList,index)">
					<image :src="item.url" mode="widthFix"></image>
				</cell>
			</list>
			<view class="text-center padding-bottom-sm">
				<button class=" round cu-btn bg-orange shadow margin-top-sm cuIcon-appreciate padding-left-xl padding-right-xl">已点赞
					+1</button>
			</view>
		</view>
		<!-- 评论 -->
		<view class="zx-comment margin-top-sm shadow shadow-blur bg-white padding-sm">
			<view class="text-l padding-bottom-xs">
				共10条评论
			</view>
			<view class="zx-list">
				<list>
					<cell v-for="(item,index) of commentList" :key="index">
						<view class="flex margin-top-sm">
							<image class="zx-avatar round" src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg"></image>
							<view class="flex-sub text-gray padding-left-sm">
								<view><text class="text-pink">一宫绘留奈</text><text class="text-orange text-lg cuIcon-crown"></text></view>
								<view>2019-03-29</view>
							</view>
						</view>
						<view class="margin-top-sm line-height-xs solid-bottom padding-bottom-sm">评价评价评价评价评价评价评价评价评价评价评价评价评价评价评价评价评价</view>
					</cell>
				</list>
			</view>
			<view class="margin-top-sm text-center" :class="isFold?'cuIcon-fold':'cuIcon-unfold'" @tap="fold">{{isFold?'收起':'展开8条评论'}}</view>
		</view>
		<!-- 商品推荐 -->
		<view class="zx-recommend">
			<view class="text-l padding-sm">为你推荐</view>
			<itemList></itemList>
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
	import itemList from 'component/item-list.vue'
	export default {
		components: {
			itemList
		},
		data() {
			return {
				imgList: [{
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
				}, {
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg'
				}, {
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
				}],
				/* 评论 */
				commentTop: '',
				commentList: [{}, {}],
				isFold: false,
				inputContent: ''
			}
		},
		onReady() {
			uni.createSelectorQuery().in(this).select('.zx-comment').boundingClientRect(data => {
				this.commentTop = data.top
			}).exec();
		},
		methods: {
			/* 评论 */
			fold() {
				this.isFold = !this.isFold
				if (this.isFold) {
					this.commentList.push(...[{}, {}, {}, {}, {}, {}, {}, {}])
					uni.pageScrollTo({
						scrollTop: this.commentTop - 162
					})
				} else {
					this.commentList.splice(1, this.commentList.length - 2)
					// uni.pageScrollTo({
					// 	scrollTop: this.commentTop
					// })
				}
			},
			/* 辅助功能 */
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
				});
			},
			/* 页面跳转 */
			jump2shopsDetail(){
				uni.navigateTo({
					url:'/pages/shops/detail'
				})
			}
		}
	}
</script>

<style lang="scss">
	.zx-header {
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 1;

		.zx-avatar {
			height: 70upx;
			width: 70upx;
		}

		.zx-text {
			line-height: 70upx;
		}
	}

	.zx-content {
		margin-top: 90upx;

		image {
			display: block;
			width: 100%;
		}
	}

	.zx-comment {
		.zx-list {
			max-height: 888upx;
			overflow: scroll;

			.zx-avatar {
				width: 70upx;
				height: 70upx;
			}
		}
	}

	.zx-recommend {
		margin-bottom: 120upx;
	}
</style>
