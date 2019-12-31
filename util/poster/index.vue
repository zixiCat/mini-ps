<!-- <template>
	<view>
		<canvas canvas-id="poster" :style="{ width: canvasW + 'px', height: canvasH + 'px'}"></canvas>
	</view>
</template>

<script>
	let _this;
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
			QrSrc: { //二维码
				Type: String,
				default: ''
			},
			Title: { //文本内容
				Type: String,
				default: ''
			},
			TitleColor: { //标题颜色
				Type: String,
				default: '#333333'
			},
			LineType: { //标题显示行数		（注超出2行显示会导致画布布局絮乱）
				Type: [String, Boolean],
				default: true
			},
			PriceTxt: { //价格值
				Type: String,
				default: '99.99'
			},
			PriceColor: { //价格颜色
				Type: String,
				default: '#e31d1a'
			},
			OriginalTxt: { //原价值
				Type: String,
				default: ''
			},
			OriginalColor: { //默认颜色（如原价与扫描二维码颜色）
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
			Referrer: { //推荐人信息
				Type: String,
				default: 'quitter推荐给你'
			},
			ViewDetails: { //描述提示文字
				Type: String,
				default: '长按分享或扫码购买'
			}
		},
		data() {
			return {
				canvasId:'poster',
				canvasW: 0,
				canvasH: 0,
				canvasImgSrc: '',
				ctx: null
			};
		},
		onReady(){
			this.OnCanvas()
		},
		methods: {
			async OnCanvas() {
				_this = this;
				// _this.imgSrc = this.$store.state.posterSrc;
				// _this.avatarUrl = this.$store.state.userInfo.avatarUrl;
				// _this.QrSrc = this.$store.state.qrSrc;
				_this.imgSrc = 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
				_this.avatarUrl = 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg'
				_this.QrSrc = 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
				_this.ctx = uni.createCanvasContext(_this.canvasId, this);
				const C_W = uni.upx2px(_this.Width), //canvas宽度
					C_P = uni.upx2px(30), //canvas Paddng 间距
					C_Q = uni.upx2px(150); //二维码或太阳码宽高
				let _strlineW = 0; //文本宽度
				let _imgInfo = await _this.getImageInfo({
					imgSrc: _this.imgSrc
				}); //广告图
				let _avatarUrl = await _this.getImageInfo({
					imgSrc: _this.avatarUrl
				});
				//头像
				let _QrCode = await _this.getImageInfo({
					imgSrc: _this.QrSrc
				});
				//二维码或太阳码
				let r = [_imgInfo.width, _imgInfo.height];
				let p = [_avatarUrl.width, _avatarUrl.height];
				let q = [_QrCode.width, _QrCode.height];
				let imgW = C_W - C_P * 2;
				if (r[0] != imgW) {
					r[1] = Math.floor((imgW / r[0]) * r[1]);
					r[0] = imgW;
				}
				if (p[0] != C_Q) {
					p[1] = Math.floor((C_Q / p[0]) * p[1]);
					p[0] = C_Q;
				}
				if (q[0] != C_Q) {
					q[1] = Math.floor((C_Q / q[0]) * q[1]);
					q[0] = C_Q;
				}
				_this.canvasW = C_W;
				_this.canvasH = r[1] + q[1] + 100;


				_this.ctx.setFillStyle(_this.CanvasBg); //canvas背景颜色
				_this.ctx.fillRect(0, 0, C_W, _this.canvasH); //canvas画布大小

				//设置文本
				_this.ctx.setFontSize(uni.upx2px(28)); //设置标题字体大小
				_this.ctx.setFillStyle(_this.TitleColor); //设置标题文本颜色
				let _strLastIndex = 0; //每次开始截取的字符串的索引
				let _strHeight = r[1] + C_P * 2 - 5; //绘制字体距离canvas顶部的初始高度
				let _num = 1;
				for (let i = 0; i < _this.Title.length; i++) {
					_strlineW += _this.ctx.measureText(_this.Title[i]).width;
					if (_strlineW > (r[0] - 20)) {
						if (_num == 2 && _this.LineType) {
							//文字换行数量大于二进行省略号处理
							_this.ctx.fillText(_this.Title.substring(_strLastIndex, i - 3) + '...', C_P + 10, _strHeight);
							_strlineW = 0;
							_strLastIndex = i;
							_num++;
							break;
						} else {
							_this.ctx.fillText(_this.Title.substring(_strLastIndex, i), C_P + 10, _strHeight);
							_strlineW = 0;
							_strHeight += 20;
							_strLastIndex = i;
							_num++;
						}
					} else if (i == _this.Title.length - 1) {
						_this.ctx.fillText(_this.Title.substring(_strLastIndex, i + 1), C_P + 10, _strHeight);
						_strlineW = 0;
					}
				}
				//设置文本 end
				//设置价格
				_strlineW = C_P;
				_strHeight += uni.upx2px(60);
				if (_num == 1) {
					_strHeight += 36; //单行标题时占位符
				}

				if (_this.PriceTxt != '') { //判断是否有销售价格
					_this.ctx.setFillStyle(_this.PriceColor);
					_this.ctx.setFontSize(uni.upx2px(33));
					_this.ctx.fillText(_this.PriceTxt, _strlineW + 10, _strHeight - 3); //商品价格
					_strlineW += _this.ctx.measureText(_this.PriceTxt).width + uni.upx2px(10);
				}
				if (_this.PriceTxt != '' && _this.OriginalTxt != '') { //判断是否有销售价格且原价
					_this.ctx.setFillStyle(_this.OriginalColor);
					_this.ctx.setFontSize(uni.upx2px(24));
					_this.ctx.fillText(_this.OriginalTxt, _strlineW, _strHeight); //商品原价
				}
				_this.ctx.strokeStyle = _this.OriginalColor;
				_this.ctx.moveTo(_strlineW, _strHeight - uni.upx2px(10)); //起点
				_this.ctx.lineTo(_strlineW + _this.ctx.measureText(_this.OriginalTxt).width, _strHeight - uni.upx2px(10)); //终点
				_this.ctx.stroke();
				//设置价格 end

				//添加二维码
				_strHeight += uni.upx2px(20);
				_this.ctx.drawImage(_QrCode.path, r[0] - q[0] + C_P - 5, _strHeight - 13, q[0], q[1]);
				//添加二维码 end
				//添加推荐人与描述
				_this.ctx.setFillStyle(_this.TitleColor);
				_this.ctx.setFontSize(uni.upx2px(28));
				_this.ctx.fillText(_this.Referrer, C_P + p[0] * 0.9 + 10, _strHeight + q[1] / 2 - 10);
				_this.ctx.setFillStyle(_this.OriginalColor);
				_this.ctx.setFontSize(uni.upx2px(28));
				_this.ctx.fillText(_this.ViewDetails, C_P + p[0] * 0.9 + 10, _strHeight + q[1] / 2 + 10);
				//添加推荐人与描述 end
				_this.ctx.save();
				// _this.ctx.arc(C_P + q[0] * 0.4, _strHeight + p[1] * 0.4, p[0] * 0.4, 0, 2 * Math.PI);
				let x1 = C_P,
					y1 = C_P - 13,
					w1 = r[0],
					h1 = r[1],
					r1 = 5;
				_this.ctx.beginPath();
				_this.ctx.moveTo(x1 + r1, y1);
				_this.ctx.arcTo(x1 + w1, y1, x1 + w1, y1 + h1, r1);
				_this.ctx.arcTo(x1 + w1, y1 + h1, x1, y1 + h1, r1);
				_this.ctx.arcTo(x1, y1 + h1, x1, y1, r1);
				_this.ctx.arcTo(x1, y1, x1 + w1, y1, r1);
				_this.ctx.closePath();
				_this.ctx.shadowColor = "#cdcdcd";
				_this.ctx.shadowBlur = 4;
				_this.ctx.shadowOffsetX = 3;
				_this.ctx.shadowOffsetY = 5;
				_this.ctx.fill();
				_this.ctx.clip();
				_this.ctx.drawImage(_imgInfo.path, C_P, C_P, r[0], r[1]);
				_this.ctx.restore()
				// 添加头像
				x1 = C_P + 10, y1 = _strHeight - 2, w1 = p[0] * 0.8, h1 = p[1] * 0.8,
					r1 = 5;
				_this.ctx.save();
				_this.ctx.beginPath();
				// _this.ctx.arc(C_P + q[0] * 0.4, _strHeight + p[1] * 0.4, p[0] * 0.4, 0, 2 * Math.PI);
				_this.ctx.moveTo(x1 + r1, y1);
				_this.ctx.arcTo(x1 + w1, y1, x1 + w1, y1 + h1, r1);
				_this.ctx.arcTo(x1 + w1, y1 + h1, x1, y1 + h1, r1);
				_this.ctx.arcTo(x1, y1 + h1, x1, y1, r1);
				_this.ctx.arcTo(x1, y1, x1 + w1, y1, r1);
				_this.ctx.closePath();
				_this.ctx.shadowColor = "#cdcdcd";
				_this.ctx.shadowBlur = 4;
				_this.ctx.shadowOffsetX = 3;
				_this.ctx.shadowOffsetY = 5;
				_this.ctx.fill();
				_this.ctx.clip();
				_this.ctx.drawImage(_avatarUrl.path, x1, y1, p[0] * 0.8, p[1] * 0.8);
				_this.ctx.restore()
				_this.ctx.lineWidth = 3
				_this.ctx.strokeStyle = "#FFFFFF";
				_this.ctx.strokeRect(C_P, C_P, C_W - 2 * C_P, _this.canvasH - 2 * C_P);
				_this.ctx.clearRect
				_this.ctx.lineWidth = 30
				_this.ctx.strokeRect(0, 0, C_W, _this.canvasH);
				//添加头像 end

				//延迟后渲染至canvas上
				_this.ctx.draw(true, (ret) => {
					_this.$emit('hideLoading')
					setTimeout(() => {
						_this.getNewImage();
					}, 200);
				});
			},
			async getImageInfo({
				imgSrc
			}) {
				return new Promise((resolve, errs) => {
					uni.getImageInfo({
						src: imgSrc,
						success: function(image) {
							resolve(image);
						},
						fail(err) {
							errs(err);
						}
					});
				});
			},
			getNewImage() {
				uni.canvasToTempFilePath({
					canvasId: _this.canvasId,
					quality: 1,
					success: res => {
						_this.$emit('success', res);
					},
				}, this);
			}

		}
	};
</script>

<style></style>
 -->