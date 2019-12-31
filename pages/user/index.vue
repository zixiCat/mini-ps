<template>
	<view>
		<!-- 头像栏目 -->
		<view class="bg-gradual-orange flex zx-header text-white padding-sm radius">
			<image class="round" src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg" mode="aspectFill"></image>
			<!-- 头像栏目-已登陆 -->
			<view v-if="0" class="flex-sub flex">
				<view class="flex-sub padding-left">
					<view class="margin-top-xs text-l text-bold">
						昵称ERUNA
					</view>
					<view>
						普通会员 ID：230
					</view>
					<view>
						<text class="cuIcon-evaluate margin-right-xs text-lg"></text>积分：2200
					</view>
				</view>
				<view class="text-center margin-top-xs">
					<view class="round zx-btn bg-white text-red margin-left-sm margin-bottom-sm" data-target="signModal" @tap="showModal">签到</view>
					<view class="round zx-btn bg-white text-red margin-left-sm" @tap="jump2credit">兑换</view>
				</view>
				<view class="margin-top-xs" @tap="jump2formUser"><text class="cuIcon-settingsfill text-xxl margin-left-sm"></text></view>
			</view>
			<!-- 头像栏目-未登陆 -->
			<view class="flex-sub padding-left flex zx-logout">
				<view class="flex-sub">完成授权后可查看个人信息</view>
				<view>
					<button class="cu-btn round padding-top-xs padding-bottom-xs padding-left-sm padding-right-sm bg-white text-red"
					 open-type="getUserInfo" @getuserinfo="getUserInfo">一键授权</button>
				</view>
			</view>
		</view>
		<!-- 订单栏目 -->
		<view class="zx-body margin-sm">
			<view class="bg-white margin-top-sm radius shadow shadow-blur">
				<view class="flex padding-sm solid-bottom">
					<view class="flex-sub">我的订单</view>
					<view @tap="jump2listOrder('0')">查看更多订单<text class="cuIcon-right"></text></view>
				</view>
				<view class="grid col-5 text-center padding-left-sm padding-right-sm  padding-bottom padding-top-sm">
					<view @tap="jump2listOrder('1')">
						<view><text class="cuIcon-pay text-xxxl text-orange"></text></view>
						<view>待付款</view>
					</view>
					<view @tap="jump2listOrder('2')">
						<view><text class="cuIcon-present text-xxxl text-orange"></text></view>
						<view>待收货</view>
					</view>
					<view @tap="jump2listOrder('3')">
						<view><text class="cuIcon-refund text-xxxl text-orange"></text></view>
						<view>已完成</view>
					</view>
					<view @tap="jump2listOrderComment">
						<view><text class="cuIcon-comment text-xxxl text-orange"></text></view>
						<view>待评价</view>
					</view>
					<view @tap="jump2listOrderService">
						<view><text class="cuIcon-roundcheck text-xxxl text-orange"></text></view>
						<view>售后</view>
					</view>
				</view>
			</view>
			<!-- 功能列表 -->
			<view class="bg-white margin-top-sm radius shadow margin-bottom shadow-blur">
				<view class="flex padding solid-bottom" @tap="jump2ContentRichText">
					<veiw class="flex-sub">
						<text class="margin-right-xs text-lg cuIcon-choiceness"></text>
						会员等级</veiw>
					<veiw class="cuIcon-right"></veiw>
				</view>
				<view class="flex padding solid-bottom" @tap="jump2ContentRichText">
					<veiw class="flex-sub">
						<text class="margin-right-xs text-lg cuIcon-qrcode"></text>
						生成推荐二维码</veiw>
					<veiw class="cuIcon-right"></veiw>
				</view>
				<view class="flex padding solid-bottom" @tap="jump2listUserHistory">
					<veiw class="flex-sub">
						<text class="margin-right-xs text-lg cuIcon-footprint"></text>
						我的足迹</veiw>
					<veiw class="cuIcon-right"></veiw>
				</view>
				<view class="flex padding solid-bottom" @tap="jump2listUserFavorite">
					<veiw class="flex-sub">
						<text class="margin-right-xs text-lg cuIcon-favor"></text>
						我的收藏</veiw>
					<veiw class="cuIcon-right"></veiw>
				</view>
				<view class="flex padding solid-bottom" @tap="jump2listUserSubcribe">
					<veiw class="flex-sub">
						<text class="margin-right-xs text-lg cuIcon-friend"></text>
						我的关注</veiw>
					<veiw class="cuIcon-right"></veiw>
				</view>
				<view class="flex padding solid-bottom" @tap="jump2formAddress">
					<veiw class="flex-sub">
						<text class="margin-right-xs text-lg cuIcon-location"></text>
						收货地址</veiw>
					<veiw class="cuIcon-right"></veiw>
				</view>
				<view class="flex padding solid-bottom" @tap="jump2ContentRichText">
					<veiw class="flex-sub">
						<text class="margin-right-xs text-lg cuIcon-info"></text>
						关于我们</veiw>
					<veiw class="cuIcon-right"></veiw>
				</view>
				<view class="flex padding" @tap="jump2ContentRichText">
					<veiw class="flex-sub">
						<text class="margin-right-xs text-lg cuIcon-service"></text>
						帮助与反馈</veiw>
					<veiw class="cuIcon-right"></veiw>
				</view>
			</view>
		</view>
		<!-- 签名模糊窗口 -->
		<view class="cu-modal bottom-modal text-center" :class="modalName=='signModal'?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop>
				<sign></sign>
			</view>
		</view>
	</view>
