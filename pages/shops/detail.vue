<template>
	<view>
		<!-- 搜索 -->
		<view class="cu-bar zx-search padding-right-sm" :class="isMovingDown?'radius':''">
			<view class="search-form round" style="background-color: #fff">
				<text class="cuIcon-search text-orange text-bold text-xl"></text>
				<input type="text" placeholder="搜索商品名等" @tap="jump2search" disabled />
			</view>
			<button class="cu-btn shadow-blur round bg-white">搜 索</button>
		</view>
		<!-- 主体- -->
		<view class="zx-body">
			<veiw class="zx-header" :class="isMovingDown?'zx-hidden':'zx-show'">
				<!-- 主体-顶部信息 -->
				<view class="zx-info padding-left padding-right padding-bottom">
					<view class="flex zx-avatar text-white">
						<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg" mode="aspectFill"></image>
						<view class="flex-sub padding-left">
							<view>店铺名称</view>
							<view>联系方式 110</view>
							<view>地址 成都市武侯区</view>
						</view>
						<view class="zx-phone"><text class="cuIcon-phone text-xxl"></text></view>
					</view>
				</view>
				<!-- 主体-栏目 -->
				<scroll-view scroll-x class="nav bg-white zx-tab padding-left">
					<view class="cu-item" :class="0==tabCur?'text-orange cur text-bold':''" @tap="tabSelect" data-id="0">
						首页
					</view>
					<view class="cu-item" :class="1==tabCur?'text-orange cur text-bold':''" @tap="tabSelect" data-id="1">
						商品
					</view>
				</scroll-view>

			</veiw>
			<!-- 主体-轮播 -->
			<swiper class="zx-swiper" :style="'height:'+swiperH+'px'" :current="swiperCur" @change="swiperChange">
				<!-- 主体-轮播-首页 -->
				<swiper-item class="zx-home">
					<scroll-view :scroll-y="true" @scrolltoupper="homeScroll2upper" @scroll="swiperScroll" @scrolltolower="homeScroll2lower"
					 :style="'height: '+swiperH+'px'">
						<view class="" style="height: 260upx"></view>
						<list>
							<cell v-for="(item,index) of homeImgList" :key="index"  @tap="previewImage(homeImgList,index)">
								<image :src="item.url" mode="widthFix"></image>
							</cell>
						</list>
					</scroll-view>
				</swiper-item>
				<swiper-item class="zx-item">
					<view class="flex bg-white zx-filter1 padding-sm" :class="isMovingDown?'zx-filter2':''">
						<view class="flex-treble">
							综合排序
							<!-- <text class="cuIcon-triangleupfill text-lg"></text> -->
							<text class="cuIcon-triangledownfill text-lg"></text>
						</view>
						<view class="flex-twice">
							销量
						</view>
						<view class="flex-twice">
							口碑
						</view>
						<view class="flex-twice text-center">
							筛选
							<text class="cuIcon-filter text-lg"></text>
						</view>
					</view>
					<scroll-view :scroll-y="true" @scrolltoupper="itemScroll2upper" @scrolltolower="itemScroll2lower" @scroll="swiperScroll"
					 :style="'height: '+swiperH+'px'">
						<view style="height: 260upx"></view>
						<itemList></itemList>
						<itemList></itemList>
						<itemList></itemList>
						<view class="text-gray text-center padding">~ 我是有底线的 ~</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import itemList from "component/item-list.vue"
	export default {
		components: {
			itemList
		},
		data() {
			return {
				/* 首页图片 */
				homeImgList: [{
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
				}, {
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg'
				}, {
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
				},{
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
				}, {
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg'
				}],
				/* 滚动的Y坐标 */
				isMovingDown: false,
				/* swiper高度 */
				swiperH: '',
				/* 当前标签 */
				tabCur: 0,
				/* 当前轮播 */
				swiperCur: 0,
			}
		},
		onPullDownRefresh() {
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onReady() {
			uni.getSystemInfo({
				success: data => {
					this.swiperH = data.windowHeight
				}
			})
		},
		methods: {
			/* 标签选择 */
			tabSelect(e) {
				this.tabCur = e.currentTarget.dataset.id;
				this.swiperCur = this.tabCur
			},
			/* 轮播变化 */
			swiperChange(e) {
				this.isMovingDown = false
				this.swiperCur = e.detail.current;
				this.tabCur = this.swiperCur
			},
			/* swiper滚动控制 */
			swiperScroll(e) {
				console.log(e)
				if (e.detail.deltaY > 0) {
					this.isMovingDown = false
				} else if (e.detail.deltaY < 0 && e.detail.scrollTop > 80) {
					this.isMovingDown = true
				}
			},
			homeScroll2lower(e) {

			},
			itemScroll2lower(e) {

			},
			homeScroll2upper(e) {

			},
			itemScroll2upper(e) {

			},
			/* 页面跳转 */
			jump2search(){
				uni.navigateTo({
					url:'/pages/search/index'
				})
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
		}
	}
</script>

<style lang="scss">
	//搜索
	.zx-search {
		position: fixed;
		z-index: 1;
		width: 100%;
		top: 0;
		background-image: linear-gradient(0deg, #ED4510, #ED4510);
	}

	.zx-body {
		position: fixed;
		top: 100upx;
		right: 0;
		bottom: 0;
		left: 0;


		.zx-header {
			position: absolute;
			z-index: 1;
			width: 100%;

			.zx-info {
				height: 170upx;
				background-image: linear-gradient(0deg, #ff9700, #ff9700, #ED4510);
				color: #ffffff;

				.zx-avatar {
					image {
						border-radius: 20upx;
						height: 150upx;
						width: 150upx;
						border: 6upx solid #FFFFFF;
					}

					.flex-sub {
						line-height: 48upx;
					}

					.zx-phone {
						line-height: 120upx;
					}
				}
			}

			.zx-tab {
				.cu-item {
					padding-left: 30upx;
					padding-right: 30upx;
				}
			}
		}



		.zx-swiper {
			width: 100%;

			.zx-home {
				image{
					display: block;
					width: 100%;
				}
			}

			.zx-item {
				.zx-filter1 {
					position: absolute;
					width: 100%;
					top: 0;
					z-index: 1
				}
			}
		}
	}

	/* 动画效果 */
	.zx-show {
		animation: show .5s forwards;
	}

	.zx-hidden {
		animation: hidden .5s forwards;
	}

	@keyframes show {
		0% {
			opacity: .5;
			transform: translateY(-100upx);
		}

		100% {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes hidden {
		0% {
			opacity: 1;
			transform: translateY(0);
		}

		100% {
			opacity: 0;
			transform: translateY(-100upx);
		}
	}
</style>
