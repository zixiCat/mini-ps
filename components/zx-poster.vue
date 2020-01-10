<template>
	<view style="position:absolute">
		<canvas canvas-id="generate" :style="{ width: canvasW + 'rpx', height: canvasH + 'rpx'}"></canvas>
	</view>
</template>

<script>
	export default {
		props: {
			canvasW: {
				type: Number,
				default: 720
			},
			canvasH: {
				type: Number,
				default: 1000
			},
			img: Array,
			text: Array,
		},
		data() {
			return {
				ctx: null,
				k: '' //单位转换因子 unit conversion factor
			};
		},
		onReady() {
			this.k = uni.getSystemInfoSync().screenWidth / 750
			this.ctx = uni.createCanvasContext('generate', this);
		},
		methods: {
			/* 单位转换 */
			px2rpx() {
				//当转换的参数只有一个时直接返回数值
				//当不为一个时返回数组，然后用spread语法将其展开为几个参数
				//Math.floor()是为了防止在安卓机上造成的数据紊乱，开发者工具无此bug
				if (arguments.length === 1) return Math.floor(arguments[0] / this.k)
				let params = []
				for (let i of arguments) {
					params.push(Math.floor(i / this.k))
				}
				return params
			},
			rpx2px() {
				if (arguments.length === 1) return Math.floor(arguments[0] * this.k)
				let params = []
				for (let i of arguments) {
					params.push(Math.floor(i * this.k))
				}
				return params
			},
			async generate() {
				this.ctx.setFillStyle('#FFFFFF')
				this.ctx.fillRect(0, 0, ...this.rpx2px(this.canvasW, this.canvasH)) //绘制背景
				/* 图片绘制 */
				for (let i of this.img) { //for循环绘制图片
					i.src = (await uni.getImageInfo({
						src: i.src
					}))[1].path; //获取图片临时路径
					this.ctx.save() //保存当前绘制内容
					if (i.mirror) { //如果设置镜像
						//因为canvas的translate属性是基于原点（初始原点为右上角）变化
						//所以需要先将原点移动至图片中心，变化后再还原
						//旋转变化同理
						this.ctx.translate(...this.rpx2px(i.x + i.w / 2, i.y + i.h / 2))
						this.ctx.scale(-1, 1)
						this.ctx.translate(...this.rpx2px(-i.x - i.w / 2, -i.y - i.h / 2))
					}
					if (i.degrees) { //如果设置旋转
						this.ctx.translate(...this.rpx2px(i.x + i.w / 2, i.y + i.h / 2))
						this.ctx.rotate(i.degrees * Math.PI / 180)
						this.ctx.translate(...this.rpx2px(-i.x - i.w / 2, -i.y - i.h / 2))
					}
					this.radiusRect(...this.rpx2px(i.x, i.y, i.w, i.h, i.r)) //圆角或矩形路径绘制
					this.ctx.clip() //裁剪
					this.ctx.drawImage(i.src, ...this.rpx2px(i.x, i.y, i.w, i.h))
					this.ctx.restore() //恢复非裁剪区域
				}

				/* 文字绘制 */
				for (let i of this.text) {
					let drawTxt = '', //当前绘制内容
						drawLineNum = 0, //当前行数索引
						drawIndex = 0 //当前绘制内容索引
					i.w = this.rpx2px(i.w)
					//设置文字属性
					this.ctx.font = `normal ${i.weight} ${this.rpx2px(i.size)}px/${this.rpx2px(i.lineHeight)}px sans-serif`
					this.ctx.setFillStyle(i.color)
					this.ctx.setTextBaseline('top')
					if (this.ctx.measureText(i.content).width <= i.w) { //只有一行内容时
						this.ctx.fillText(i.content, ...this.rpx2px(i.x, i.y))
						if (i.lineThrough) { //若存在贯穿线
							this.drawLineThrough(i.x, i.y, i.content, i.color, i.size)
						}
					} else { //有多行内容时
						for (let j = 0; j < i.content.length; j++) {
							drawTxt += i.content[j]
							if (this.ctx.measureText(drawTxt).width >= i.w) {
								if (drawLineNum + 1 === i.maxLineNum) { //多行时最后一行内容超过边界
									this.ctx.fillText(i.content.substring(drawIndex, j - 1) + '...', ...this.rpx2px(i.x, i.y + i.lineHeight *
										drawLineNum), i.color, i.size);
									if (i.lineThrough) {
										this.drawLineThrough(i.x, i.y + i.lineHeight * drawLineNum, i.content.substring(drawIndex, j - 1), i.color, i
												.size)
									}
									break;
								} else { //多行时最后一行内容之前的内容
									this.ctx.fillText(i.content.substring(drawIndex, j + 1), ...this.rpx2px(i.x, i.y + i.lineHeight * drawLineNum));
									if (i.lineThrough) {
										this.drawLineThrough(i.x, i.y + i.lineHeight * drawLineNum, i.content.substring(drawIndex, j + 1), i.color, i
												.size)
									}
									drawIndex = j + 1;
									drawLineNum += 1;
									drawTxt = ''
								}
							} else {
								if (j === i.content.length - 1) { //当多行时最后一行内容未超过边界
									this.ctx.fillText(drawTxt, ...this.rpx2px(i.x, i.y + i.lineHeight * drawLineNum));
									if (i.lineThrough) {
										this.drawLineThrough(i.x, i.y + i.lineHeight * drawLineNum, drawTxt, i.color, i.size)
									}
								}
							}
						}
					}
				}
				this.ctx.draw(true)
			},
			/* 圆角矩形路径 */
			radiusRect(x, y, w, h, r) {
				if (r > w / 2 || r > h / 2) {
					r = Math.min(w, h) / 2
				}
				this.ctx.beginPath();
				this.ctx.moveTo(x, y); // 将操作点移至左上角
				this.ctx.arcTo(x + w, y, x + w, y + r, r); // 画右上角的弧
				this.ctx.lineTo(x + w, y) //可省略，但由于安卓真机的小程序bug，留之，下同。
				this.ctx.arcTo(x + w, y + h, x + w - r, y + h, r); // 画右下角的弧
				this.ctx.lineTo(x + w, y + h) //可省略
				this.ctx.arcTo(x, y + h, x, y + h - r, r); // 画左下角的弧
				this.ctx.lineTo(x, y + h) //可省略
				this.ctx.arcTo(x, y, x + r, y, r); // 画左上角的弧
				this.ctx.lineTo(x, y) //可省略
				// this.ctx.closePath()
			},
			drawLineThrough(x, y, content, color, size) {
				this.ctx.beginPath();
				this.ctx.moveTo(...this.rpx2px(x, y + size / 2))
				this.ctx.lineTo(...this.rpx2px(x + this.px2rpx(this.ctx.measureText(content).width), y + size / 2))
				this.ctx.setStrokeStyle(color)
				this.ctx.setLineWidth(1.6)
				this.ctx.stroke()
			}
		}
	};
</script>
