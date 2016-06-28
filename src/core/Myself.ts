/**
 *定位自己显示类
 * @author 
 *
 */
module xss {

    export class Myself extends VectorElements  {
    protected viewC: egret.Sprite;
    protected view: egret.Bitmap;
    protected shape: egret.Shape;
    private headImg: egret.Bitmap;
	public constructor() {
    	  super();
    	 
     }
	
    /**添加纹理 初始化数据*/
    public addTexture(x:number,y:number) {
        this.viewC = new egret.Sprite;
        this.addChild(this.viewC);
        //获取贴图
        this.view = new egret.Bitmap(RES.getRes("point_png"));//118*178
        this.viewC.addChild(this.view);
        //缩放
        this.view.scaleX = 0.7;
        this.view.scaleY = 0.7;
         //设置描点
        this.viewC.anchorOffsetX = this.view.width / 2 * this.view.scaleX;
        this.viewC.anchorOffsetY = this.view.height * this.view.scaleY;
       
        this.viewC.x = x;
        this.viewC.y = y;
        //缓动
        TweenMax.fromTo(this.viewC,0.3,{ alpha: 0,y: this.viewC.y - 30 },{ alpha: 1,y: this.viewC.y,delay: 0.3});
        return this;

    }
    
    public imgurl(url:string){
        RES.getResByUrl(url,this.getResComplete,this,RES.ResourceItem.TYPE_IMAGE);
         
    }
    

    private getResComplete(data: any): void {
        this.headImg = new egret.Bitmap(data);
        this.headImg.width = 46;//35 66
        this.headImg.height = 46;
        this.headImg.x = this.view.x+36;//26 52
        this.headImg.y = this.view.y + 36;
        this.headImg.anchorOffsetX = this.headImg.width / 2;
        this.headImg.anchorOffsetY = this.headImg.height / 2;
        this.viewC.addChild(this.headImg);
        
        //圆形头像
        var circle: egret.Shape = new egret.Shape();
        circle.graphics.beginFill(0x0000ff);
        circle.graphics.drawCircle(this.headImg.width / 2,this.headImg.height / 2,this.headImg.width / 2);
        circle.graphics.endFill();
        circle.x = this.headImg.x;
        circle.y = this.headImg.y;
        circle.anchorOffsetX = this.headImg.width / 2;
        circle.anchorOffsetY = this.headImg.height / 2;
        this.viewC.addChild(circle);
        this.headImg.mask = circle;
    }
    
