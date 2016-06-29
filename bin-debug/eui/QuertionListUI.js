var QuertionListUI = (function (_super) {
    __extends(QuertionListUI, _super);
    function QuertionListUI(eventid) {
        _super.call(this);
        this.eventid = 0;
        this.sourceArr = []; //答案列表
        this._nextuncolckevent = 0; //下一个事件
        //遇到问题
        this.lineHeight = 0;
        this.answer_total = 0; //该题答案区的总长度
        this.anser_every_height = []; //错与对出现的位置，答案的中间位置
        //选中答案
        this.zi_eventid = 0;
        this.eventid = eventid;
        this.addEventListener(eui.UIEvent.COMPLETE, this.getevent, this);
        this.skinName = "resource/skins/QuertionListSkin.exml";
    }
    var d = __define,c=QuertionListUI,p=c.prototype;
    p.uiCompHandler = function () {
        /// 填充数据
        //var sourceArr: Array<any> = [{ CityName: "问题1" },{ CityName: "问题1" }];
        //        
        //        for(var i: number = 1;i < 4;i++) {
        //            //给数据中添加一个含有"label"属性的对象
        //            this.sourceArr.push({ f_select: i + "其总重量没有达到吉尼斯前纪录",f_istrue:true});
        //        }
        var myCollection = new eui.ArrayCollection(this.sourceArr);
        this.list = new eui.List();
        this.list.dataProvider = myCollection;
        this.list.percentWidth = 100;
        this.list.percentHeight = 100;
        this.list.y = 280 + this.ID_QuertionDesc.textHeight + 80;
        var exml = "\n       <e:Skin xmlns:e=\"http://ns.egret.com/eui\">\n       <e:Group  width=\"640\" x=\"0\" height=\"{data.border_h}\">\n            <e:Image source=\"linec_png\" left=\"0\" horizontalCenter=\"0\"  scale9Grid=\"13,23,100,20\"   width=\"{data.border_w}\" height=\"{data.border_h}\"/> \n\t\t\t<e:Label text=\"{data.f_select}\"  size=\"30\" width=\"400\"  multiline=\"true\" lineSpacing=\"5\" verticalAlign=\"middle\" horizontalCenter=\"0\"  textAlign=\"center\" textColor=\"0x425260\" left=\"180\" right=\"180\" top=\"0\" bottom=\"0\"/> \n\t\t</e:Group>\n\t\t</e:Skin>\n        \n        ";
        //this.list.itemRenderer = AnswerList;
        this.list.itemRendererSkinName = exml;
        this.addChild(this.list);
        this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.SelectAnswer, this);
        //控制背景大小
        //this.ID_Querstionbg.height = 330 + this.list.y;
        this.ID_Querstionbg.height = this.answer_total + this.list.y; //问题描述区+答案区
        //        var _right: egret.Bitmap = new egret.Bitmap(RES.getRes("correct_png"));
        //        _right.x = 530;
        //        _right.y = this.anser_every_height[0]-15;
        //        this.list.addChild(_right);
        //        var _rights: egret.Bitmap = new egret.Bitmap(RES.getRes("correct_png"));
        //        _rights.x = 530;
        //        _rights.y = this.anser_every_height[1]-15;
        //        this.list.addChild(_rights);
        //        console.dir(_right.y);
    };
    p.getevent = function () {
        var _this = this;
        var urlloader = new egret.URLLoader();
        var req = new egret.URLRequest('http://www.51tywy.com/service/crossdomain/city/getevent');
        req.data = new egret.URLVariables("eventid=" + this.eventid);
        req.method = egret.URLRequestMethod.POST;
        urlloader.load(req);
        urlloader.addEventListener(egret.Event.COMPLETE, function (e) {
            _this._Netdata = JSON.parse(e.target.data);
            _this.ID_CityName.text = _this._Netdata.data['zhu_event']['f_name']; //一般的值直接赋值即可.
            _this.ID_QuertionDesc.text = _this._Netdata.data['zhu_event']['f_desc'];
            _this.ID_icon.source = _this._Netdata.data['zhu_event']['f_icon'];
            var len = _this._Netdata.data['zi_event'].length;
            //求答案字符串的最大值
            var answ_max_len_w = 300;
            //            for(var i: number = 0;i < len;i++) {
            //                var mystringlength: number = this._Netdata.data['zi_event'][i]['f_select'].length;//一个中文字一个长度
            //                var border_w = mystringlength * 24 + 60;
            //                if(border_w > 400) {
            //                    border_w = 400;
            //                }
            //                if(border_w>answ_max_len_w){
            //                    answ_max_len_w = border_w;
            //                }
            //                
            //            }
            _this.answer_total = 0; //初始化
            for (var i = 0; i < len; i++) {
                //给数据中添加一个含有"label"属性的对象
                var mystringlength = _this._Netdata.data['zi_event'][i]['f_select'].length; //一个中文字一个长度
                var border_h = Math.ceil(mystringlength / 9) * 40 + 33;
                _this.lineHeight = Math.ceil(mystringlength / 9);
                _this.answer_total += border_h;
                //存入数组
                var answer_mid = _this.answer_total - border_h / 2;
                _this.anser_every_height.push(answer_mid);
                _this.sourceArr.push({
                    id: parseInt(_this._Netdata.data['zi_event'][i]['id']),
                    f_select: _this._Netdata.data['zi_event'][i]['f_select'],
                    f_istrue: parseInt(_this._Netdata.data['zi_event'][i]['f_istrue']),
                    border_w: answ_max_len_w,
                    border_h: border_h
                });
            }
            _this.answer_total = _this.answer_total + 50; //加上边框之间的距离
            //console.log('答案的总长度'+this.answer_total);
            //console.log('所有答案的长度'+this.anser_every_height);
            _this.uiCompHandler();
        }, this);
    };
    p.onclick_begin = function () {
        this.dispatchEventWith(QuertionListEvent.EVT_CLOSE);
    };
    p.SelectAnswer = function (e) {
        //获取点击消息
        //console.log(this.list.selectedItem,this.list.selectedIndex)
        this.zi_eventid = this.list.selectedItem.id;
        this.unlockevent();
    };
    p.unlockevent = function () {
        var _this = this;
        var urlloader = new egret.URLLoader();
        var req = new egret.URLRequest('http://www.51tywy.com/service/crossdomain/city/unlockevent');
        req.data = new egret.URLVariables("zi_eventid=" + this.zi_eventid + "&uid=" + StorageSetting.getItem('uid') + "&token=" + StorageSetting.getItem('token'));
        req.method = egret.URLRequestMethod.POST;
        urlloader.load(req);
        urlloader.addEventListener(egret.Event.COMPLETE, function (e) {
            _this._Netdata = JSON.parse(e.target.data);
            _this._nextuncolckevent = parseInt(_this._Netdata.data['unlockevent']);
            _this.RewardInfo = _this._Netdata.data['rewrdInfo'];
            if (_this.list.selectedItem.f_istrue) {
                _this._right = new egret.Bitmap(RES.getRes("correct_png"));
                _this._right.x = 480;
                //this._right.y = this.list.selectedIndex * 50 + 15 + (this.lineHeight-1)*30-15;
                _this._right.y = _this.anser_every_height[_this.list.selectedIndex] - 15;
                _this.list.addChild(_this._right);
                //console.log(this.list.dataProvider.getItemAt(this.list.selectedIndex).f_select);
                _this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, _this.SelectAnswer, _this);
                _this.PassOrNextEvent();
            }
            else {
                _this._wrong = new egret.Bitmap(RES.getRes("wrong_png"));
                _this._wrong.x = 480;
                //this._wrong.y = this.list.selectedIndex * 50 + 15+ (this.lineHeight - 1) * 30;
                _this._wrong.y = _this.anser_every_height[_this.list.selectedIndex] - 15;
                _this.list.addChild(_this._wrong);
                _this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, _this.SelectAnswer, _this);
                _this.PassOrNextEvent();
            }
            // console.log('下一题' + this._nextuncolckevent);
        }, this);
    };
    //对-错  或下一题
    p.PassOrNextEvent = function () {
        var pass = parseInt(this.RewardInfo['pass']);
        if (this._nextuncolckevent) {
            //下一题
            var _QuertionListEvent = new QuertionListEvent(QuertionListEvent.EVT_NEXTEVENT_ALERT, this._nextuncolckevent);
            //发送要求事件
            this.dispatchEvent(_QuertionListEvent);
        }
        else if (pass) {
            //var _QuertionListEvent_crrect: QuertionListEvent = new QuertionListEvent(QuertionListEvent.EVT_CORRECT_ALERT,0,this.RewardInfo);
            //发送要求事件
            //this.dispatchEvent(_QuertionListEvent_crrect);
            this.dispatchEventWith(QuertionListEvent.EVT_CORRECT_ALERT);
        }
        else {
            var _QuertionListEvent_error = new QuertionListEvent(QuertionListEvent.EVT_ERROR_ALERT, 0, this.RewardInfo);
            //发送要求事件
            this.dispatchEvent(_QuertionListEvent_error);
        }
    };
    return QuertionListUI;
})(eui.Component);
egret.registerClass(QuertionListUI,'QuertionListUI');
var AnswerList = (function (_super) {
    __extends(AnswerList, _super);
    function AnswerList() {
        _super.call(this);
    }
    var d = __define,c=AnswerList,p=c.prototype;
    p.createChildren = function () {
        _super.prototype.createChildren.call(this);
        var img2 = new egret.Bitmap();
        img2.texture = RES.getRes("linec_png");
        var rect = new egret.Rectangle(30, 31, 40, 41);
        img2.scale9Grid = rect;
        img2.width *= 2;
        img2.y = 150;
        this.addChild(img2);
        //        this.cb.addEventListener(egret.Event.CHANGE,() => {
        //            console.log("\tCheckbox 变化:",this.data.checked);
        //            this.data.checked = this.cb.selected;
        //        },this);
    };
    return AnswerList;
})(eui.ItemRenderer);
egret.registerClass(AnswerList,'AnswerList');
