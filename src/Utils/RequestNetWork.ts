/**
 *请求网络
 * @author 
 *
 */
class RequestNetWork {
	public constructor() {
	}
	
	//GET请求
    public get(): void {

        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        var params = "?p1=getP1&p2=getP2";
        request.open("http://httpbin.org/get" + params,egret.HttpMethod.GET);
        request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        request.send();
        request.addEventListener(egret.Event.COMPLETE,this.onGetComplete,this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onGetIOError,this);
        request.addEventListener(egret.ProgressEvent.PROGRESS,this.onGetProgress,this);
    }
    

    private onGetComplete(event: egret.Event): void {
        var request = <egret.HttpRequest>event.currentTarget;
        console.log("get data : ",request.response);
    }

    private onGetIOError(event: egret.IOErrorEvent): void {
        console.log("get error : " + event);
    }

    private onGetProgress(event: egret.ProgressEvent): void {
        console.log("get progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
    }
    
    //POST请求
    public post(_url: any,_params:any): void {
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        //设置为 POST 请求
//        var params = "mobile=18516573852&pwd=e10adc3949ba59abbe56e057f20f883e";
        request.open(_url,egret.HttpMethod.POST);
        request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        request.send(_params);
        request.addEventListener(egret.Event.COMPLETE,this.onPostComplete,this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onPostIOError,this);
        request.addEventListener(egret.ProgressEvent.PROGRESS,this.onPostProgress,this);
    }
//    /**
//   * 获取签名分享
//   */
//    private getSignPackage() {
//        var urlloader = new egret.URLLoader();
//        var req = new egret.URLRequest(this.url);
//        urlloader.load(req);
//        req.method = egret.URLRequestMethod.GET;
//        urlloader.addEventListener(egret.Event.COMPLETE,(e) => {
//            this.data = <SignPackage>JSON.parse(e.target.data);
//            //........................................................
//            //基本配置
//            this.getWeiXinConfig();
//            //下面可以加更多接口,可自行扩展
//            this.getWeiXinShareTimeline();//分享朋友圈
//            this.getWeiXinShareAppMessage();//分享朋友
//            this.getWeiXinShareQQ();//分享QQ
//            this.getWeiXinShareWeiBo();//分享到腾讯微博
//            this.getWeixinShowMenuItems(["menuItem:share:timeline"]);//显示菜单项
//            this.getWeixinHideMenuItems();//隐藏菜单项
//            //........................................................
//        },this);
//    }

    private onPostComplete(event: egret.Event): void {
        var request = <egret.HttpRequest>event.currentTarget;
        console.log("post data : ",request.response);
//        console.dir(event.target);
    }

    private onPostIOError(event: egret.IOErrorEvent): void {
        console.log("post error : " + event);
    }

    private onPostProgress(event: egret.ProgressEvent): void {
        console.log("post progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
    }
    
    
}
