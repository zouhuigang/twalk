
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/game/game.native.js",
	"libs/modules/tween/tween.js",
	"libs/modules/eui/eui.js",
	"libs/modules/res/res.js",
	"libs/modules/neoges_lib/neoges_lib.js",
	"libs/modules/dragonBones/dragonBones.js",
	"libs/TweenMax/TweenMax.min.js",
	"libs/js/public.js",
	"bin-debug/Config/GuanKaConfig.js",
	"bin-debug/Config/StorageSetting.js",
	"bin-debug/core/Celebrate.js",
	"bin-debug/core/Energy.js",
	"bin-debug/Utils/VectorElements.js",
	"bin-debug/core/Myself.js",
	"bin-debug/core/Question.js",
	"bin-debug/core/Scroll.js",
	"bin-debug/core/Share.js",
	"bin-debug/core/TestGesture.js",
	"bin-debug/core/World.js",
	"bin-debug/eui/ArrivedNewCityUI.js",
	"bin-debug/eui/CityUI.js",
	"bin-debug/eui/QuertionCommonUI.js",
	"bin-debug/eui/QuertionListUI.js",
	"bin-debug/eui/ReceveAchievementAwardUI.js",
	"bin-debug/euisys/AssetAdapter.js",
	"bin-debug/euisys/ThemeAdapter.js",
	"bin-debug/Events/CelebrateEvent.js",
	"bin-debug/Events/CityEvent.js",
	"bin-debug/Events/LoadEvent.js",
	"bin-debug/Events/MyselfEvent.js",
	"bin-debug/Events/QuertionListEvent.js",
	"bin-debug/Loader/LoadBar.js",
	"bin-debug/Loader/Loader.js",
	"bin-debug/Loader/LoadingUI.js",
	"bin-debug/Main.js",
	"bin-debug/Utils/Annular.js",
	"bin-debug/Utils/BreathImage.js",
	"bin-debug/Utils/CombineBtn.js",
	"bin-debug/Utils/HollowedOutLayer.js",
	"bin-debug/Utils/MyLinear.js",
	"bin-debug/Utils/RequestNetWork.js",
	"bin-debug/Utils/SoundManager.js",
	"bin-debug/Utils/Utils.js",
	"bin-debug/Utils/Vector2D.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    egret_native.requireFiles();
    egret.TextField.default_fontFamily = "/system/fonts/DroidSansFallback.ttf";
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 60,
		scaleMode: "fixedWidth",
		contentWidth: 640,
		contentHeight: 1136,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:30,textColor:0x00c200,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel(egret.TextField.default_fontFamily, 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};