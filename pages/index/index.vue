<template>
	<view>
		<!-- 搜索 -->
		<view class="cu-bar zx-search bg-orange radius">
			<view class="bg-gradual-anime " :class="scrollTop>10?'fadeout':'fadein'"></view>
			<view @tap="setLocation">
				<text class="cuIcon-locationfill text-lg margin-left margin-right-xs text-bold text-white"></text>
				<view class="text-lg text-white text-cut text-center zx-location">{{location.name}}</view>
				<text class="cuIcon-right text-white"></text>
			</view>
			<view class="search-form round text-orange bg-white" style="margin-left: 10upx;margin-right: 20upx;background-color: #fff">
				<text class="cuIcon-search text-orange text-bold text-xl" style="margin-left: 20upx"></text>
				<input type="text" placeholder="搜索商户名、商品名等" @tap="jump2search" disabled />
			</view>
		</view>
		<!-- 主体- -->
		<view class="zx-body">
			<!-- 主体-轮播图  -->
			<view class="bg-gradual-anime" :class="scrollTop>10?'fadeout':'fadein'"></view>
			<view class="zx-header padding-left-sm padding-right-sm" :class="">
				<view class=" radius overflow-hidden">
					<swiper class="zx-swiper" :indicator-dots="true" :autoplay="true" :circular="true" indicator-color="#ffffff"
					 indicator-active-color="#f97502">
						<swiper-item class="bg-gray" v-for="(item,index) in swiperList" :key="index">
							<image :src="item.url" mode="aspectFill" @tap="jump2item(item,index)"></image>
						</swiper-item>
					</swiper>
				</view>
			</view>
			<view class="margin-left-sm margin-right-sm">
				<!-- 主体-分类 -->
				<view class="grid col-5 zx-category padding-top padding-bottom">
					<view class="padding-left-sm padding-right-sm padding-bottom-xs" v-for="(item,index) in categoryList" :key="index"
					 @tap="jump2formShopsSign">
						<image class="round" :src="item.url" mode="aspectFill"></image>
						<view class="text-center text-sm">{{index===9?'商家入驻':('分类'+index)}}</view>
					</view>
				</view>
				<!-- 主体-广告 -->
				<image class="zx-ad" src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg" @tap="jump2test"
				 mode="aspectFill"></image>
				<!-- 主体-限时活动 -->
				<view class="zx-sale margin-top-xs bg-white radius padding-top-sm padding-bottom-sm">
					<view class="flex padding-left-sm padding-right-sm">
						<view class="flex-treble">
							<view class="flex justify-start zx-title round">
								<view class="round bg-red text-center">20日限时秒杀</view>
								<view class="text-red text-center text-bold">59:59:59</view>
							</view>
						</view>
						<button class="cu-btn bg-red round zx-more" @tap="jump2searchDetail">更多</button>
					</view>
					<view class="grid col-5 padding-left-xs padding-right-xs">
						<view class="zx-item" v-for="(item,index) of saleList" :key="index">
							<image class="radius" :src="item.url" mode="aspectFill" @tap="jump2item(item,index)"></image>
							<view class="text-center">￥199</view>
							<view class="text-center text-gray text-through">￥999</view>
						</view>
					</view>
				</view>
			</view>
			<!-- </view> -->
			<!-- 主体-商家 -->
			<view class="margin-top-sm bg-white padding-sm radius">
				<view class="text-lg text-bold">推荐商家</view>
				<!-- 主体-商家-筛选工具栏 -->
				<view class="flex margin-top-xs">
					<view class="flex-treble">
						综合排序
						<!-- <text class="cuIcon-triangleupfill text-lg"></text> -->
						<text class="cuIcon-triangledownfill text-lg"></text>
					</view>
					<view class="flex-twice">
						销量
					</view>
					<view class="flex-twice">
						距离
					</view>
					<view class="flex-twice">
						口碑
					</view>
					<view class="flex-twice text-center">
						筛选
						<text class="cuIcon-filter text-lg"></text>
					</view>
				</view>
				<!-- 主体-商家-商家列表 -->
				<view class="zx-shops flex padding-top-sm" v-for="(item,index) of shopsList" :key="index" @tap="jump2shopsDetail(item,index)">
					<image class="radius" :src="item.url" mode="aspectFill"></image>
					<view class="zx-detail padding-left-sm flex-sub">
						<view class="flex zx-title margin-top-xs">
							<view class="flex-sub text-l text-bold">商店名</view>
							<view class="margin-top-xs">5.0km</view>
						</view>
						<view class="margin-top-xs">描述描述描述描述描述描述描述...</view>
						<view class="margin-top-xs">
							<text class="cuIcon-favorfill text-yellow"></text>
							<text class="padding-left-xs text-gray">9.5分</text>
							<text class="padding-left-xl text-gray">人均￥99员</text>
						</view>
					</view>
				</view>
			</view>
			<view class="margin-sm text-gray text-center">~ 我也是有底线的 ~</view>
		</view>
		<!-- 购物车 -->
		<cart></cart>
	</view>
