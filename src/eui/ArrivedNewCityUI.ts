
/**
 *
 * @author 
 *解锁新城市
 */
class ArrivedNewCityUI extends eui.Component {
    //舞台宽高
    private stageW: number = 0;
    private stageH: number = 0;
    public constructor() {
        super();

        this.addEventListener(eui.UIEvent.COMPLETE,this.StartAnswer,this);
        this.skinName = "resource/skins/ArriveNewCitySkin.exml";
        this.stageH = egret.MainContext.instance.stage.stageHeight;
        this.stageW = egret.MainContext.instance.stage.stageWidth;
    }

    private ID_ArriveNewCity_button: eui.Button;
    private ID_quertionclose_png: eui.Image;//关闭按钮
    private combineBtn: CombineBtn;
    private ID_QuertionCommonIcon: eui.Image;
    private ID_CityName: eui.Label;//标题
    private StartAnswer() {
        //this.ID_receiveAchievementAward_button["baseImage"].source = RES.getRes("promotion-btn_png");
        this.ID_ArriveNewCity_button.touchEnabled = true;
        this.ID_ArriveNewCity_button.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick_close,this);
    }

    private onclick_close() {
        this.dispatchEventWith(QuertionListEvent.EVT_CLOSArriceNewCity_ALERT);
    }






}
