<template>
	<view >
		<canvas v-if="active" class="zx-canvas" canvas-id="canvas" @touchstart.stop="touchStart" @touchmove.stop="touchMove" @touchend.stop="touchEnd">
		</canvas>
		<view class="zx-btn">
			<button @tap="handleClear">清空</button>
			<button @tap="exportImg">导出</button>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			initialLineWidth: { //初始线宽 建议1~5
				type: Number,
				default: 5,
			},
			keenness: { //油墨程度 建议0~5
				type: Number,
				default: 5,
			}
		},
		data() {
			return {
				active: true,
				ctx: null,
				x0: 0, //初始横坐标或上一段touchmove事件中触摸点的横坐标
				y0: 0, //初始纵坐标或上一段touchmove事件中触摸点的纵坐标
				t0: 0, //初始时间或上一段touchmove事件发生时间
				v0: 0, //初始速率或touchmove事件间发生速率
				lineWidth: 0, //动态线宽
				k: 0.3, //油墨因子，即每次绘制线条时线宽的变化程度
			}
		},
		onReady() {
			this.ctx = uni.createCanvasContext('canvas', this);
			this.ctx.setLineCap('round')
		},
		methods: {
			//设置初始值
			touchStart(e) {
				this.lineWidth = this.initialLineWidth
				this.t0 = new Date().getTime()
				this.v0 = 0
				this.x0 = e.touches[0].clientX
				this.y0 = e.touches[0].clientY
			},

			touchMove(e) {
				let dx = e.touches[0].clientX - this.x0,
					dy = e.touches[0].clientY - this.y0,
					ds = Math.pow(dx * dx + dy * dy, 0.5),
					dt = (new Date().getTime()) - this.t0,
					v1 = ds / dt; //同 this.v0 初始速率或touchmove事件间发生速率
				if (this.keenness === 0) { //油墨程度为0时
					this.ctx.moveTo(this.x0, this.y0)
					this.ctx.lineTo(this.x0 + dx, this.y0 + dy)
					this.ctx.setLineWidth(this.lineWidth)
					this.ctx.stroke()
					this.ctx.draw(true)
				} else {
					let a = this.keenness
					if (this.keenness > 5) a = 5
					for (let i = 0; i < a; i++) {
						this.ctx.moveTo(this.x0 + dx * i / a, this.y0 + dy * i / a)
						this.ctx.lineTo(this.x0 + dx * (i + 1) / a, this.y0 + dy * (i + 1) / a)
						//此时touchmove事件间发生与上一个事件的发生的速率比较
						if (v1 < this.v0) {
							this.lineWidth -= this.k
							if (this.lineWidth < this.lineWidth * 0.25) this.lineWidth = this.lineWidth * 0.25
						} else {
							this.lineWidth += this.k
							if (this.lineWidth > this.lineWidth * 1.5) this.lineWidth = this.lineWidth * 1.5
						}
						this.ctx.setLineWidth(this.lineWidth)
						this.ctx.stroke()
						this.ctx.draw(true)
					}
				}
				this.x0 = e.touches[0].clientX
				this.y0 = e.touches[0].clientY
				this.t0 = new Date().getTime()
				this.v0 = v1
			},
			touchEnd(e) {
				this.x0 = 0
				this.y0 = 0
				this.t0 = 0
				this.v0 = 0
			},
			handleClear() {
				this.active = false
				setTimeout(() => {
					this.active = true
				}, 100)
			},
			exportImg() {
				uni.canvasToTempFilePath({
					canvasId: 'canvas',
					success: res => {
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath
						})
					}
				}, this)
			}
		}
	}
</script>
<style>
	.zx-canvas {
		width: 750rpx;
		height: 1000rpx;
		box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
	}

	.zx-btn {
		position: absolute;
		bottom: 0;
		width: 100%;
	}
</style>
