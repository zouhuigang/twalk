/**
 *
 * @author 
 *问题弹窗处理
 */
class ReceveAchievementAwardUI extends eui.Component{
    //舞台宽高
    private stageW: number = 0;
    private stageH: number = 0;
	public constructor() {
    	super();
    	
        this.addEventListener(eui.UIEvent.COMPLETE,this.StartAnswer,this);
        this.skinName = "resource/skins/receiveAchievementAwardSkin.exml";
        this.stageH = egret.MainContext.instance.stage.stageHeight;
        this.stageW = egret.MainContext.instance.stage.stageWidth;
	}
	
    private ID_receiveAchievementAward_button:eui.Label;
    private ID_quertionclose_png:eui.Image;//关闭按钮
    private combineBtn:CombineBtn;
    private ID_QuertionCommonIcon: eui.Image;
    private ID_CityName:eui.Label;//标题
    private ID_receiveAchievementAward_label:eui.Label;
    
    private share_b:egret.Bitmap=null;//分享图标
    private Ikonw_b:egret.Bitmap=null;
    private StartAnswer() {
        //this.ID_receiveAchievementAward_button["baseImage"].source = RES.getRes("promotion-btn_png");
        
        //分享按钮
        this.share_b = Utils.createBitmapByName("share-btn_png");
        this.share_b.x=332;//322
        this.share_b.y = 450;
        this.addChild(this.share_b);
        this.share_b.scaleX = 0.4;
        this.share_b.scaleY = 0.4;
        this.share_b.touchEnabled = true;
        this.share_b.addEventListener(egret.TouchEvent.TOUCH_TAP,this.shareWind,this);
        
        //我知道了
        this.Ikonw_b = Utils.createBitmapByName("iknow-btn_png");
        this.Ikonw_b.x = 80;//138
        this.Ikonw_b.y = 450;
        this.addChild(this.Ikonw_b);
        this.Ikonw_b.scaleX = 0.4;
        this.Ikonw_b.scaleY = 0.4;
        
        this.Ikonw_b.touchEnabled = true;
        this.Ikonw_b.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick_close,this);
    }

    private shareWind(){
        this.dispatchEventWith(QuertionListEvent.EVT_CLOSEREWADR_ALERT);//关闭弹窗
        var context = egret.MainContext.instance;
        context.stage.dispatchEventWith("shareOpen",false);//分享
    
    }
    
    private onclick_close() {
        this.dispatchEventWith(QuertionListEvent.EVT_CLOSEREWADR_ALERT);
    }
    
    //说明文字
    private _desc_text: string = '';
    public set desc_text(value: string) {
         this._desc_text = value;
         this.ID_receiveAchievementAward_label.text = this._desc_text;
        //console.log(this._ID_CityName_text);
    }
    public get desc_text(): string {
        return this._desc_text;
    }
    
   
    
    
    
}
