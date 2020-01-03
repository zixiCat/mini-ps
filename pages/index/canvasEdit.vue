<template>
	<view style="width: 100%;height: 100%">
		<canvas v-if="active" class="zx-canvas" canvas-id="canvas" @touchstart.stop="touchStart" @touchmove.stop="touchMove"
		 @touchend.stop="touchEnd"></canvas>
	</view>
</template>

<script>
	export default {
		props: {
			value: Object
		},
		name: 'canvasEdit',
		data() {
			return {
				active: true,
				ctx: null,
				copyClip: {
					x: 0,
					y: 0,
					h: 0,
					w: 0
				},
				clipX: [],
				clipY: [],
				x0: 0,
				y0: 0,
				t0: '',
				v0: 0,
				lineWidth: '',
				k: '', //笔锋因子 keenness factor
			}
		},
		watch: {
			value(val) {
				this.$emit('input', val)
			}
		},
		onReady() {
			this.drawing()
		},
		methods: {
			drawing() {
				this.ctx = uni.createCanvasContext('canvas', this);
				this.ctx.setLineCap('round')
			},
			handleCanvasColor(val){
				this.ctx.setStrokeStyle(val)
			},
			touchStart(e) {
				this.handleCanvasColor(this.value.color)
				this.ctx.beginPath()
				this.lineWidth = this.value.lineWidth
				this.k = this.value.lineWidth > 3 ? 0.3 : 0.2
				this.t0 = new Date().getTime()
				this.v0 = 0
				this.x0 = e.touches[0].clientX
				this.y0 = e.touches[0].clientY
			},
			async touchMove(e) {
				this.clipX.push(this.x0)
				this.clipY.push(this.y0)
				let dx = e.touches[0].clientX - this.x0,
					dy = e.touches[0].clientY - this.y0,
					ds = Math.pow(dx * dx + dy * dy, 0.5),
					dt = (new Date().getTime()) - this.t0,
					v1 = ds / dt;
				if (this.value.keenness === 0) {
					this.ctx.moveTo(this.x0, this.y0)
					this.ctx.lineTo(this.x0 + dx, this.y0 + dy)
					this.ctx.setLineWidth(this.lineWidth)
					this.ctx.stroke()
					this.ctx.draw(true)
				} else {
					for (let i = 0; i < this.value.keenness; i++) {
						this.ctx.moveTo(this.x0 + dx * i / this.value.keenness, this.y0 + dy * i / this.value.keenness)
						this.ctx.lineTo(this.x0 + dx * (i + 1) / this.value.keenness, this.y0 + dy * (i + 1) / this.value.keenness)
						if (v1 - this.v0 >= 0) {
							this.lineWidth += this.k
							if (this.lineWidth > this.value.lineWidth * 1.5) this.lineWidth = this.value.lineWidth * 1.5
						} else {
							this.lineWidth -= this.k
							if (this.lineWidth < this.lineWidth * 0.25) this.lineWidth = this.lineWidth * 0.25
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
				this.t0 = null
				this.v0 = 0
			},
			handleClear() {
				this.active = false
				setTimeout(() => {
					this.active = true
				}, 100)
			},
			save() {
				uni.showModal({
					content: '是否将当前画布(不含图片和文字)内容保存至本地',
					success: res => {
						if (res.confirm) {
							setTimeout(()=>{
							this.getCanvasImage('save')
							},300)
						}
					}
				});
			},
			confirm() {
				setTimeout(()=>{
				this.getCanvasImage('confirm')
				},300)
			},
			getCanvasImage(type) {
				this.copyClip.x = Math.min(...this.clipX) - 5
				this.copyClip.y = Math.min(...this.clipY) - 5
				this.copyClip.w = Math.max(...this.clipX) - this.copyClip.x + 5
				this.copyClip.h = Math.max(...this.clipY) - this.copyClip.y + 5
				this.ctx.draw(true,res=>{
					uni.canvasToTempFilePath({
						x: this.copyClip.x,
						y: this.copyClip.y,
						width: this.copyClip.w,
						height: this.copyClip.h,
						canvasId: 'canvas',
						success: res => {
							if (type === 'save') {
								uni.saveImageToPhotosAlbum({
									filePath: res.tempFilePath
								});
							} else {
								this.$emit('handleCanvasImage', res.tempFilePath, this.copyClip)
							}
						},
					}, this);
				})
			
			}
		}
	}
</script>

<style>
	.zx-canvas {
		width: 100%;
		height: 100%;
	}
</style>
