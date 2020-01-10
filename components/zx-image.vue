<template>
	<view>
		<img @tap.stop style="position: absolute" :style="{
 	 left: item.x+'px',
 	 top: item.y+'px',
 	 width: item.w+'px',
 	 height: item.h+'px',
 	 }"
		 @touchstart='touchStart($event,item,index)' @longpress='longPress($event,item,index)' @touchmove.stop='touchMove($event,item,index)'
		 @touchcancel="touchEnd($event,item,index)" @touchend='touchEnd($event,item,index)' v-for="(item,index) of value"
		 :key="index" :src="item.src" />
	</view>
</template>

<script>
	export default {
		props: {
			value: Array
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
			}
		},
		methods: {
			touchStart(e, item, index) {
				this.determineDirection(e, item, index)
			},
			longPress(e, item, index) {
				this.x0 = e.touches[0].clientX - item.x
				this.y0 = e.touches[0].clientY - item.y
				item.isMove = true
			},
			touchMove(e, item, index) {
				if (item.isMove) {
					item.x = e.touches[0].clientX - this.x0
					item.y = e.touches[0].clientY - this.y0
					console.log(item.x,this.value)
				} else {
					this.adjustItem(e, item, index)
				}
			},
			//判定移动方向 determine direction of movement
			determineDirection(e, item, index) {
				if (e.touches[0].clientX < (item.x + 30)) {
					this.xAxis = '-'
					this.x0 = item.x + item.w
				} else if (e.touches[0].clientX < (item.x + item.w + 30) && e.touches[0].clientX > (item
						.x + item.w - 30)) {
					this.xAxis = '+'
					this.x0 = item.x
				}
				if (e.touches[0].clientY < (item.y + 20)) {
					this.yAxis = '-'
					this.y0 = item.y + item.h
				} else if (e.touches[0].clientY < (item.y + item.h + 30) && e.touches[0].clientY > (item
						.y + item.h - 30)) {
					this.yAxis = '+'
					this.y0 = item.y
				}

				if (!this.xAxis && !this.yAxis) {
					this.x0 = e.touches[0].clientX - item.x
					this.y0 = e.touches[0].clientY - item.y
					item.isMove = true
				}
			},
			adjustItem(e, item, index) {
				switch (this.xAxis) {
					case '-':
						if (this.x0 - e.touches[0].clientX < 60 || !item.w) break;
						item.x = e.touches[0].clientX
						item.w = this.x0 - e.touches[0].clientX
						break;
					case '+':
						if (e.touches[0].clientX - this.x0 < 60) break
						item.w = e.touches[0].clientX - this.x0
						break;
					default:
						break
				}
				switch (this.yAxis) {
					case '-':
						if (this.y0 - e.touches[0].clientY < 60 || !item.h) break
						item.y = e.touches[0].clientY
						item.h = this.y0 - e.touches[0].clientY
						break;
					case '+':
						if (e.touches[0].clientY - this.y0 < 60) break
						item.h = e.touches[0].clientY - this.y0
						break
					default:
						break
				}
			},
			touchEnd(e, item, index) {
				item.isMove = false
				this.xAxis = null
				this.yAxis = null
			},
		}
	}
</script>
