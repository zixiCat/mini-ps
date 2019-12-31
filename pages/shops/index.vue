<template>
	<view>
		<!-- 搜索 -->
		<view class="cu-bar zx-search bg-orange padding-right-sm radius">
			<view class="search-form round" style="background-color: #fff">
				<text class="cuIcon-search text-orange text-bold text-xl"></text>
				<input type="text" placeholder="搜索商品名等" @tap="jump2search" disabled />
			</view>
			<button class="cu-btn shadow-blur round bg-white">搜 索</button>
		</view>
		<!-- 主体 -->
		<view class="zx-body flex">
			<view class="zx-category">
				<view v-for="(item,index) of categoryList" :key="index" @tap="tabSelect(item,index)">
					<view class="padding-top-sm padding-bottom-sm" :class="index===activeCategory?'bg-white text-orange text-bold':''">
						<view class="text-center flex-sub" :class="index===activeCategory?'zx-active':''">
							<text>{{index?('店铺类型'+index):'全部分类'}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="zx-item bg-white flex-treble">
				<view class="flex bg-white zx-filter padding-sm">
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
				<view class="zx-shops">
					<view class="padding-sm" v-for="(item,index) of shopsList" :key="index" @click="jump2shopsDetail(item,index)">
						<view class="flex">
							<image class="radius basis-3" :src="item.url"></image>
							<view class="zx-detail basis-7 padding-left-sm">
								<view class="flex zx-title">
									<view class="flex-treble text-lg text-bold">商店名</view>
									<view class="zx-distance margin-top-xs">5.0km</view>
								</view>
								<view>描述描述描述...</view>
								<view>
									<text class="cuIcon-favorfill text-yellow"></text>
									<text class="padding-left-xs text-gray">9.5分</text>
									<text class="padding-left-xl text-gray">人均￥99员</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activeCategory: 0, //激活的分类
				categoryList: [{}, {}, {}], //分类列表
				shopsList: [{
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg'
					},
					{
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
					}, {
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
					}, {
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
					},
					{
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg'
					},
					{
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
					}, {
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
					}, {
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
					},
					{
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg'
					},
					{
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
					}, {
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
					}, {
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
					},
				]
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
			/* 分类标签 */
			tabSelect(item, index) {
				this.activeCategory = index
			},
			/* 页面跳转 */
			jump2search() {
				uni.navigateTo({
					url: '/pages/search/index'
				})
			},
			jump2shopsDetail(item, index) {
				uni.navigateTo({
					url: '/pages/shops/detail?id=' + index
				})
			}
		}
	}
</script>

<style lang="scss">
	.zx-search {
		position: fixed;
		z-index: 1;
		width: 100%;
		top: 0;
	}

	.zx-body {
		position: relative;
		top: 100upx;
		right: 0;
		bottom: 0;
		left: 0;

		.zx-category {
			position: sticky;
			top: 100upx;
			width: 25%;
			height: 900upx;
			overflow: scroll;
			overflow: scroll;

			.zx-active {
				border-left: 10upx solid #F37B1D;
			}
		}

		.zx-item {
			width: 75%;
			height: 100%;

			.zx-filter {
				position: fixed;
				width: 75%;
				z-index: 1;
			}

			.zx-shops {
				position: relative;
				top: 66upx;

				image {
					height: 120upx;
				}

				.zx-detail {
					display: inline-block;
					width: 100%;
				}
			}
		}
	}
</style>
