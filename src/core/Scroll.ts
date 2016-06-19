/**
 * Created by xiashishi on 15/6/18.
 */
interface Netdata {
    data: Object;
    info: string;
    status: number;
}
module xss
{

export class Scroll extends egret.Sprite
{
    //能量条
    private now_energy: number = 0;
    private most_energy: number = 0;
    
    private PostNet:RequestNetWork;
    private _Netdata: Netdata;
    private _isfirst:number=0;
    private _headimgUrl:string;
    constructor()
    {
        super();
        var urlloader = new egret.URLLoader();
        var req = new egret.URLRequest('http://www.51tywy.com/service/crossdomain/index/init');
        req.data = new egret.URLVariables("uid=" + StorageSetting.getItem('uid') + "&token=" + StorageSetting.getItem('token'));
        req.method = egret.URLRequestMethod.POST;
        urlloader.load(req);
        urlloader.addEventListener(egret.Event.COMPLETE,(e) => {
            this._Netdata = <Netdata>JSON.parse(e.target.data);
            //console.dir(this._Netdata);//请求到的网络
            this.myselfLocationX = parseFloat(this._Netdata.data['myselfLocationX']);//可能转过来的是字符串，所以得转换下类型，否则后面会报错
            this.myselfLocationY = parseFloat(this._Netdata.data['myselfLocationY']);//可能转过来的是字符串，所以得转换下类型，否则后面会报错
            this.now_energy = parseInt(this._Netdata.data['now_energy']);
            egret.localStorage.setItem("now_energy",this.now_energy.toString());
            this.most_energy = this._Netdata.data['most_energy'];
            this._isfirst = parseInt(this._Netdata.data['isfirst']);
            this._headimgUrl = this._Netdata.data['photo'];
            this.init();
        },this);
       
        
 
    }
    



    //图片资源
    private bg:egret.Bitmap = null;
    private myself: Myself;
    //显示容器
    public bgcontent: egret.Sprite=null;

    //舞台宽高
    private stageW:number = 0;
    private stageH:number = 0;

    //按钮
    private leftBtn: egret.Bitmap = null;
    private rightBtn: egret.Bitmap = null;
    private topBtn: egret.Bitmap = null;
    //private bottomBtn: egret.Bitmap= null;
    private bottomBtn:egret.Bitmap=null;
    
