class CityUI extends eui.Component {
    protected xx_png: eui.Image;
    public constructor() {
        super();
        this.addEventListener(eui.UIEvent.COMPLETE,this.uiCompHandler,this);
        this.skinName = "resource/skins/CitySkin.exml";

    }

    private btnOK: eui.Button;
    private btnReturns: eui.Button;

    private listHeros: eui.List;
    private scrListHeros: eui.Scroller;
    private uiCompHandler() {
        this.xx_png.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick_begin,this);
        /// 填充数据
        var dsListHeros: Array<Object> = [
            { icon: "heros01_png",heroName: "问题1",comment: "评价：樱桃小丸子",checked: false }
            ,{ icon: "heros02_png",heroName: "问题2",comment: "评价：离了我你不行的",checked: true }
              ,{ icon: "heros01_png",heroName: "问题1",comment: "评价：樱桃小丸子",checked: false }
            ,{ icon: "heros02_png",heroName: "问题2",comment: "评价：离了我你不行的",checked: true }
              ,{ icon: "heros01_png",heroName: "问题1",comment: "评价：樱桃小丸子",checked: false }
            ,{ icon: "heros02_png",heroName: "问题2",comment: "评价：离了我你不行的",checked: true }
              ,{ icon: "heros01_png",heroName: "问题1",comment: "评价：樱桃小丸子",checked: false }
            ,{ icon: "heros02_png",heroName: "问题2",comment: "评价：离了我你不行的",checked: true }
              ,{ icon: "heros01_png",heroName: "问题1",comment: "评价：樱桃小丸子",checked: false }
            ,{ icon: "heros02_png",heroName: "问题2",comment: "评价：离了我你不行的",checked: true }
        ];
        this.listHeros.dataProvider = new eui.ArrayCollection(dsListHeros);

        this.listHeros.itemRenderer = HerosListIRSkin;
    }
    
    private onclick_begin(){
        this.dispatchEventWith(CityEvent.EVT_CLOSE);
    }
  
}

class HerosListIRSkin extends eui.ItemRenderer {

    private cb: eui.CheckBox;

    constructor() {
        super();
        this.skinName = "resource/skins/CityQuerySkin.exml";
    }

    protected createChildren(): void {
        super.createChildren();
//        this.cb.addEventListener(egret.Event.CHANGE,() => {
//            console.log("\tCheckbox 变化:",this.data.checked);
//            this.data.checked = this.cb.selected;
//        },this);
    }

    /*protected dataChanged():void{
     console.log( "\tCheckbox:", this.data.checked );
     //this.cb.selected = this.data.checked;
     }*/

}