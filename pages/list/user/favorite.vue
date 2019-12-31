<template>
	<!-- 商品列表 -->
	<view>
		<view class="zx-list padding-left-sm padding-right-sm margin-bottom bg-white padding-top-sm">
			<list>
				<cell v-for="(item,index) of itemList" :key="index">
					<view class="flex padding-top padding-bottom solid-bottom">
						<image class="radius" src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg" @tap="jump2item(item,index)"></image>
						<view class="zx-detail flex-sub padding-left-sm" @tap="jump2item(item,index)">
							<view class="text-lg text-bold margin-top-xs">商品名字商品名字</view>
							<view class="margin-top-xs">描述描述描述描述描述描述描述...</view>
							<view class="text-gray margin-top-xs"><text>1983积分 +</text><text class="text-red margin-left-xs">￥238.00</text></view>
						</view>
						<view class="zx-delete cuIcon-delete text-red text-xl padding-right" @tap="cancelFavorite(item,index)"></view>
					</view>
				</cell>
			</list>
		</view>
		<!-- 主体-推荐 -->
		<view class="text-gray text-center margin-top-sm margin-bottom-sm">~ 为你推荐 ~</view>
		<itemList></itemList>
		<itemList></itemList>
		<view class="text-gray text-center padding">~ 我是有底线的 ~</view>
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
				itemList: [{}, {}, {}, {}, {}, {}]
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
			/* 单个编辑 */
			cancelFavorite(item, index) {
				let _this = this
				uni.showModal({
					title: '确认要取消收藏这款宝贝吗？',
					content: '高漫数位板触…',
					success: function(res) {
						if (res.confirm) {
							_this.itemList.splice(index, 1)
							uni.showToast({
								title: '操作成功',
								icon: 'none'
							});
						}
					}
				});
			},
			/* 页面跳转 */
			jump2item(item, index) {
				uni.navigateTo({
					url: '/pages/item/index'
				})
			},
		}
	}
</script>

<style lang="scss">
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
</style>
