/**
 *
 * 世界地图类
 * @author 
 *
 */
class World extends egret.Sprite {
    private bg: egret.Bitmap;
    private back: egret.Bitmap;
    private hero: egret.Bitmap;
    /**关卡旗帜数组*/
    private flagArr: any[];
    private GuanKaConfigArr: any[];
    public constructor(garr: any[]) {
        super();
        this.GuanKaConfigArr = garr;//关卡数据
        this.init();
        
        
	}
	
   
	
	/**初始化*/
	public init(){ 
        //获取关卡数据 生成旗帜
        this.flagArr = [];
        //var arr = GuanKaConfig.getData();
        var arr=this.GuanKaConfigArr;
        var len =arr.length;
        var flag: egret.Bitmap;
        for(var i = 0;i < len;i++){
            var ispass: boolean = arr[i]["ispass"];
            var texturename = ispass ? "pin-active_png" : "pin-inactive_png";
           flag = Utils.createBitmapByName(texturename);
            this.addChild(flag);
            flag.x = arr[i]["xpos"];
            flag.y = arr[i]["ypos"];
            flag.anchorOffsetX=flag.width/2;
            flag.anchorOffsetY=flag.height;
            if(ispass){
               // flag.touchEnabled = true;
               // flag.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.choseGuanka,this);
            }
            
            
            this.addChild(flag);
            this.flagArr.push(flag);
            
           
        }
        //旗帜动画
        for(var i = 0;i < this.flagArr.length;i++){
            TweenMax.fromTo(this.flagArr[i],0.3,{alpha:0,y:this.flagArr[i].y-30},{alpha:1,y:this.flagArr[i].y,delay:i*0.1+1});
        }
        
	}
	
    /**选择面板*/
    private choseGuanka(e: egret.TouchEvent) {
        //Main.curIdx = this.flagArr.indexOf(e.currentTarget);
        //取消旗帜侦听
        this.removeLis();
        //出现选择面板
        this.showXZ();
    }
	
	/**取消旗帜侦听*/
	private removeLis(){
        var i: number;
        var flag: any;
        for(var i = 0;i < this.flagArr.length;i++){
            flag = this.flagArr[i];
            flag.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.choseGuanka,this);
        }
	}
	/**恢复旗帜侦听*/
    private addLis(){
        var i: number;
        var flag: any;
        for(var i = 0;i < this.flagArr.length;i++){
            flag = this.flagArr[i];
            flag.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.choseGuanka,this);
        }
    }
   
    

    /**创建选择面板*/
    /**选择面板*/
    private xzmb: egret.DisplayObjectContainer;
    /**选择背景*/
    private gkxz: egret.Bitmap;
    /**故事模式按钮*/
    private gushi: egret.Bitmap;
    /**无尽模式按钮*/
    private wujin: egret.Bitmap;
    /**关闭按钮*/
    private _city:CityUI;
    /**无尽模式记录文本*/
    private txt: egret.BitmapText;
    private gktxt: egret.BitmapText;
    private button:eui.Button;
    private showXZ() {
        this.xzmb = new egret.DisplayObjectContainer();
        this.parent.$parent.addChild(this.xzmb);
        this.xzmb.x = 0;
        this.xzmb.width=480;
        this.xzmb.height=545;
        this.xzmb.y=egret.MainContext.instance.stage.stageHeight;
        this._city = new CityUI();
        this.xzmb.addChild(this._city);
        //监听
        this._city.addEventListener(CityEvent.EVT_CLOSE,() => {
            this.closeHandle();
        },this);
          //动效
          TweenMax.fromTo(this.xzmb,2,{ alpha: 0,y: this.xzmb.y },{ alpha: 1,y: this.xzmb.y - this.xzmb.height });
      
    }
	

    
    /**关闭选择面板*/
    private closeHandle() {
        //get_xx_png.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.closeHandle,this);
//        this.gushi.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.gushiHandle,this);
//        if(this.wujin.hasEventListener(egret.TouchEvent.TOUCH_BEGIN))
//            this.wujin.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.wujinHandle,this);

        var that = this;
        //动效
        TweenMax.to(this.xzmb,0.3,{
            scaleX: 0.1,scaleY: 0.1,ease: Back.easeIn,onComplete: function() {
                that.parent.$parent.removeChild(that.xzmb);
                that.xzmb = null;
                that.addLis();
            }
        });
    }

    

    /*
    * 清除
    */
    public destroy() {
       // RES.destroyRes("ResGroupmaps");
        TweenMax.killChildTweensOf(this);
        for(var i = 0;i < this.flagArr.length;i++) {
            this.flagArr[i].removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.choseGuanka,this);
        }
    }


}
