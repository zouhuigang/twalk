/**
 *
 * WebStorage操作类
 * @author 
 *
 */
class StorageSetting {
    
    /**读取storage*/
    public static getItem(key: string): string {
        var value: string = egret.localStorage.getItem(key);
        if(value == null)
            value = "0";
        return value;
    }
            
    /**读取本地游戏配置和储存的数据*/
    public static loadConfig() {
        var value: string;
        var i: number;
        var len: number;
                    
        //清除storage
        //egret.localStorage.clear();
        //return;
        //读取背景音乐
        value = egret.localStorage.getItem("soundbg");
        if(value == null) {
            value = "1";
            egret.localStorage.setItem("soundbg",value);
        }
        
        //读取玩家用户UID和token
        value = egret.localStorage.getItem("uid");
        if(value == null) {
            //value = "0";
            //egret.localStorage.setItem("uid",value);
            this.getUidAndToken();
        }
        
        //当前能量
        value = egret.localStorage.getItem("now_energy");
        if(value == null) {
            value = "1000";
            egret.localStorage.setItem("now_energy",value);
        }
      
                
    }
    
    
    //获取get上的参数
    public static getUidAndToken() {
        egret.localStorage.setItem("uid",this.GET('uid'));
        egret.localStorage.setItem("token",this.GET('token'));
     
    }
    public static GET(name: string) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
        var r = location.search.substr(1).match(reg);
        if(r != null) return decodeURI(decodeURIComponent(decodeURI(r[2]))); return null;
    }
    
    /**设置关卡故事模式通关状态*/
    public static setGuankaPass(idx:number){
        egret.localStorage.setItem("ispass" + idx,"1");
        GuanKaConfig.data[idx]["ispass"] = true;
    }
    
 
}