    //我自己的位置
    private myselfLocationX: number =0;
    private myselfLocationY: number =0;
    //能量条
    private _energy: Energy = null;
    //声音控制
    private soundbg:egret.Bitmap=null;
    //城市点
    public _World: World;
    //引导点
    private _Hollowed: HollowedOutLayer=null;
    //分享
    private share:egret.Bitmap=null;
    //返回APP
    private backToApp:egret.Bitmap=null;
    private init()
    {
 
        this.stageH = egret.MainContext.instance.stage.stageHeight;
        this.stageW = egret.MainContext.instance.stage.stageWidth;
        
        //添加显示容器
        this.bgcontent = new egret.Sprite();
        this.addChild(this.bgcontent);
        //添加背景
        this.bg = new egret.Bitmap(RES.getRes("map-js_png"));
        this.bgcontent.addChild(this.bg);
        this.bg.width=0.5*this.bg.width;
        this.bg.height=0.5*this.bg.height;
     
        
        //分享
        this.share = new egret.Bitmap(RES.getRes("share_png"));
        this.share.touchEnabled=true;
        this.share.scaleX=0.8;
        this.share.scaleY = 0.8;
        this.share.x = 5;
        this.share.y = 105;
        this.share.addEventListener(egret.TouchEvent.TOUCH_TAP,this.shareF,this);
        this.addChild(this.share);

        var i=this.share.y;
        egret.Tween.get(this.share,{loop: !0}).to({y: i - 5},500).to({y: i},500);
        //返回APP
        this.backToApp = new egret.Bitmap(RES.getRes("back_png"));
        this.backToApp.touchEnabled = true;
        this.backToApp.addEventListener(egret.TouchEvent.TOUCH_TAP,this.backToAppF,this);
        this.backToApp.scaleX = 0.8;
        this.backToApp.scaleY = 0.8;
        this.backToApp.x=5;
        this.backToApp.y=5;
        this.addChild(this.backToApp);
        
        
       
        //插入关卡图标
        var arrObject: any[] = this._Netdata.data['cityXY'];
        this._World = new World(arrObject);
        this.bgcontent.addChild(this._World);
        
   
        
        //定位自己
        this.myself = new Myself();
        this.bgcontent.addChild(this.myself);
        this.myself.addTexture(this.myselfLocationX,this.myselfLocationY);
        this.myself.imgurl(this._headimgUrl);
        var ii = this.myself.y;
        egret.Tween.get(this.myself,{ loop: !0 }).to({ y: ii - 5 },500).to({ y: ii },500);
         
        //播放音效
        //this.changeSoundbgImage();
        
        //能量条
        this._energy=new Energy();
        this.addChild(this._energy);
        this._energy.setBarProgress(this.now_energy,this.most_energy);
       
        //小人
        this.bottomBtn = new egret.Bitmap(RES.getRes("power3_png"));
        this.bottomBtn.x = this.stageW -210;
        this.bottomBtn.y = this.stageH - 100;
        this.bottomBtn.alpha=0;
        this.addChild(this.bottomBtn);
        this.bottomBtn.anchorOffsetX = this.bottomBtn.width / 2;
        this.bottomBtn.anchorOffsetY = this.bottomBtn.height / 2;
        egret.Tween.get(this.bottomBtn,{ loop: !0 }).to({ scaleX: 0.9,scaleY: 0.9 },1000).to({ scaleX: 1,scaleY: 1},1000);
        var that = this;
        TweenMax.to(this.bottomBtn,0.3,{alpha:1,ease: Sine.easeInOut,delay:0.1,
            onComplete: function() {
            if(that._isfirst){
            var xx=430;
            var yy = that.stageH - 100;
            var rad=25;
            that._Hollowed=new HollowedOutLayer(xx,yy,rad,0.8);
            that.addChild(that._Hollowed);
            }
            }
        
        });
        

        //触摸移动
        this.bgcontent.touchEnabled = true;
        this.bgcontent.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.moveStart,this);
        this.bgcontent.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.move,this);
        this.bgcontent.addEventListener(egret.TouchEvent.TOUCH_END,this.moveEnd,this);
    
        
        //点击能量兑换按钮
        this.bottomBtn.touchEnabled = true;
        this.bottomBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegin,this);
        this.bottomBtn.addEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this);
      
     
        //测试手势
        if(egret.MainContext.deviceType == egret.MainContext.DEVICE_PC) {
            var btn: TestGesture = new TestGesture();
            btn.addEventListener(egret.TouchEvent.TOUCH_END,this.toggleButtonHandler,this);
            this.addChild(btn);
            btn.x = this.stageW - btn.width;
            this.btn = btn;
        }
        this.testGesture();
        
        
        //默认显示2倍
