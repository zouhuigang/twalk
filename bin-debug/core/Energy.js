/**
*
* 能量条，加载进度
* @author
*
*/
var Energy = (function (_super) {
    __extends(Energy, _super);
    function Energy() {
        _super.call(this);
        this.stageWidth = egret.MainContext.instance.stage.stageWidth;
        this.stageHeight = egret.MainContext.instance.stage.stageHeight;
        /*动画版==移除能量条*/
        this.time = 0;
        this._current = 0;
        this._current_p = 0; //缓动过程
        this._t = 10; //多少秒移动完成
        this._difference_value = 0;
        this._total = 0;
        this.energyBar();
    }
    var d = __define,c=Energy,p=c.prototype;
    p.energyBar = function () {
        //进度条背景
        this.barbg = new egret.Bitmap();
        this.barbg.texture = RES.getRes("power5_png"); //198*36  448*69
        this.barbg.x = this.stageWidth / 2;
        this.barbg.y = this.stageHeight - 118;
        this.barbg.width = 480;
        this.addChild(this.barbg);
        this.barbg.anchorOffsetX = this.barbg.width / 2;
        this.barbg.scaleX = 0.7;
        this.barbg.scaleY = 0.7;
        //进度条容器
        this.sp = new egret.Sprite();
        this.addChild(this.sp);
        this.sp.x = this.stageWidth / 2 - this.barbg.width / 2 * 0.7;
        this.sp.y = this.stageHeight - 118;
        //进度条
        this.bartop = new egret.Bitmap();
        this.bartop.texture = RES.getRes("power2_png"); //182*18
        this.bartop.width = 480;
        this.bartop.scaleX = 0.7;
        this.bartop.scaleY = 0.7;
        this.sp.addChild(this.bartop);
        //var rect: egret.Rectangle = new egret.Rectangle(30,31,40,41);
        //this.bartop.scale9Grid = rect;
    };
    p.setBarProgress = function (current, total) {
        this.maskRect = new egret.Rectangle(0, 0, (current / total) * 480, 69); //计算遮罩的大小
        this.bartop.mask = this.maskRect;
        //说明文字
        this.createView(current, total);
    };
    /*移除能量条*/
    p.removeProgress = function (current, total) {
        this.removeChild(this.textField);
        this.maskRect = new egret.Rectangle(0, 0, (current / total) * 480, 69); //计算遮罩的大小
        this.bartop.mask = this.maskRect;
        //说明文字
        this.createView(current, total);
    };
    p.removeProgress_back = function (km, current, total) {
        this._total = total;
        this._current = current;
        this._current_p = km;
        this._difference_value = km - current;
        //计时开始,定时器
        this.time = egret.getTimer();
        egret.startTick(this.onEnterFrame, this);
    };
    p.onEnterFrame = function (advancedTime) {
        this._current_p = this._current_p - Math.ceil(this._difference_value / this._t);
        //console.log('正在执行缓动' + this._current_p);
        if (this._current_p <= this._current) {
            egret.stopTick(this.onEnterFrame, this);
            this.dispatchEventWith(MyselfEvent.ENERGY_MOVE_COMPLETE);
            this.removeProgress(this._current, this._total);
        }
        else {
            this.removeProgress(this._current_p, this._total);
        }
        return false;
    };
    p.createView = function (current, total) {
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.y = this.stageHeight - 108 + 4;
        this.textField.width = 640;
        this.textField.height = 100;
        this.textField.textAlign = "center";
        this.textField.size = 25;
        this.textField.textColor = 0x715d0c;
        this.textField.fontFamily = 'SimHei';
        this.textField.text = current + "/" + total + "步";
        //        return this.textField;
    };
    return Energy;
})(egret.Sprite);
egret.registerClass(Energy,'Energy');
