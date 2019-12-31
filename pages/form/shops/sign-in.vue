<template>
	<view class="zx-form">
		<view>
			<view class="cu-form-group">
				<view class="title"><text class="text-red zx-transition">*</text>商户名称</view>
				<input v-model.trim="username"></input>
			</view>
			<view class="cu-form-group">
				<view class="title"><text class="text-red zx-transition">*</text>主营项目</view>
				<input v-model.trim="username"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">简介</view>
				<input v-model.trim="username"></input>
			</view>
			<view class="cu-form-group">
				<view class="title"><text class="text-red zx-transition">*</text>联系人</view>
				<input v-model.trim="username"></input>
			</view>
			<view class="cu-form-group">
				<view class="title"><text class="text-red zx-transition">*</text>手机号码</view>
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
				<view class="title"><text class="text-red zx-transition">*</text>注册账号</view>
				<input v-model.trim="username"></input>
			</view>
			<view class="cu-form-group">
				<view class="title"><text class="text-red zx-transition">*</text>密码</view>
				<input v-model.trim="username"></input>
			</view>
			<view class="cu-form-group">
				<view class="title"><text class="text-red zx-transition">*</text>确认密码</view>
				<input v-model.trim="username"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">业务员姓名</view>
				<input v-model.trim="username"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">业务员电话</view>
				<input v-model.trim="username"></input>
			</view>
		</view>
		<button class="cu-btn text-lg zx-btn radius bg-gradual-orange margin-top-sm">提交申请</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {

				},
				turnon: ''
			}
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
		.zx-transition{
			display: inline-block;
			transform: translate(-7upx,7upx);
		}
	}
</style>
