/**
 *
 * @author
 *
 */
var TestGesture = (function (_super) {
    __extends(TestGesture, _super);
    function TestGesture() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.touchChildren = false;
        this.touchEnabled = true;
    }
    var d = __define,c=TestGesture,p=c.prototype;
    p.setLabel = function (value) {
        this.txt.text = value;
    };
    p.onAddToStage = function (event) {
        var g = this.graphics;
        g.beginFill(0xFF0000, 1);
        g.drawRoundRect(0, 0, 150, 40, 8, 8);
        g.endFill();
        this.txt = new egret.TextField();
        this.txt.text = "单点模式";
        this.txt.x = 14;
        this.txt.y = 4;
        this.addChild(this.txt);
    };
    return TestGesture;
})(egret.Sprite);
egret.registerClass(TestGesture,'TestGesture');
