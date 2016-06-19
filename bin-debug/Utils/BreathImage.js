/**
 * Created by rockyl on 16/3/1.
 *
 * 呼吸图片类
 * 使用了一个Tween来实现动画的驱动(你也可以通过egret的Ticker来实现驱动)，从0到2π之间循环播放。
再通过一个t属性的属性访问器来实现动画的实时“绘制”。
你可以通过锚点来控制缩放的中心位置。

       //呼吸动画采用sin
        this.bottomBtn = new BreathImage(RES.getRes("energy2_png"),2000,0.05);
        this.bottomBtn.play();
        this.bottomBtn.x = 385;
        this.bottomBtn.y = this.stageH-120;
        this.addChild(this.bottomBtn);
        this.bottomBtn.anchorOffsetX=this.bottomBtn.width/2;
        this.bottomBtn.anchorOffsetY = this.bottomBtn.height / 2;
 */
var BreathImage = (function (_super) {
    __extends(BreathImage, _super);
    function BreathImage(value, duration, offset) {
        if (duration === void 0) { duration = 2000; }
        if (offset === void 0) { offset = 0.05; }
        _super.call(this, value);
        this._duration = duration;
        this._offset = offset;
        this.init();
    }
    var d = __define,c=BreathImage,p=c.prototype;
    p.init = function () {
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
    };
    p.play = function () {
        this.t = 0;
        egret.Tween.get(this, { loop: true }).to({ t: Math.PI * 2 }, this._duration);
    };
    d(p, "t"
        ,function () { return this._t; }
        //    Math.sin(value)在一个2π周期内会从0到1，然后到-1，
        //    最后回到0，offset属性就是波动幅度，最后一个1作为常量，这样就实现在-offset到offset之间的波动。
        ,function (value) {
            this._t = value;
            this.scaleX = Math.sin(value) * this._offset + 1;
            this.scaleY = Math.sin(value - Math.PI / 2) * this._offset + 1;
        }
    );
    return BreathImage;
})(egret.Bitmap);
egret.registerClass(BreathImage,'BreathImage');
