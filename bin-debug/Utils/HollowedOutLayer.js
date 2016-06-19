/*
 * @zouhuigang
 * 新手引导层
 * 可以用矢量绘图API来做 贴一个我用矢量绘图API实现的圆形镂空*/
var HollowedOutLayer = (function (_super) {
    __extends(HollowedOutLayer, _super);
    function HollowedOutLayer(x, y, radius, _alpha) {
        _super.call(this);
        this.circleX = x;
        this.circleY = y;
        this.radius = radius;
        this._alpha = _alpha;
        var width = egret.MainContext.instance.stage.stageWidth;
        var height = egret.MainContext.instance.stage.stageHeight;
        var left = new egret.Shape();
        left.x = 0;
        left.y = 0;
        left.graphics.beginFill(0x000000, this._alpha);
        left.graphics.lineTo(0, height);
        left.graphics.lineTo(x, height);
        left.graphics.lineTo(x, y + radius);
        left.graphics.drawArc(x, y, radius, 0.5 * Math.PI, 1.5 * Math.PI);
        left.graphics.lineTo(x, 0);
        left.graphics.lineTo(0, 0);
        left.graphics.endFill();
        this.addChild(left);
        var right = new egret.Shape();
        right.x = x;
        right.y = 0;
        right.graphics.beginFill(0x000000, this._alpha);
        right.graphics.lineTo(0, height - radius);
        right.graphics.drawArc(0, y, radius, 1.5 * Math.PI, 0.5 * Math.PI);
        right.graphics.lineTo(0, height);
        right.graphics.lineTo(width - x, height);
        right.graphics.lineTo(width - x, 0);
        right.graphics.lineTo(0, 0);
        right.graphics.endFill();
        this.addChild(right);
        this.touchEnabled = true;
        this.touchChildren = false;
        //手势动画
        var data = RES.getRes("guideMC_json");
        var texture = RES.getRes("guideMC_png");
        var mcf = new egret.MovieClipDataFactory(data, texture);
        this.guide_nov = new egret.MovieClip(mcf.generateMovieClipData("finger"));
        this.guide_nov.scaleX = 0.7;
        this.guide_nov.scaleY = 0.7;
        this.addChild(this.guide_nov);
        this.guide_nov.x = width;
        this.guide_nov.y = height + this.guide_nov.height;
        //this.guide_nov.gotoAndPlay(1,3);
        egret.Tween.get(this.guide_nov, {
            loop: !0
        }).to({
            x: x,
            y: y
        }, 2000).call(function () { this.gotoAndPlay(1); }).wait(1000);
    }
    var d = __define,c=HollowedOutLayer,p=c.prototype;
    // 覆盖hitTest方法 实现点击镂空区域穿透,stageX点击的x坐标，stageY点击的y坐标
    p.$hitTest = function (stageX, stageY) {
        var local = this.parent.globalToLocal(stageX, stageY);
        var dx = local.x - this.circleX, dy = local.y - this.circleY, r = this.radius;
        //console.log("镂空:" + stageX,stageY,local.x,local.y,this.circleX,this.circleY,dx,dy);
        return dx * dx + dy * dy > r * r ? this : null;
    };
    return HollowedOutLayer;
})(egret.DisplayObjectContainer);
egret.registerClass(HollowedOutLayer,'HollowedOutLayer');
