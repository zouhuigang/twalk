/**
 *
 * @author 
 *
 */class QuertionListEvent extends egret.Event {    public static EVT_CLOSE: string = "EVT_CLOSE";    public static EVT_LOAD_PAGE: string = "EVT_LOAD_PAGE";    public static EVT_CLOSE_ABOUT: string = "EVT_CLOSE_ABOUT";
    public static EVT_OPEN_ALERT: string = "EVT_OPEN_ALERT";//弹窗，开始答题
    public static EVT_CLOSE_ALERT: string = "EVT_CLOSE_ALERT";//关闭弹窗,结束答题
    public static EVT_CORRECT_ALERT: string = "EVT_CORRECT_ALERT";//回答正确
    public static EVT_ERROR_ALERT: string = "EVT_ERROR_ALERT";//回答错误
    public static EVT_AWARD_ALERT: string = "EVT_AWARD_ALERT";//回答正确，领取奖励
    public static EVT_NEXTEVENT_ALERT:string = "EVT_NEXTEVENT_ALERT";//下一题
    public static EVT_REAL_AWARD: string = "EVT_REAL_AWARD";//真实领取奖励请求数据
    public static EVT_CLOSEREWADR_ALERT: string = "EVT_CLOSEREWADR_ALERT";//关闭奖励
    public static EVT_OPENArriceNewCity_ALERT: string = "EVT_OPENArriceNewCity_ALERT";//抵达新城市弹窗
    public static EVT_CLOSArriceNewCity_ALERT: string = "EVT_CLOSArriceNewCity_ALERT";//关闭抵达新城市弹窗
    
    private _eventid: number = 0;
    private _rewardInfo:any=null;
    public constructor(type:string,eventid: number = 0,arr:any="",bubbles: boolean = false,cancelable: boolean = false) {
        super(type,bubbles,cancelable);
        this._eventid = eventid;
        this._rewardInfo = arr;
    }

    public get eventid(): number {
        return this._eventid;
    }
    
    public get arr():any{
        return this._rewardInfo;
    }
    }
