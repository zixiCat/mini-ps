<template>
	<view>
		<view class="zx-container" @tap='cancelEditType' :style="{ height:container.h+'px'}">
			<imgEdit ref="img" v-model="imageList" :active.sync='imgActive'></imgEdit>
			<fontEdit ref="font" v-model="textList" :active.sync='textActive'></fontEdit>
			<canvasEdit ref="canvas" v-if="editType=='canvas'" v-model="canvasConfig" @handleCanvasImage="handleCanvasImage"></canvasEdit>
			<view class="zx-adjust-size" @tap.stop @touchmove.stop='canvasAdjustMove'>===</view>
		</view>
		<!--        <adjustment @handlePosition="handlePosition" @handleColor="handleColor" @hanldeFontSrc="hanldeFontSrc" @hanldeImgSrc="hanldeImgSrc"></adjustment>-->
		<view>
			<view class="zx-config" :class="isShow?'zx-slide-in':'zx-slide-out'">
				<view class="zx-unfold" @tap="unfold">||</view>
				<view class="zx-title">
					<view>
						<button class="zx-btn" :class="editType=='img'?'zx-select':''" @tap="handleImgType">图</button>
						<button class="zx-btn" :class="editType=='font'?'zx-select':''" @tap="handleFontType">A</button>
						<button class="zx-btn" :class="editType=='canvas'?'zx-select':''" @tap="handleCanvasType">画
						</button>
					</view>
					<view>
						<button v-if="editType!=='canvas'" class="zx-btn" style="width: 80rpx;" @tap="export2png">导出</button>
						<button v-if="editType!=='img'" class="zx-btn" :style="{backgroundColor: curColor}" @click="tapBtn3"></button>
						<button v-if="editType==='img'" class="zx-btn" :class="imgConfig.shadow&&editType==='img'?'zx-select':''" @tap="tapTopBtn0">影</button>
						<button v-if="editType==='img'" class="zx-btn" :class="imgConfig.mirror&&editType==='img'?'zx-select':''" @tap="tapTopBtn1">镜</button>
						<button class="zx-btn" @tap="info">!</button>
						<button class="zx-btn" @tap="close">X</button>
					</view>
				</view>
				<view v-if="!editType" class="zx-body">
					<view class="zx-tips">
						请选择/插入文字或图片
					</view>
				</view>
				<view v-if="editType" class="zx-body">
					<view>
						<view class="zx-range">
							<view class="zx-label">{{btnType[editType].range1}}</view>
							<button class="zx-range-btn" @longpress='longpressRange1(-1)' @touchcancel="touchendRange1" @touchend="touchendRange1"
							 @tap="tapRange1(-1)">-
							</button>
							<input disabled v-if="editType==='img'" type="number" v-model.trim="imgConfig.r" />
							<input disabled v-if="editType==='font'" type="number" v-model.trim="fontConfig.size" />
							<input disabled v-if="editType==='canvas'" type="number" v-model.trim="canvasConfig.lineWidth" />
							<button class="zx-range-btn" @longpress='longpressRange1(1)' @touchcancel="touchendRange1" @touchend="touchendRange1"
							 @tap="tapRange1(1)">+
							</button>
						</view>
						<view class="zx-range">
							<view class="zx-label">{{btnType[editType].range2}}</view>
							<button class="zx-range-btn" @longpress='longpressRange2(-1)' @touchcancel="touchendRange2" @touchend="touchendRange2"
							 @tap="tapRange2(-1)">-
							</button>
							<input disabled v-if="editType==='img'" type="number" v-model.trim="imgConfig.degrees" />
							<input disabled v-if="editType==='font'" type="number" v-model.trim="fontConfig.lineHeight" />
							<input disabled v-if="editType==='canvas'" type="number" v-model.trim="canvasConfig.keenness" />
							<button class="zx-range-btn" @longpress='longpressRange2(1)' @touchcancel="touchendRange2" @touchend="touchendRange2"
							 @tap="tapRange2(1)">+
							</button>
						</view>
					</view>
					<view class="zx-operate">
						<button class="zx-btn" @tap="tapBtn1">{{btnType[editType].btn1}}</button>
						<button class="zx-btn" :class="fontConfig.weight&&editType==='font'?'zx-select':''" @tap="tapBtn2">
							{{btnType[editType].btn2}}
						</button>
						<button class="zx-btn" @tap="tapBtn3">{{btnType[editType].btn3}}</button>
						<button class="zx-btn" :class="fontConfig.lineThrough&&editType==='font'?'zx-select':''" @tap="tapBtn4">{{btnType[editType].btn4}}
						</button>
					</view>
				</view>
				<zxColor ref="color" @getColor="getColor"></zxColor>
			</view>
			<view class="zx-pull-src">
				<button class="zx-add-img-btn" @tap="uploadImg">+</button>
				<input class="zx-content" placeholder="输入文本内容" v-model.trim="inputContent"></input>
				<button class="zx-add-text-btn" @tap="handleText">{{editType=='font'?'修改':'新增'}}</button>
			</view>
		</view>
		<zx-info ref="info"></zx-info>
		<generate-img v-if="activeGenerate" :img="imageSrc" :text="textSrc" :canvasH="(px2rpx(container.h)-30)" ref="generate"
		 @exportSuccess="exportSuccess"></generate-img>
	</view>
