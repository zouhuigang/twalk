/**
*
* 文字进度
* @author
*
*/
var LoadBar = (function (_super) {
    __extends(LoadBar, _super);
    function LoadBar() {
        _super.call(this);
        //进度条
        //    private loadingUI_mask:egret.Bitmap=null;
        this.bg = null;
        this.bartop = null;
        this._barbg = null;
        this.stageWidth = egret.MainContext.instance.stage.stageWidth;
        this.stageHeight = egret.MainContext.instance.stage.stageHeight;
        this.createView();
    }
    var d = __define,c=LoadBar,p=c.prototype;
    p.createView = function () {
        this.bgcont = new egret.DisplayObjectContainer();
        this.addChild(this.bgcont);
        this.barcont = new egret.DisplayObjectContainer();
        this.addChild(this.barcont);
        //背景层
        this.bg = Utils.createBitmapByName("bg_png");
        this.bg.width = this.stageWidth;
        this.bg.height = this.stageHeight;
        this.bgcont.addChild(this.bg);
        //        this.loadingUI_mask = Utils.createBitmapByName("loadingUI_mask_png");
        //        this.loadingUI_mask.width = this.stageWidth;
        //        this.loadingUI_mask.height =146;
        //        this.loadingUI_mask.anchorOffsetX=this.loadingUI_mask.width/2;
        //        this.loadingUI_mask.anchorOffsetY=this.loadingUI_mask.height/2;
        //        this.loadingUI_mask.x = this.stageWidth / 2;
        //        this.loadingUI_mask.y = this.stageHeight - 118;
        //        this.barcont.addChild(this.loadingUI_mask);
        //进度条背景
        this._barbg = Utils.createBitmapByName("loadingUI_progresBar_2_png");
        this._barbg.x = this.stageWidth / 2;
        this._barbg.y = this.stageHeight - 118;
        this._barbg.scaleX = 0.5;
        this._barbg.scaleY = 0.5;
        this._barbg.width = 570;
        this._barbg.height = 50;
        this._barbg.anchorOffsetX = this._barbg.width / 2;
        this.barcont.addChild(this._barbg);
        this.bartop = Utils.createBitmapByName("loadingUI_progresBar_1_png");
        this.bartop.x = this.stageWidth / 2;
        this.bartop.y = this.stageHeight - 118 + 11;
        this.bartop.scaleX = 0.5;
        this.bartop.scaleY = 0.5;
        this.bartop.width = 550;
        this.bartop.height = 28;
        this.bartop.anchorOffsetX = this.bartop.width / 2;
        this.bartop.anchorOffsetY = this.bartop.height / 2;
        this.barcont.addChildAt(this.bartop, 2);
        //文字加载
        this.textField = new egret.TextField();
        this.barcont.addChildAt(this.textField, 3);
        this.textField.y = this.stageHeight - 112;
        this.textField.width = 640;
        this.textField.height = 100;
        this.textField.textAlign = "center";
        this.textField.textColor = 0x4d6291;
        this.textField.size = 10;
    };
    p.setProgress = function (current, total) {
        this.maskRect = new egret.Rectangle(0, 0, (current / total) * 550, 28); //计算遮罩的大小
        this.bartop.mask = this.maskRect;
        this.textField.text = "Loading..." + current + "/" + total;
    };
    //移除
    p.hideLoadBar = function () {
        var that = this;
        this.removeChild(this);
    };
    return LoadBar;
})(egret.Sprite);
egret.registerClass(LoadBar,'LoadBar');
