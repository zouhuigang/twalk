/**
 *
 * @author
 *
 */
var CelebrateEvent = (function (_super) {
    __extends(CelebrateEvent, _super);
    function CelebrateEvent(type, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        _super.call(this, type, bubbles, cancelable);
        //this._resName = resName;
    }
    var d = __define,c=CelebrateEvent,p=c.prototype;
    CelebrateEvent.EVT_CLOSE = "EVT_CLOSE"; //关闭事件
    return CelebrateEvent;
})(egret.Event);
egret.registerClass(CelebrateEvent,'CelebrateEvent');
