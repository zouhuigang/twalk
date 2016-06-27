class QuertionListUI extends eui.Component {
    protected eventid: number = 0;
    public constructor(eventid:number) {
        super();
        this.eventid=eventid;
       this.addEventListener(eui.UIEvent.COMPLETE,this.getevent,this);
       this.skinName = "resource/skins/QuertionListSkin.exml";
       
    }

    private ID_CityName:eui.Label;
    private ID_QuertionDesc:eui.Label;
    private ID_Querstionbg:eui.Image;//背景
    private ID_icon:eui.Image;//描述文件
    private list: eui.List;
    private sourceArr: any[] = [];//答案列表
    private _nextuncolckevent: number = 0;//下一个事件
    private uiCompHandler() {     
        /// 填充数据
        //var sourceArr: Array<any> = [{ CityName: "问题1" },{ CityName: "问题1" }];
//        
//        for(var i: number = 1;i < 4;i++) {
//            //给数据中添加一个含有"label"属性的对象
//            this.sourceArr.push({ f_select: i + "其总重量没有达到吉尼斯前纪录",f_istrue:true});
//        }
        var myCollection: eui.ArrayCollection = new eui.ArrayCollection(this.sourceArr);
        this.list = new eui.List();
        this.list.dataProvider = myCollection;
        this.list.percentWidth = 100;
        this.list.percentHeight = 100;
        this.list.y = 330+this.ID_QuertionDesc.textHeight+80;
        var exml = `
       <e:Skin xmlns:e="http://ns.egret.com/eui">
       <e:Group  width="640" x="0" height="{data.border_h}">
            <e:Image source="linec_png" left="0" horizontalCenter="0"  scale9Grid="13,23,100,20"   width="{data.border_w}" height="{data.border_h}"/> 
			<e:Label text="{data.f_select}"  size="30" width="400"  multiline="true" lineSpacing="5" verticalAlign="middle" horizontalCenter="0"  textAlign="center" textColor="0x425260" left="120" right="120" top="0" bottom="0"/> 
		</e:Group>
		</e:Skin>
        
        `;
      
        //this.list.itemRenderer = AnswerList;
        this.list.itemRendererSkinName = exml;
        this.addChild(this.list);
        this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.SelectAnswer,this);
        
        //控制背景大小
        //this.ID_Querstionbg.height = 330 + this.list.y;
        this.ID_Querstionbg.height=this.answer_total+this.list.y;//问题描述区+答案区
        

//        var _right: egret.Bitmap = new egret.Bitmap(RES.getRes("correct_png"));
//        _right.x = 530;
//        _right.y = this.anser_every_height[0]-15;
//        this.list.addChild(_right);
//        var _rights: egret.Bitmap = new egret.Bitmap(RES.getRes("correct_png"));
//        _rights.x = 530;
//        _rights.y = this.anser_every_height[1]-15;
//        this.list.addChild(_rights);
//        console.dir(_right.y);
    }
    
    //遇到问题
    private lineHeight:number=0;
    private answer_total:number=0;//该题答案区的总长度
    private anser_every_height:any[]=[];//错与对出现的位置，答案的中间位置
    private _Netdata: Netdata;
    private getevent(){
        var urlloader = new egret.URLLoader();
        var req = new egret.URLRequest('http://www.51tywy.com/service/crossdomain/city/getevent');
        req.data = new egret.URLVariables("eventid=" + this.eventid);
        req.method = egret.URLRequestMethod.POST;
        urlloader.load(req);
        
        urlloader.addEventListener(egret.Event.COMPLETE,(e) => {
            this._Netdata = <Netdata>JSON.parse(e.target.data);
            this.ID_CityName.text = this._Netdata.data['zhu_event']['f_name'];//一般的值直接赋值即可.
            this.ID_QuertionDesc.text = this._Netdata.data['zhu_event']['f_desc'];
            this.ID_icon.source = this._Netdata.data['zhu_event']['f_icon'];
            var len: number = this._Netdata.data['zi_event'].length;
            //求答案字符串的最大值
            var answ_max_len_w: number = 400;
//            for(var i: number = 0;i < len;i++) {
//                var mystringlength: number = this._Netdata.data['zi_event'][i]['f_select'].length;//一个中文字一个长度
//                var border_w = mystringlength * 24 + 60;
//                if(border_w > 400) {
//                    border_w = 400;
//                }
//                if(border_w>answ_max_len_w){
//                    answ_max_len_w = border_w;
//                }
//                
//            }
           
            this.answer_total=0;//初始化
            for(var i: number = 0;i < len;i++) {
            //给数据中添加一个含有"label"属性的对象
                var mystringlength:number = this._Netdata.data['zi_event'][i]['f_select'].length;//一个中文字一个长度
               
                var border_h = Math.ceil(mystringlength /13)*40+33;
                this.lineHeight = Math.ceil(mystringlength / 13);
                this.answer_total += border_h;
                //存入数组
                var answer_mid = this.answer_total - border_h/2;
                this.anser_every_height.push(answer_mid);
                this.sourceArr.push({ 
                    id: parseInt(this._Netdata.data['zi_event'][i]['id']), 
                    f_select: this._Netdata.data['zi_event'][i]['f_select'],
                    f_istrue: parseInt(this._Netdata.data['zi_event'][i]['f_istrue']),
                    border_w: answ_max_len_w,
                    border_h: border_h
                });
               
            }
            this.answer_total=this.answer_total+50;//加上边框之间的距离
            //console.log('答案的总长度'+this.answer_total);
            //console.log('所有答案的长度'+this.anser_every_height);
          
            this.uiCompHandler();
        },this);
    }
    
    

    private onclick_begin() {
        this.dispatchEventWith(QuertionListEvent.EVT_CLOSE);
    }
    
    //选中答案
    private zi_eventid: number = 0;
    private AnserTrue:eui.Label;
    private _right: egret.Bitmap;
    private _wrong: egret.Bitmap;
    private SelectAnswer(e: eui.PropertyEvent){
        //获取点击消息
        //console.log(this.list.selectedItem,this.list.selectedIndex)
        this.zi_eventid = this.list.selectedItem.id;
        this.unlockevent();
      
        
    }
    

    //解锁问题,传回答的ID
    private RewardInfo:any;
    private unlockevent(){
        var urlloader = new egret.URLLoader();
        var req = new egret.URLRequest('http://www.51tywy.com/service/crossdomain/city/unlockevent');
        req.data = new egret.URLVariables("zi_eventid=" + this.zi_eventid + "&uid=" + StorageSetting.getItem('uid') + "&token=" + StorageSetting.getItem('token'));
        req.method = egret.URLRequestMethod.POST;
        urlloader.load(req);
        urlloader.addEventListener(egret.Event.COMPLETE,(e) => {
            this._Netdata = <Netdata>JSON.parse(e.target.data);
            this._nextuncolckevent = parseInt(this._Netdata.data['unlockevent']);
            this.RewardInfo = this._Netdata.data['rewrdInfo'];
            
            if(this.list.selectedItem.f_istrue) {//答案正确
                this._right = new egret.Bitmap(RES.getRes("correct_png"));
                this._right.x = 530;
                //this._right.y = this.list.selectedIndex * 50 + 15 + (this.lineHeight-1)*30-15;
                this._right.y=this.anser_every_height[this.list.selectedIndex]-15;
                this.list.addChild(this._right);
                //console.log(this.list.dataProvider.getItemAt(this.list.selectedIndex).f_select);
                this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP,this.SelectAnswer,this);
                this.PassOrNextEvent();

            } else {
                this._wrong = new egret.Bitmap(RES.getRes("wrong_png"));
                this._wrong.x = 530;
                //this._wrong.y = this.list.selectedIndex * 50 + 15+ (this.lineHeight - 1) * 30;
                this._wrong.y = this.anser_every_height[this.list.selectedIndex] - 15;
                this.list.addChild(this._wrong);
                this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP,this.SelectAnswer,this);
                this.PassOrNextEvent();
            }
           // console.log('下一题' + this._nextuncolckevent);
        },this);
    }
    
    //对-错  或下一题
    private PassOrNextEvent(){
            var pass: number = parseInt(this.RewardInfo['pass']);
            if(this._nextuncolckevent) {
                //下一题
                var _QuertionListEvent: QuertionListEvent = new QuertionListEvent(QuertionListEvent.EVT_NEXTEVENT_ALERT,this._nextuncolckevent);
                //发送要求事件
                this.dispatchEvent(_QuertionListEvent);
            } else if(pass){
                //var _QuertionListEvent_crrect: QuertionListEvent = new QuertionListEvent(QuertionListEvent.EVT_CORRECT_ALERT,0,this.RewardInfo);
                //发送要求事件
                //this.dispatchEvent(_QuertionListEvent_crrect);
                this.dispatchEventWith(QuertionListEvent.EVT_CORRECT_ALERT);
            }else{
                var _QuertionListEvent_error: QuertionListEvent = new QuertionListEvent(QuertionListEvent.EVT_ERROR_ALERT,0,this.RewardInfo);
                //发送要求事件
                this.dispatchEvent(_QuertionListEvent_error);
                //this.dispatchEventWith(QuertionListEvent.EVT_ERROR_ALERT);
            }
    }
    
    
}


class AnswerList extends eui.ItemRenderer {

    private cb: eui.CheckBox;

    constructor() {
        super();
    }

    protected createChildren(): void {
        super.createChildren();
        var img2: egret.Bitmap = new egret.Bitmap();
        img2.texture = RES.getRes("linec_png");
        var rect: egret.Rectangle = new egret.Rectangle(30,31,40,41);
        img2.scale9Grid = rect;
        img2.width *= 2;
        img2.y = 150;
        this.addChild(img2);
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
