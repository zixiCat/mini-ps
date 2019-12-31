<template>
	<view>
		<view class="zx-config" :class="isShow?'zx-slide-in':'zx-slide-out'">
			<view class="zx-unfold" @tap="unfold">||</view>
			<view class="zx-title">
				<view>
					<button class="zx-btn" :class="config.editType=='font'?'zx-select':''">A</button>
					<button class="zx-btn" :class="config.editType=='img'?'zx-select':''">图</button>
					<button class="zx-btn" :class="config.editType=='sign'?'zx-select':''">画</button>
				</view>
				<view>
					<button v-if="config.editType!=='img'" class="zx-btn" :style="{backgroundColor: curColor}"></button>
					<button class="zx-btn" @tap="info">!</button>
					<button class="zx-btn" @tap="close">X</button>
				</view>
			</view>
			<view v-if="!config.editType" class="zx-body">
				<view class="zx-tips">
					请选择/插入文字或图片
				</view>
			</view>
			<!-- 			<view v-if="config.editType=='font'" class="zx-body">
				<view>
					<view class="zx-range">
						<view class="zx-label">字体大小</view>
						<button class="zx-range-btn" @tap="handleFontSize(-1)">-</button><input type="number" v-model.trim="config.font.size" /><button
						 class="zx-range-btn" @tap="handleFontSize(1)">+</button>
					</view>
					<view class="zx-range">
						<view class="zx-label">行间距</view>
						<button class="zx-range-btn" @tap="handleLineHeight(-1)">-</button><input type="number" v-model.trim="config.font.lineHeight" /><button
						 class="zx-range-btn" @tap="handleLineHeight(1)">+</button>
					</view>
				</view>
				<view class="zx-operate">
					<button class="zx-btn" @tap="handleBtn3('centerH')">居中</button>
					<button class="zx-btn" :class="config.font.weight?'zx-select':''" @tap="handleWeight">加粗</button>
					<button class="zx-btn" :class="config.font.lineThrough?'zx-select':''" @tap="handleLineThrough">贯穿</button>
					<button class="zx-btn" @tap="handleBtn1">颜色</button>
				</view>
			</view> -->
			<view v-if="config.editType" class="zx-body">
				<view>
					<view class="zx-range">
						<view class="zx-label">{{btnType[config.editType].range1}}</view>
						<button class="zx-range-btn" @longpress='longpressRange1(-1)' @touchcancel="touchendRange1" @touchend="touchendRange1"
						 @tap="tapRange1(-1)">-</button>
						<input v-if="config.editType==='font'" type="number" v-model.trim="config.font.size" />
						<input v-if="config.editType==='img'" type="number" v-model.trim="config.img.r" />
						<button class="zx-range-btn" @longpress='longpressRange1(1)' @touchcancel="touchendRange1" @touchend="touchendRange1"
						 @tap="tapRange1(1)">+</button>
					</view>
					<view class="zx-range">
						<view class="zx-label">{{btnType[config.editType].range2}}</view>
						<button class="zx-range-btn" @longpress='longpressRange2(-1)' @touchcancel="touchendRange2" @touchend="touchendRange2"
						 @tap="tapRange2(-1)">-</button>
						<input v-if="config.editType==='font'" type="number" v-model.trim="config.font.lineHeight" />
						<input v-if="config.editType==='img'" type="number" v-model.trim="config.img.degrees" />
						<button class="zx-range-btn" @longpress='longpressRange2(1)' @touchcancel="touchendRange2" @touchend="touchendRange2"
						 @tap="tapRange2(1)">+</button>
					</view>
				</view>
				<view class="zx-operate">
					<button class="zx-btn" @tap="tapBtn1('centerH')">{{btnType[config.editType].btn1}}</button>
					<button class="zx-btn" :class="config.font.weight?'zx-select':''" @tap="tapBtn2('fullScreen')">{{btnType[config.editType].btn2}}</button>
					<button class="zx-btn" @tap="tapBtn3('set2top')">{{btnType[config.editType].btn3}}</button>
					<button class="zx-btn" :class="config.font.lineThrough?'zx-select':''" @tap="tapBtn4('set2bottom')">{{btnType[config.editType].btn4}}</button>
				</view>
			</view>
			<!-- 			<view v-if="config.editType==='sign'" class="zx-body">
				<view>
					<view class="zx-range">
						<view class="zx-label">笔画大小</view>
						<button class="zx-range-btn" @tap="tapRange1(-1)">-</button><input type="number" v-model.trim="config.img.r" /><button
						 class="zx-range-btn" @tap="tapRange1(1)">+</button>
					</view>
					<view class="zx-range">
						<view class="zx-label">笔锋程度</view>
						<button class="zx-range-btn" @tap="tapRange2(-1)">-</button><input type="number" v-model.trim="config.img.degrees" /><button
						 class="zx-range-btn" @tap="tapRange2(1)">+</button>
					</view>
				</view>
				<view class="zx-operate">
					<button class="zx-btn" @tap="handleBtn1">颜色</button>
					<button class="zx-btn" @tap="handleBtn2('clearCanvas')">清空</button>
					<button class="zx-btn" @tap="handleBtn3('set2top')">本地</button>
					<button class="zx-btn" @tap="handleBtn4('set2bottom')">确认</button>
				</view>
			</view> -->
			<zxColor @getColor="getColor"></zxColor>
		</view>
		<view class="zx-pull-src">
			<button class="zx-add-img-btn" @tap="uploadImg">+</button>
			<input class="zx-content" placeholder="输入文本内容" v-model.trim="config.inputContent"></input>
			<button class="zx-add-text-btn" @tap="handleText">{{config.editType=='font'?'修改':'新增'}}</button>
		</view>
	</view>
