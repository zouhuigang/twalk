/**
 *
 * @author
 * 线段y=kx+b;
 *
 */
var MyLinear = (function () {
    function MyLinear() {
        this.MyAllposArr = []; /**路径点*/
        this.getI = 0; //得到进过一段距离之后的x,y所在的线段
        this.arr = []; //返回
        this.flen = 0; //所在线段剩余的长度,总的行驶距离减去其他线段的距离
        //计算对象离初始位置的行走的距离
        this.CurveDist = 0; //总距离
    }
    var d = __define,c=MyLinear,p=c.prototype;
    //已知2点坐标求斜率
    p.GetK = function (startX, startY, endX, endY) {
        if (endX - startX == 0) {
            return false;
        }
        var k = (endY - startY) / (endX - startX);
        return k;
    };
    //    已知一点及直线斜率及线段长度求另一点坐标  
    p.GetPos = function (oriPosX, oriPosY, k, flen) {
        var desPos = new Array();
        if (k == false) {
            desPos['x'] = oriPosX;
            desPos['y'] = flen + oriPosY;
            return desPos;
        }
        desPos['x'] = Math.sqrt((flen * flen) / (k * k + 1)) + oriPosX;
        desPos['y'] = k * (desPos['x'] - oriPosX) + oriPosY;
        return desPos;
    };
    //已知2点及中间一点到起点的线段长度，求中间随机一点的坐标
    p.GetPosMid = function (_startX, _startY, _endX, _endY, _flen) {
        var desPos = new Array();
        if (_endX - _startX == 0) {
            desPos['x'] = _startX;
            if (_endY - _startY > 0) {
                desPos['y'] = _flen + _startY;
            }
            else {
                desPos['y'] = -_flen + _startY;
            }
            return desPos;
        }
        var _k = (_endY - _startY) / (_endX - _startX);
        if (_endX - _startX > 0) {
            desPos['x'] = Math.sqrt((_flen * _flen) / (_k * _k + 1)) + _startX;
        }
        else {
            desPos['x'] = -Math.sqrt((_flen * _flen) / (_k * _k + 1)) + _startX;
        }
        desPos['y'] = _k * (desPos['x'] - _startX) + _startY;
        return desPos;
    };
    //已知一段距离和起点坐标，返回终点坐标
    //IsgetArrRoad是否得到组合路径，返回类似[起点,[x0,y0],[x1,y1],[x2,y2],终点]
    p.getEndXY = function (arr, Mydist, IsgetArrRoad) {
        if (IsgetArrRoad === void 0) { IsgetArrRoad = true; }
        //        var Mydist: number = 300;//像素
        //求对象位移一段路径dist之后的坐标
        //        this.roadArr1 = [[1560,679],[1720,645],[1757,730],[1933,743],[1774,1224],[1516,1584],
        //            [1382,1329],[1489,1276],[1451,1172],[1288,1082],[1139,935],[990,1018]];
        this.roadArr1 = arr;
        var v2d;
        for (var i = 0; i < this.roadArr1.length; i++) {
            v2d = new Vector2D(this.roadArr1[i][0], this.roadArr1[i][1]);
            this.MyAllposArr.push(v2d);
            if (i > 0) {
                var dist = v2d.dist(this.MyAllposArr[i - 1]);
                this.getI = this.getCurveDistance(dist, i, Mydist); //得到进过Mydist距离之后，点所在的线段
                this.arr.push([this.roadArr1[i - 1][0], this.roadArr1[i - 1][1]]);
            }
            if (this.getI) {
                //求返回的坐标
                if (i > 1) {
                    this.flen = Mydist - this.CurveDist;
                }
                else {
                    this.flen = Mydist;
                }
                var endPosArr = this.GetPosMid(this.roadArr1[this.getI - 1][0], this.roadArr1[this.getI - 1][1], this.roadArr1[this.getI][0], this.roadArr1[this.getI][1], this.flen);
                if (IsgetArrRoad) {
                    this.arr.push([endPosArr['x'], endPosArr['y']]);
                }
                else {
                    this.arr = []; //初始化,只返回终点坐标
                    this.arr.push([endPosArr['x'], endPosArr['y']]);
                }
                break;
            }
        }
        //循环完毕，范围超出最大值，则变成最大值
        if (!this.getI) {
            this.arr.push([this.roadArr1[this.roadArr1.length - 1][0], this.roadArr1[this.roadArr1.length - 1][1]]);
        }
        return this.arr;
    };
    /*Dist每段累计行走的长度
     * CurrwayPointIndex第几条线段
     * Mydist,我的线段长度
     * */
    p.getCurveDistance = function (Dist, CurrwayPointIndex, Mydist) {
        this.CurveDist += Dist;
        if (Mydist < this.CurveDist) {
            //          console.log('累计距离为：' + this.CurveDist + '，当前路线点' + CurrwayPointIndex);
            return CurrwayPointIndex; //返回所在线段
        }
    };
    return MyLinear;
})();
egret.registerClass(MyLinear,'MyLinear');
