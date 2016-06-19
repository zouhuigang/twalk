/**
 *
 * @author
 *
 */
var Share = (function (_super) {
    __extends(Share, _super);
    function Share() {
        _super.call(this);
        //舞台宽高
        this.stageW = 0;
        this.stageH = 0;
        this.sumsteps = 0;
        //背景容器
        this.bgc = null;
        this.citybg = null;
        this.bgurl = '';
        this.iconurl = '';
        this.photo = null;
        //头像
        //下载
        this.down_c = null;
        //分享
        this.share_url = '';
        this.share_title = '';
        this.share_content = '';
        this.share_imgurl = '';
        //城市名称
        this.NowCityName = "";
        this.stageH = egret.MainContext.instance.stage.stageHeight;
        this.stageW = egret.MainContext.instance.stage.stageWidth;
    }
    var d = __define,c=Share,p=c.prototype;
    p.getNet = function () {
        var _this = this;
        var urlloader = new egret.URLLoader();
        var req = new egret.URLRequest('http://www.51tywy.com/service/crossdomain/user/shareInfo');
        req.data = new egret.URLVariables("&uid=" + StorageSetting.getItem('uid') + "&token=" + StorageSetting.getItem('token'));
        req.method = egret.URLRequestMethod.POST;
        urlloader.load(req);
        urlloader.addEventListener(egret.Event.COMPLETE, function (e) {
            _this._Netdata = JSON.parse(e.target.data);
            _this.sumsteps = parseInt(_this._Netdata.data['sumsteps']);
            _this.bgurl = _this._Netdata.data['citybg'];
            _this.iconurl = _this._Netdata.data['photo'];
            _this.NowCityName = _this._Netdata.data['cityName'];
            //分享
            _this.share_url = _this._Netdata.data['shareInfo']['url'];
            _this.share_title = _this._Netdata.data['shareInfo']['title'];
            _this.share_content = _this._Netdata.data['shareInfo']['content'];
            _this.share_imgurl = _this._Netdata.data['shareInfo']['imgurl'];
            _this.index();
        }, this);
    };
    p.index = function () {
        this.bgc = new egret.Sprite();
        this.addChild(this.bgc);
        this.citybg = new egret.Bitmap();
        RES.getResByUrl(this.bgurl, this.bgurlComplete, this, RES.ResourceItem.TYPE_IMAGE);
        this.citybg.width = this.stageW;
        this.citybg.height = this.stageH;
        this.citybg.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.AppToWapValues, this);
        this.bgc.addChild(this.citybg);
        //步数
        this.sumstepstxt = new egret.TextField();
        this.sumstepstxt.textAlign = "center";
        this.sumstepstxt.width = 640;
        this.sumstepstxt.height = 100;
        this.sumstepstxt.y = 60;
        this.addChild(this.sumstepstxt);
        this.sumstepstxt.textColor = 0xfed650;
        this.sumstepstxt.size = 25;
        //this.sumstepstxt.text = this.sumsteps.toString()+'步';
        //        this.sumstepstxt.textFlow = (new egret.HtmlTextParser).parser(
        //            '<font color="#695f78" size="40" fontFamily="Verdana" strokeColor="0x6699cc" "stroke"="2" >' + this.NowCityName.toString() + '</font>' 
        //        );
        this.sumstepstxt.textFlow = [
            { text: this.NowCityName.toString(), style: { "textColor": 0x695f78, "size": 40, "strokeColor": 0xffffff, "stroke": 2 } }
        ];
        //头像
        var icon_c = Utils.createBitmapByName("avatar-bg@1125_png");
        icon_c.width = 80;
        icon_c.height = 80;
        icon_c.x = 88;
        icon_c.y = this.stageH - 120 - 150 + 80 / 2;
        icon_c.anchorOffsetX = icon_c.width / 2;
        icon_c.anchorOffsetY = icon_c.height / 2;
        this.addChild(icon_c);
        RES.getResByUrl(this.iconurl, this.iconurlComplete, this, RES.ResourceItem.TYPE_IMAGE);
        //文字提示
        this.desc_c = new egret.Sprite();
        this.desc_c.x = 88 + 80 / 2 + 10;
        this.desc_c.y = this.stageH - 120 - 150;
        this.addChild(this.desc_c);
        var desc_bg = Utils.createBitmapByName('bubble@1125_png');
        desc_bg.width = 376;
        desc_bg.height = 80;
        this.desc_c.addChild(desc_bg);
        var desc_text = new egret.TextField();
        desc_text.textFlow = (new egret.HtmlTextParser).parser('今天走了' +
            '<font color="#e9bb4d" fontFamily="Verdana">' + this.sumsteps.toString() + '</font>步\n' +
            '中国这么大，我要走一圈。');
        //desc_text.text = "今天走了" + this.sumsteps.toString()+"步\n中国那么大，我要走一圈。";
        desc_text.textColor = 0x949da2;
        desc_text.size = 18;
        desc_text.x = 30;
        desc_text.y = 20;
        desc_text.lineSpacing = 10;
        this.desc_c.addChild(desc_text);
        //下载
        this.down_c = new egret.Sprite();
        this.down_c.width = this.stageW;
        this.down_c.height = 120;
        this.down_c.x = 0;
        this.down_c.y = this.stageH - this.down_c.height;
        this.addChild(this.down_c);
        var shp = new egret.Shape();
        shp.graphics.beginFill(0xffffff, 1);
        shp.graphics.drawRect(0, 0, this.down_c.width, this.down_c.height);
        shp.graphics.endFill();
        this.down_c.addChild(shp);
        var logo = Utils.createBitmapByName('logo@1125_png');
        logo.x = 50;
        logo.y = 20;
        logo.width = 80;
        logo.height = 80;
        this.down_c.addChild(logo);
        var erweima = Utils.createBitmapByName("qrcode@1125_png");
        erweima.x = this.stageW - 110;
        erweima.y = 20;
        erweima.width = 80;
        erweima.height = 80;
        this.down_c.addChild(erweima);
        var down_txt = new egret.TextField();
        down_txt.textFlow = (new egret.HtmlTextParser).parser('<font color="#949da2" size="25" fontFamily="Verdana">体育委员</font>\n' +
            '<font color="#949da2" size="16" fontFamily="Verdana">行万里路，读万卷书</font>');
        down_txt.x = logo.x + logo.width + 20;
        down_txt.y = 20;
        this.down_c.addChild(down_txt);
        this.TsCallJs_share();
    };
    p.AppToWapValues = function () {
        AppToWapValue(1);
    };
    //背景图片
    p.bgurlComplete = function (value) {
        this.citybg.texture = value;
    };
    p.iconurlComplete = function (data) {
        this.photo = new egret.Bitmap(data);
        this.photo.width = 70;
        this.photo.height = 70;
        this.photo.x = 88;
        this.photo.y = this.stageH - 120 - 150 + 80 / 2;
        this.photo.anchorOffsetX = this.photo.width / 2;
        this.photo.anchorOffsetY = this.photo.height / 2;
        this.addChild(this.photo);
        //圆形头像
        var circle = new egret.Shape();
        circle.graphics.beginFill(0x0000ff);
        circle.graphics.drawCircle(this.photo.width / 2, this.photo.height / 2, this.photo.width / 2);
        circle.graphics.endFill();
        circle.x = this.photo.x;
        circle.y = this.photo.y;
        circle.anchorOffsetX = this.photo.width / 2;
        circle.anchorOffsetY = this.photo.height / 2;
        this.addChild(circle);
        this.photo.mask = circle;
    };
    //分享
    p.TsCallJs_share = function () {
        WebShareInApp(this.share_url, this.share_imgurl, this.share_title, this.share_content);
    };
    //js调ts
    p.JsCallTs_share_de = function (value) {
        if (value) {
            var context = egret.MainContext.instance;
            context.stage.dispatchEventWith("jsNotifyts", false);
        }
        //alert('执行成功,得到的值'+value);
        //console.log('js调用ts成功：' + value);
    };
    return Share;
})(egret.Sprite);
egret.registerClass(Share,'Share');
