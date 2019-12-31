<template>
	<view>
		<!-- 顶部栏目 -->
		<scroll-view scroll-x class="nav bg-white  text-center zx-tab">
			<view class="cu-item" :class="0==tabCur?'text-orange cur text-bold':''" @tap="tabSelect" data-id="0">
				待评价
			</view>
			<view class="cu-item" :class="1==tabCur?'text-orange cur text-bold':''" @tap="tabSelect" data-id="1">
				已评价
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
									<view class="flex padding-right-sm">
										<view v-if="item.type==0" class="flex-sub text-gray padding-top-xs">评完最多可获取 <text class="text-red padding-left-xs padding-right-xs">100</text>
											积分</view>
										<view v-if="item.type==1" class="flex-sub text-gray padding-top-xs">评分：<text class="text-yellow cuIcon-favorfill"></text>9.2
											分</text> </view>

										<button v-if="item.type==0" class="cu-btn round line-orange margin-left-sm">评价</button>
										<button v-if="item.type==1" class="cu-btn round line-black margin-left-sm">查看详情</button>
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
					type: 1
				}, {
					type: 1
				}, {
					type: 0
				}, {
					type: 0
				}, {
					type: 0
				}, {
					type: 1
				}, {
					type: 1
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
		onLoad(e) {
			this.tabCur = e.type
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
