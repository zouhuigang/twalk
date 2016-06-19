/**
 *
 * @author
 *解锁新城市
 */
var ArrivedNewCityUI = (function (_super) {
    __extends(ArrivedNewCityUI, _super);
    function ArrivedNewCityUI() {
        _super.call(this);
        //舞台宽高
        this.stageW = 0;
        this.stageH = 0;
        this.addEventListener(eui.UIEvent.COMPLETE, this.StartAnswer, this);
        this.skinName = "resource/skins/ArriveNewCitySkin.exml";
        this.stageH = egret.MainContext.instance.stage.stageHeight;
        this.stageW = egret.MainContext.instance.stage.stageWidth;
    }
    var d = __define,c=ArrivedNewCityUI,p=c.prototype;
    p.StartAnswer = function () {
        //this.ID_receiveAchievementAward_button["baseImage"].source = RES.getRes("promotion-btn_png");
        this.ID_ArriveNewCity_button.touchEnabled = true;
        this.ID_ArriveNewCity_button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_close, this);
    };
    p.onclick_close = function () {
        this.dispatchEventWith(QuertionListEvent.EVT_CLOSArriceNewCity_ALERT);
    };
    return ArrivedNewCityUI;
})(eui.Component);
egret.registerClass(ArrivedNewCityUI,'ArrivedNewCityUI');
