<template>
	<view>
		<view class="zx-canvas" @tap='cancelActive' :style="{
			height:canvasH+'px',
		}">
			<!-- 图片海报 img poster -->
			<view>
				<image @tap.stop class="zx-img" :class="index==active&&editType=='img'?'zx-move':''" :style="{
					left: item.position.x+'px',
					top: item.position.y+'px',
					width: item.position.w+'px',
					height:item.position.h+'px',
				    borderRadius:item.config.r+'px'
					}"
				 @touchstart='touchStart($event,item,index)' @longpress='longPress($event,item,index)' @touchmove.stop='touchMove($event,item,index)'
				 @touchcancel="touchEnd($event,item,index)" @touchend='touchEnd($event,item,index)' :src="item.src" v-for="(item,index) of img"
				 :key="index"></image>
			</view>
			<!-- 文字海报 text poster -->
			<view class="zx-text" :class="index==active&&editType=='font'?'zx-move':''" :style="{
			 left: item.position.x+'px',
		     top: item.position.y+'px',
			 width: item.position.w+'px',
			 color: item.config.color,
			 lineHeight: item.config.lineHeight+'px',
			 fontSize:item.config.size+'px',
			 fontWeight:item.config.weight?'bold':'',
			 textDecoration:item.config.lineThrough?'line-through':''
			 }"
			 @tap.stop @touchstart='touchStart($event,item,index)' @longpress='longPress($event,item,index)' @touchmove.stop='touchMove($event,item,index)'
			 @touchcancel="touchEnd($event,item,index)" @touchend='touchEnd($event,item,index)' v-for="(item,index) of text"
			 :key="index">{{item.content}}</view>
			<view class="zx-ajust-size" @touchmove.stop='canvasAjustMove'>===</view>
		</view>
		<ajustment :editType="editType"  @handleConfig="handleConfig" @handlePosition="handlePosition"></ajustment>
		<view class="zx-pull-src">
			<button class="zx-add-img-btn" @tap="uploadImg">+</button>
			<input class="zx-content" placeholder="输入文本内容" v-model.trim="inputContent"></input>
			<button class="zx-add-text-btn" @tap="addText">添加</button>
		</view>
	</view>
</template>

