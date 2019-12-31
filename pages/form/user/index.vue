<template>
	<view class="zx-form">
		<view>
			<view class="cu-form-group padding-top-sm padding-bottom-sm" data-target="uploadModal" @tap="showModal">
				<view class="title flex-sub"><text class="text-red"></text>头像</view>
				<image class="round" src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg" mode="aspectFill"></image>
				<view class="cuIcon-right padding-left-sm text-lg"></view>
			</view>
			<view class="cu-form-group">
				<view class="title"><text class="text-red"></text>昵称</view>
				<input class="text-right" v-model.trim="form.userName"></input>
				<view class="cuIcon-right"></view>
			</view>
			<view class="cu-form-group">
				<view class="title">用户ID</view>
				<input class="text-right" v-model.trim="userId" disabled>22341</input>
				<view class="padding-left-xl text-lg"></view>
			</view>
		</view>
		<button class="cu-btn text-lg zx-btn radius bg-gradual-orange margin-top-sm">更新资料</button>
		<!-- 上传图片模糊窗口 -->
		<view class="cu-modal bottom-modal text-center text-xl" :class="modalName=='uploadModal'?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop>
				<view class="padding-sm solid-bottom" @tap="takePhoteUpload">拍照上传</view>
				<view class="padding-sm solid-bottom" @tap="localUpload">本地上传</view>
				<view class="padding-sm" @tap="hideModal">取消</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					userName: '一宫绘留奈'
				},
				turnon: '',
				/* 模糊窗口 */
				modalName: null
			}
		},
		methods: {
			/* 图片上传 */
			takePhoteUpload() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'],
					sourceType: ['camera'],
					success: function(res) {
						console.log(JSON.stringify(res.tempFilePaths));
					}
				});
			},
			localUpload() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						console.log(JSON.stringify(res.tempFilePaths));
					}
				});
			},
			/* 模糊窗口 */
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			setDefault() {
				this.turnon = !this.turnon
			}
		}
	}
</script>

<style lang="scss">
	.zx-form {
		image {
			width: 110upx;
			height: 110upx;
		}

		.zx-btn {
			width: 96%;
			margin-left: 2%;
			border: 2upx solid #FF7800
		}

	}
</style>
