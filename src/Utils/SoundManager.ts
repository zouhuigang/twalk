/**
 *
 * 声音管理类
 * @author 
 *
 */
class SoundManager {
    private static sdbg: egret.Sound;
    private static sdbgsoundChannel: egret.SoundChannel;
    
	/**播放音效*/
	public static playEffect(name:string,value:number=1){
    	  //判断音效按钮是否静音，是则return 否则播放
        var sound_eff: egret.Sound = RES.getRes(name);
        
        sound_eff.type = egret.Sound.EFFECT;
//        sound_eff.volume = value;
        sound_eff.play(0,1);
	}
	
	/**播放背景音乐*/
    public static playBgSound(name:string,loop:boolean=true){
        this.sdbg=RES.getRes(name);
        this.sdbg.type = egret.Sound.MUSIC;
//        this.sdbg.play(loop);
       // play 的2个参数。startTime：声音开始播放的位置，默认为0。loops：声音播放的次数，小于等于0均为无限循环播放，大于0按照对应的值播放次数。
        this.sdbgsoundChannel = this.sdbg.play(0,-1);
    }
    /**停止背景音乐*/
    public static stopBgSound(){
//        console.log(this.sdbgsoundChannel);
        if(this.sdbgsoundChannel != null) {
            this.sdbgsoundChannel.stop();
        }
        
    }
    
    //判断音乐按钮是否静音，是则停止播放，否则恢复播放
    
	
}
