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
							<text>{{index?('分类'+index):'全部分类'}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="zx-item bg-white flex-treble padding">
				<view v-for="(item,index) of itemList" :key="index">
					<view class="text-bold padding-left-sm">外套</view>
					<view class="grid col-3">
						<view class="zx-subitem padding-sm" v-for="(item1,index1) of item.subItemlist" :key="index1">
							<image class="radius" :src="item1.url" mode="aspectFill" @tap="jump2searchResult(item,index,item1,index1)"></image>
							<view class="text-center zx-text">描述描述{{index+1+'-'+index+1}}</view>
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
				categoryList: [{}, {}, {}, {}, {}, {}, {}], //分类列表
				itemList: [{ //大类项目列表
						subItemlist: [ //详细项目列表
							{
								url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg'
							},
							{
								url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
							}, {
								url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
							}, {
								url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
							}, {
								url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg'
							}

						],
					},
					{
						subItemlist: [ //详细项目列表
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
			tabSelect(item, index) { //点击分类标签
				this.activeCategory = index
			},
			/* 页面跳转 */
			jump2search() {
				uni.navigateTo({
					url: '/pages/search/index'
				})
			},
			jump2searchResult(item, index, item1, index1) {
				uni.navigateTo({
					url: '/pages/search/result'
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
			width: 200upx;
			height: 900upx;
			overflow: scroll;

			.zx-active {
				border-left: 10upx solid #F37B1D;
			}
		}

		.zx-item {
			width: 100%;
			height: 100%;

			.zx-subitem {

				image {
					height: 120upx;
					width: 100%;
				}

				.zx-text {
					width: 100%;
				}
			}
		}
	}
</style>