    //定位画圆
    public drawCircle(x: number,y: number) {
        this.shape= new egret.Shape()
        this.shape.graphics.beginFill(0x000800,0.3);
        this.shape.graphics.drawCircle(0,0,100);
        this.shape.graphics.endFill();
        this.addChild(this.shape);
        this.shape.x=x;
        this.shape.y=y;
        return this;
    }
    //实时刷新圆的大小和颜色
     private i:number= 0;
    private onEnterFrameCircle(advancedTime: number){
       
        if(this.i>=1){
            this.i=0;
        }else{
            this.i+=0.01;
        }
        this.shape.scaleX=this.i;
        this.shape.scaleY=this.i;
        this.shape.alpha=1-this.i;
    }
    
    
    //初始化
    public myselfmoveInit(arr: any[]){
        //数据初始化
        this.posArr = [];
        this._pathIndex = 0;
          //出现的起始路径
        this._position.x = this.viewC.x = arr[0][0];
        this._position.y = this.viewC.y = arr[0][1];
        //初始化行走距离
        //this.CurveDist=0;
          var i: number = 0;
          var len: number = arr.length;
          var v2d: Vector2D;
          for(i;i < arr.length;i++) {
              v2d = new Vector2D(arr[i][0],arr[i][1]);
              this.posArr.push(v2d);
          }
       
      }
      
//点击能量条，请求网络，触发事件
    private _Netdata: Netdata;
    private roadArr1: number[][];//我的路线[[774,849],[660,741]];
    protected roadArr2: number[][];
    private shouldkm: number = 0;
    private movepx:number=0;
    private service_now_energy:number=0;
    private unlockevent:number =0;//触法弹框的id
    private unlockCity:number=0;
    private CityEventId:number=0;
    private _ID_CityName_text_o:string='';
    public  putkm(km:number,most_km:number,obj:any){
        var urlloader = new egret.URLLoader();
        var req = new egret.URLRequest('http://www.51tywy.com/service/crossdomain/user/putkm');
        req.data = new egret.URLVariables("km=" + km + "&uid=" + StorageSetting.getItem('uid') + "&token=" + StorageSetting.getItem('token'));
        req.method = egret.URLRequestMethod.POST;
        urlloader.load(req);
        
        urlloader.addEventListener(egret.Event.COMPLETE,(e) => {
            this._Netdata = <Netdata>JSON.parse(e.target.data);
            this.roadArr1 = this._Netdata.data['MyRoadXY'];
            this.shouldkm =parseInt(this._Netdata.data['consumkm']);
            this.movepx = parseInt(this._Netdata.data['movepx']);
            this.service_now_energy = parseInt(this._Netdata.data['now_energy']);
           // obj.removeProgress(this.service_now_energy,most_km);
            
            obj.removeProgress_back(km,this.service_now_energy,most_km);
           
            
            egret.localStorage.setItem("now_energy",this.service_now_energy.toString());
            //弹框
            this.unlockevent = parseInt(this._Netdata.data['unlockevent']);
            this.unlockCity = parseInt(this._Netdata.data['unlockcity']);
            this.CityEventId = parseInt(this._Netdata.data['CityEventId']);//领取奖励
            this._ID_CityName_text_o = this._Netdata.data['f_arrive_city_name'];
            //console.dir(this._Netdata);
            //监听动画完成事件
            obj.addEventListener(MyselfEvent.ENERGY_MOVE_COMPLETE,() => {//如不要，则去掉
                //初始化自己的路径
                if(this.shouldkm > 0) {
                    //计算终点坐标
                    var Myliner: MyLinear = new MyLinear();
                    this.roadArr2 = Myliner.getEndXY(this.roadArr1,this.movepx,true);//终点坐标
                    this.myselfmoveInit(this.roadArr2);
                    this.moveStart();//移动开始
                    //监听到达事件
                    this.addEventListener(MyselfEvent.Arrived,this.StopTimer,this);
                }//end
            },this);
         

            if(this.unlockCity) {
                this.DounlockCity();
            }
            if(this.unlockevent && this.shouldkm == 0) {//处理弹框问题
                this.dispatchEventWith(QuertionListEvent.EVT_OPEN_ALERT);
                this.Dounlockevent();
            }
           
            
            
        },this);
    }

      
    //时间
    private time: number = 0;
    public moveStart(){
          //计时开始,定时器
          this.time = egret.getTimer();
          egret.startTick(this.onEnterFrame,this);
          
      }
    public stopMoveStart(){
        egret.stopTick(this.onEnterFrame,this);
    }
    
     //实时刷新
      public onEnterFrame(advancedTime: number): boolean {
        //向量刷新(移动),共用一个路径
          super.onEnterFrame(advancedTime,this.viewC);
        //console.log('计时器正在运行');
        //水波纹扩散,共用一个路径
       // super.onEnterFrame(advancedTime,this.shape);
       // this.onEnterFrameCircle(advancedTime);
        return false;
    }
    
    //停止计时
    private _i:number=0;
    public StopTimer(e:MyselfEvent){
        if(this._i){
            this._i=0;
            this.stopMoveStart();// 停止
            this.removeEventListener(MyselfEvent.Arrived,this.StopTimer,this);   
                    if(this.unlockevent){//处理弹框问题
                        this.dispatchEventWith(QuertionListEvent.EVT_OPEN_ALERT);
                        this.Dounlockevent();
                    }else{//抛出事件，到达了目的地
                        this.dispatchEventWith("arriced_bourn",false);
                    }
        }else{
            this._i+=1;
        }
        
    }
    
    
	
