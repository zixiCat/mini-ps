<template>
	<view>
		<!-- 顶部栏目 -->
		<scroll-view scroll-x class="nav bg-white  text-center zx-tab">
			<view class="cu-item" :class="0==tabCur?'text-orange cur text-bold':''" @tap="tabSelect" data-id="0">
				售后申请
			</view>
			<view class="cu-item" :class="1==tabCur?'text-orange cur text-bold':''" @tap="tabSelect" data-id="1">
				处理中
			</view>
			<view class="cu-item" :class="2==tabCur?'text-orange cur text-bold':''" @tap="tabSelect" data-id="2">
				申请记录
			</view>
		</scroll-view>
		<!-- 主体 -->
		<view class="zx-body">
			<!-- 主体-商品列表 -->
			<list>
				<cell v-for="(item,index) of cartList" :key="index">
					<view v-if="tabCur==item.type" class="zx-list margin-top-sm bg-white padding-left-sm padding-right-sm padding-bottom-sm">
						<!-- 主体-商品列表-商品内容 -->
						<view class="padding-bottom padding-top solid-bottom" v-for="(item1,index1) of 1" :key="index1">
							<view class="flex zx-content padding-left-sm ">
								<image class="zx-item-img radius" src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg" mode="aspectFill"
								 @tap="jump2item">

								</image>
								<view class="flex-sub padding-left-sm">
									<view @tap="jump2item">描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述</view>
									<view class="flex padding-right-sm justify-end">
										<button v-if="item.type==0" class="cu-btn round line-orange margin-left-sm">申请售后</button>
										<button v-if="item.type==1" class="cu-btn round line-black margin-left-sm">申请售后</button>
									</view>
								</view>
							</view>
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
					type: 0
				}, {
					type: 0
				}],
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
		onLoad() {
			uni.showModal({
				title: '该功能正在开发中',
				content: '敬请期待',
				showCancel:false,
				success: function(res) {
					if (res.confirm) {
							uni.navigateBack()
					}
				}
			});
		},
		methods: {
			/* 标签选择 */
			tabSelect(e) {
				this.tabCur = e.currentTarget.dataset.id;
				this.swiperCur = this.tabCur
			},
			/* 页面跳转 */
			jump2item() {
				uni.navigateTo({
					url: '/pages/item/index'
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

			.zx-content {

				.zx-item-img {
					width: 120upx;
					height: 120upx;
				}
			}
		}
	}
</style>
