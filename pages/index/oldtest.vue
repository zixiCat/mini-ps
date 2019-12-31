<template>
	<view>
		<view class="zx-canvas" @tap='cancelActive' :style="{
			height:canvasH+'px',
		}">
			<!-- 图片海报 img poster -->
			<view>
				<imgEdit></imgEdit>
			</view>
			<!-- 文字海报 text poster -->
<!-- 			<view class="zx-text" :class="index==active&&config.editType=='font'?'zx-move':''" :style="{
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
			 :key="index">{{item.content}}</view> -->
			<!-- 画笔工具 paintbush tool-->
			<!-- <paintbush></paintbush> -->
			<view class="zx-adjust-size" @touchmove.stop='canvasAjustMove'>===</view>
		</view>
		<ajustment @handlePosition="handlePosition" @handleColor="handleColor"></ajustment>
		<view class="zx-pull-src">
			<button class="zx-add-img-btn" @tap="uploadImg">+</button>
			<input class="zx-content" placeholder="输入文本内容" v-model.trim="inputContent"></input>
			<button class="zx-add-text-btn" @tap="handleText">{{config.editType=='font'?'修改':'新增'}}</button>
		</view>
	</view>
</template>

<script>
	import ajustment from './ajustment/index'
	import imgEdit from './imgEdit.vue'
	// import paintbush from './paintbush'

	export default {
		components: {
			ajustment,
			imgEdit,
			paintbush
		},
		data() {
			return {
				/* 画布 */
				canvasH: 450,
				canvasW: 360,
				/* 画布图片 canvas img */
				img: [],
				/* 画布文字 canvas text */
				text: [],
				X0: '',
				Y0: '',
				/* paintbush 画笔工具 */
				ctx: '',
				/* 画布公共 canvas common */
				active: '',
				XBorder: '',
				YBorder: '',
				curColor:'',
				/* 设置 config */
				inputContent: '',
				config: null,
				/* 高宽比 height to width factor */
				j: '',
				/* 单位转换因子 unit conversion factor */
				k: '',
			}
		},
		onLoad() {
			this.config = this.$store.state.transfer
			this.k = uni.getSystemInfoSync().screenWidth / 750
			this.canvasW = this.rpx2px(720)
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
			pullConfig(item, index) {
				this.active = index
				if (item.src) {
					this.config.editType = 'img'
					this.config.img = item.config
				} else if (item.content) {
					this.config.editType = 'font'
					this.config.font = item.config
					this.inputContent = item.content
				}
			},
			/* 重置设置参数 reset params of setting */
			reset() {},
			/* 触控事件 touch event */
			cancelActive() {
				this.config.editType = ''
				this.inputContent = ''
			},
			/* -控制对象 item control  */
			touchStart(e, item, index) {
				this.pullConfig(item, index)
				item.isAjust = true
				this.determineDirection(e, item, index)
				/* --判定连续点击事件 count the times of clicking */
				this.clickTimes += 1
			},
			longPress(e, item, index) {
				//删除对象 delete item but I have no one QAQ
				if (item.config.lineHeight) {
					this.text.splice(index, 1)
				} else {
					this.img.splice(index, 1)
				}
				this.config.editType = ''
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
			handlePosition(e) {
				if(e==='clearCanvas'){
					this.$children[0].clearCanvas()
				}
				switch (this.config.editType) {
					case 'img':
						switch (e) {
							case 'centerH':
								this.img[this.active].position.x = (this.canvasW - this.img[this.active].position.w) / 2
								break;
							case 'set2top':
								if (this.active === this.img.length - 1) return
								this.img.push(this.img.splice(this.active, 1)[0])
								this.active = this.img.length - 1
								break;
							case 'set2bottom':
								if (this.active === 0) return
								this.img.unshift(this.img.splice(this.active, 1)[0])
								this.active = 0
								break;
							case 'fullScreen':
								this.img[this.active].position.x = 0
								this.img[this.active].position.y = 0
								this.img[this.active].position.h = this.canvasW * this.img[this.active].position.h/this.img[this.active].position.w
								this.img[this.active].position.w = this.canvasW
								this.canvasH = this.img[this.active].position.h
								break
						}
						break;
					case 'font':
						if (e == 'centerH') {
							this.text[this.active].position.x = (this.canvasW - this.text[this.active].position.w) / 2
						}
						break;
				}
			},
			handleColor(e){
				this.curColor = e
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
				}else {
					this.X0 = e.touches[0].clientX - item.position.x
					this.Y0 = e.touches[0].clientY - item.position.y
					item.isAjust = false
					item.isMove = true
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
			/* 新增/编辑文字 add/edit text */
			handleText() {
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
				} else if (this.config.editType === 'font') {
					this.text[this.active].config.color = this.curColor
					this.text[this.active].content = this.inputContent
				} else {
					let item = {
						content: this.inputContent,
						position: {
							x: 0,
							y: 0,
							w: 200
						},
						config: {
							lineHeight: 14,
							size: 14,
							weight: false,
							lineThrough: false,
							color: this.curColor
						},
						isMove: false,
						isAjust: false,
					}
					this.text.push(item)
					this.pullConfig(item, this.text.length - 1)
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
								let item = {
									src: res.tempFilePaths[0],
									position: {
										x: 50,
										y: 50,
										w: 200,
										h: 200 * image.height / image.width,
									},
									config: {
										r: 0,
										degrees: 0
									},
									isMove: true,
									isAjust: false,
								}
								this.img.push(item)
								this.pullConfig(item, this.img.length - 1)
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