</template>

<script>
	import zxColor from './color'
	export default {

		components: {
			zxColor
		},
		data() {
			return {
				curColor: '#000',
				isShow: true,
				config: null,
				timer: null,
				btnType: {
					font: {
						range1: '字体大小',
						range2: '行间距',
						btn1: '居中',
						btn2: '加粗',
						btn3: '颜色',
						btn4: '贯穿'
					},
					img: {
						range1: '圆角半径',
						range2: '旋转角度',
						btn1: '居中',
						btn2: '铺满',
						btn3: '置顶',
						btn4: '置底'
					}
				},
			}
		},
		watch: {
			'$store.getters.editType'(val) {
				this.config.editType = val
				if (val !== 'font') {
					this.config.inputContent = null
					this.$store.commit('transfer/GET_FONTINFO', {
						lineHeight: 14,
						size: 14,
						weight: false,
						lineThrough: false,
						color: '#000'
					})	
				}else if(val !== 'img'){
					this.$store.commit('transfer/GET_IMGINFO',{
						r: 0,
						degrees: 0
					})
				}
			},
			// '$store.state.transfer.inputContent'(val) {
			// 	console.log(233,val)
			// 	this.config.inputContent = val;
			// },
			'$store.state.transfer.font': {
				handler(val) {
					this.config.font = val;
				},
				deep: true
			},
			'$store.state.transfer.img'(val) {
				this.config.img = val
			}
		},
		onReady() {
			this.config = this.$store.state.transfer
		},
		methods: {
			//新增或编辑文字 add or edit text
			handleText() {
				if (!this.config.inputContent) {
					uni.showModal({
						title: '提示',
						content: '这是一个模态弹窗',
						showCancel: false,
						success: function(res) {
							if (res.confirm) {

							}
						}
					});
				} else if (this.config.editType == 'font') {
					// this.$store.commit('transfer/CHANGE_INPUTCONTENT', this.config.inputContent)
					// this.text[this.active].config.color = this.curColor
					// this.text[this.active].content = this.config.inputContent
					this.$emit('hanldeFontSrc', this.config.inputContent, 'edit')
				} else {
					this.$emit('hanldeFontSrc', this.config.inputContent, 'add')
					this.$store.commit('transfer/SET_EDITTYPE', 'font')
					// this.$store.commit('transfer/setActive', 'font')
				}
			},
			//上传图片 upload img
			uploadImg() {
				uni.chooseImage({
					count: 1,
					sourceType: ['album', 'camera'],
					success: res => {
						uni.getImageInfo({
							src: res.tempFilePaths[0],
							success: info => {
								this.$emit('hanldeImgSrc', res.tempFilePaths[0], info)
								this.$store.commit('transfer/SET_EDITTYPE', 'img')
							}
						})
					}
				})
			},
			//获取图片信息 get info of img




			/* 设置 config */
			// selectconfig.editType(type) { //选择编辑方式 select type of edit
			// this.config.editType = type
			// this.$emit('change',type)
			// },
			close() {
				this.isShow = false
			},
			info() {
				uni.showModal({
					title: '提示',
					content: '这是一个模态弹窗',
					showCancel: false,
					success: function(res) {
						if (res.confirm) {}
					}
				});
			},
			unfold() {
				this.isShow = true
			},
			/* 一次性操作 once operate */
			handleBtn3(type) {
				this.$emit('handleBtn3', type)
			},
			// /* 文字操作 font operate */
			// handleLineHeight(num) {
			// 	if (this.config.font.lineHeight + num < 0) return
			// 	this.config.font.lineHeight = this.config.font.lineHeight * 1 + num
			// },
			// handleFontSize(num) {
			// 	if (this.config.font.size + num < 0) return
			// 	this.config.font.size = this.config.font.size * 1 + num
			// },
			// handleWeight() {
			// 	this.config.font.weight = !this.config.font.weight
			// },
			// handleLineThrough() {
			// 	this.config.font.lineThrough = !this.config.font.lineThrough
			// },
			/* 图片操作 img operate */


			tapRange1(num) {
				switch (this.config.editType) {
					case 'font':
						//字体大小 font size
						if (this.config.font.size + num < 0) return
						this.config.font.size = this.config.font.size * 1 + num
						break;
					case 'img':
						//圆角半径 radius
						if (this.config.img.r + num < 0) return
						this.config.img.r = this.config.img.r * 1 + num
						break;
					case 'canvas':
						break;
					default:
						break;
				}
			},
			longpressRange1(num) {
				if (this.config.img.r + num < 0) return
				this.timer = setInterval(() => {
					this.config.img.r = this.config.img.r * 1 + num
				}, 30)
			},
			touchendRange1() {
				clearInterval(this.timer)
				this.timer = null
			},
			tapRange2(num) {
				switch (this.config.editType) {
					case 'font':
						if (this.config.font.lineHeight + num < 0) return
						this.config.font.lineHeight = this.config.font.lineHeight * 1 + num
						break;
					case 'img':
						//旋转角度 rotate degrees
						this.config.img.degrees = this.config.img.degrees * 1 + num
						break;
					case 'canvas':
						break;
					default:
						break;
				}
			},

			longpressRange2(num) {
				this.timer = setInterval(() => {
					this.config.img.degrees = this.config.img.degrees * 1 + num
				}, 30)
			},
			touchendRange2() {
				clearInterval(this.timer)
				this.timer = null
			},


			tapBtn1() {
				switch (this.config.editType) {
					case 'font':
						//居中 align center
						this.$store.commit('fn/RUN', 'fontCenter')
						break;
					case 'img':
						//居中 align center 
						this.$store.commit('fn/RUN', 'imgCenter')
						break;
					case 'canvas':
						break;
					default:
						break;
				}
			},
			tapBtn2() {
				switch (this.config.editType) {
					case 'font':
						//加粗 font weight	
						this.$store.commit('fn/RUN', 'fontWeight')
						break;
					case 'img':
						this.$store.commit('fn/RUN', 'imgFullScreem')
						break;
					case 'canvas':
						break;
					default:
						break;
				}
			},
			tapBtn3() {
				switch (this.config.editType) {
					case 'font':
						break;
					case 'img':
						this.$store.commit('fn/RUN', 'imgSet2top')
						break;
					case 'canvas':
						break;
					default:
						break;
				}
			},
			tapBtn4() {
				switch (this.config.editType) {
					case 'font':
						//贯穿 through
						this.$store.commit('fn/RUN', 'fontLineThrough')
						break;
					case 'img':
						this.$store.commit('fn/RUN', 'imgSet2bottom')
						break;
					case 'canvas':
						break;
					default:
						break;
				}
			},




			handleFullScreen(type) {
				// this.$emit('handleBtn3', type)
			},
			handleBtn1() {
				this.$children[0].handldWin()
			},
			// 画布操作 canvas operate
			handleBtn2(type) {
				this.$emit('handleBtn3', type)
			},
			// 获取颜色 get color form color component
			getColor(e) {
				this.curColor = e
				this.$emit('handleBtn1', e)
			},
		}
	}
</script>

<style>
</style>
