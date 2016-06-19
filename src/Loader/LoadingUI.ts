/**
* 
* 文字进度
* @author 
* 
*/ 
class LoadingUI extends egret.Sprite {
    public constructor() {
        super();
        this.createView();
    }
 

    private textField:egret.TextField;
    private createView():void {
        //文字加载
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.width = 480;
        this.textField.height = 100;
        this.textField.textAlign = "center";
        this.textField.textColor = 0xfed650;
        this.textField.size=18;
        
        
       
    }

    private maskRect: egret.Rectangle;//用来盖住显示对象的进度条
    public setProgress(current, total):void {
        this.textField.text = "Loading..." + current + "/" + total;
    }
}
