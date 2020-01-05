<template>
	<view>
		<view @tap.stop class="zx-text" :class="active===index?'zx-move':''" :style="{
				 left: item.position.x+'px',
			     top: item.position.y+'px',
				 width: item.position.w+'px',
				 color: item.config.color,
				 lineHeight: item.config.lineHeight+'px',
				 fontSize:item.config.size+'px',
				 fontWeight:item.config.weight?'bold':'',
				 textDecoration:item.config.lineThrough?'line-through':''
				 }"
		 @touchstart='touchStart($event,item,index)' @longpress='longPress($event,item,index)' @touchmove.stop='touchMove($event,item,index)'
		 @touchcancel="touchEnd($event,item,index)" @touchend='touchEnd($event,item,index)' v-for="(item,index) of value"
		 :key="index">{{item.content}}</view>
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
				y0: null
			}
		},
		watch: {
			value(val) {
				this.$emit('input', val)
			},
		},
		methods: {
			touchStart(e, item, index) {
				if (this.active!==index){
				this.$emit('update:active', index)
				}
				this.determineDirection(e, item, index)
			},
			//删除对象 delete item but I have no one QAQ
			longPress(e, item, index) {
				this.x0 = e.touches[0].clientX - item.position.x
				this.y0 = e.touches[0].clientY - item.position.y
				item.isMove = true
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
			},
			handleFontSize(val){
				this.value[this.active].config.size = val
			},
			handleFontLineHeight(val){
				this.value[this.active].config.lineHeight = val
			},
			handleFontCenter(containerW){
				this.value[this.active].position.x = (containerW - this.value[this.active].position.w) / 2
			},
			handleFontWeight(val){
				this.value[this.active].config.weight = val
			},
			handleFontColor(val){
				if(this.active<0) return
				this.value[this.active].config.color = val
			},
			handleFontLineThrough(val){
				this.value[this.active].config.lineThrough = val
			}
		}
	}
</script>

<style>
</style>