//        this.bgcontent.scaleX = 1.5;
//        this.bgcontent.scaleY = 1.5;
//        this.bgcontent.width = this.bg.width * 1.5;
//        this.bgcontent.height = this.bg.height * 1.5;
        //定位容器初始化显示位置
        //this.bgcontent.x = this.stageW/2-this.myselfLocationX;
        //this.bgcontent.y = this.stageH/2-this.myselfLocationY;
        this.Locator(this.myselfLocationX,this.myselfLocationY);
      
    }
    
    
    
    private testGesture(): void {
        //设置
        if(egret.MainContext.deviceType == egret.MainContext.DEVICE_PC) {
            neoges.GestureManager.showTouchPoint = true;//PC端测试多点操作用，手机测试请设置false
        }
         //Pinch(二指往內或往外拨动，平时经常用到的缩放)
        var tap3: neoges.PinchGesture = new neoges.PinchGesture(this.bgcontent);
        tap3.addEventListener(neoges.GestureEvent.BEGAN,this.onPinchBegan,this);
        tap3.addEventListener(neoges.GestureEvent.UPDATE,this.onPinchUpdate,this);
        tap3.addEventListener(neoges.GestureEvent.ENDED,this.onPinchEnd,this);
       
    }
    
    /**测试手势*/
    private isMultiMode: boolean = false;
    private btn: TestGesture;//手势单点或多点按钮
    private toggleButtonHandler(evt: egret.TouchEvent): void {
        this.isMultiMode = !this.isMultiMode;
        this.btn.setLabel(this.isMultiMode ? "多点模式" : "单点模式");
        neoges.GestureManager.simulateMultitouch = this.isMultiMode;//PC端测试多点操作用，手机测试请设置false
    }
    /**pinch*/
    private startScaleValue: number;
    private onPinchBegan(event: neoges.GestureEvent): void {
        //this.showMsg("pinch began on " + event.host.name);
        this.startScaleValue = this.bgcontent.scaleX;

    }
    /**pinch*/

    private onPinchUpdate(event: neoges.GestureEvent): void {
        console.log("pinch update " + event.value);
        this.bgcontScale(event.value);//只放大，不缩小
    }
    /**pinch*/
    private onPinchEnd(event: neoges.GestureEvent): void {
       // this.showMsg("pinch end on " + event.host.name);
    }
    //地图背景缩放处理只放大，不缩小
    private bgcontScale(scaleNumber: number) {
        //缩放阈值
        
        if(this.startScaleValue * scaleNumber * this.bgcontent.width > this.bgcontent.width) {
            this.bgcontent.scaleX = this.startScaleValue * scaleNumber;
            this.bgcontent.scaleY = this.bgcontent.scaleX;
            this.bgcontent.height = this.bg.height * this.bgcontent.scaleY;
            this.bgcontent.width = this.bg.width * this.bgcontent.scaleX;
         
            if(this.bgcontent.scaleY * this.bgcontent.height <= this.stageH - this.bgcontent.y) {//限制最小缩放
                this.bgcontent.scaleY = (this.stageH - this.bgcontent.y) / this.bgcontent.height;
                this.bgcontent.height = this.bg.height * this.bgcontent.scaleY;
            }

            if(this.bgcontent.scaleX * this.bgcontent.width <= this.stageW - this.bgcontent.x) {//限制最小缩放
                this.bgcontent.scaleX = (this.stageW - this.bgcontent.x) / this.bgcontent.width;
                this.bgcontent.width = this.bg.width * this.bgcontent.scaleX;
            }
            
            //限制最大放大倍数
            if(this.bgcontent.width > this.bg.width*3){
                this.bgcontent.scaleX = 3;
                this.bgcontent.width = this.bg.width * 3;
            }
           
            if(this.bgcontent.height > this.bg.height * 3) {
                this.bgcontent.scaleY = 3;
                this.bgcontent.height = this.bg.height * 3;
            }
           // console.log('wo'+this.bgcontent.width,this.bgcontent.height);
        }



    }
   
    //分享
    private _share:Share=null;
    private shareF(){
        this.Scroll_touch_close();
        this._share = new Share();
        this.addChild(this._share);
        this._share.getNet();
        
         //监听关闭事件
        this.stage.addEventListener("jsNotifyts",this.doTsMethod,this);
        
    }
    
    private doTsMethod(){
        this.Scroll_touch_open();
       this.removeChild(this._share);
       this._share=null;
    }
    //关闭触摸事件，舞台
    private Scroll_touch_close(){
        this.bgcontent.touchEnabled = false;
        this.myself.touchEnabled=false;
        this.bottomBtn.touchEnabled=false;
    }
    //移除舞台触摸事件
    private Scroll_touch_open(){
        this.bgcontent.touchEnabled = true;
        this.myself.touchEnabled = true;
        this.bottomBtn.touchEnabled = true;
    }
    
    

    
    //返回APP
    private backToAppF(){
        callJsFunc();
    }
    
    
    private changeSoundbgImage(){
            var isPlayi: number = parseInt(StorageSetting.getItem('soundbg'));
            if(!isPlayi){
                this.soundbg = new egret.Bitmap(RES.getRes("sound_stop_png"));
                this.soundbg.scaleX = this.soundbg.scaleY = 0.6;
                this.addChild(this.soundbg);
                this.soundbg.x = this.stage.stageWidth - this.soundbg.width * 0.6 * 0.5 - 10;
                this.soundbg.y = this.soundbg.height * 0.5;
                this.soundbg.touchEnabled = true;
                this.soundbg.anchorOffsetX = this.soundbg.width * 0.5;
                this.soundbg.anchorOffsetY = this.soundbg.height * 0.5;
                this.soundbg.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.playsoundbg,this);
                
            }else{
                //背景音乐
                this.soundbg = new egret.Bitmap(RES.getRes("sound_png"));
                this.soundbg.scaleX = this.soundbg.scaleY = 0.6;
                this.addChild(this.soundbg);
                this.soundbg.x = this.stage.stageWidth - this.soundbg.width * 0.6 * 0.5 - 10;
                this.soundbg.y = this.soundbg.height * 0.5;
                this.soundbg.touchEnabled = true;
                this.soundbg.anchorOffsetX = this.soundbg.width * 0.5;
                this.soundbg.anchorOffsetY = this.soundbg.height * 0.5;
                this.soundbg.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.playsoundbg,this);
                SoundManager.playBgSound("Music_mp3");
            }
    }
    
    //开关背景音乐
    private playsoundbg(){
        var isPlay: number = parseInt(StorageSetting.getItem('soundbg'));
        //this.soundbg.skewX=180;
        //this.soundbg.skewY = 180;
        
        if(isPlay) {//正在播放,下一个状态停止播放
            SoundManager.stopBgSound();
            egret.localStorage.setItem("soundbg","0");
         }else{//播放
            SoundManager.playBgSound("Music_mp3");
            egret.localStorage.setItem("soundbg","1");
            console.dir(this.soundbg);
        }
        
    }

   
    //移动开始
    private moveStartX:number=0;
    private moveStartY: number = 0;
    private moveStart(e: egret.TouchEvent){
        if(e.type == egret.TouchEvent.TOUCH_BEGIN) {
        this.moveStartX= e.localX;
        this.moveStartY= e.localY;
        }
    }
    //移动中..
    private moveEndX: number = 0;
    private moveEndY: number = 0;
    private move(e: egret.TouchEvent){
        if(e.type == egret.TouchEvent.TOUCH_MOVE) {
            this.moveEndX = e.localX;
            this.moveEndY = e.localY;
            this.moveBg();
            //console.log('bx' + this.bg.x + ',by' + this.bg.y);
        
        } 
    }
    
    //移动结束
    private moveEnd(e: egret.TouchEvent) {
        if(e.type == egret.TouchEvent.TOUCH_END) {
            this.bgcontent.x -=0;
            this.bgcontent.y -= 0;
       }
 
    }
    
    //背景移动
    private moveBg(){
        var mx: number = this.moveEndX - this.moveStartX;//向左为负，向右滑为正
        var my: number = this.moveEndY - this.moveStartY;//向上为负，向下为正
        var mxabs:number=Math.abs(mx);
        var myabs: number = Math.abs(my);
        //触摸移动距离
        var movedistance:number=30;
        if(mxabs > movedistance){
            this.bgcontent.x -= -mx; 
        }
       
        if(myabs > movedistance) {
            this.bgcontent.y -= -my;
        }
       
        
        //判断边界,视图窗口移动的左上角移动的范围
        var visX: number = this.stageW - this.bgcontent.width ;//负的
        var visY: number = this.stageH - this.bgcontent.height;
        if(this.bgcontent.x <= visX){
            this.bgcontent.x = visX;
        } else if(this.bgcontent.x>=0){
            this.bgcontent.x=0;
         }
         
        if(this.bgcontent.y <= visY) {
            this.bgcontent.y = visY;
        } else if(this.bgcontent.y >= 0) {
            this.bgcontent.y = 0;
        }
         
//        console.log('bx:'+this.bg.x+',by:'+this.bg.y+',visX:'+visX+',visY:'+visY);
        
       
    }

    

    
    
    private onTouchBegin(e: egret.TouchEvent) {
        //禁止点击
       this.bottomBtn.touchEnabled = false;
       this.Locator(this.myselfLocationX,this.myselfLocationY,true);
     
    }
    
    //移动
    private Myselfmove(){
        if(this._Hollowed != null) {//引导层
            if(this._Hollowed.parent) {
                this._Hollowed.parent.removeChild(this._Hollowed);
            }
        }
        
        
        console.log("进入了myselfmove");
        //分发能量
        this.now_energy = parseInt(StorageSetting.getItem('now_energy'));
        if(this.now_energy > 0) {
            //console.log("正在走");
            this.myself.putkm(this.now_energy,this.most_energy,this._energy);
            //监听打开分享
            this.stage.addEventListener("shareOpen",this.shareF,this);
        } else {
            this.go();
        }
        
        //监听关闭触摸事件
        this.myself.addEventListener(QuertionListEvent.EVT_OPEN_ALERT,this.RemoveonTouchBegin,this);
        //监听开启触摸
        this.myself.addEventListener(QuertionListEvent.EVT_CLOSE_ALERT,this.AddonTouchBegin,this);
        //抵达城市
        this.myself.addEventListener(QuertionListEvent.EVT_OPENArriceNewCity_ALERT,this.ArricedNewCity,this);
        
        //监听到达目的地
        this.myself.addEventListener("arriced_bourn",(e) => { this._bottomBtn_Touch(true)},this);
    }
    
    //按钮的开关
    private _bottomBtn_Touch(b:boolean){
       this.bottomBtn.touchEnabled=b;
    }
    
    //走起来
    private _go_tip: egret.TextField;
    private _go_tip_con:egret.Sprite=null;
    private go(){
        console.log("走起来...");
        this.bottomBtn.touchEnabled = false;
        this._go_tip_con = new egret.Sprite();
        this._go_tip_con.graphics.beginFill(0x000000,0.7);
        this._go_tip_con.graphics.drawRect(0,0,this.stageW/2,50);
        this._go_tip_con.graphics.endFill();
        
        this._go_tip_con.anchorOffsetX=this.stageW/2*0.5;
        this._go_tip_con.x = this.stageW / 2;
        this.addChild(this._go_tip_con);
        
//        var _go_tip_icon: egret.Bitmap;//背景
//        _go_tip_icon = Utils.createBitmapByName("bubble_png");
//        //30：区域1 的宽度值。 31：区域1 的高度值 40：区域2 的宽度值  41：区域4 的高度值
//        var rect: egret.Rectangle = new egret.Rectangle(9,11,this._energy['barbg'].width/2,55);
//        _go_tip_icon.scale9Grid = rect;
//        _go_tip_icon.width = this._energy['barbg'].width / 2+100;
//        _go_tip_icon.x = (this.stageW - _go_tip_icon.width) / 2-30;
//        _go_tip_icon.y =1;
//        this._go_tip_con.addChild(_go_tip_icon);
        
     
        
        this._go_tip = new egret.TextField();//文字
        this._go_tip.text = "加油。走起来！1步=1能量";
        this._go_tip.width=this.stageW/2;
        this._go_tip.size = 25;
       // this._go_tip.width = _go_tip_icon.width;
        this._go_tip.height = 55;
        this._go_tip.textAlign = egret.HorizontalAlign.CENTER;
        this._go_tip.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._go_tip_con.addChild(this._go_tip);
        //this._go_tip_con.x = (this.stageW-_go_tip_icon.width)/2;
        this._go_tip_con.y = this._energy['barbg'].y-90;
        var that=this;
        TweenMax.to(this._go_tip_con,0.3,{ alpha: 1,x: 400,y: 400,delay: 3,onComplete: function() {
            that.removeChild(that._go_tip_con);
            that.bottomBtn.touchEnabled = true;
            }});
    }
    
    
    //添加能量触摸
    //背景遮罩层
    private bgS:egret.Sprite=null;
    private AddonTouchBegin(){
        this.bottomBtn.touchEnabled = true;
        this.bottomBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegin,this);
        this.bgcontent.touchEnabled = true;
        this.removeChild(this.bgS);
    }
    
    //移除能量触摸
    private RemoveonTouchBegin(e: QuertionListEvent){
        this.bottomBtn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegin,this);
        this.bgS= new egret.Sprite();
        this.bgS.graphics.beginFill(0x000000);
        this.bgS.graphics.drawRect(0,0,this.stageW,this.stageH);
        this.bgS.graphics.endFill();
        this.bgS.touchEnabled = false;
        this.bgcontent.touchEnabled=false;
        this.addChild(this.bgS);
        this.bgS.alpha = 0.5;
   
    }
    
    //抵达城市
    private _ArrivedNewCity: ArrivedNewCityUI;
    private ArricedNewCity(){
            // alert('解锁城市');
            var urlloader = new egret.URLLoader();
            var req = new egret.URLRequest('http://www.51tywy.com/service/crossdomain/city/ArrivedCity');
            req.data = new egret.URLVariables("uid=" + StorageSetting.getItem('uid') + "&token=" + StorageSetting.getItem('token'));
            req.method = egret.URLRequestMethod.POST;
            urlloader.load(req);
    
            urlloader.addEventListener(egret.Event.COMPLETE,(e) => {
                this._Netdata = <Netdata>JSON.parse(e.target.data);
                this._ArrivedNewCity = new ArrivedNewCityUI();
                this.addChild(this._ArrivedNewCity);
                this._ArrivedNewCity.y = (egret.MainContext.instance.stage.stageHeight - this._ArrivedNewCity.height) / 2;
                this._ArrivedNewCity.addEventListener(QuertionListEvent.EVT_CLOSArriceNewCity_ALERT,() => {
                    this.arriveNewCitycloseHandle();
                },this);
                
                
                //更改当前城市的关卡图标
                var i: number = parseInt(this._Netdata.data['f_now_cityIdSort']);
                var px:number= parseInt(this._Netdata.data['px']);
                var py:number = parseInt(this._Netdata.data['py']);
                var flag: egret.Bitmap;
                flag = Utils.createBitmapByName("pin-active_png");
                flag.x=px;
                flag.y=py;
                //this._World.removeChild(this._World['flagArr'][i]);
                this._World.addChild(flag);
                flag.anchorOffsetX = flag.width / 2;
                flag.anchorOffsetY = flag.height;
                
    
            },this);
    }
    
    //关闭抵达新城市
    private arriveNewCitycloseHandle() {
        this.bottomBtn.touchEnabled=true;
        this._ArrivedNewCity.removeEventListener(QuertionListEvent.EVT_CLOSArriceNewCity_ALERT,() => {
            this.arriveNewCitycloseHandle();
        },this);
        this.removeChild(this._ArrivedNewCity);
    }
    

    //弹起
    private onTouchEnd(e: egret.TouchEvent) {

    }
    
    
    //截屏
    private xx(){
        var renderTexture: egret.RenderTexture = new egret.RenderTexture();
        renderTexture.drawToTexture(this);
        //保存
//        renderTexture.saveToFile("image/png","a/down.png",new egret.Rectangle(20,20,100,100));
        renderTexture.saveToFile("image/png","a/down.png");
    }

    //屏幕定位到xy的中间位置
    private Locator(x:number,y:number,exefunc:boolean=false){
        x = x * this.bgcontent.scaleX;//地图缩放时，定位的左边也跟着缩放
        y = y * this.bgcontent.scaleY;
        
        var x_start:number=this.stageW/2;//屏幕的宽的一半
        var x_end: number = this.bgcontent.width-this.stageW/2;
        var y_start:number=this.stageH/2;
        var y_end: number = this.bgcontent.height-this.stageH/2;
        var real_x:number=0;
        var real_y:number=0;
        if(x < x_start){//屏幕移动
            real_x= x_start;
        } else if(x > x_end){
            real_x = x_end;
        }else{
            real_x=x;
        }
       
        if(y < y_start) {//屏幕移动
            real_y = y_start;
        } else if(y > y_end) {
            real_y = y_end;
        } else {
            real_y = y;
        }
        var that=this;
        //移动动画
        egret.Tween.get(this.bgcontent).to({
            x: this.stageW / 2 - real_x,y: this.stageH / 2 - real_y
        },200).call(function() { 
             console.log("定位完成");
            if(exefunc){
                that.Myselfmove();
            }
        });
        
       // this.bgcontent.x = (this.stageW/2-real_x);
        //this.bgcontent.y = (this.stageH/2 - real_y);
       // console.log(this.bgcontent.scaleX,this.bgcontent.scaleY);
      
    
    }
        
       



//end Scroll    
    
    }
 
}

//申明js方法
declare function callJsFunc();