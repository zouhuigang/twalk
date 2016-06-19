

class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView:LoadingUI;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    
    
    

    private onAddToStage(event:egret.Event) {
        //pc和手机屏幕适配切换
        if(egret.Capabilities.isMobile){
           this.stage.scaleMode=egret.StageScaleMode.FIXED_WIDTH;
        }else{
           this.stage.scaleMode=egret.StageScaleMode.SHOW_ALL;
        }
        
        
        //启用主题，不用时去掉
        //注入自定义的素材解析器，方便exml中使用res配置中的ID
        var assetAdapter = new AssetAdapter();
        this.stage.registerImplementation("eui.IAssetAdapter",assetAdapter);
        this.stage.registerImplementation("eui.IThemeAdapter",new ThemeAdapter());
        
        ////设置加载进度界面
        this.loadingView = new LoadingUI();
        this.addChild(this.loadingView);
        
        ////RES加载类
        Loader.getInstance();
        Loader.instance.addEventListener(LoadEvent.GROUP_COMPLETE,this.onConfigComplete,this);
        Loader.instance.addEventListener(LoadEvent.GROUP_PROGRESS,this.loadprogress,this);
        Loader.instance.init();
       
    }
    
    /*
 * 分组资源加载进度
 *  /**是否第一次加载Index*/
    /**加载界面*/
    private loadBar: LoadBar;
    private loadIndexis1st: boolean = true;
    private loadprogress(e: LoadEvent) {
        var str: string = e.groupName;
        //console.log("Main_loadprogress分组资源加载进度"+str);
        switch(str) {
            case "preload":
                this.loadingView.setProgress(e.itemsLoaded,e.itemsTotal);
                break;
            default:
                this.loadBar.setProgress(e.itemsLoaded,e.itemsTotal);
        }
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event:RES.ResourceEvent):void {
        //加载资源
       // Loader.instance.load("ResGroupSound");
        if(event.groupName == "preload") {
            this.preloadComp();
            //console.log(StorageSetting.getItem('uid'),StorageSetting.getItem('token'));
            //this.createGameScene();
        } else if(event.groupName == "ResGroupwelcome"){
            this.removeChild(this.loadBar);
            this.loadBar = null;
            this.createGameScene();
        }else{
                 //展开LoadBar
             this.loadBar.hideLoadBar();
          
        }
    }

   
    private preloadComp(){
        this.removeChild(this.loadingView);
        this.loadingView = null;
        egret.localStorage.clear();
        //读取本地游戏配置和储存的数据，没有则创建
        StorageSetting.loadConfig();
        this.loadBar = new LoadBar();
        this.addChild(this.loadBar);
        Loader.instance.load("ResGroupwelcome");
    }

   

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private bartop:egret.Bitmap=null;
    private textField: egret.TextField;
    private createGameScene():void {
         var s:xss.Scroll = new xss.Scroll();
         this.addChild(s);
         
    }


 

   
}


