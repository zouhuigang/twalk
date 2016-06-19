/**
 *
 * @author 
 *
 */
class TestGesture extends egret.Sprite {
    private txt: egret.TextField;
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
        this.touchChildren = false;
        this.touchEnabled = true;
    }
    public setLabel(value: string): void {
        this.txt.text = value;
    }
    private onAddToStage(event: egret.Event) {
        var g: egret.Graphics = this.graphics;
        g.beginFill(0xFF0000,1);
        g.drawRoundRect(0,0,150,40,8,8);
        g.endFill();
        this.txt = new egret.TextField();
        this.txt.text = "单点模式";
        this.txt.x = 14;
        this.txt.y = 4;
        this.addChild(this.txt);
    }
}