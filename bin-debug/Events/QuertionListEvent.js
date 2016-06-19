/**
 *
 * @author
 *
 */
var QuertionListEvent = (function (_super) {
    __extends(QuertionListEvent, _super);
    function QuertionListEvent(type, eventid, arr, bubbles, cancelable) {
        if (eventid === void 0) { eventid = 0; }
        if (arr === void 0) { arr = ""; }
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        _super.call(this, type, bubbles, cancelable);
        this._eventid = 0;
        this._rewardInfo = null;
        this._eventid = eventid;
        this._rewardInfo = arr;
    }
    var d = __define,c=QuertionListEvent,p=c.prototype;
    d(p, "eventid"
        ,function () {
            return this._eventid;
        }
    );
    d(p, "arr"
        ,function () {
            return this._rewardInfo;
        }
    );
    QuertionListEvent.EVT_CLOSE = "EVT_CLOSE";
    QuertionListEvent.EVT_LOAD_PAGE = "EVT_LOAD_PAGE";
    QuertionListEvent.EVT_CLOSE_ABOUT = "EVT_CLOSE_ABOUT";
    QuertionListEvent.EVT_OPEN_ALERT = "EVT_OPEN_ALERT"; //弹窗，开始答题
    QuertionListEvent.EVT_CLOSE_ALERT = "EVT_CLOSE_ALERT"; //关闭弹窗,结束答题
    QuertionListEvent.EVT_CORRECT_ALERT = "EVT_CORRECT_ALERT"; //回答正确
    QuertionListEvent.EVT_ERROR_ALERT = "EVT_ERROR_ALERT"; //回答错误
    QuertionListEvent.EVT_AWARD_ALERT = "EVT_AWARD_ALERT"; //回答正确，领取奖励
    QuertionListEvent.EVT_NEXTEVENT_ALERT = "EVT_NEXTEVENT_ALERT"; //下一题
    QuertionListEvent.EVT_REAL_AWARD = "EVT_REAL_AWARD"; //真实领取奖励请求数据
    QuertionListEvent.EVT_CLOSEREWADR_ALERT = "EVT_CLOSEREWADR_ALERT"; //关闭奖励
    QuertionListEvent.EVT_OPENArriceNewCity_ALERT = "EVT_OPENArriceNewCity_ALERT"; //抵达新城市弹窗
    QuertionListEvent.EVT_CLOSArriceNewCity_ALERT = "EVT_CLOSArriceNewCity_ALERT"; //关闭抵达新城市弹窗
    return QuertionListEvent;
})(egret.Event);
egret.registerClass(QuertionListEvent,'QuertionListEvent');
