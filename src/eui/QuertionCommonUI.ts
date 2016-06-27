/**
 *
 * @author 
 *问题弹窗处理
 */
class QuertionCommonUI extends eui.Component{
    //舞台宽高
    private stageW: number = 0;
    private stageH: number = 0;
	public constructor() {
    	super();
    	
        this.addEventListener(eui.UIEvent.COMPLETE,this.StartAnswer,this);
        this.skinName = "resource/skins/QuertionCommonSkin.exml";
        this.stageH = egret.MainContext.instance.stage.stageHeight;
        this.stageW = egret.MainContext.instance.stage.stageWidth;
	}
	
    private ID_Buttons:eui.Button;
    private ID_quertionclose_png:eui.Image;//关闭按钮
    private combineBtn:CombineBtn;
    private ID_QuertionCommonIcon: eui.Image;
    private ID_CityName:eui.Label;//标题
    private StartAnswer() {
        this.ID_quertionclose_png.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick_close,this);
        //this.ID_Buttons["baseImage"].source = RES.getRes("start-btn_png");
        this.ID_Buttons['baseImage'].source = RES.getRes("start-btn_png");
        this.ID_Buttons['baseImage'].width=200*1.5;
        this.ID_Buttons['baseImage'].height=50*1.5;
        this.ID_Buttons.touchEnabled=true;
        this.ID_Buttons.addEventListener(egret.TouchEvent.TOUCH_TAP,this.StartAnswerAlert,this);
    }

    private onclick_close() {
        this.dispatchEventWith(QuertionListEvent.EVT_CLOSE);
    }
    
    
    /*
        * 开始答题*/
    private _quertionListUI: QuertionListUI;
    private ID_group:eui.Group;
    private StartAnswerAlert() {
         var that = this;
        TweenMax.to(that.ID_group,0.01,{ alpha: 0,onComplete:function(){
            that.AnswerList();
            }
        });
        
        
        
        
    }
    
    private firstEventId:number =0;
    private AnswerList(){
        this._quertionListUI = new QuertionListUI(this._eventid);
        this._quertionListUI.alpha=0;
        this.addChild(this._quertionListUI);
       // console.log(this);
        this._quertionListUI.addEventListener(QuertionListEvent.EVT_CORRECT_ALERT,() => {
            this.CorrectAlert();
        },this);//监听回答正确事件
        this._quertionListUI.addEventListener(QuertionListEvent.EVT_ERROR_ALERT,(e) => {
           this.firstEventId=parseInt(e._rewardInfo['firstEventId']);
           this.ErrorAlert();
        },this);//监听回答错误事件
        this._quertionListUI.addEventListener(QuertionListEvent.EVT_NEXTEVENT_ALERT,(e) => {
            
            var that = this;
            TweenMax.to(that._quertionListUI,0.5,{alpha: 1,y: -1000,delay:0.2
                ,onComplete: function() {
                    that.removeChild(that._quertionListUI);
                    that._eventid = e._eventid;
                    that.StartAnswerAlert();
                 }
                });
        },this);//监听下一题事件
        TweenMax.fromTo(this._quertionListUI,0.3,{ alpha: 0,y: -4000 },{ alpha: 1,y: 0,delay: 0.3 });
    }
    
    //回答正确
    private CorrectAlert() {
        this._quertionListUI.removeEventListener(QuertionListEvent.EVT_CORRECT_ALERT,() => {
            this.CorrectAlert();
        },this);
        this._quertionListUI.removeEventListener(QuertionListEvent.EVT_ERROR_ALERT,() => {
            this.ErrorAlert();
        },this);
        
        this.ID_Buttons.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.StartAnswerAlert,this);
        
        var that = this;
        TweenMax.to(that._quertionListUI,0.3,{
            scaleX: 0.1,scaleY: 0.1,ease: Back.easeIn,delay:0.2,onComplete: function() {
                that.removeChild(that._quertionListUI);
                that._quertionListUI = null;
                that.ID_Buttons["baseImage"].source = RES.getRes("promotion-btn_png");
                that.ID_QuertionCommonIcon.source = RES.getRes("finished_png");
                that.ID_CityName.text="恭喜您";
                that.ID_Buttons.addEventListener(egret.TouchEvent.TOUCH_TAP,that.receiveAchievementAward,that);
                
                TweenMax.fromTo(that.ID_group,0.3,{ alpha: 0,y: -4000 },{ alpha: 1,y: 0,delay: 0.3 });
            }
        });
       
        
       
    }
    
    private receiveAchievementAward(){
     //alert('领取成功');
        //xx地点领取奖励
        var _QuertionListEvent: QuertionListEvent = new QuertionListEvent(QuertionListEvent.EVT_REAL_AWARD,this._CityEventId);
        //发送要求事件
        this.dispatchEvent(_QuertionListEvent);
     
    }
    
    //回答错误
    private ErrorAlert(){
        this._quertionListUI.removeEventListener(QuertionListEvent.EVT_ERROR_ALERT,() => {
            this.ErrorAlert();
        },this);
        this._quertionListUI.removeEventListener(QuertionListEvent.EVT_CORRECT_ALERT,() => {
            this.CorrectAlert();
        },this);
        
        this.ID_Buttons.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.StartAnswerAlert,this);//移除按钮
        var that = this;
        TweenMax.to(that._quertionListUI,0.3,{
            scaleX: 0.1,scaleY: 0.1,ease: Back.easeIn,delay:0.2,onComplete: function() {
                that.removeChild(that._quertionListUI);
                that._quertionListUI = null;
                that.ID_Buttons["baseImage"].source = RES.getRes("restart-btn_png");
                that.ID_QuertionCommonIcon.source = RES.getRes("failed-bg_png");
               // var uid: string = egret.localStorage.getItem('uid');
                that.ID_CityName.text = "SORRY";
                
                that.ID_Buttons.addEventListener(egret.TouchEvent.TOUCH_TAP,that.restartAnser,that);
                TweenMax.fromTo(that.ID_group,0.3,{ alpha: 0,y: -4000 },{ alpha: 1,y: 0,delay: 0.3});
            }
        });

    }
	
    //重新开始回答
    private restartAnser(){
       // console.dir(this);
        //this.removeChild(this._quertionListUI);
        this._eventid = this.firstEventId;
        this.StartAnswerAlert();
    }
    
    /**事件ID变动*/
    protected _eventid: number;
    public set eventid(value: number) {
        this._eventid = value;
    }
    public get eventid(): number {
        return this._eventid;
    }
    
    /*城市事件地点ID变动*/
    private _CityEventId:number=0;
    public set CityEventId(value: number) {
        this._CityEventId = value;
    }
    public get CityEventId(): number {
        return this._CityEventId;
    }
    
    //标题变化
    private _ID_CityName_text:string='';
    public set ID_CityName_text(value: string) {
        
        this._ID_CityName_text = value+'人民欢迎您';
        this.ID_CityName.text = this._ID_CityName_text;
        //console.log(this._ID_CityName_text);
    }
    public get ID_CityName_text(): string {
        return this._ID_CityName_text;
    }
    
    
    
    
}
