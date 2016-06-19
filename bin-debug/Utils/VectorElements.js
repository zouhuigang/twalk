/**
 *
 * 所有具有转向行为对象的基类
 * @author
 *
 */
var VectorElements = (function (_super) {
    __extends(VectorElements, _super);
    function VectorElements() {
        _super.call(this);
        /**路径点*/
        this.posArr = [];
        /**最大移动速度*/
        this._maxSpeed = 0.6;
        /**移动角度*/
        this._angle = 0;
        /**路径点索引*/
        this._pathIndex = 0;
        /**到达阈值*/
        this._arrivalThreshold = 3;
        /**路径阈值(pathThreshold)相当于航点间距 别和_arrivalThreshold值一样 容易造成到达冲突*/
        this._pathThreshold = 5;
        //计算对象离初始位置的行走的距离
        this.CurveDist = 0;
        this.CurrwayPointIndex = 0; //当前的路线点,距离前一个位置的坐标点。
        this.CurveDistInit = 0; //累计段距离
        this._position = new Vector2D();
        this._velocity = new Vector2D();
        this._steeringForce = new Vector2D();
    }
    var d = __define,c=VectorElements,p=c.prototype;
    /**实时刷新,obj移动对象*/
    p.onEnterFrame = function (advancedTime, obj) {
        //console.log(obj.x,obj.y,this.position.x,this.position.y);
        //路径寻路点
        this.followPath(this.posArr);
        this._velocity = this._velocity.add(this._steeringForce);
        this._steeringForce = new Vector2D();
        // 截断速度保证不超过最大速度
        this._velocity.truncate(this._maxSpeed);
        // 位置向量+速度向量
        this._position = this._position.add(this._velocity);
        //移动更新位置
        obj.x = this._position.x;
        obj.y = this._position.y;
        // 设置自身角度
        obj._angle = (this._velocity.angle * 180 / Math.PI + 360) % 360;
        //console.log('当前坐标x:' + obj.x + ',y:' + obj.y + '角度:' + obj._angle);
    };
    d(p, "position"
        ,function () {
            return this._position;
        }
        /**
        * 读写位置向量
        */
        ,function (value) {
            this._position = value;
        }
    );
    d(p, "velocity"
        ,function () {
            return this._velocity;
        }
        /**
        * 读写加速度向量
        */
        ,function (value) {
            this._velocity = value;
        }
    );
    //-------------------------------------------------------------------------------------------------------------------
    /**寻找行为,传递一个目标向量坐标_x,_y*/
    p.seek = function (target) {
        var desiredVelocity = target.subtract(this._position); //目标向量减去当前向量,得到对象要行走的方向
        desiredVelocity.normalize(); //将当前向量转化成单位向量
        desiredVelocity = desiredVelocity.multiply(this._maxSpeed); //数与向量的乘积
        var force = desiredVelocity.subtract(this._velocity);
        this._steeringForce = this._steeringForce.add(force);
    };
    /**到达行为,到达设置的点*/
    p.arrive = function (target) {
        var desiredVelocity = target.subtract(this._position); //向量差
        desiredVelocity.normalize();
        var dist = this._position.dist(target);
        if (dist > this._arrivalThreshold) {
            desiredVelocity = desiredVelocity.multiply(this._maxSpeed);
        }
        else {
            desiredVelocity = desiredVelocity.zero();
            this._velocity = this._velocity.zero(); //速度向量设置为0
            //敌人路径点走完表示逃脱，本方走完则状态切换到移动完成
            //            this.fsm.changeState(stateType.moveEndState);
            this.dispatchEvent(new MyselfEvent(MyselfEvent.Arrived)); //抛出事件
        }
        var force = desiredVelocity.subtract(this._velocity); //力向量=向量差(方向向量)-速度向量
        this._steeringForce = this._steeringForce.add(force);
    };
    /**跟随路径点*/
    p.followPath = function (path, loop) {
        if (loop === void 0) { loop = false; }
        var wayPoint = path[this._pathIndex];
        if (wayPoint == null)
            return;
        if (this._position.dist(wayPoint) < this._pathThreshold) {
            if (this._pathIndex >= path.length - 1) {
                if (loop) {
                    this._pathIndex = 0;
                }
            }
            else {
                this._pathIndex++;
            }
        }
        if (this._pathIndex >= path.length - 1 && !loop) {
            this.arrive(wayPoint);
        }
        else {
            this.seek(wayPoint);
        }
        //计算走的距离，曲线,总共行走了多少像素点。
        if (this._pathIndex > 0) {
            this.getCurveDistance(this._position.dist(path[this._pathIndex - 1]), this._pathIndex - 1);
        }
    };
    /*Dist每段累计行走的长度*/
    p.getCurveDistance = function (Dist, CurrwayPointIndex) {
        if (CurrwayPointIndex != this.CurrwayPointIndex) {
            this.CurveDistInit = this.CurveDist;
            this.CurveDist = this.CurveDistInit;
        }
        else {
            this.CurveDist = this.CurveDistInit + Dist;
        }
        this.CurrwayPointIndex = CurrwayPointIndex;
        //console.log('累计距离为：'+this.CurveDist+'，当前路线点'+this.CurrwayPointIndex);
    };
    //停止移动
    p.objStopMove = function (x, y) {
        var StopPoint = new Vector2D(x, y);
        //console.log('到达目标坐标:（'+this.view.x+','+this.view.y+'),行驶距离：'+this.CurveDist);
        //出现的起始路径
        this.posArr = [];
        this.posArr.push(StopPoint); //终点和起点2个重合，所以要2遍
        this.posArr.push(StopPoint);
        this._pathIndex = 0;
        //        this._position.x = x;
        //        this._position.y = y;
    };
    return VectorElements;
})(egret.Sprite);
egret.registerClass(VectorElements,'VectorElements');
