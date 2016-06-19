/**
 *
 * @author
 *按钮的究极资源拼接
 */
var CombineBtn = (function (_super) {
    __extends(CombineBtn, _super);
    function CombineBtn() {
        _super.call(this);
    }
    var d = __define,c=CombineBtn,p=c.prototype;
    /**
*  按钮的究极资源拼接
* @param txtrLeft          按钮左侧纹理
* @param txtrMiddle    按钮中间部分纵向切片纹理
* @param w     生成按钮总宽
* @param h     生成按钮总高
* @returns {egret.RenderTexture}   生成按钮纹理
* 使用方法：this.combineBtnTxtr( RES.getRes("btnGreen_L"), RES.getRes("btnGreen_M"), 150, 60 );

后边两个数字参数给出生成按钮的宽度和高度，在合理的范围内可以随意修改。
*/
    p.combineBtnTxtr = function (txtrLeft, txtrMiddle, w, h) {
        /// 计算出统一的目标尺寸空间
        var scaleTxtr2Tgt = txtrMiddle.textureHeight / h;
        var wFullTxtrFit = w * scaleTxtr2Tgt;
        /// console.log( "w,h,scaleTxtr2Tgt, wFullTxtrFit:", w, h, scaleTxtr2Tgt, wFullTxtrFit );
        var disp = new egret.Sprite;
        var imgLeft = new egret.Bitmap(txtrLeft);
        disp.addChild(imgLeft);
        var imgMiddle = new egret.Bitmap(txtrMiddle);
        imgMiddle.width = wFullTxtrFit - txtrLeft.textureWidth * 2;
        imgMiddle.fillMode = egret.BitmapFillMode.REPEAT;
        imgMiddle.x = txtrLeft.textureWidth;
        disp.addChild(imgMiddle);
        var imgRight = new egret.Bitmap(txtrLeft);
        disp.addChild(imgRight);
        imgRight.scaleX = -1;
        imgRight.x = wFullTxtrFit;
        var txtrOutput = new egret.RenderTexture;
        txtrOutput.drawToTexture(disp, new egret.Rectangle(0, 0, w, h), 1 / scaleTxtr2Tgt); /// scaleTxtr2Tgt
        return txtrOutput;
    };
    return CombineBtn;
})(egret.Texture);
egret.registerClass(CombineBtn,'CombineBtn');
