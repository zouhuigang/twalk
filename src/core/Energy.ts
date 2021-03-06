/**
* 
* 能量条，加载进度
* @author 
* 
*/
class Energy extends egret.Sprite {

    public constructor() {
        super();
        this.energyBar();
    }
    
    //进度条
    private bg: egret.Bitmap;
    private barbg: egret.Bitmap;
    private bartop: egret.Bitmap;
    private btn: egret.Bitmap;
    private sp: egret.DisplayObjectContainer;
    private stageWidth: number = egret.MainContext.instance.stage.stageWidth;
    private stageHeight: number = egret.MainContext.instance.stage.stageHeight;
    
    private energyBar():void{
        //进度条背景
        this.barbg = new egret.Bitmap();
        this.barbg.texture = RES.getRes("power5_png");//198*36  448*69
        this.barbg.x = this.stageWidth / 2;
        this.barbg.y = this.stageHeight - 118;
        this.barbg.width=480;
        this.addChild(this.barbg);
        this.barbg.anchorOffsetX =this.barbg.width / 2;
        this.barbg.scaleX=0.7;
        this.barbg.scaleY = 0.7;
        
        //进度条容器
        this.sp = new egret.Sprite();
        this.addChild(this.sp);
        
        this.sp.x = this.stageWidth / 2 - this.barbg.width / 2*0.7;
        this.sp.y = this.stageHeight - 118;
        //进度条
        this.bartop = new egret.Bitmap();
        this.bartop.texture = RES.getRes("power2_png");//182*18
        this.bartop.width = 480;
        this.bartop.scaleX = 0.7;
        this.bartop.scaleY = 0.7;
        this.sp.addChild(this.bartop);
        //var rect: egret.Rectangle = new egret.Rectangle(30,31,40,41);
        //this.bartop.scale9Grid = rect;
    }

    /*
      * 设置能量进度条
      */
    private maskRect: egret.Rectangle;//用来盖住显示对象的进度条
    public setBarProgress(current,total): void {
        this.maskRect = new egret.Rectangle(0,0,(current / total) * 480,69);//计算遮罩的大小
        this.bartop.mask = this.maskRect;
        //说明文字
        this.createView(current,total);
    }
    
      /*移除能量条*/
    public removeProgress(current,total) {
        this.removeChild(this.textField);
        this.maskRect = new egret.Rectangle(0,0,(current / total) * 480,69);//计算遮罩的大小
        this.bartop.mask = this.maskRect;
        //说明文字
        this.createView(current,total);
    }
    
    
    /*动画版==移除能量条*/
    private time: number = 0;
    private _current:number=0;
    private _current_p: number = 0;//缓动过程
    private _t:number=10;//多少秒移动完成
    private _difference_value:number=0;
    private _total: number = 0;
    public removeProgress_back(km,current,total){
        this._total = total;
        this._current=current;
        this._current_p = km;
        this._difference_value=km-current;
        //计时开始,定时器
        this.time = egret.getTimer();
        egret.startTick(this.onEnterFrame,this);
    }
    
    private onEnterFrame(advancedTime: number):boolean{
        
        this._current_p = this._current_p - Math.ceil(this._difference_value / this._t);
        //console.log('正在执行缓动' + this._current_p);
        if(this._current_p <= this._current){
            egret.stopTick(this.onEnterFrame,this);
            this.dispatchEventWith(MyselfEvent.ENERGY_MOVE_COMPLETE);
            this.removeProgress(this._current,this._total);
        }else{
            this.removeProgress(this._current_p,this._total);
        }
        
        
        return false;     
    }
    
    
    
    private textField: egret.TextField;
    private createView(current,total) {
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.y = this.stageHeight-108+4;
        this.textField.width = 640;
        this.textField.height = 100;
        this.textField.textAlign = "center";
        this.textField.size=25;
        this.textField.textColor = 0x715d0c;
        this.textField.fontFamily ='SimHei';
        this.textField.text = current + "/" + total+"步";
//        return this.textField;
    }

}