</template>

<script>
	import sign from 'pages/user/sign'
	export default {
		components: {
			sign
		},
		data() {
			return {
				/* 模糊窗口 */
				modalName: null
			}
		},
		onPullDownRefresh() {
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			/* 用户授权 */
			getUserInfo() {
				uni.login({
					provider: 'weixin',
					success: data => {
						console.log(data.code);
						// 获取用户信息
						uni.getUserInfo({
							provider: 'weixin',
							success: data1 => {
								console.log(data1.userInfo);
							}
						})
					}
				})
			},
			/* 模糊窗口 */
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
				setTimeout(() => {
					uni.showToast({
						title: '签到成功',
					});
				}, 300);
			},
			hideModal(e) {
				this.modalName = null
			},
			/* 页面跳转 */
			jump2formUser() {
				uni.navigateTo({
					url: '/pages/form/user/index'
				})
			},
			jump2formAddress() {
				uni.navigateTo({
					url: '/pages/list/address/index'
				})
			},
			jump2credit() {
				uni.navigateTo({
					url: '/pages/credit/index'
				})
			},
			jump2listOrder(e) {
				uni.navigateTo({
					url: '/pages/list/order/index?type=' + e
				})
			},
			jump2listOrderComment() {
				uni.navigateTo({
					url: '/pages/list/order/comment'
				})
			},
			jump2listOrderService() {
				uni.navigateTo({
					url: '/pages/list/order/service'
				})
			},
			jump2listUserFavorite() {
				uni.navigateTo({
					url: '/pages/list/user/favorite'
				})
			},
			jump2listUserHistory() {
				uni.navigateTo({
					url: '/pages/list/user/history'
				})
			},
			jump2listUserSubcribe() {
				uni.navigateTo({
					url: '/pages/list/user/subcribe'
				})
			},
			jump2ContentRichText() {
				uni.navigateTo({
					url: '/pages/content/rich-text/index'
				})
			},
		}
	}
</script>

<style lang="scss">
	.zx-header {
		image {
			height: 138upx;
			width: 138upx;
			border: 6upx solid #F8F8F8;
		}

		.zx-btn {
			padding: 8upx 40upx;
		}

		.zx-logout {
			line-height: 138rpx
		}
	}
</style>
