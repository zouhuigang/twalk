/**
 *
 * 声音管理类
 * @author
 *
 */
var SoundManager = (function () {
    function SoundManager() {
    }
    var d = __define,c=SoundManager,p=c.prototype;
    /**播放音效*/
    SoundManager.playEffect = function (name, value) {
        if (value === void 0) { value = 1; }
        //判断音效按钮是否静音，是则return 否则播放
        var sound_eff = RES.getRes(name);
        sound_eff.type = egret.Sound.EFFECT;
        //        sound_eff.volume = value;
        sound_eff.play(0, 1);
    };
    /**播放背景音乐*/
    SoundManager.playBgSound = function (name, loop) {
        if (loop === void 0) { loop = true; }
        this.sdbg = RES.getRes(name);
        this.sdbg.type = egret.Sound.MUSIC;
        //        this.sdbg.play(loop);
        // play 的2个参数。startTime：声音开始播放的位置，默认为0。loops：声音播放的次数，小于等于0均为无限循环播放，大于0按照对应的值播放次数。
        this.sdbgsoundChannel = this.sdbg.play(0, -1);
    };
    /**停止背景音乐*/
    SoundManager.stopBgSound = function () {
        //        console.log(this.sdbgsoundChannel);
        if (this.sdbgsoundChannel != null) {
            this.sdbgsoundChannel.stop();
        }
    };
    return SoundManager;
})();
egret.registerClass(SoundManager,'SoundManager');