<script>
	import ajustment from './ajustment/index'

	export default {
		components: {
			ajustment
		},
		data() {
			return {
				/* 画布 */
				canvasH: 450,
				/* 画布图片 canvas img */
				img: [],
				/* 画布文字 canvas text */
				text: [],
				X0: '',
				Y0: '',
				/* 画布公共 canvas common */
				active: '',
				XBorder: '',
				YBorder: '',
				clickTimes: 0,
				/* 设置 config */
				editType: '',
				isShow: true,
				imgRadius: 0,
				textLineHeight: 0,
				inputContent: '',
				/* 单位转换因子 unit conversion factor */
				k: ''
			}
		},
		watch: {
			editType(newVal){
				
			},
			imgRadius(newVal) {
				this.img[this.active].r = newVal
			},
			textLineHeight(newVal) {
				this.text[this.active].lineHeight = newVal
			},
			fontSize(newVal) {
				this.text[this.active].size = newVal
			}
		},
		onLoad() {
			this.k = uni.getSystemInfoSync().screenWidth / 750
		},
		methods: {
			/* 单位转换 unit conversion */
			px2rpx() {
				if (arguments.length == 1)
					return arguments[0] / this.k
				let params = []
				for (let i of arguments) {
					params.push(i / this.k)
				}
				return params
			},
			rpx2px() {
				if (arguments.length == 1)
					return arguments[0] * this.k
				let params = []
				for (let i of arguments) {
					params.push(i * this.k)
				}
				return params
			},
			/* 拉去对象参数 pull params of config in item */
			pullConfig(item,index) {
				this.active = index
				if (item.src) {
					this.editType = 'img'
					this.imgRadius = Math.floor(item.config.r)
				} else if(item.content){
					this.editType = 'font'
					this.textLineHeight = Math.floor(item.lineHeight)
					this.fontSize = Math.floor(item.lineHeight)
					this.inputContent = item.content
				}
			},
			/* 重置设置参数 reset params of setting */
			reset() {
				this.imgRadius = 0,
					// this.textLineHeight = 0,
					// this.fontSize = 28rpx,
					this.inputContent = ''
			},
			/* 触控事件 touch event */
			cancelActive() {
				// this.active = ''
			},
			/* -控制对象 item control  */
			touchStart(e, item, index) {
				this.pullConfig(item,index)
				item.isAjust = true
				this.determineDirection(e, item, index)
				/* --判定连续点击事件 count the times of clicking */
				this.clickTimes += 1
				if (this.clickTimes == 1) {
					setTimeout(() => {
						this.clickTimes = 0
					}, 500);
				}
				/* --如果是连续三次点击，删除对象 delete item when it's treble click */
				if (this.clickTimes == 3) {
					if (item.config.lineHeight) { //determine if it's a text array
						this.text.splice(index, 1)
					} else {
						this.img.splice(index, 1)
					}
					this.editType = ''
				}
			},
			longPress(e, item, index) {
				item.isAjust = false
				item.isMove = true
				this.X0 = e.touches[0].clientX - item.position.x
				this.Y0 = e.touches[0].clientY - item.position.y
			},
			touchMove(e, item, index) {
				if (item.isMove) {
					item.position.x = e.touches[0].clientX - this.X0
					item.position.y = e.touches[0].clientY - this.Y0
				} else if (item.isAjust) {
					this.ajust2(e, item, index)
				}
			},
			touchEnd(e, item, index) {
				item.isMove = false
				item.isAjust = false
				this.XBorder = ''
				this.YBorder = ''
			},
			/* 获取设置信息 get info of ajustment */
			handlePosition(type, e) {
				switch (type) {
					case 'img':
						if (e == 'centerH') {
							this.img[this.active].position.x = (this.rpx2px(720) - this.img[this.active].position.w) / 2
						}
						break;
					case 'font':
						if (e == 'centerH') {
							this.text[this.active].position.x = (this.rpx2px(720) - this.text[this.active].position.w) / 2
						}
						break;
				}
			},
			handleConfig(type, e) {
				console.log(this.text[this.active])
				switch (type) {
					case 'img':
						this.img[this.active].config = e.img
						break;
					case 'font':
						this.text[this.active].config = e.font
						break;
				}
			},
			/* -画布调整 canvas ajustment */
			canvasAjustMove(e) {
				if (e.touches[0].clientY < 100) return
				this.canvasH = e.touches[0].clientY
			},
			/* 判定移动方向 determine direction of movement */
			determineDirection(e, item, index) {
				if (e.touches[0].clientX < (item.position.x + 30)) {
					this.XBorder = 'ajust2left'
					this.X0 = item.position.x + item.position.w
				} else if (e.touches[0].clientX < (item.position.x + item.position.w + 30) && e.touches[0].clientX > (item.position
						.x + item.position.w - 30)) {
					this.XBorder = 'ajust2right'
					this.X0 = item.position.x
				}
				if (e.touches[0].clientY < (item.position.y + 20)) {
					this.YBorder = 'ajust2top'
					this.Y0 = item.position.y + item.position.h
				} else if (e.touches[0].clientY < (item.position.y + item.position.h + 30) && e.touches[0].clientY > (item.position
						.y + item.position.h - 30)) {
					this.YBorder = 'ajust2bottom'
					this.Y0 = item.position.y
				}
			},
			/* 向某个方向调整 ajust in determinte direction */
			ajust2(e, item, index) {
				switch (this.XBorder) {
					case 'ajust2left':
						if (this.X0 - e.touches[0].clientX < 60 || !item.position.w) {
							break
						}
						item.position.x = e.touches[0].clientX
						item.position.w = this.X0 - e.touches[0].clientX
						break;
					case 'ajust2right':
						if (e.touches[0].clientX - this.X0 < 60) {
							break
						}
						item.position.w = e.touches[0].clientX - this.X0
						break;
					default:
						break
				}
				switch (this.YBorder) {
					case 'ajust2top':
						if (this.Y0 - e.touches[0].clientY < 60 || !item.position.h) {
							break
						}
						item.position.y = e.touches[0].clientY
						item.position.h = this.Y0 - e.touches[0].clientY
						break;
					case 'ajust2bottom':
						if (e.touches[0].clientY - this.Y0 < 60) {
							break
						}
						item.position.h = e.touches[0].clientY - this.Y0
						break
					default:
						break
				}
			},
			/* 添加文字 add text */
			addText() {
				if (!this.inputContent) {
					uni.showModal({
						title: '提示',
						content: '这是一个模态弹窗',
						showCancel: false,
						success: function(res) {
							if (res.confirm) {

							}
						}
					});
				} else {
					this.text.push({
						content: this.inputContent,
						position: {
							x: 0,
							y: 0,
							w: 200
						},
						config: {
							lineHeight: 40,
							size: 28,
							color: 'black',
							weight: 'normal',
							// family: 'sans-serif',
							lineThrough: true
						},
						isMove: false,
						isAjust: false,
					})
					this.editType ='font'
					this.active = this.text.length - 1
					this.reset()
				}
			},
			/* 上传图片 upload img */
			uploadImg() {
				uni.chooseImage({
					count: 1,
					sourceType: ['album', 'camera'],
					success: res => {
						uni.getImageInfo({
							src: res.tempFilePaths[0],
							success: image => {
								console.log(this.active, this.editType)
								this.img.push({
									src: res.tempFilePaths[0],
									position: {
										x: 50,
										y: 50,
										w: 200,
										h: 200 * image.height / image.width,
									},
									config: {
										r: 0,
									},
									isMove: true,
									isAjust: false,
								})
								this.editType ='img'
								this.active = this.img.length - 1
								this.reset()
							}
						});
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	@import "./test.scss";
</style>
