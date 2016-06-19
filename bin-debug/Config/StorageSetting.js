/**
 *
 * WebStorage操作类
 * @author
 *
 */
var StorageSetting = (function () {
    function StorageSetting() {
    }
    var d = __define,c=StorageSetting,p=c.prototype;
    /**读取storage*/
    StorageSetting.getItem = function (key) {
        var value = egret.localStorage.getItem(key);
        if (value == null)
            value = "0";
        return value;
    };
    /**读取本地游戏配置和储存的数据*/
    StorageSetting.loadConfig = function () {
        var value;
        var i;
        var len;
        //清除storage
        //egret.localStorage.clear();
        //return;
        //读取背景音乐
        value = egret.localStorage.getItem("soundbg");
        if (value == null) {
            value = "1";
            egret.localStorage.setItem("soundbg", value);
        }
        //读取玩家用户UID和token
        value = egret.localStorage.getItem("uid");
        if (value == null) {
            //value = "0";
            //egret.localStorage.setItem("uid",value);
            this.getUidAndToken();
        }
        //当前能量
        value = egret.localStorage.getItem("now_energy");
        if (value == null) {
            value = "1000";
            egret.localStorage.setItem("now_energy", value);
        }
    };
    //获取get上的参数
    StorageSetting.getUidAndToken = function () {
        egret.localStorage.setItem("uid", this.GET('uid'));
        egret.localStorage.setItem("token", this.GET('token'));
    };
    StorageSetting.GET = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = location.search.substr(1).match(reg);
        if (r != null)
            return decodeURI(decodeURIComponent(decodeURI(r[2])));
        return null;
    };
    /**设置关卡故事模式通关状态*/
    StorageSetting.setGuankaPass = function (idx) {
        egret.localStorage.setItem("ispass" + idx, "1");
        GuanKaConfig.data[idx]["ispass"] = true;
    };
    return StorageSetting;
})();
egret.registerClass(StorageSetting,'StorageSetting');
