<template>
	<view class="zx-margin-bottom">
		<view>
			<!-- 商品列表 -->
			<view class="zx-list padding-left-sm padding-right-sm bg-white">
				<list>
					<view v-if="!historyList[0]" class="text-center padding-top">
						<view class="text-gray text-xl">空空如也</view>
						<button class="cu-btn shadow-blur bg-gradual-orange margin-top margin-bottom-xl" @tap="jump2home">去首页逛逛</button>
					</view>
					<cell v-for="(item,index) of historyList" :key="index">
						<view v-if="item.oneDayList[0]" class="text-l padding-left-xs padding-top">11月{{20+index}}日</view>
						<list>
							<cell v-for="(item1,index1) of item.oneDayList" :key="index1">
								<view class="flex padding-top padding-bottom solid-bottom">
									<image class="radius" src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg" @tap="jump2item(item,index,item1,index1)"></image>
									<view class="zx-detail flex-sub padding-left-sm" @tap="jump2item(item,index,item1,index1)">
										<view class="text-lg text-bold margin-top-xs">商品名字商品名字</view>
										<view class="margin-top-xs">描述描述描述描述描述描述描述...</view>
										<view class="text-gray margin-top-xs"><text>1983积分 +</text><text class="text-red margin-left-xs">￥238.00</text></view>
									</view>
									<view class="zx-delete cuIcon-delete text-red text-xl padding-right" @tap="clearHistory(item,index,item1,index1)"></view>
								</view>
							</cell>
						</list>
					</cell>
				</list>
			</view>
			<!-- 主体-推荐 -->
			<view class="text-gray text-center margin-top-sm margin-bottom-sm">~ 为你推荐 ~</view>
			<itemList></itemList>
			<itemList></itemList>
			<view class="text-gray text-center padding">~ 我是有底线的 ~</view>
		</view>
		<!-- 底部栏目 -->
		<view class="zx-foot bg-white flex text-center">
			<view class="flex-sub text-right zx-btn">
				<button class="margin-left-xs cu-btn round text-l line-red" @tap="clearAll">清空</button>
			</view>
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
				/* 轮播图 */
				swiperList: [{}, {}],
				/* 商家列表 */
				historyList: [{
						oneDayList: [{}, {}, {}]
					}, {
						oneDayList: [{}, {}, {}, {}, {}]
					},
					{
						oneDayList: [{}]
					}
				]
			}
		},
		// onReachBottom() {
		// 	uni.showLoading({
		// 		title: '加载中',
		// 		mask: true
		// 	})
		// 	setTimeout(function() {
		// 		uni.hideLoading()
		// 	}, 1000);
		// },
		onPullDownRefresh() {
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			/* 批量编辑 */
			clearAll() {
				let _this = this
				uni.showModal({
					title: '确认要清空足迹吗？',
					content: '清空后将无法恢复',
					success: res => {
						if (res.confirm) {
							_this.historyList = []
							uni.showToast({
								title: '操作成功',
								icon: 'none'
							});
							uni.pageScrollTo({
								scrollTop: 0,
							});
						}
					}
				});
			},
			/* 单个编辑 */
			clearHistory(item, index, item1, index1) {
				this.historyList[index].oneDayList.splice(index1, 1)
				uni.showToast({
					title: '删除成功',
					icon: 'none',
				});
			},
			/* 页面跳转 */
			jump2home() {
				uni.reLaunch({
					url: '/pages/index/index',
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
	.zx-margin-bottom {
		margin-bottom: 110upx;
	}

	.zx-list {
		image {
			width: 150upx;
			height: 150upx;
		}

		.zx-detail {}

		.zx-delete {
			line-height: 150upx;
		}
	}

	.zx-foot {
		position: fixed;
		bottom: 8upx;
		bottom: 8upx;
		left: 0upx;
		right: 0upx;
		z-index: 999;
		padding: 18upx 27upx 18upx 15upx;
		border-radius: 15upx;
		box-shadow: 0 10upx 20upx 10upx rgba($color: #000000, $alpha: .3);
	}
</style>
