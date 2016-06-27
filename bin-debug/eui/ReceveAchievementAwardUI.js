/**
 *
 * @author
 *问题弹窗处理
 */
var ReceveAchievementAwardUI = (function (_super) {
    __extends(ReceveAchievementAwardUI, _super);
    function ReceveAchievementAwardUI() {
        _super.call(this);
        //舞台宽高
        this.stageW = 0;
        this.stageH = 0;
        this.share_b = null; //分享图标
        this.Ikonw_b = null;
        //说明文字
        this._desc_text = '';
        this.addEventListener(eui.UIEvent.COMPLETE, this.StartAnswer, this);
        this.skinName = "resource/skins/receiveAchievementAwardSkin.exml";
        this.stageH = egret.MainContext.instance.stage.stageHeight;
        this.stageW = egret.MainContext.instance.stage.stageWidth;
    }
    var d = __define,c=ReceveAchievementAwardUI,p=c.prototype;
    p.StartAnswer = function () {
        //this.ID_receiveAchievementAward_button["baseImage"].source = RES.getRes("promotion-btn_png");
        //分享按钮
        this.share_b = Utils.createBitmapByName("share-btn_png");
        this.share_b.x = 332; //322
        this.share_b.y = 450;
        this.addChild(this.share_b);
        this.share_b.scaleX = 0.4;
        this.share_b.scaleY = 0.4;
        this.share_b.touchEnabled = true;
        this.share_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shareWind, this);
        //我知道了
        this.Ikonw_b = Utils.createBitmapByName("iknow-btn_png");
        this.Ikonw_b.x = 80; //138
        this.Ikonw_b.y = 450;
        this.addChild(this.Ikonw_b);
        this.Ikonw_b.scaleX = 0.4;
        this.Ikonw_b.scaleY = 0.4;
        this.Ikonw_b.touchEnabled = true;
        this.Ikonw_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_close, this);
    };
    p.shareWind = function () {
        this.dispatchEventWith(QuertionListEvent.EVT_CLOSEREWADR_ALERT); //关闭弹窗
        var context = egret.MainContext.instance;
        context.stage.dispatchEventWith("shareOpen", false); //分享
    };
    p.onclick_close = function () {
        this.dispatchEventWith(QuertionListEvent.EVT_CLOSEREWADR_ALERT);
    };
    d(p, "desc_text"
        ,function () {
            return this._desc_text;
        }
        ,function (value) {
            this._desc_text = value;
            this.ID_receiveAchievementAward_label.text = this._desc_text;
            //console.log(this._ID_CityName_text);
        }
    );
    return ReceveAchievementAwardUI;
})(eui.Component);
egret.registerClass(ReceveAchievementAwardUI,'ReceveAchievementAwardUI');
