/**
*
* 定位点points事件
* @author
*
*/
var MyselfEvent = (function (_super) {
    __extends(MyselfEvent, _super);
    function MyselfEvent(type, obj, bubbles, cancelable) {
        if (obj === void 0) { obj = null; }
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        _super.call(this, type, bubbles, cancelable);
        this._obj = obj;
    }
    var d = __define,c=MyselfEvent,p=c.prototype;
    d(p, "obj"
        ,function () {
            return this._obj;
        }
    );
    MyselfEvent.HIDETOOL = "hidetool";
    MyselfEvent.Arrived = "arrived"; //points到达指定点事件
    return MyselfEvent;
})(egret.Event);
egret.registerClass(MyselfEvent,'MyselfEvent');
