<template>
	<view>
		<!-- 顶部栏目 -->
		<scroll-view scroll-x class="nav text-center text-bold bg-white zx-header shadow shadow-blur">
			<view class="cu-item" :class="0===tabCur?'text-orange cur text-lg':''" @tap="tabSelect" data-id="0">
				商品
			</view>
			<view class="cu-item" :class="1===tabCur?'text-orange cur text-lg':''" @tap="tabSelect" data-id="1">
				评价
			</view>
			<view class="cu-item" :class="2===tabCur?'text-orange cur text-lg':''" @tap="tabSelect" data-id="2">
				详情
			</view>
			<view class="cu-item" :class="3===tabCur?'text-orange cur text-lg':''" @tap="tabSelect" data-id="3">
				推荐
			</view>

		</scroll-view>
		<!-- 主体 -->
		<view class="zx-body">
			<swiper class="zx-swiper" :indicator-dots="true" indicator-color="#ffffff" :circular="true" indicator-active-color="#f97502">
				<swiper-item class="bg-gray" v-for="(item,index) in swiperList" :key="index">
					<image :src="item.url" mode="aspectFill" @click="previewImage(swiperList,index)"></image>
				</swiper-item>
			</swiper>
			<!-- 主体-商品 -->
			<view class="padding-xs bg-white zx-desc">
				<view class="zx-safe bg-red padding-xm text-center text-sm margin-right-xs">正品保证</view>
				<view class="zx-title line-height">描述描述描述描述描述描描述描述描述描述描述描述描描述描述描述描述描述...</view>
				<view>
					<text class="text-red text-xxl">￥999</text><text class="text-red">.00
						<text class="text-pink text-l padding-left-xs">+ 100积分</text></text>
					<text class="text-through margin-left text-gray">原价100.00</text>
				</view>
				<view class="flex margin-top-xs padding-xs">
					<view>
						<text class="cuIcon-favorfill text-yellow"></text>
						<text class="padding-left-xs">9.5分</text>
					</view>
					<view class="flex-sub text-center">销量999</view>
					<view>库存1008</view>
				</view>
			</view>
			<!-- 主体-规格参数 -->
			<view class="margin-top-sm bg-white">
				<view class="flex padding-sm" @tap="showModal" data-target="SPmodal">
					<view class="text-gray">
						规格
					</view>
					<view class="flex-sub padding-left">
						选择 尺寸，颜色
					</view>
					<view>
						<text class="cuIcon-right text-gray text-lg"></text>
					</view>
				</view>
				<view class="flex padding-sm" @tap="showModal" data-target="paramModal">
					<view class="text-gray">
						参数
					</view>
					<view class="flex-sub padding-left">
						品牌 类型
					</view>
					<view>
						<text class="cuIcon-right text-gray text-lg"></text>
					</view>
				</view>
			</view>
			<!-- 主体-评价 -->
			<view id="zx-tab1" class="margin-top-sm bg-white padding-sm zx-comment">
				<view class="flex">
					<view class="flex-sub text-l text-bold">
						宝贝评价（10）
					</view>
					<view @tap="jump2commentDetail">
						<text class="text-orange text-l">查看全部</text>
						<text class="cuIcon-right text-orange text-lg"></text>
					</view>
				</view>
				<view class="flex margin-top">
					<image class="zx-avatar round" src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg"></image>
					<view class="flex-sub text-gray padding-left-sm">
						<view><text class="text-pink">一宫绘留奈</text><text class="text-orange text-lg cuIcon-crown"></text></view>
						<view>2019-03-29</view>
					</view>
					<view>
						<text class="cuIcon-favorfill text-yellow"></text>
						<text class="cuIcon-favorfill text-yellow"></text>
						<text class="cuIcon-favorfill text-yellow"></text>
						<text class="cuIcon-favor text-gray"></text>
						<text class="cuIcon-favor text-gray"></text>
					</view>
				</view>
				<view class="margin-top-sm line-height-xs">评价评价评价评价评价评价评价评价评价评价评价评价评价评价评价评价评价评价评价评价评价</view>
			</view>
			<!-- 主体-详情 -->
			<view id="zx-tab2" class="text-gray text-center solid-top margin-top-sm padding bg-white">~ 宝贝详情 ~</view>
			<view class="zx-detail">
				<list>
					<cell v-for="(item,index) of imgList" :key="index" @tap="previewImage(imgList,index)">
						<image :src="item.url" mode="widthFix"></image>
					</cell>
				</list>
			</view>
			<!-- 主体-推荐 -->
			<view id="zx-tab3" class="text-gray text-center margin-top-sm margin-bottom-sm">~ 为你推荐 ~</view>
			<itemList></itemList>
			<view class="text-gray text-center padding">~ 我是有底线的 ~</view>
		</view>
		<!-- 底部栏目 -->
		<view class="zx-foot bg-white flex text-center">
			<view class="padding-left-sm" @tap="jump2shopDetail">
				<view class="text-orange cuIcon-shop text-xxll"></view>
				<view class="text-sm">店铺</view>
			</view>
			<view class="padding-left">
				<view class="text-cyan cuIcon-share text-xxll"></view>
				<view class="text-sm">分享</view>
			</view>
			<view class="padding-left">
				<view class="text-pink cuIcon-like text-xxll"></view>
				<view class="text-sm">收藏</view>
			</view>
			<view class="flex-sub text-right zx-btn">
				<button class="zx-cart cu-btn round bg-gradual-orange text-lg" @tap="showModal" data-target="SPmodal">加入购物车</button>
				<button class="margin-left-xs cu-btn round bg-gradual-red text-lg" @tap="buy">立即购买</button>
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
					<button class="round cu-btn bg-orange shadow margin-top-sm zx-comfirm" @tap="hideModal">确定</button>
				</view>
			</view>
		</view>
		<!-- 参数模糊窗口 -->
		<view class="cu-modal bottom-modal zx-param-modal" :class="modalName=='paramModal'?'show':''" @tap="hideModal">
			<view class="cu-dialog padding-sm " @tap.stop>
				<view class="zx-title padding text-center">产品参数</view>
				<view class="cuIcon-roundclose text-red text-xxl zx-btn" @tap="hideModal"></view>
				<view class="flex solid-bottom padding-sm text-left" v-for="(item,index) of 4" :key="index">
					<view class="basis-xs padding-right">品牌</view>
					<view class="basis-xl text-gray">洛洛洛洛洛洛洛</view>
				</view>
				<view class="text-center">
					<button class="round cu-btn bg-orange shadow margin-top-sm zx-comfirm" @tap="hideModal">确定</button>
				</view>
			</view>
		</view>
		<!-- 海报模糊窗口 -->
		<view class="cu-modal bottom-modal zx-param-modal" :class="modalName=='posterModal'?'show':''" @tap="hideModal">
			<view class="cu-dialog padding-sm " @tap.stop>
			</view>
		</view>
		<!-- 购物车 -->
		<cart></cart>
	</view>