</template>

<script>
	import imgEdit from './imgEdit.vue'
	import fontEdit from './fontEdit.vue'
	import canvasEdit from './canvasEdit'
	import zxColor from './zxColor'
	import zxInfo from './info'
	import generateImg from './generateImg'

	export default {
		components: {
			imgEdit,
			fontEdit,
			canvasEdit,
			zxColor,
			zxInfo,
			generateImg
		},
		data() {
			return {
				//画布尺寸 measure
				imageList: [],
				textList: [],
				textActive: -1,
				imgActive: -1,
				curColor: '#000',
				isShow: true,
				timer: null,
				activeGenerate: false,
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
					},
					canvas: {
						range1: '笔画大小',
						range2: '笔锋程度',
						btn1: '清空',
						btn2: '保存',
						btn3: '颜色',
						btn4: '确认'
					}
				},
				defaultConfig: {
					imgPosition: {
						x: 50,
						y: 50,
						w: 200
					},
					fontPosition: {
						x: 50,
						y: 50,
						w: 200
					},
					img: {
						r: 0,
						degrees: 0,
						shadow: false,
						mirror: false,
					},
					font: {
						lineHeight: 14,
						size: 14,
						weight: false,
						lineThrough: false,
						color: '#000',
					},
					canvas: {
						color: '#000',
						lineWidth: 2,
						keenness: 0
					}
				},
				editType: null,
				container: {
					w: null,
					h: null
				},
				imgConfig: {},
				fontConfig: {},
				canvasConfig: {},
				inputContent: '',
				imageSrc: null,
				textSrc: null

			}
		},
		watch: {
			textActive(val) {
				if (val > -1) {
					if (this.editType !== 'font') {
						this.imgActive = -1
						this.editType = 'font'
					}
					console.log(this.textList[val].config, val + 'val')
					this.fontConfig = this.textList[val].config;
					this.inputContent = this.textList[val].content
				} else if (this.imgActive === -1 && this.textActive === -1 && this.editType !== 'canvas') {
					this.editType = null
				}
			},
			imgActive(val) {
				if (val > -1) {
					if (this.editType !== 'img') {
						this.textActive = -1
						this.editType = 'img'
					}
					this.imgConfig = this.imageList[val].config;
				} else if (this.imgActive === -1 && this.textActive === -1 && this.editType !== 'canvas') {
					this.editType = null
				}
			},
			editType(val) {
				if (!val || val === 'canvas') {
					this.textActive = -1
					this.imgActive = -1
					this.inputContent = ''
				}
			}
		},
		onReady() {
			this.imgConfig = JSON.parse(JSON.stringify(this.defaultConfig.img))
			this.fontConfig = JSON.parse(JSON.stringify(this.defaultConfig.font))
			this.canvasConfig = JSON.parse(JSON.stringify(this.defaultConfig.canvas))
			this.k = uni.getSystemInfoSync().screenWidth / 750
			this.setContainerW()
		},
		methods: {
			/* 单位转换 unit conversion */
			px2rpx() {
				if (arguments.length == 1)
					return arguments[0] / this.k
				let params = []
				for (let i of arguments) {
					params.push((i / this.k) || 0)
				}
				return params
			},
			rpx2px() {
				if (arguments.length == 1)
					return arguments[0] * this.k
				let params = []
				for (let i of arguments) {
					params.push((i * this.k) || 0)
				}
				return params
			},
			cancelEditType() {
				this.editType = null
			},
			handleImgType() {
				if (this.editType !== 'img') {
					this.editType = null
				}
			},
			handleFontType() {
				if (this.editType !== 'font') {
					this.editType = null
				}
			},
			setContainerW() {
				this.container.w = this.rpx2px(720)
				this.container.h = this.rpx2px(880)
			},
			getColor(e) {
				this.curColor = e
				this.$refs.font.handleFontColor(e)
				this.canvasConfig.color = e
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
								this.imageList.push({
									src: res.tempFilePaths[0],
									position: {
										...this.defaultConfig.imgPosition,
										h: 200 * info.height / info.width,
									},
									config: {
										...this.defaultConfig.img
									},
									isMove: false
								})
								this.textActive = -1
								this.imgActive = this.imageList.length - 1
								this.editType = 'img'
							}
						})
					}
				})
			},
			//新增或编辑文字 add or edit text
			handleText() {
				if (!this.inputContent) {
					uni.showModal({
						title: '提示',
						content: '编辑内容不能为空',
						showCancel: false,
						success: function(res) {
							if (res.confirm) {

							}
						}
					});
				} else if (this.editType !== 'font') {
					this.defaultConfig.font.color = this.curColor
					this.textList.push({
						content: this.inputContent,
						position: this.defaultConfig.fontPosition,
						config: this.defaultConfig.font,
						isMove: false
					})
					this.imgActive = -1
					this.textActive = this.textList.length - 1
					this.editType = 'font'
				} else {
					this.textList[this.textActive].content = this.inputContent
				}
			},
			handleCanvasType() {
				this.editType = 'canvas'
			},
			info() {
				this.$refs.info.handldWin()
			},
			close() {
				this.isShow = false
			},
			unfold() {
				this.isShow = true
			},
			tapRange1(num) {
				switch (this.editType) {
					case 'img':
						//圆角半径 radius
						if (this.imgConfig.r + num < 0) return
						this.imgConfig.r = this.imgConfig.r * 1 + num
						this.$refs.img.handleImgR(this.imgConfig.r)
						break;
					case 'font':
						//字体大小 font size
						if (this.fontConfig.size + num < 0) return
						this.fontConfig.size = this.fontConfig.size * 1 + num
						this.$refs.font.handleFontSize(this.fontConfig.size)
						break;
					case 'canvas':
						if (this.canvasConfig.lineWidth + num < 0 || this.canvasConfig.lineWidth + num > 5) return
						this.canvasConfig.lineWidth = this.canvasConfig.lineWidth * 1 + num
						break;
					default:
						break;
				}
			},
			longpressRange1(num) {

				switch (this.editType) {
					case 'img':
						//圆角半径 radius
						this.timer = setInterval(() => {
							if (this.imgConfig.r + num < 0) return
							this.imgConfig.r = this.imgConfig.r * 1 + num
							this.$refs.img.handleImgR(this.imgConfig.r)
						}, 30)
						break;
					case 'font':
						//字体大小 font size
						this.timer = setInterval(() => {
							if (this.fontConfig.size + num < 0) return
							this.fontConfig.size = this.fontConfig.size * 1 + num
							this.$refs.font.handleFontSize(this.fontConfig.size)
						}, 30)
						break;
					case 'canvas':
						break;
					default:
						break;
				}
			},
			touchendRange1() {
				clearInterval(this.timer)
				this.timer = null
			},
			tapRange2(num) {
				switch (this.editType) {
					case 'img':
						//旋转角度 rotate degrees
						this.imgConfig.degrees = this.imgConfig.degrees * 1 + num
						this.$refs.img.handleImgDegrees(this.imgConfig.degrees)
						break;
					case 'font':
						if (this.fontConfig.lineHeight + num < 0) return
						this.fontConfig.lineHeight = this.fontConfig.lineHeight * 1 + num
						this.$refs.font.handleFontLineHeight(this.fontConfig.lineHeight)
						break;
					case 'canvas':
						if (this.canvasConfig.keenness + num < 0 || this.canvasConfig.keenness + num > 5) return
						this.canvasConfig.keenness = this.canvasConfig.keenness * 1 + num
						break;
					default:
						break;
				}
			},
			longpressRange2(num) {
				switch (this.editType) {
					case 'img':
						//旋转角度 rotate degrees
						this.timer = setInterval(() => {
							this.imgConfig.degrees = this.imgConfig.degrees * 1 + num
							this.$refs.img.handleImgDegrees(this.imgConfig.degrees)
						}, 30)

						break;
					case 'font':
						this.timer = setInterval(() => {
							if (this.fontConfig.lineHeight + num < 0) return
							this.fontConfig.lineHeight = this.fontConfig.lineHeight * 1 + num
							this.$refs.font.handleFontLineHeight(this.fontConfig.lineHeight)
						}, 30)

						break;
					case 'canvas':
						break;
					default:
						break;
				}
			},
			touchendRange2() {
				clearInterval(this.timer)
				this.timer = null
			},
			tapTopBtn0() {
				//设置阴影 set shadow
				this.imgConfig.shadow = !this.imgConfig.shadow
				this.$refs.img.handleImgShadow(this.imgConfig.shadow)
			},
			tapTopBtn1() {
				//设置镜像 set mirror
				this.imgConfig.mirror = !this.imgConfig.mirror
				this.$refs.img.handleImgMirror(this.imgConfig.mirror)
			},
			tapBtn1() {
				switch (this.editType) {
					case 'img':
						//居中 align center
						this.$refs.img.handleImgCenter(this.container.w)
						break;
					case 'font':
						//居中 align center
						this.$refs.font.handleFontCenter(this.container.w)
						break;
					case 'canvas':
						//clear 清空
						this.$refs.canvas.handleClear()
						break;
					default:
						break;
				}
			},
			tapBtn2() {
				switch (this.editType) {
					case 'img':
						//铺满 full container
						this.$refs.img.handleImgFullContainer(this.container.w)
						break;
					case 'font':
						//加粗 font weight
						this.fontConfig.weight = !this.fontConfig.weight
						this.$refs.font.handleFontWeight(this.fontConfig.weight)
						break;
						//保存本地 save to local
					case 'canvas':
						this.$refs.canvas.save()
						break;
					default:
						break;
				}
			},
			tapBtn3() {
				switch (this.editType) {
					case 'img':
						//置顶 set2top
						this.$refs.img.handleImgSet2top()
						break;
					case 'font':
						this.$refs.color.handldWin()
						break;
					case 'canvas':
						this.$refs.color.handldWin()
						break;
					default:
						this.$refs.color.handldWin()
						break;
				}
			},
			tapBtn4() {
				switch (this.editType) {
					case 'img':
						//置底 set2bottom
						this.$refs.img.handleImgSet2bottom()
						break;
					case 'font':
						//贯穿 through
						this.fontConfig.lineThrough = !this.fontConfig.lineThrough
						this.$refs.font.handleFontLineThrough(this.fontConfig.lineThrough)
						break;
					case 'canvas':
						this.$refs.canvas.confirm()
						break;
					default:
						break;
				}
			},
			handleCanvasImage(url, info) {
				this.imageList.push({
					src: url,
					position: info,
					config: this.defaultConfig.img,
					isMove: false
				})
				this.imgActive = this.imageList.length - 1
				this.editType = 'img'
			},
			//画布调整 canvas adjustment
			canvasAdjustMove(e) {
				if (e.touches[0].clientY < 100) return
				this.container.h = e.touches[0].clientY
			},
			//导出PNG export to png
			export2png() {
				// uni.showLoading({
				// 	mask:true,
				//     title: '正在导出'
				// });
				let data = []
				for (let i of this.imageList) {
					let j = this.px2rpx(i.position.x, i.position.y, i.position.w, i.position.h, i.config.r)
					data.push({
						src: i.src,
						x: j[0],
						y: j[1],
						w: j[2],
						h: j[3],
						r: j[4],
						degrees: i.config.degrees,
						shadow: i.config.shadow,
						mirror: i.config.mirror
					})
				}
				let data2 = []
				for (let i of this.textList) {
					let j = this.px2rpx(i.position.x, i.position.y, i.position.w, i.config.lineHeight, i.config.size)
					data2.push({
						content: i.content,
						x: j[0],
						y: j[1],
						w: j[2] - 60, //元素padding为30rpx padding of the element is 30rpx
						lineHeight: j[3],
						size: j[4],
						color: i.config.color,
						weight: i.config.weight ? 'bold' : 'normal',
						lineThrough: i.config.lineThrough
					})
				}
				this.imageSrc = data
				this.textSrc = data2
				this.activeGenerate = true
				this.imageList=[]
				setTimeout(() => {
					this.$refs.generate.generate()
					// this.$refs.generate.test(this.imageSrc[0].src)
				}, 600)
			},
			exportSuccess(url) {
				uni.hideLoading()
				this.activeGenerate = false
				uni.previewImage({
					urls: [url],
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						fail: err => {
							uni.showModal({
								title: '错误提示',
								showCancel: false,
								content: err.errMsg
							});
						}
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	@import "./test.scss";
</style>
