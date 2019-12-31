<template>
	<view>
		<!-- 签到-顶部 -->
		<view class="flex padding-sm solid-bottom ">
			<view class="cuIcon-back" :class="activeMonth===1?'text-gray':''" @tap="selectMonth(-1)">上一月</view>
			<view class="text-bold text-lg flex-sub zx-title">{{activeMonth}}月</view>
			<view class="cuIcon-info text-blue text" @tap="jump2ContentRichText">规则</view>
			<view class="padding-left-sm" :class="activeMonth===curMonth?'text-gray':''" @tap="selectMonth(1)">下一月</view>
		</view>
		<!-- 签到-信息 -->
		<view class="solid-bottom padding-sm">
			<view class="text-lg"><text class="cuIcon-squarecheckfill text-xxl text-green zx-sign-icon1 padding-right-xs"></text>签到成功！</view>
			<view class="margin-top-sm text-xl text-bold">+ 5积分</view>
			<view class="margin-top-sm">本月累计领取50积分</view>
		</view>
		<!-- 签到-星期 -->
		<view class="flex padding-bottom-sm margin-top-sm solid-bottom text-sm shadow shadow-blur">
			<view class="basis-1-4">星期日</view>
			<view class="basis-1-4">星期一</view>
			<view class="basis-1-4">星期二</view>
			<view class="basis-1-4">星期三</view>
			<view class="basis-1-4">星期四</view>
			<view class="basis-1-4">星期五</view>
			<view class="basis-1-4">星期六</view>
		</view>
		<!-- 签到-日历牌 -->
		<view class="flex flex-wrap text-center solid-bottom bg-gray zx-calendar" :class="slideAnime">
			<view class="basis-1-4 solid" :class="dateList[index]===''?'zx-bg':''" v-for="(item,index) of dateList"
			 :key="index">
				<view class="zx-date" :class="index===10||index===11||index===12||index===13||index===14||index===20||index===8?'bg-white':''">
					<view v-if="index===10||index===11||index===12||index===13||index===14||index===20||index===8" class="zx-sign-icon2 cuIcon-check text-green text-xxl text-bold"></view>
					<view v-if="index!==20&&index!==12&&index!==15&&index!==24" class="text-center">
						<view class="padding-top">{{dateList[index]}}</view>
					</view>
					<view v-if="index===12">
						<view class="cuIcon-recharge padding-top-xs text-yellow text-xxl"></view>
						<view class="text-sm text-yellow">积分+5</view>
					</view>
					<view v-if="index===15">
						<view class="cuIcon-moneybagfill padding-top-xs text-orange text-xxl"></view>
						<view class="text-sm text-orange">连签7日</view>
					</view>
					<view v-if="index===20">
						<view class="cuIcon-presentfill padding-top-xs text-red text-xxl"></view>
						<view class="text-xs text-pink">神秘礼包</view>
					</view>
					<view v-if="index===24">
						<view class="cuIcon-presentfill padding-top-xs text-red text-xxl"></view>
						<view class="text-xs text-pink">神秘礼包</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				/* 选择动画 */
				slideAnime: '',
				/* 日历 */
				curMonth: '',
				activeMonth: '',
				dateList: []
			}
		},
		onReady() {
			/* 日历数据 */
			let d = new Date()
			this.curMonth = d.getMonth() + 1
			this.activeMonth = d.getMonth() + 1
			this.getCalendarData()
		},
		methods: {
			/* 日历数据 */
			getCalendarData() {
				let d = new Date()
				let MonthFirstWeek = new Date(d.getFullYear(), this.activeMonth - 1, 1).getDay(); //周日为0
				let activeMonthDays = new Date(d.getFullYear(), this.activeMonth, 0).getDate();
				for (let i = 0; i < MonthFirstWeek; i++) {
					this.dateList.push('')
				}
				for (let i = 0; i < activeMonthDays; i++) {
					this.dateList.push(i + 1)
				}
				for (let i = 0; i < (42 - activeMonthDays - MonthFirstWeek); i++) {
					this.dateList.push('')
				}
			},
			/* 日历控制 */
			selectMonth(e) {
				/* 延时操作 */
				if (this.delayFn()) return
				/* 日历效果 */
				if ((e < 0 && this.activeMonth === 1) || (e > 0 && this.activeMonth === this.curMonth)) return
				e > 0 ? this.slideAnime = 'slide-left' : this.slideAnime = 'slide-right'
				setTimeout(() => {
					this.slideAnime = ''
				}, 500);
				this.activeMonth = this.activeMonth + e
				this.dateList = []
				this.getCalendarData()
			},
			/* 页面跳转 */
			jump2ContentRichText() {
				uni.navigateTo({
					url: '/pages/content/rich-text/index'
				})
			}
		}
	}
</script>

<style lang="scss">
	.zx-title {
		padding-left: 80upx;
	}

	.zx-calendar {
		.zx-bg {
			background-color: #FFEDEF;
		}

		.zx-date {
			width: 100%;
			height: 100upx;

			.zx-sign-icon2 {
				position: absolute;
				top: 0upx;
				right: 0;
				bottom: 0;
				left: 0;
				padding-top: 30upx;
				z-index: 100;
				// background-color: rgba(255, 255, 255, .5)
			}
		}
	}


	/* 动画效果 */
	.slide-left {
		animation: slide-left .5s forwards;
	}

	.slide-right {
		animation: slide-right .5s forwards;
	}

	@keyframes slide-left {
		0% {
			opacity: 1;
			transform: translateX(0);
		}

		50% {
			opacity: 0;
			transform: translateX(-70%);
		}

		51% {
			opacity: 0;
			transform: translateX(0);
		}

		52% {
			opacity: .15;
			transform: translateX(0);
		}

		100% {
			opacity: 1;
			transform: translateX(0);
		}
	}

	@keyframes slide-right {
		0% {
			opacity: 1;
			transform: translateX(0);
		}

		50% {
			opacity: 0;
			transform: translateX(70%);
		}

		51% {
			opacity: 0;
			transform: translateX(0);
		}

		52% {
			opacity: .15;
			transform: translateX(0);
		}

		100% {
			opacity: 1;
			transform: translateX(0);
		}
	}
</style>
