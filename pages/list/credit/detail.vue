<template>
	<view>
		<view class="padding-left-sm padding-right-sm bg-white">
			<view class="flex padding-bottom padding-top solid-bottom">
				<view class="flex-sub text-l">总积分</view>
				<view>270</view>
			</view>
			<list>
				<cell v-for="(item,index) of 30" :key="index">
					<view class="flex padding-top-sm padding-bottom-sm solid-bottom">
						<view class="flex-sub">
							<view>
								分享到朋友圈
							</view>
							<view class="margin-top-xs text-sm text-gray">
								2019-11-11 23:23
							</view>
						</view>
						<view>+ 9</view>
					</view>
				</cell>
			</list>
		</view>
		<view class="margin-sm text-gray text-center">~ 我也是有底线的 ~</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onLoad(){
			
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
		methods: {

		}
	}
</script>

<style lang="scss">

</style>
