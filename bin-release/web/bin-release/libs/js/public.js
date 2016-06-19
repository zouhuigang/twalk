//JS操作cookies方法!
/**
 * 写cookies;
 * 在默认的情况下，cookie 会在浏览器关闭的时候自动清除，但是我们可以通过expires来设置 cookie 的有效期。语法如下：
 */
function setCookie(name,value,expiredays)
{
    //var expiredays = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + expiredays*24*60*60*1000);
    document.cookie = name + "="+ escape(value) + ";expires=" + exp.toGMTString();
}
 
//读cookies
function getCookie(name)
{
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}
 
//删cookies
function delCookie(name)
{
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null)
    document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}

function callJsFunc(){
    //window.location = "";
   
   // location.href = "mgtywy://WapbackToApp/1";
    window.location.href = "mgtywy://WapbackToApp/1";
}

function WebShareInApp(url,imgurl,title,content) {//base64位加密
    window.location = "mgtywy://WebShareInApp/" + url + "/" + imgurl + "/" + title + "/" + content;
}

//app回传分享参数过来
function AppToWapValue(value){
    var share_value = parseInt(value);//0分享开始，1分享成功,2分享失败，3分享取消
    var a = new Share();
    a.JsCallTs_share_de(share_value);
  
}

function AppToWapValue_test(){
 alert("执行成功");
}


