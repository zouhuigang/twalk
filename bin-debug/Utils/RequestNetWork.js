/**
 *请求网络
 * @author
 *
 */
var RequestNetWork = (function () {
    function RequestNetWork() {
    }
    var d = __define,c=RequestNetWork,p=c.prototype;
    //GET请求
    p.get = function () {
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        var params = "?p1=getP1&p2=getP2";
        request.open("http://httpbin.org/get" + params, egret.HttpMethod.GET);
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send();
        request.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
        request.addEventListener(egret.ProgressEvent.PROGRESS, this.onGetProgress, this);
    };
    p.onGetComplete = function (event) {
        var request = event.currentTarget;
        console.log("get data : ", request.response);
    };
    p.onGetIOError = function (event) {
        console.log("get error : " + event);
    };
    p.onGetProgress = function (event) {
        console.log("get progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
    };
    //POST请求
    p.post = function (_url, _params) {
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        //设置为 POST 请求
        //        var params = "mobile=18516573852&pwd=e10adc3949ba59abbe56e057f20f883e";
        request.open(_url, egret.HttpMethod.POST);
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send(_params);
        request.addEventListener(egret.Event.COMPLETE, this.onPostComplete, this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onPostIOError, this);
        request.addEventListener(egret.ProgressEvent.PROGRESS, this.onPostProgress, this);
    };
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
    p.onPostComplete = function (event) {
        var request = event.currentTarget;
        console.log("post data : ", request.response);
        //        console.dir(event.target);
    };
    p.onPostIOError = function (event) {
        console.log("post error : " + event);
    };
    p.onPostProgress = function (event) {
        console.log("post progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
    };
    return RequestNetWork;
})();
egret.registerClass(RequestNetWork,'RequestNetWork');
