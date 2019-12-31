<template>
    <view>
        <view class="zx-canvas" @tap='cancelEditType' :style="{ height:config.container.h+'px'}">
            <imgEdit v-model="imgList" :active.sync='imgActive'></imgEdit>
            <fontEdit v-model="textList" :active.sync='textActive'></fontEdit>
            <view class="zx-ajust-size" @tap.stop @touchmove.stop='canvasAjustMove'>===</view>
        </view>
        <ajustment @handlePosition="handlePosition" @handleColor="handleColor" @hanldeFontSrc="hanldeFontSrc" @hanldeImgSrc="hanldeImgSrc"></ajustment>
    </view>
</template>

<script>
    import fontEdit from './fontEdit.vue'
    import imgEdit from './imgEdit.vue'
    import paintbush from './paintbush'
    import ajustment from './ajustment/index'

    export default {
        components: {
            fontEdit,
            imgEdit,
            paintbush,
            ajustment,
        },
        data() {
            return {
                //画布尺寸 measure
                imgList: [],
                textList: [],
                config: null,
                textActive: -1,
                imgActive: -1
            }
        },
        onLoad() {
            this.k = uni.getSystemInfoSync().screenWidth / 750
            this.setContainerW()
            this.config = this.$store.state.transfer
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
            cancelEditType() {
                this.$store.commit('transfer/SET_EDITTYPE', null)
            },
            setContainerW() {
                this.$store.commit('transfer/SET_CONTAINERW', this.rpx2px(720))
                this.$store.commit('transfer/SET_CONTAINERH', this.rpx2px(900))
            },
            hanldeFontSrc(e, type) {
                if (type === 'add') {
                    let config =  {
                        lineHeight: 14,
                        size: 14,
                        weight: false,
                        lineThrough: false,
                        color: '#000'
                    }
                    this.textList.push({
                        content: e,
                        position: {
                            x: 0,
                            y: 0,
                            w: 200
                        },
                        config,
                        isMove: false
                    })
                    this.$store.commit('transfer/GET_FONTINFO', config)
                    this.textActive = this.textList.length - 1
                }
                else {
                    this.textList[this.textActive].content = e
                }

            },
            hanldeImgSrc(e, info) {
                let config = {
                    r: 0,
                    degrees: 0
                }
                this.imgList.push({
                    src: e,
                    position: {
                        x: 50,
                        y: 50,
                        w: 200,
                        h: 200 * info.height / info.width,
                    },
                    config,
                    isMove: false
                })
                // this.$store.commit('transfer/GET_IMGINFO', config)
                this.imgActive = this.imgList.length - 1
            },
            //画布调整 canvas ajustment
            canvasAjustMove(e) {
                if (e.touches[0].clientY < 100) return
                this.containerH = e.touches[0].clientY
            },
        }
    }
</script>

<style lang="scss">
    @import "./test.scss";
</style>
