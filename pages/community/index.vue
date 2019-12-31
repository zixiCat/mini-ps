<template>
	<view>
		<!-- 顶部栏目 -->
		<view class="zx-header">
			<!-- 顶部栏目-搜索 -->
			<view class="cu-bar bg-orange padding-right-sm radius">
				<view class="search-form round" style="background-color: #fff">
					<text class="cuIcon-search text-orange text-bold text-xl"></text>
					<input type="text" placeholder="搜索商品名等" @tap="jump2search" disabled />
				</view>
				<button class="cu-btn shadow-blur round bg-white">搜 索</button>
			</view>
			<!-- 顶部栏目-分类 -->
			<scroll-view scroll-x class="nav text-center bg-white shadow">
				<view class="cu-item" :class="tabCur===index?'text-orange cur':''" @tap="tabSelect" :data-id="index">
					最 热 门<text class="cuIcon-triangledownfill text-lg"></text>
				</view>
				<view class="cu-item" :class="tabCur===index?'text-orange cur':''" @tap="tabSelect" :data-id="index">
					最新发布
				</view>
				<view class="cu-item" :class="tabCur===index?'text-orange cur':''" @tap="tabSelect" :data-id="index">
					最新回复
				</view>
			</scroll-view>
		</view>
		<!-- 主体 -->
		<view class="zx-body bg-white margin-top-sm">
			<!-- 主体-内容列表 -->
			<list class="grid col-2 padding-bottom padding-left-sm padding-right-sm">
				<view v-for="(item,index) of cardList" :key="index" @tap="jump2communityDetail(item,index)">
					<view class="zx-card radius overflow-hidden">
						<image class="zx-card-img" :src="item.url"></image>
						<view class="padding-left-xs padding-right-xs">描述描述描述描述描述描述描述描述描述描...</view>
						<view class="flex padding-xs">
							<image class="zx-avatar round" src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg" mode="aspectFill"></image>
							<text class="flex-sub padding-left-xs zx-textcenter">名字</text>
							<text class="padding-right-sm cuIcon-appreciate zx-textcenter">11</text>
						</view>
					</view>
				</view>
			</list>
			<view class="text-center padding-bottom-sm">~ 我是有底线的 ~</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				/* 当前标签 */
				tabCur: 0,
				cardList: [{
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
			/* 标签选择 */
			tabSelect(e) {
				this.tabCur = e.currentTarget.dataset.id;
			},
			/* 页面跳转 */
			jump2search() {
				uni.navigateTo({
					url: '/pages/search/index'
				})
			},
			jump2communityDetail(item, index) {
				uni.navigateTo({
					url: '/pages/community/detail'
				})
			},
		}
	}
</script>

<style lang="scss">
	.zx-header {
		position: fixed;
		width: 100%;
		z-index: 1;
	}

	.zx-body {
		position: absolute;
		top: 180upx;
		right: 0;
		bottom: 0;
		left: 0;

		.zx-card {
			margin: 10upx 15upx;
			box-shadow: 0 2upx 25upx 2upx rgba(0, 0, 0, 0.2);

			.zx-card-img {
				height: 250upx;
			}

			.zx-avatar {
				width: 50upx;
				height: 50upx;
			}

			.zx-textcenter {
				line-height: 50upx;
			}
		}
	}
</style>
