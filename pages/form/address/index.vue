<template>
	<view class="zx-form">
		<view class="solid-bottom text-lg bg-white text-center">
			<view class="padding zx-detail">{{type==='update'?'编辑':'新增'}}地址</view>
		</view>
		<view>
			<view class="cu-form-group">
				<view class="title">收货人姓名</view>
				<input v-model.trim="username"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">手机号码</view>
				<input type="number" v-model.trim="phone"></input>
				<view class="cu-capsule radius">
					<view class='cu-tag bg-orange'>
						+86
					</view>
					<view class="cu-tag line-orange">
						中国大陆
					</view>
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">所在地区</view>
				<input v-model.trim="username"></input>
				<view class="cuIcon-right"></view>
			</view>
			<view class="cu-form-group">
				<view class="title">所在街道</view>
				<input v-model.trim="username"></input>
			</view>
			<view class="margin-top-sm bg-white padding-sm" @tap="setDefault">
				<view class="title text-l"><text class="text-l margin-right-xs" :class="turnon?'cuIcon-roundcheck text-red':'cuIcon-round'"></text>设为默认地址</view>
			</view>
			<!-- <view class="cu-form-group">
			<view class="title">验证码</view>
			<input name="input"></input>
			<button class='cu-btn bg-green shadow'>发送</button>
		</view> -->
		</view>
		<button class="text-orange cu-btn text-lg zx-btn radius bg-white margin-top-sm">保存</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				/* 表单类型 */
				type: '',
				form: {

				},
				turnon: ''
			}
		},
		onLoad(e) {
			this.type = e.type
		},
		methods: {
			setDefault() {
				this.turnon = !this.turnon
			}
		}
	}
</script>

<style lang="scss">
	.zx-form {
		.zx-btn {
			width: 96%;
			margin-left: 2%;
			border: 2upx solid #FF7800
		}
	}
</style>
