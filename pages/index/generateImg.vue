<template>
	<view>
		<canvas canvas-id="generate" :style="{ width: canvasW + 'rpx', height: canvasH + 'rpx'}"></canvas>
	</view>
</template>

<script>
	/* 以下数字的单位以rpx为准 */
	export default {
		props: {
			img: Array,
			text:Array,
			canvasH: Number,
			canvasW: {
				type: Number,
				default: 720
			}
		},
		data() {
			return {
				ctx: null,
				k: ''//单位转换因子 unit conversion factor
			};
		},
		onReady() {
			this.k = uni.getSystemInfoSync().screenWidth / 750
			this.ctx = uni.createCanvasContext('generate', this);
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
			generate() {
				this.ctx.setFillStyle('#FFFFFF')
				this.ctx.fillRect(0, 0, ...this.rpx2px(this.canvasW, this.canvasH))
				for (let i of this.img) {
					this.ctx.save()

					if (i.degrees) {
						this.ctx.translate(...this.rpx2px(i.x + i.w / 2, i.y + i.h / 2))
						this.ctx.rotate(i.degrees * Math.PI / 180)
						this.ctx.translate(...this.rpx2px(-i.x - i.w / 2, -i.y - i.h / 2))
					}
					if(i.mirror){
						this.ctx.translate(...this.rpx2px(i.x + i.w / 2, i.y + i.h / 2))
						this.ctx.scale(-1,1)
						this.ctx.translate(...this.rpx2px(-i.x - i.w / 2, -i.y - i.h / 2))
					}
					this.radiusRect(...this.rpx2px(i.x, i.y, i.w, i.h, i.r)) //（圆角）矩形路径绘制
					this.ctx.clip()
					if (i.shadow) {
						this.ctx.setShadow(3, 5, 4, '#CDCDCD')
						this.ctx.fill();
					}
					this.ctx.drawImage(i.src, ...this.rpx2px(i.x, i.y, i.w, i.h))
					this.ctx.restore()
				}

				/* -文字绘制 */

				for (let i of this.text) {
					let drawTxt = '', //当前绘制内容
						drawLineNum = 0, //当前行数索引
						drawIndex = 0 //当前绘制内容索引
					i.w = this.rpx2px(i.w)

					this.ctx.font = `${i.weight} ${this.rpx2px(i.size)}px/${this.rpx2px(i.lineHeight)}px sans-serif`
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
				this.ctx.draw(false, res => {
					uni.canvasToTempFilePath({
						canvasId: 'generate',
						success: res => {
							this.$emit('exportSuccess', res.tempFilePath);
						},
					}, this);
				})


			},
			/* 获取canvas图片路径 */
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
