/**
 *
 * @author zouhuigang
 * 庆祝类
 *
 */
var Celebrate = (function (_super) {
    __extends(Celebrate, _super);
    function Celebrate() {
        _super.call(this);
        //彩带花，2张图，可以连着出
        this.flower = null;
        this.flower2 = null;
        this.light = null;
        this.light2 = null;
        this.bg2 = null;
        this.txt = null;
        //舞台宽高
        this.stageW = 0;
        this.stageH = 0;
        //人物动画，初始化人物骨骼动画
        this._armature = null; //人物骨架
        this.stageH = egret.MainContext.instance.stage.stageHeight;
        this.stageW = egret.MainContext.instance.stage.stageWidth;
        this.index();
    }
    var d = __define,c=Celebrate,p=c.prototype;
    p.index = function () {
        this.bg2 = new egret.Bitmap(RES.getRes("bg2_png"));
        this.bg2.width = this.stageW;
        this.bg2.height = this.stageH;
        this.addChild(this.bg2);
        //        this.graphics.beginFill(0x000000);
        //        this.graphics.drawRect(0,0,this.stageW,this.stageH);
        //        this.graphics.endFill();
        //灯光
        this.lightCon = new egret.DisplayObjectContainer;
        this.lightCon2 = new egret.DisplayObjectContainer;
        this.light = new egret.Bitmap(RES.getRes("light2_png"));
        this.light.x = -this.light.width / 2;
        this.lightCon.addChild(this.light);
        this.lightCon.x = this.stageW / 2;
        this.lightCon.y = 0.25 * this.stageH;
        this.addChild(this.lightCon);
        this.lightCon.rotation = 30;
        egret.Tween.get(this.lightCon, {
            loop: !0
        }).to({
            rotation: -30
        }, 2E3);
        this.light2 = new egret.Bitmap(RES.getRes("light2_png"));
        this.light2.x = -this.light2.width / 2;
        this.lightCon2.addChild(this.light2);
        this.lightCon2.x = this.stageW / 2;
        this.lightCon2.y = 0.25 * this.stageH;
        this.addChild(this.lightCon2);
        this.lightCon2.rotation = -30;
        egret.Tween.get(this.lightCon2, {
            loop: !0
        }).to({
            rotation: 30
        }, 2E3);
        //名次标题
        this.txt = new egret.Bitmap(RES.getRes("title_png"));
        this.txt.width = 300;
        this.txt.height = 100;
        this.txt.x = this.stageW / 2 - this.txt.width / 2;
        this.txt.y = 0.08 * this.stageH;
        this.addChild(this.txt);
        this.txt.alpha = 0;
        egret.Tween.get(this.txt).to({
            alpha: 1
        }, 500);
        //排名
        this._bmpText = new egret.BitmapText();
        var bf = RES.getRes("NumberFont_fnt");
        this._bmpText.font = bf;
        this._bmpText.text = "第81位";
        this.addChild(this._bmpText);
        this._bmpText.anchorOffsetX = this._bmpText.width / 2;
        this._bmpText.x = this.stageW / 2;
        this._bmpText.y = this.stageH / 2 - this._bmpText.height;
        //彩带花
        this.flower = new egret.Bitmap(RES.getRes("flower1_png"));
        //this.flower.x = this.stageW / 2 - this.flower.width / 2;
        this.flower.y = 0;
        this.addChild(this.flower);
        this.flower2 = new egret.Bitmap(RES.getRes("flower2_png"));
        //this.flower2.x = this.stageW / 2 - this.flower2.width / 2;
        this.addChild(this.flower2);
        this.flower2.y = this.flower2.height;
        //this.stageobj.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
        //关闭
        this._colse_w = new egret.Bitmap(RES.getRes("colse_w_png"));
        this._colse_w.touchEnabled = true;
        this.addChild(this._colse_w);
        this._colse_w.x = this.stageW - this._colse_w.width;
        this._colse_w.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
        //人物
        this.people();
    };
    //彩带花
    p.onEnterFrame = function (evt) {
        this.flower2.y += 1;
        this.flower.y += 1;
        this.flower.y >= this.stageH && (this.flower.y = -this.flower.height);
        this.flower2.y >= this.stageH && (this.flower2.y = -this.flower2.height);
    };
    p.people = function () {
        var dbdata = RES.getRes("man_json");
        var texturedata = RES.getRes("texture_json");
        var texture = RES.getRes("texture_png");
        var dbf = new dragonBones.EgretFactory();
        dbf.addSkeletonData(dragonBones.DataParser.parseDragonBonesData(dbdata));
        dbf.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, texturedata));
        var arm = dbf.buildArmature("man");
        arm.animation.gotoAndPlay("runFront", 0, -1, 0);
        dragonBones.WorldClock.clock.add(arm);
        this._armature = arm;
        egret.startTick(this.dbrun, this);
        // return this._armature.display;
        this._armature.display.x = this.stageW / 2;
        this._armature.display.y = this.stageH / 2 + this._armature.display.height / 2 + 50;
        var scale = 200 / this._armature.display.height;
        this._armature.display.scaleX = scale;
        this._armature.display.scaleY = scale;
        this.addChild(this._armature.display);
    };
    p.stop = function () {
        egret.stopTick(this.dbrun, this);
    };
    //由tick驱动，刷新DragonBones世界时钟
    p.dbrun = function (timeStamp) {
        dragonBones.WorldClock.clock.advanceTime(0.01);
        return true;
    };
    p.close = function () {
        this._colse_w.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
        this.dispatchEventWith(CelebrateEvent.EVT_CLOSE);
    };
    return Celebrate;
})(egret.Sprite);
egret.registerClass(Celebrate,'Celebrate');
