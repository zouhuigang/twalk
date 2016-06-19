/**
 *
 * @author 
 *
 */
class CelebrateEvent extends egret.Event{
    public static EVT_CLOSE: string = "EVT_CLOSE";//关闭事件
    public constructor(type: string,bubbles: boolean = false,cancelable: boolean = false) {
        super(type,bubbles,cancelable);
        //this._resName = resName;
    }
}
