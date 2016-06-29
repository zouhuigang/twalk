/**
 *
 * @author
 *问题弹窗处理
 */
var QuertionCommonUI = (function (_super) {
    __extends(QuertionCommonUI, _super);
    function QuertionCommonUI() {
        _super.call(this);
        //舞台宽高
        this.stageW = 0;
        this.stageH = 0;
        this.firstEventId = 0;
        /*城市事件地点ID变动*/
        this._CityEventId = 0;
        //标题变化
        this._ID_CityName_text = '';
        this.addEventListener(eui.UIEvent.COMPLETE, this.StartAnswer, this);
        this.skinName = "resource/skins/QuertionCommonSkin.exml";
        this.stageH = egret.MainContext.instance.stage.stageHeight;
        this.stageW = egret.MainContext.instance.stage.stageWidth;
    }
    var d = __define,c=QuertionCommonUI,p=c.prototype;
    p.StartAnswer = function () {
        this.ID_quertionclose_png.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_close, this);
        //this.ID_Buttons["baseImage"].source = RES.getRes("start-btn_png");
        this.ID_Buttons['baseImage'].source = RES.getRes("start-btn_png");
        this.ID_Buttons['baseImage'].width = 200 * 1.5;
        this.ID_Buttons['baseImage'].height = 50 * 1.5;
        this.ID_Buttons.touchEnabled = true;
        this.ID_Buttons.addEventListener(egret.TouchEvent.TOUCH_TAP, this.StartAnswerAlert, this);
    };
    p.onclick_close = function () {
        this.dispatchEventWith(QuertionListEvent.EVT_CLOSE);
    };
    p.StartAnswerAlert = function () {
        var that = this;
        TweenMax.to(that.ID_group, 0.01, { alpha: 0, onComplete: function () {
                that.AnswerList();
            }
        });
    };
    p.AnswerList = function () {
        var _this = this;
        this._quertionListUI = new QuertionListUI(this._eventid);
        this._quertionListUI.alpha = 0;
        this.addChild(this._quertionListUI);
        // console.log(this);
        this._quertionListUI.addEventListener(QuertionListEvent.EVT_CORRECT_ALERT, function () {
            _this.CorrectAlert();
        }, this); //监听回答正确事件
        this._quertionListUI.addEventListener(QuertionListEvent.EVT_ERROR_ALERT, function (e) {
            _this.firstEventId = parseInt(e._rewardInfo['firstEventId']);
            _this.ErrorAlert();
        }, this); //监听回答错误事件
        this._quertionListUI.addEventListener(QuertionListEvent.EVT_NEXTEVENT_ALERT, function (e) {
            var that = _this;
            TweenMax.to(that._quertionListUI, 0.5, { alpha: 1, y: -1000, delay: 0.2,
                onComplete: function () {
                    that.removeChild(that._quertionListUI);
                    that._eventid = e._eventid;
                    that.StartAnswerAlert();
                }
            });
        }, this); //监听下一题事件
        TweenMax.fromTo(this._quertionListUI, 0.3, { alpha: 0, y: -4000 }, { alpha: 1, y: 0, delay: 0.3 });
    };
    //回答正确
    p.CorrectAlert = function () {
        var _this = this;
        this._quertionListUI.removeEventListener(QuertionListEvent.EVT_CORRECT_ALERT, function () {
            _this.CorrectAlert();
        }, this);
        this._quertionListUI.removeEventListener(QuertionListEvent.EVT_ERROR_ALERT, function () {
            _this.ErrorAlert();
        }, this);
        this.ID_Buttons.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.StartAnswerAlert, this);
        var that = this;
        TweenMax.to(that._quertionListUI, 0.3, {
            scaleX: 0.1, scaleY: 0.1, ease: Back.easeIn, delay: 0.2, onComplete: function () {
                that.removeChild(that._quertionListUI);
                that._quertionListUI = null;
                that.ID_Buttons["baseImage"].source = RES.getRes("promotion-btn_png");
                that.ID_QuertionCommonIcon.source = RES.getRes("finished_png");
                that.ID_CityName.text = "恭喜您";
                that.ID_Buttons.addEventListener(egret.TouchEvent.TOUCH_TAP, that.receiveAchievementAward, that);
                TweenMax.fromTo(that.ID_group, 0.3, { alpha: 0, y: -4000 }, { alpha: 1, y: 0, delay: 0.3 });
            }
        });
    };
    p.receiveAchievementAward = function () {
        //alert('领取成功');
        //xx地点领取奖励
        var _QuertionListEvent = new QuertionListEvent(QuertionListEvent.EVT_REAL_AWARD, this._CityEventId);
        //发送要求事件
        this.dispatchEvent(_QuertionListEvent);
    };
    //回答错误
    p.ErrorAlert = function () {
        var _this = this;
        this._quertionListUI.removeEventListener(QuertionListEvent.EVT_ERROR_ALERT, function () {
            _this.ErrorAlert();
        }, this);
        this._quertionListUI.removeEventListener(QuertionListEvent.EVT_CORRECT_ALERT, function () {
            _this.CorrectAlert();
        }, this);
        this.ID_Buttons.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.StartAnswerAlert, this); //移除按钮
        var that = this;
        TweenMax.to(that._quertionListUI, 0.3, {
            scaleX: 0.1, scaleY: 0.1, ease: Back.easeIn, delay: 0.2, onComplete: function () {
                that.removeChild(that._quertionListUI);
                that._quertionListUI = null;
                that.ID_Buttons["baseImage"].source = RES.getRes("restart-btn_png");
                that.ID_QuertionCommonIcon.source = RES.getRes("failed-bg_png");
                // var uid: string = egret.localStorage.getItem('uid');
                that.ID_CityName.text = "SORRY";
                that.ID_Buttons.addEventListener(egret.TouchEvent.TOUCH_TAP, that.restartAnser, that);
                TweenMax.fromTo(that.ID_group, 0.3, { alpha: 0, y: -4000 }, { alpha: 1, y: 0, delay: 0.3 });
            }
        });
    };
    //重新开始回答
    p.restartAnser = function () {
        // console.dir(this);
        //this.removeChild(this._quertionListUI);
        this._eventid = this.firstEventId;
        this.StartAnswerAlert();
    };
    d(p, "eventid"
        ,function () {
            return this._eventid;
        }
        ,function (value) {
            this._eventid = value;
        }
    );
    d(p, "CityEventId"
        ,function () {
            return this._CityEventId;
        }
        ,function (value) {
            this._CityEventId = value;
        }
    );
    d(p, "ID_CityName_text"
        ,function () {
            return this._ID_CityName_text;
        }
        ,function (value) {
            //this._ID_CityName_text = value+'人民欢迎您';
            this._ID_CityName_text = value;
            this.ID_CityName.text = this._ID_CityName_text;
            //console.log(this._ID_CityName_text);
        }
    );
    return QuertionCommonUI;
})(eui.Component);
egret.registerClass(QuertionCommonUI,'QuertionCommonUI');
