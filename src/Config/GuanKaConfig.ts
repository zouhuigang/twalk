/**
 * 
 * 关卡数据
 * @author 
 *
 */
class GuanKaConfig {
    //使用localStorage存储关卡状态、解锁、金钱数据
    
    /**每个关卡的资源组名*/
    //public static guankaData: string[] = ["guanka01load","guanka02load","guanka03load","guanka04load","guanka05load","guanka06load","guanka07load","guanka08load","guanka09load","guanka10load","guanka11load","guanka12load"];
    public static guankaData: string[] = ["ResGroupGameLevels0","ResGroupGameLevels1","guanka03load","guanka04load","guanka05load","guanka06load","guanka03load","guanka04load","guanka01load","guanka02load","guanka03load","guanka04load"];
    
    

	/**所有关卡当前状态(小旗旗)  key:ispass0-ispass9   key:wujin0-wujin9*/
    public static data: any[] = [
        { "xpos": 943,"ypos": 860,"ispass":false,"wujin":0},                     
        { "xpos": 774,"ypos": 849,"ispass": true,"wujin": 0 },
        { "xpos": 660,"ypos": 741,"ispass": true,"wujin": 0 }
        
    ];
	
    /**获取关卡状态*/
	public static getData():any[]{
        return GuanKaConfig.data;
	}
	
	
}
