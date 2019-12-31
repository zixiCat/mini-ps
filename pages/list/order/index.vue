<template>
	<view>
		<!-- 顶部栏目 -->
		<scroll-view scroll-x class="nav bg-white  text-center zx-tab">
			<view class="cu-item" :class="0==tabCur?'text-orange cur text-bold':''" @tap="tabSelect" data-id="0">
				全部
			</view>
			<view class="cu-item" :class="1==tabCur?'text-orange cur text-bold':''" @tap="tabSelect" data-id="1">
				待付款
			</view>
			<view class="cu-item" :class="2==tabCur?'text-orange cur text-bold':''" @tap="tabSelect" data-id="2">
				待收货
			</view>
			<view class="cu-item" :class="3==tabCur?'text-orange cur text-bold':''" @tap="tabSelect" data-id="3">
				已完成
			</view>
		</scroll-view>
		<!-- 主体 -->
		<view class="zx-body">
			<!-- 主体-商品列表 -->
			<list>
				<cell v-for="(item,index) of cartList" :key="index">
					<view v-if="tabCur==item.type||tabCur==0" class="zx-list margin-top-sm bg-white padding-sm-left padding-right-sm padding-bottom-sm">
						<!-- 主体-商品列表-店 -->
						<view class="flex padding-sm zx-title">
							<view class="text-lg padding-right-xs zx-line-height cuIcon-shop" @tap="selectPair(item,index)"></view>
							<view class="flex-sub text-lg text-bold" @tap="jump2shopsDetail">废喵公车维修店<text class="cuIcon-right text-lg"></text></view>
							<view class="cuIcon-delete text-lg" @tap="deleteOrder(item,index)"></view>
						</view>
						<!-- 主体-商品列表-商品内容 -->
						<view class="padding-bottom-sm solid-bottom" v-for="(item1,index1) of 1" :key="index1">
							<view class="flex zx-content padding-left-sm ">
								<image class="zx-item-img radius" src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg" mode="aspectFill"
								 @tap="jump2item">

								</image>
								<view class="flex-sub padding-left-sm">
									<view @tap="jump2item">描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述</view>
									<view class="text-lg text-red text-bold">￥999<text class="text-sm">.00</text></view>
								</view>
							</view>
						</view>
						<!-- 主体-操作栏目 -->
						<view class="justify-end flex padding-top-sm">
							<button v-if="item.type===2||item.type===3" class="cu-btn round line-black margin-left-sm">查看明细</button>
							<button v-if="item.type===2||item.type===3" class="cu-btn round line-orange margin-left-sm">再次购买</button>
							<button v-if="item.type===2" class="cu-btn round line-red margin-left-sm">确认收货</button>
							<button v-if="item.type===1" class="cu-btn round line-black">修改订单</button>
							<button v-if="item.type===1" class="cu-btn round line-red margin-left-sm">去支付</button>
						</view>
					</view>
				</cell>
			</list>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				/* 当前标签 */
				tabCur: 0,
				/* 列表 */
				cartList: [{
					type: 1
				}, {
					type: 3
				}, {
					type: 2
				}, {
					type: 1
				}, {
					type: 2
				}, {
					type: 1
				}, {
					type: 1
				}],
				/* 模糊框 */
				modalName: null,
			}
		},
		onReachBottom() {
			uni.showLoading({
				title: '加载中',
				mask: true
			})
			setTimeout(() => {
				uni.hideLoading()
			}, 1000);
		},
		onLoad(e) {
			this.tabCur = e.type
		},
		methods: {
			/* 标签选择 */
			tabSelect(e) {
				this.tabCur = e.currentTarget.dataset.id;
				this.swiperCur = this.tabCur

			},
			/* 批量编辑 */
			edit() {
				this.isEdit = !this.isEdit
			},
			buy() {
				uni.navigateTo({
					url: '/pages/cart/order-confirm'
				})
			},
			deleteItem() {

			},
			/* 单个编辑 */
			add(item, index) {
				item.test1 += 1
			},
			subtract(item, index) {
				if (item.test1 > 1) {
					item.test1 -= 1
				}
			},
			deleteOrder(item, index) {
				let _this = this
				uni.showModal({
					title: '确认删除此订单',
					content: '删除后将无法恢复',
					success: function(res) {
						if (res.confirm) {
							_this.cartList.splice(index, 1)
							uni.showToast({
								title: '操作成功',
								icon: 'none'
							});
						} else if (res.cancel) {
							
						}
					}
				});
			},
			/* 页面跳转 */
			jump2item() {
				uni.navigateTo({
					url: '/pages/item/index'
				})
			},
			jump2shopsDetail() {
				uni.navigateTo({
					url: '/pages/shops/detail'
				})
			}
		}
	}
</script>

<style lang="scss">
	.zx-tab {
		.cu-item {
			padding-left: 30upx;
			padding-right: 30upx;
		}
	}

	.zx-body {
		padding-bottom: 110upx;

		.zx-list {
			border-radius: 20upx;

			.zx-title {
				.zx-line-height {
					line-height: 45upx;
				}
			}

			.zx-content {
				.zx-line-height {
					line-height: 120upx;
				}

				.zx-item-img {
					width: 120upx;
					height: 120upx;
				}
			}
		}
	}
</style>
