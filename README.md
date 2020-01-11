迷你PS小程序
===
### 个人制作，基于uni-app框架搭建的可实现图文多方位编辑并生成海报的一款轻巧小程序。集成的开放式海报，油墨电子签名，图片拖拽模块可单独食用

***


**思路讲解/效果展示**<br />
>https://segmentfault.com/write?draftId=1220000021495001<br />
https://www.dogedoge.com/results?q=font+weight<br />

## 开放式海报
| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| canvasW | Number | 720 | 海报宽度，单位rpx |
| canvasH | Number | 1000 | 海报高度，单位rpx |
| img | Array |  | 需生成的图片数组 |
| text |Array  |  | 需生成的文字数组 |
| x | Number |  | img/text-距绘制原点的水平距离，单位rpx |
| y | Number |  | img/text-距绘制原点的垂直距离，单位rpx |
| w | Number |  | img/text-宽度，单位rpx |
| h | Number |  | img-高度，单位rpx |
| r | Number |  | img-圆角度数，单位deg |
| src | String |  | img-图片来源 |
| degress |Number  |  | img-旋转角度，单位deg |
| mirror |Boolean  |  | img-是否镜像 |
| content | String |  | text-绘制的文本 |
| lineHeight | Number |  | text-行间距，单位rpx |
| color | String |  |text-颜色 |
| size |Number  |  | text-大小，单位rpx |
| weight | String |  | text-是否加粗,允许值normal、bold等 |
| lineThrough | Boolean |  | text-是否有贯穿线 |
| maxLineNum | Number |  | text-最大行数,超过行数的文字以“ ... ”表示，0为不限制 |
```js
<template>
<zx-poster ref="poster" :img="imageList" :text="textList" :canvasW="750" :canvasH="1000"></zx-poster>
</template>

<script>
import zxPoster from '@/components/zx-poster.vue'
export default {
components: {
    zxPoster
},
data() {
    return {
        imageList: [{
		//注意不校验合法域名
                src: 'https://s2.ax1x.com/2020/01/11/l4TadS.png',
                x: 200,
                y: 300,
                w: 300,
                h: 300,
                r: 30,
                degrees: 45,
                mirror: false
            }
        ],
        textList: [
            {
                content: 'TensionMaxTensionMaxTensionMaxTensionMaxTensionMaxTensionMaxTensionMax',
                x: 200,
                y: 100,
                w: 300,
                lineHeight: 35,
                color: '#000000',
                size: 30,
                weight: 'normal',
                lineThrough: true,
                maxLineNum: 3
            }
        ]
    }
},
onReady() {
	this.$refs.poster.generate()
}
}
</script>
```
## 油墨电子签名
| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
|initialLineWidth  | Number | 5 |初始线宽 建议1~5 |
| keenness | Number |  5| 油墨程度 建议0~5 |
```js
<template>
	<zx-sign :initialLineWidth="2" :keenness="5"></zx-sign>
</template>

<script>
	import zxSign from '@/components/zx-sign.vue'
	export default {
		components: {
			zxSign
		}
	}
</script>
```
## 图片拖拽
| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| v-model | Array | 绑定值 | 图片数组，需进行响应式处理 |
| x | Number |  | 绝对定位的left值，单位px |
| y | Number |  | 绝对定位的top值，单位px |
| w | Number |  | 对应元素的宽，单位px |
| h | Number |  | 对应元素的高，单位px |
| isMove | Boolean | false | 辅助作用 |

```js
<template>
	<zx-image v-model="imgList"></zx-image>
</template>

<script>
	import zxImage from '@/components/zx-image.vue'
	export default {
		components: {
			zxImage
		},
		data() {
			return {
				imgList: []
			}
		},
		onLoad() {
			this.imgList.push({
				src: 'https://s2.ax1x.com/2020/01/05/lrCDx0.jpg',
				x: 150,
				y: 150,
				w: 200,
				h: 200,
				isMove: false
			})
		}
	}
</script>
```