</template>

<script>
	import cart from "pages/cart/icon-link.vue"
	import amap from 'util/map/amap-wx.js';
	export default {
		components: {
			cart
		},
		data() {
			return {
				/* 滚动的Y坐标 */
				scrollTop: 0,
				/* 地图配置 */
				amapPlugin: null,
				key: '820ff2213924c04f7e4dc891190b1c1e',
				location: {
					longitude: '116.46',
					latitude: '39.92',
					name: '加载中'
				},
				/* 轮播图 */
				swiperList: [{
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
					},
					{
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
					},
					{
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
					}
				],
				/* 分类 */
				categoryList: [{
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
					}, {
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
					},
					{
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
					}, {
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
					},
					{
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
					},
					{
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
				],
				/* 限时秒杀 */
				saleList: [{
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg'
					},
					{
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
					}, {
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
					}, {
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg'
					},
					{
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
					}
				],
				/* 商家列表 */
				shopsList: [{
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
					}, {
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg',
					}, {
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
					},
					{
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
					},
					{
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
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
			}
		},
		onLoad() {
			this.getCurLocation()
		},
		onReady() {

		},
		onReachBottom() {
			uni.showLoading({
				title: '加载中',
				mask: true
			})
			setTimeout(function() {
				uni.hideLoading()
			}, 1000);
		},
		onPullDownRefresh() {
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop
		},
		methods: {
			/* 地址信息 */
			getCurLocation() {
				this.amapPlugin = new amap.AMapWX({ //初始化高德地图SDK实例对象
					key: this.key
				});
				this.amapPlugin.getRegeo({
					success: res => {
						this.location.longitude = res[0].longitude
						this.location.latitude = res[0].latitude
						this.location.name = res[0].desc;
						this.location.address = res[0].name;
					},
					fail: res => {
						this.location.name = '暂未获取';
					}
				});
			},
			setLocation() {
				let _this = this
				uni.chooseLocation({
					success: function(res) {
						if (res.name) {
							_this.location.name = res.name
							_this.location.address = res.address
							_this.location.latitude = res.latitude
							_this.location.longitude = res.longitude
						}
					}
				});
			},
			/* 页面跳转 */
			jump2search() {
				uni.navigateTo({
					url: '/pages/search/index'
				})
			},
			jump2searchDetail(item, index) {
				uni.navigateTo({
					url: '/pages/search/result'
				})
			},
			jump2item(item, index) {
				uni.navigateTo({
					url: '/pages/item/index'
				})
			},
			jump2formShopsSign() {
				uni.navigateTo({
					url: '/pages/form/shops/sign-in'
				})
			},
			jump2test(){
				uni.navigateTo({
					url: '/pages/index/test2'
				})
			},
			jump2shopsDetail(item, index) {
				uni.navigateTo({
					url: '/pages/shops/detail'
				})
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
		height: 80upx;

		.bg-gradual-anime {
			position: absolute;
			width: 100%;
			height: 100upx;
			z-index: -1;
			border-radius: 15upx 15upx 15upx 0;
			background-image: linear-gradient(90deg, #ED0424, #FF7800);
			color: #FFFFFF;
		}

		.zx-location {
			display: inline-block;
			max-width: 250upx;
			height: 52upx
		}
	}

	//主体
	.zx-body {
		position: relative;
		top: 100upx;

		.bg-gradual-anime {
			position: absolute;
			z-index: -1;
			width: 100%;
			height: 200upx;
			background-image: linear-gradient(-15deg, #f8f8f8, #f8f8f8, #f8f8f8, #ED0424);
		}

		.zx-header {
			width: 100%;
			color: #ffffff;

			.zx-swiper {
				height: 220upx;
				width: 100%;

				image {
					width: 100%;
				}
			}
		}

		.zx-category {
			image {
				height: 100upx;
			}
		}

		.zx-ad {
			height: 200upx;
			width: 100%;
			overflow: hidden
		}

		.zx-sale {
			height: 300upx;

			.zx-title {
				width: 400upx;
				border: 3upx solid #ED0424;

				view {
					width: 100%;
				}
			}

			.zx-more {
				height: auto;
			}

			.zx-item {
				padding: 20upx 10upx;

				image {
					height: 120upx;
				}
			}
		}

		.zx-shops {
			image {
				width: 150upx;
				height: 150upx;
			}
		}
	}

	/* 动画效果 */
	.fadein {
		animation: fadein .5s forwards;
	}

	.fadeout {
		animation: fadeout .5s forwards;
	}

	@keyframes fadeout {
		0% {
			opacity: 1;
		}

		100% {
			opacity: 0;
		}
	}

	@keyframes fadein {
		0% {
			opacity: 0;
		}

		100% {
			opacity: 1;
		}
	}
</style>
