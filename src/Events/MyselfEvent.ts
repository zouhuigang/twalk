/**
*
* 定位点points事件
* @author 
*
*/
class MyselfEvent extends egret.Event {
    public static HIDETOOL: string = "hidetool";
    public static Arrived: string = "arrived";//points到达指定点事件
    public static ENERGY_MOVE_COMPLETE: string = "ENERGY_MOVE_COMPLETE";//能量条动画移动完成事件
    
    private _obj: any;
    public constructor(type:string, obj:any=null,  bubbles:boolean=false, cancelable:boolean=false) {
        super(type,bubbles,cancelable);
        this._obj = obj;
    }
    public get obj():any{
        return this._obj;
    }
}