</template>

<script>
	import poster from "util/poster/index.vue"
	import itemList from "component/item-list.vue"
	import cart from "pages/cart/icon-link.vue"
	export default {
		components: {
			itemList,
			cart
		},
		data() {
			return {
				/* 标签 */
				tabCur: 0,
				tabTop: [0],
				/* 轮播图 */
				swiperList: [{
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg'
					},
					{
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
					}, {
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
					}
				],
				imgList: [{
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
				}, {
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg'
				}, {
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
				}],
				/* 模糊窗口 */
				modalName: null,
			}
		},
		onPullDownRefresh() {
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onPageScroll(e) {
			let a = e.scrollTop + 150
			if (a < this.tabTop[1]) {
				this.tabCur = 0
				return
			}
			if (a > this.tabTop[1] && a < this.tabTop[2]) {
				this.tabCur = 1
				return
			}
			if (a > this.tabTop[2] && a < this.tabTop[3]) {
				this.tabCur = 2
				return
			}
			if (a+200 > this.tabTop[3]) {
				this.tabCur = 3
				return
			}
		},
		onReady() {
			for (let i = 1; i < 4; i++) {
				uni.createSelectorQuery().in(this).select('#zx-tab' + i).boundingClientRect(data => {
					this.tabTop.push(data.top)
				}).exec();
			}
		},
		methods: {
			/* 标签 */
			tabSelect(e) {
				this.tabCur = e.currentTarget.dataset.id * 1;
				console.log(this.tabTop[this.tabCur])
				uni.pageScrollTo({
					scrollTop: this.tabTop[this.tabCur] - 45
				})
			},
			/* 模糊窗口 */
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			/* 购买 */
			buy() {
				uni.navigateTo({
					url: '/pages/cart/index'
				})
			},
			/* 辅助功能 */
			previewImage(srcArray, index) {
				let imgArray = srcArray.map(e => e.url)
				uni.previewImage({
					current: index,
					urls: imgArray,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			},
			/* 页面跳转 */
			jump2commentDetail() {
				uni.navigateTo({
					url: '/pages/item/comment'
				})
			},
			jump2shopDetail() {
				uni.navigateTo({
					url: '/pages/shops/detail'
				})
			},
		}
	}
</script>

<style lang="scss">
	.zx-header {
		position: fixed;
		top: 0;
		z-index: 3;
	}

	.zx-body {
		position: relative;
		top: 90upx;
		padding-bottom: 110upx;

		.zx-swiper {
			height: 750upx;

			image {
				width: 100%;
				height: 750upx;
			}
		}

		.zx-desc {
			.zx-safe {
				float: left;
				display: inline-block;
				padding: 2upx 10upx;
				border-radius: 6upx;
			}

			.zx-title {
				font-size: 30upx;
				letter-spacing: 1upx;
			}
		}

		.zx-comment {
			.zx-avatar {
				width: 70upx;
				height: 70upx;
			}
		}

		.zx-detail {
			image {
				display: block;
				width: 100%;
			}
		}
	}

	.zx-foot {
		position: fixed;
		bottom: 8upx;
		left: 0upx;
		right: 0upx;
		padding: 8upx 20upx 8upx 15upx;
		border-radius: 15upx;
		box-shadow: 0 10upx 20upx 10upx rgba($color: #000000, $alpha: .3);

		.zx-btn {
			margin-top: 13upx;

			.zx-cart {
				padding: 0 20upx;
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

	.zx-param-modal {
		.zx-title {
			display: inline-block;
		}

		.zx-btn {
			float: right;
		}

		.zx-comfirm {
			width: 100%;
		}
	}
</style>
