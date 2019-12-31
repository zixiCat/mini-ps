<template>
	<view>
		<!-- 顶部栏目 -->
		<view class="flex radius bg-orange padding-top-sm padding-bottom-sm text-l zx-header">
			<view class="flex-sub text-center padding-left-xl cuIcon-cart text-bold">购物车</view>
			<view class="padding-right-sm zx-edit" @tap="edit">{{isEdit?'完成':'编辑'}}</view>
		</view>
		<!-- 主体 -->
		<view class="zx-body">
			<!-- 主体-商品列表 -->
			<list>
				<cell v-for="(item,index) of cartList" :key="index">
					<view class="zx-list margin-top-sm bg-white padding-left-sm padding-right-sm padding-bottom-sm">
						<!-- 主体-商品列表-店 -->
						<view class="flex padding-sm zx-title">
							<view class="text-lg padding-right-xs zx-line-height" :class="isSelectAll||item.test2?'text-orange cuIcon-roundcheckfill':'cuIcon-round'"
							 @tap="selectPair(item,index)"></view>
							<view class="flex-sub text-lg text-bold" @tap="jump2shopsDetail">废喵公车维修店<text class="cuIcon-right text-lg"></text></view>
						</view>
						<!-- 主体-商品列表-商品内容 -->
						<view class="padding-bottom-sm padding-top-sm solid-bottom" v-for="(item1,index1) of 1" :key="index1">
							<view class="flex zx-content">
								<view class="text-lg padding-left-sm padding-right-xs zx-line-height" :class="isSelectAll||item.test2||item.test3?'text-orange cuIcon-roundcheckfill':'cuIcon-round'"
								 @tap="selectOne(item,index)"></view>
								<image class="zx-item-img radius" src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg" mode="aspectFill"
								 @tap="jump2item">

								</image>
								<view class="flex-sub padding-left-sm">
									<view @tap="jump2item">描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述</view>
									<view class="text-lg text-red text-bold">￥999<text class="text-sm">.00</text></view>
								</view>
							</view>
							<view class="flex justify-end margin-top-xs zx-type">
								<view class="basis-ms radius solid border-color-gray margin-right padding-right-xs padding-left-xs" @tap="showModal"
								 data-target="SPmodal">
									<text class="padding-left-xs">红色,L</text>
									<text class="cuIcon-triangledownfill padding-left-sm"></text>
								</view>
								<view class="basis-ms flex margin-left  overflow-hidden solid">
									<view class="cuIcon-move text-center padding-right-xs padding-left-xs" :class="item.test1===1?'bg-gray':''"
									 @tap="subtract(item,index)"></view>
									<input class="bg-gray zx-num text-center" v-model="item.test1" />
									<view class="cuIcon-add  text-center padding-right-xs padding-left-xs" @tap="add(item,index)"></view>
								</view>
							</view>
						</view>
					</view>
				</cell>
			</list>
		</view>
		<!-- 底部栏目 -->
		<view class="zx-foot bg-white flex text-center">
			<view class="padding-left-sm zx-line-height">
				<view class="text-lg"><text class="text-sm  text-lg" :class="isSelectAll?'text-orange cuIcon-roundcheckfill':'cuIcon-round'"
					 @tap="selectAll"></text><text class=" padding-left-xs padding-right-xs" @tap="selectAll">全选</text>
					合计: <text class="text-red text-bold text-lg">￥199<text class="text-sm">.00</text></text></view>
			</view>
			<view class="flex-sub text-right zx-btn">
				<button v-show="!isEdit" class="margin-left-xs cu-btn round bg-gradual-orange text-l zx-sum" @tap="buy">结算(1)</button>
				<button v-show="isEdit" class="margin-left-xs cu-btn round text-l zx-delete bg-white text-red" @tap="deleteItem">删除</button>
			</view>
		</view>
		<!-- 规格模糊窗口 -->
		<view class="cu-modal bottom-modal zx-sp-modal" :class="modalName=='SPmodal'?'show':''" @tap="hideModal">
			<view class="cu-dialog padding-sm text-left" @tap.stop>
				<view class="bg-white zx-model-header flex padding-bottom solid-bottom">
					<image class="radius" src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg" mode="aspectFill"></image>
					<view class="flex-sub padding-left-sm">
						<view class="text-red text-xl">
							￥66.00
						</view>
						<view>
							库存1000件
						</view>
						<view>
							选择 颜色分类
						</view>
					</view>
					<view class="cuIcon-roundclose text-red text-xxl" @tap="hideModal"></view>
				</view>
				<!-- 规格模糊窗口-分类 -->
				<view class="padding-bottom-sm solid-bottom">
					<view class="margin-top-sm">颜色</view>
					<view class="grid col-5 text-sm text-center">
						<view v-for="(item,index) of 3" :key="index">
							<view class="round bg-gray margin-sm padding-top-xs padding-bottom-xs padding-left-sm padding-right-sm" :class="index===1?'bg-orange light':''">红色</view>
						</view>
					</view>
					<view class="margin-top-sm">尺寸</view>
					<view class="flex flex-wrap text-sm text-center">
						<view v-for="(item,index) of 6" :key="index">
							<view class="round bg-gray margin-sm padding-top-xs padding-bottom-xs padding-left-sm padding-right-sm" :class="index===0?'bg-orange light':''">XXXXL</view>
						</view>
					</view>
				</view>
				<!-- 规格模糊窗口-数量 -->
				<view class="flex margin-top-sm">
					<view class="margin-top-sm flex-sub">数量</view>
					<view class="cuIcon-move bg-gray padding-sm text-bold"></view>
					<view class="bg-gray padding-sm">1</view>
					<view class="cuIcon-add bg-gray padding-sm margin-right text-bold"></view>
				</view>
				<!-- 规格模糊窗口-确认 -->
				<view class="text-center">
					<button class="round cu-btn bg-orange shadow margin-top-sm zx-comfirm">确定</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				/* 批量编辑 */
				isEdit: false,
				isSelectAll: false,
				isSelectPair: false,
				/* 列表 */
				cartList: [{
						test1: 1,
						test2: false,
						test3: false
					}, {
						test1: 4,
						test2: false,
						test3: false
					}, {
						test1: 100,
						test2: false,
						test3: false
					},
					{
						test1: 4,
						test2: false,
						test3: false
					},
					{
						test1: 4,
						test2: false,
						test3: false
					},
				],
				/* 模糊窗口 */
				modalName: null,
				/* 测试 */
				test1: 1
			}
		},
		methods: {
			/* 批量编辑 */
			edit() {
				this.isEdit = !this.isEdit
			},
			selectAll() {
				this.isSelectAll = !this.isSelectAll
			},
			selectPair(item, index) {
				item.test2 = !item.test2
			},
			selectOne(item, index) {
				item.test3 = !item.test3
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
			/* 模糊窗口 */
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
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
	.zx-header {
		position: fixed;
		width: 100%;
		top:0;
		z-index: 3;

		.zx-edit {}
	}

	.zx-body {
		position: relative;
		top: 80upx;
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

			.zx-type {
				height: 50upx;
				line-height: 50upx;

				.zx-num {
					// padding: auto 13upx;
					width: 80upx;
					height: 100%;
				}
			}
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

		.zx-line-height {
			line-height: 60upx;
		}

		.zx-btn {
			.zx-sum {
				padding: 3upx 33upx;
			}

			.zx-delete {
				padding: 0 30upx;
				border: 2upx solid #ED0424;
			}
		}
	}

	.zx-sp-modal {
		.zx-model-header {
			image {
				width: 120upx;
				height: 120upx;
			}
		}

		.zx-comfirm {
			width: 100%;
		}
	}
</style>
