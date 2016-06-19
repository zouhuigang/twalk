var CityUI = (function (_super) {
    __extends(CityUI, _super);
    function CityUI() {
        _super.call(this);
        this.addEventListener(eui.UIEvent.COMPLETE, this.uiCompHandler, this);
        this.skinName = "resource/skins/CitySkin.exml";
    }
    var d = __define,c=CityUI,p=c.prototype;
    p.uiCompHandler = function () {
        this.xx_png.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_begin, this);
        /// 填充数据
        var dsListHeros = [
            { icon: "heros01_png", heroName: "问题1", comment: "评价：樱桃小丸子", checked: false },
            { icon: "heros02_png", heroName: "问题2", comment: "评价：离了我你不行的", checked: true },
            { icon: "heros01_png", heroName: "问题1", comment: "评价：樱桃小丸子", checked: false },
            { icon: "heros02_png", heroName: "问题2", comment: "评价：离了我你不行的", checked: true },
            { icon: "heros01_png", heroName: "问题1", comment: "评价：樱桃小丸子", checked: false },
            { icon: "heros02_png", heroName: "问题2", comment: "评价：离了我你不行的", checked: true },
            { icon: "heros01_png", heroName: "问题1", comment: "评价：樱桃小丸子", checked: false },
            { icon: "heros02_png", heroName: "问题2", comment: "评价：离了我你不行的", checked: true },
            { icon: "heros01_png", heroName: "问题1", comment: "评价：樱桃小丸子", checked: false },
            { icon: "heros02_png", heroName: "问题2", comment: "评价：离了我你不行的", checked: true }
        ];
        this.listHeros.dataProvider = new eui.ArrayCollection(dsListHeros);
        this.listHeros.itemRenderer = HerosListIRSkin;
    };
    p.onclick_begin = function () {
        this.dispatchEventWith(CityEvent.EVT_CLOSE);
    };
    return CityUI;
})(eui.Component);
egret.registerClass(CityUI,'CityUI');
var HerosListIRSkin = (function (_super) {
    __extends(HerosListIRSkin, _super);
    function HerosListIRSkin() {
        _super.call(this);
        this.skinName = "resource/skins/CityQuerySkin.exml";
    }
    var d = __define,c=HerosListIRSkin,p=c.prototype;
    p.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //        this.cb.addEventListener(egret.Event.CHANGE,() => {
        //            console.log("\tCheckbox 变化:",this.data.checked);
        //            this.data.checked = this.cb.selected;
        //        },this);
    };
    return HerosListIRSkin;
})(eui.ItemRenderer);
egret.registerClass(HerosListIRSkin,'HerosListIRSkin');
