<template>
	<view>
		<canvas canvas-id="poster" :style="{ width: canvasW + 'rpx', height: canvasH + 'rpx'}"></canvas>
	</view>
</template>

<script>
	
	/* 以下数字的单位以rpx为准 */
	export default {
		name: 'poster',
		props: {
			imgSrc: { //展示图
				Type: String,
				default: ''
			},
			avatarUrl: { //头像
				Type: String,
				default: ''
			},
			QRcodeSrc: { //二维码
				Type: String,
				default: ''
			},
			// title: { //文本内容
			// 	Type: String,
			// 	default: ''
			// },
			titleColor: { //标题颜色
				Type: String,
				default: '#333333'
			},
			LineType: { //标题显示行数		（注超出2行显示会导致画布布局絮乱）
				Type: [String, Boolean],
				default: true
			},
			price: { //价格值
				Type: String,
				default: '0.00'
			},
			priceColor: { //价格颜色
				Type: String,
				default: '#ED0424'
			},
			originalPrice: { //原价值
				Type: String,
				default: '0.00'
			},
			originalPriceColor: { //默认颜色（如原价与扫描二维码颜色）
				Type: String,
				default: '#b8b8b8'
			},
			Width: { //画布宽度  (高度根据图片比例计算 单位upx)
				Type: String,
				default: 720
			},
			CanvasBg: { //canvas画布背景色
				Type: String,
				default: '#ffffff'
			},
			referrer: { //推荐人信息
				Type: String,
				default: '废喵推荐给你'
			},
			guide: { //描述提示文字
				Type: String,
				default: '长按分享或扫码购买'
			}
		},
		data() {
			return {
				webviewStyles: {
					progress: {
						color: '#FF3333'
					}
				},

				/* 展示图 */
				img: [{
					src: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
					x: 10,
					y: 10,
					w: 500,
					h: 400,
					r: 15,
					shadow: true
				}],
				/* 文字 */
				text: [{
					content: '黄紫溪黄紫溪',
					x: 10,
					y: 10,
					w: 500,
					lineHeight: 50,
					r: 15,
					size: 36,
					color: 'red',
					weight: 'normal',
					family: 'sans-serif',
					maxLineNum: 4,
					lineThrough: true,
				}],
				canvasId: 'poster',
				canvasW: 720,
				canvasH: 720,
				/* 自定义宽度 */
				canvasImgSrc: '',
				ctx: null,
				/* 单位转换因子 */
				k: ''
			};
		},
		onLoad() {
			this.k = uni.getSystemInfoSync().screenWidth / 750
		},
		async onReady() {
			this.OnCanvas()
		},
		methods: {
			/* 单位转换 */
			px2rpx() {
				if (arguments.length === 1)
					return arguments[0] / this.k
				let params = []
				for (let i of arguments) {
					params.push(i / this.k)
				}
				return params
			},
			rpx2px() {
				if (arguments.length === 1)
					return arguments[0] * this.k
				let params = []
				for (let i of arguments) {
					params.push(i * this.k)
				}
				return params
			},
			async OnCanvas() {
				this.ctx = uni.createCanvasContext(this.canvasId, this);
				this.imgSrc =
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg'
				this.avatarUrl =
					'https://wx.qlogo.cn/mmopen/vi_32/et2zrQzrqBZZ80ovWEfA0QqBiaWjlzna6sxA0rqibCIVlYzANNibynQSYLWReEeam2IJ7anVibibiaKOuia1Tg9TIoFYA/132'
				this.QRcodeSrc =
					'https://wx.qlogo.cn/mmopen/vi_32/et2zrQzrqBZZ80ovWEfA0QqBiaWjlzna6sxA0rqibCIVlYzANNibynQSYLWReEeam2IJ7anVibibiaKOuia1Tg9TIoFYA/132'
				/* -绘制图片 */

				let imgInfo = (await uni.getImageInfo({
					src: this.imgSrc
				}))[1] //需将图片网络路径转成临时路径才可绘制于Canvas上 严重耗时
				console.log(new Date().getTime())
				for (let i of this.img) {
					this.ctx.save()
					this.radiusRect(...this.rpx2px(i.x, i.y, i.w, i.h, i.r)) //（圆角）矩形路径绘制
					if (i.shadow) { //情景: 存在阴影
						this.ctx.setShadow(3, 5, 4, '#CDCDCD')
						this.ctx.fill();
					}
					this.ctx.clip()
					this.ctx.drawImage(imgInfo.path, ...this.rpx2px(i.x, i.y, i.w, i.h))
					this.ctx.restore()
				}
				console.log(new Date().getTime())

				/* -文字绘制 */

				for (let i of this.text) {
					let drawTxt = '', //当前绘制内容
						drawLineNum = 0, //当前行数索引
						drawIndex = 0 //当前绘制内容索引
					i.w = this.rpx2px(i.w)

					this.ctx.font = `${i.weight} ${this.rpx2px(i.size)}px/${this.rpx2px(i.lineHeight)}px ${i.family}`
					this.ctx.setFillStyle(i.color)
					this.ctx.setTextBaseline('top')
					if (this.ctx.measureText(i.content).width <= i.w) { //只有一行内容
						this.ctx.fillText(i.content, ...this.rpx2px(i.x, i.y))
						if (i.lineThrough) { //情景：存在贯穿线
							this.ctx.beginPath();
							this.ctx.moveTo(...this.rpx2px(i.x, i.y + i.size / 2 - 3))
							this.ctx.lineTo(...this.rpx2px(i.x + this.px2rpx(this.ctx.measureText(i.content).width), i.y + i.size / 2 - 3))
							this.ctx.setStrokeStyle(i.color)
							this.ctx.setLineWidth(1.6)
							this.ctx.stroke()
						}
					} else {
						for (let j = 0; j < i.content.length; j++) {
							drawTxt += i.content[j]
							if (this.ctx.measureText(drawTxt).width >= i.w) {
								if (drawLineNum === i.maxLineNum) { //情景：多行时最后一行内容超过边界
									this.ctx.fillText(i.content.substring(drawIndex, j - 1) + '...', ...this.rpx2px(i.x, i.y + i.lineHeight *
										drawLineNum));
									break;
								} else { //情景：多行时最后一行之前的内容
									this.ctx.fillText(i.content.substring(drawIndex, j + 1), ...this.rpx2px(i.x, i.y + i.lineHeight * drawLineNum));
									drawIndex = j + 1;
									drawLineNum += 1;
									drawTxt = ''
								}
							} else {
								if (j === i.content.length - 1) { //情景：多行时最后一行内容未超过边界
									this.ctx.fillText(drawTxt, ...this.rpx2px(i.x, i.y + i.lineHeight * drawLineNum));
								}
							}
						}
					}
				}

				console.log(new Date().getTime())
				this.ctx.draw(true, res => {
					this.getCanvasImage()
				})

			},
			/* 获取canvas图片路径 */
			getCanvasImage() {
				uni.canvasToTempFilePath({
					canvasId: this.canvasId,
					success: res => {
						// this.$emit('', res.tempFilePath);
					},
				}, this);
			},
			/* 圆角矩形路径 */
			radiusRect(x, y, w, h, r) {
				if (r > w / 2 || r > h / 2) {
					r = Math.min(w, h) / 2
				}
				this.ctx.beginPath();
				this.ctx.moveTo(x + r, y); // 将操作点移至左上角
				this.ctx.arcTo(x + w, y, x + w, y + r, r); // 画右上角的弧        
				this.ctx.arcTo(x + w, y + h, x + w - r, y + h, r); // 画右下角的弧
				this.ctx.arcTo(x, y + h, x, y + h - r, r); // 画左下角的弧
				this.ctx.arcTo(x, y, x + r, y, r); // 画左上角的弧
				this.ctx.closePath();
			}
		}
	};
</script>

<style>
</style>
