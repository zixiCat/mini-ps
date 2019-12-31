<template>
	<view>
		<view class="bg-white">
			<view class="zx-shops flex padding solid-bottom" v-for="(item,index) of shopsList" :key="index">
				<image class="radius" src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg" @tap="jump2shopsDetail(item,index)"></image>
				<view class="zx-detail padding-left-sm flex-sub">
					<view class="flex zx-title margin-top-xs" @tap="jump2shopsDetail(item,index)">
						<view class="flex-sub text-l text-bold">商店名商店名商店名</view>
					</view>
					<view class="margin-top-xs flex">
						<view class="flex-sub" @tap="jump2shopsDetail(item,index)">描述描述描述描述描述描述描述...</view>
						<view class="zx-delete cuIcon-delete text-red text-xl padding-right-xs" @tap="unsubcribe(item,index)"></view>
					</view>
					<view class="margin-top-xs">
						<text class="cuIcon-favorfill text-yellow"></text>
						<text class="padding-left-xs text-gray">9.5分</text>
					</view>
				</view>
			</view>
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
				/* 商家列表 */
				shopsList: [{}, {}, {}, {}, {}]
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
			unsubcribe(item, index) {
				let _this = this
				uni.showModal({
					title: '确认要取消关注这家店铺吗？',
					content: '店铺名',
					success: function(res) {
						if (res.confirm) {
							_this.shopsList.splice(index, 1)
							uni.showToast({
								title: '操作成功',
								icon: 'none'
							});
						}
					}
				});
			},
			/* 页面跳转 */
			jump2shopsDetail(item, index) {
				uni.navigateTo({
					url: '/pages/shops/detail'
				})
			},
		}
	}
</script>

<style lang="scss">
	.zx-shops {
		image {
			width: 150upx;
			height: 150upx;
		}
	}
</style>
