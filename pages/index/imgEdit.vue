<template>
	<view>
		<image @tap.stop class="zx-img" :class="active===index?'zx-move':''" :style="{
		left: item.position.x+'px',
		top: item.position.y+'px',
		width: item.position.w+'px',
		height:item.position.h+'px',
	    borderRadius:item.config.r+'px',
		transform: 'rotate('+item.config.degrees+'deg)',
		boxShadow:item.config.shadow?'0 2px 12px 0 rgba(0, 0, 0, 0.2)':'',
		}"
		 @touchstart='touchStart($event,item,index)' @longpress='longPress($event,item,index)' @touchmove.stop='touchMove($event,item,index)'
		 @touchcancel="touchEnd($event,item,index)" @touchend='touchEnd($event,item,index)' :src="item.src" v-for="(item,index) of value"
		 :key="index"></image>
	</view>
</template>

<script>
	export default {
		props: {
			value: Array,
			active: Number
		},
		data() {
			return {
				xAxis: null,
				yAxis: null,
				x0: null,
				y0: null,
			}
		},
		watch: {
			value(val) {
				this.$emit('input', val)
			},
		},
		methods: {
			touchStart(e, item, index) {
				if (this.active !== index) {
					this.$emit('update:active', index)
				}
				this.determineDirection(e, item, index)
			},
			//删除对象 delete item but I have no one QAQ
			longPress(e, item, index) {
				this.value.splice(index, 1)
				this.$emit('update:active', -1)
			},
			touchMove(e, item, index) {
				if (item.isMove) {
					item.position.x = e.touches[0].clientX - this.x0
					item.position.y = e.touches[0].clientY - this.y0
				} else {
					this.adjustItem(e, item, index)
				}
			},
			touchEnd(e, item, index) {
				item.isMove = false
				this.xAxis = null
				this.yAxis = null
			},
			//判定移动方向 determine direction of movement
			determineDirection(e, item, index) {
				if (e.touches[0].clientX < (item.position.x + 30)) {
					this.xAxis = '-'
					this.x0 = item.position.x + item.position.w
				} else if (e.touches[0].clientX < (item.position.x + item.position.w + 30) && e.touches[0].clientX > (item.position
						.x + item.position.w - 30)) {
					this.xAxis = '+'
					this.x0 = item.position.x
				}
				if (e.touches[0].clientY < (item.position.y + 20)) {
					this.yAxis = '-'
					this.y0 = item.position.y + item.position.h
				} else if (e.touches[0].clientY < (item.position.y + item.position.h + 30) && e.touches[0].clientY > (item.position
						.y + item.position.h - 30)) {
					this.yAxis = '+'
					this.y0 = item.position.y
				}

				if (!this.xAxis && !this.yAxis) {
					this.x0 = e.touches[0].clientX - item.position.x
					this.y0 = e.touches[0].clientY - item.position.y
					item.isMove = true
				}
			},
			adjustItem(e, item, index) {
				switch (this.xAxis) {
					case '-':
						if (this.x0 - e.touches[0].clientX < 60 || !item.position.w) {
							break
						}
						item.position.x = e.touches[0].clientX
						item.position.w = this.x0 - e.touches[0].clientX
						break;
					case '+':
						if (e.touches[0].clientX - this.x0 < 60) {
							break
						}
						item.position.w = e.touches[0].clientX - this.x0
						break;
					default:
						break
				}
				switch (this.yAxis) {
					case '-':
						if (this.y0 - e.touches[0].clientY < 60 || !item.position.h) {
							break
						}
						item.position.y = e.touches[0].clientY
						item.position.h = this.y0 - e.touches[0].clientY
						break;
					case '+':
						if (e.touches[0].clientY - this.y0 < 60) {
							break
						}
						item.position.h = e.touches[0].clientY - this.y0
						break
					default:
						break
				}
			},
			handleImgR(val) {
				this.value[this.active].config.r = val
			},
			handleImgDegrees(val) {
				this.value[this.active].config.degrees = val
			},
			handleImgShadow() {
				this.value[this.active].config.shadow = !this.value[this.active].config.shadow
			},
			handleImgCenter(containerW) {
				this.value[this.active].position.x = (containerW - this.value[this.active].position.w) / 2
			},
			handleImgFullContainer(containerW) {
				this.value[this.active].position.x = 0
				this.value[this.active].position.y = 0
				this.value[this.active].position.h = containerW * this.value[this.active].position.h / this.value[this.active].position
					.w
				this.value[this.active].position.w = containerW
			},
			handleImgSet2top() {
				let len = this.value.length
				if (this.active === len - 1) return
				this.value.push(this.value.splice(this.active, 1)[0])
				this.$emit('update:active', len - 1)

			},
			handleImgSet2bottom() {
				if (this.active === 0) return
				this.value.unshift(this.value.splice(this.active, 1)[0])
				this.$emit('update:active', 0)
			},
		}
	}
</script>

<style>
</style>