    //处理问题
    /**选择面板*/
    private _QUERTIONCONT: egret.DisplayObjectContainer;
   // private _quertionListUI:QuertionListUI;
    private _QuertionCommonUI: QuertionCommonUI;
    private Dounlockevent(){
        //移去点击事件 
        //console.dir(this.parent.$parent);
        this._QUERTIONCONT = new egret.DisplayObjectContainer();
        this.parent.$parent.addChild(this._QUERTIONCONT);
       // this._quertionListUI = new QuertionListUI();
        this._QuertionCommonUI = new QuertionCommonUI();
        this._QUERTIONCONT.addChild(this._QuertionCommonUI);
        this._QuertionCommonUI.eventid = this.unlockevent;
        this._QuertionCommonUI.CityEventId = this.CityEventId;
        this._QuertionCommonUI.ID_CityName_text=this._ID_CityName_text_o;
        this._QUERTIONCONT.alpha = 0;
        
         //缓动，，从-400旋转40
        TweenMax.fromTo(this._QUERTIONCONT,0.5,{ y: 0,scaleX: 0.1,alpha: 0.1,rotation: 90 },{ alpha:1,delay: 0.8,y: (egret.MainContext.instance.stage.stageHeight - 700) / 2,scaleX: 1,rotation: 0,ease: Circ.easeOut });
        //监听
        this._QuertionCommonUI.addEventListener(QuertionListEvent.EVT_CLOSE,() => {
            this.quertioncloseHandle();
        },this);
        
        //领取奖励
        this._QuertionCommonUI.addEventListener(QuertionListEvent.EVT_REAL_AWARD,(e) => {
            this.finished(e);
        },this);
        
    }
    
    //关闭问题
    private quertioncloseHandle() {
        var that = this;
        //动效
        TweenMax.to(this._QUERTIONCONT,0.3,{
            scaleX: 0.1,scaleY: 0.1,ease: Back.easeIn,onComplete: function() {
                that._QUERTIONCONT.removeChild(that._QuertionCommonUI);
               // that._QUERTIONCONT = null;
               // that.addLis();
            }
        });
        this.dispatchEventWith(QuertionListEvent.EVT_CLOSE_ALERT);
    }
    //解锁城市
    
    private DounlockCity() {
        this.dispatchEventWith(QuertionListEvent.EVT_OPENArriceNewCity_ALERT);
        
    }
   
    
    
    
    //领取奖励
    private ReceveAchievementAwardUI: ReceveAchievementAwardUI;
    private finished(e){
        var that = this;
        //动效
        TweenMax.to(this._QUERTIONCONT,0.3,{
            scaleX: 0.1,scaleY: 0.1,ease: Back.easeIn,onComplete: function() {
                
                var urlloader = new egret.URLLoader();
                var req = new egret.URLRequest('http://www.51tywy.com/service/crossdomain/achieve/receiveAchievementAward');
                req.data = new egret.URLVariables("CityEventId=" + e._eventid + "&uid=" + StorageSetting.getItem('uid') + "&token=" + StorageSetting.getItem('token'));
                req.method = egret.URLRequestMethod.POST;
                urlloader.load(req);
                urlloader.addEventListener(egret.Event.COMPLETE,(e) => {
                    this._Netdata = <Netdata>JSON.parse(e.target.data);
                    that.ReceveAchievementAwardUI.desc_text = '积分：' + this._Netdata.data['f_reward_points'] +'分';
                }
                ,this);
                that._QUERTIONCONT.removeChild(that._QuertionCommonUI);
              
                
                that.ReceveAchievementAwardUI = new ReceveAchievementAwardUI();
                //that.parent.addChild(that.ReceveAchievementAwardUI);
                that.parent.$parent.addChild(that.ReceveAchievementAwardUI);
                that.ReceveAchievementAwardUI.addEventListener(QuertionListEvent.EVT_CLOSEREWADR_ALERT,() => {
                    that.closefinished();
                },that);
                TweenMax.fromTo(that.ReceveAchievementAwardUI,0.5,{ y: 0,scaleX: 0.1,alpha: 0.1,rotation: 90 },{ alpha: 1,delay: 0.8,y: (egret.MainContext.instance.stage.stageHeight - 400) / 2,scaleX: 1,rotation: 0,ease: Circ.easeOut });
        
            }
        });
        this.dispatchEventWith(QuertionListEvent.EVT_CLOSE_ALERT);
    }
    
    
    //关闭奖励框
    private closefinished(){
        console.log("关闭问题");
        var that = this;
        TweenMax.to(this.ReceveAchievementAwardUI,0.3,{
            scaleX: 0.1,scaleY: 0.1,ease: Back.easeIn,onComplete: function() {
                that.parent.$parent.removeChild(that.ReceveAchievementAwardUI);
                // that._QUERTIONCONT = null;
                // that.addLis();
            }
        });
    }
    
    
    //end myself
 }
 
 
 
 
}