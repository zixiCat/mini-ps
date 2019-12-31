<template>
	<view>
		<!-- 轮播图 -->
		<view class="zx-header" :class="">
			<swiper class="zx-swiper" :indicator-dots="true" :autoplay="true" :circular="true" indicator-color="#ffffff"
			 indicator-active-color="#f97502">
				<swiper-item class="bg-gray" v-for="(item,index) in swiperList" :key="index">
					<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg" mode="aspectFill" @tap="jump2item(item,index)"></image>
				</swiper-item>
			</swiper>
		</view>
		<!-- 选项 -->
		<view class="grid col-2 text-l padding-sm text-center bg-white solid-bottom">
			<view class="solid-right" @tap="jump2creditUser">我的积分</view>
			<view @tap="jump2listCreditLog">兑换记录</view>
		</view>
		<!-- 搜索 -->
		<view class="cu-bar">
			<view class="search-form radius text-orange bg-white shadow" style="background-color: #fff">
				<text class="cuIcon-search text-orange text-bold text-xl" style="margin-left: 20upx"></text>
				<input type="text" placeholder="输入关键字进行搜索" @tap="jump2search" disabled />
			</view>
		</view>
		<!-- 更多跳转 -->
		<view class="flex padding-sm margin-top-xs text-l bg-white">
			<view class="flex-sub">推荐商品</view>
			<view @tap="jump2searchResult">更多<text class="cuIcon-right margin-left"></text></view>
		</view>
		<!-- 商品列表 -->
		<view class="zx-list padding-left-sm padding-right-sm margin-bottom bg-white margin-top-sm">
			<list>
				<cell v-for="(item,index) of itemList" :key="index" @tap="jump2item(item,index)">
					<view class="flex padding-top-sm padding-bottom-sm solid-bottom">
						<image class="radius" src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg"></image>
						<view class="zx-detail flex-sub padding-left-sm">
							<view class="text-lg text-bold margin-top-xs">商品名字商品名字</view>
							<view class="margin-top-xs">描述描述描述描述描述描述描述...</view>
							<view class="text-gray margin-top-xs">1983积分 +<text class="text-red margin-left-xs">￥238.00</text></view>
						</view>
						<view class="zx-exchange  text-red text-lg padding-right">兑</view>
					</view>
				</cell>
			</list>
		</view>
		<view class="text-center margin-bottom text-gray">~ 我也是有底线的 ~</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				/* 轮播图 */
				swiperList: [{}, {}],
				/* 商家列表 */
				itemList: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
			}
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
		methods: {
			/* 页面跳转 */
			jump2creditUser() {
				uni.navigateTo({
					url: '/pages/credit/user'
				})
			},
			jump2listCreditLog() {
				uni.navigateTo({
					url: '/pages/list/credit/log'
				})
			},
			jump2search() {
				uni.navigateTo({
					url: '/pages/search/index'
				})
			},
			jump2searchResult() {
				uni.navigateTo({
					url: '../search/result'
				})
			},
			jump2item(item, index) {
				uni.navigateTo({
					url: '/pages/item/index'
				})
			},
		}
	}
</script>

<style lang="scss">
	.zx-header {
		width: 100%;
		color: #ffffff;

		.zx-swiper {
			height: 250upx;
			width: 100%;

			image {
				width: 100%;
			}
		}
	}

	.zx-list {
		image {
			width: 150upx;
			height: 150upx;
		}

		.zx-detail {}

		.zx-exchange {
			line-height: 150upx;
		}
	}
</style>
