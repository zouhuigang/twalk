/**
 *
 * @author 
 * 线段y=kx+b;
 *
 */
class MyLinear {
	public constructor() {
	}
	
	
    //已知2点坐标求斜率
    private GetK(startX: number,startY: number,endX: number,endY: number): any {
        if(endX - startX == 0) {//斜率不存在
            return false;
        }
        var k: number = (endY - startY) / (endX - startX);
        return k;
    }
    
    //    已知一点及直线斜率及线段长度求另一点坐标  
    private GetPos(oriPosX: number,oriPosY: number,k: any,flen: number) {
        var desPos = new Array();
        if(k == false) {
            desPos['x'] = oriPosX;
            desPos['y'] = flen + oriPosY;
            return desPos;
        }
        desPos['x'] = Math.sqrt((flen * flen) / (k * k + 1)) + oriPosX;
        desPos['y'] = k * (desPos['x'] - oriPosX) + oriPosY;
       
        return desPos;
    }
    
    //已知2点及中间一点到起点的线段长度，求中间随机一点的坐标
    private GetPosMid(_startX:number,_startY:number,_endX:number,_endY:number,_flen:number){
        var desPos = new Array();
        if(_endX - _startX == 0) {//斜率不存在
            desPos['x'] = _startX;
            if(_endY - _startY > 0){
                desPos['y'] = _flen + _startY;
            }else{
                desPos['y'] = - _flen + _startY;
            }
            
            return desPos;
        }
        var _k: number = (_endY - _startY) / (_endX - _startX);
        
        if(_endX - _startX>0){
            desPos['x'] = Math.sqrt((_flen * _flen) / (_k * _k + 1)) + _startX;
        }else{
            desPos['x'] = - Math.sqrt((_flen * _flen) / (_k * _k + 1)) + _startX;
        }
       
        desPos['y'] = _k * (desPos['x'] - _startX) + _startY;
        return desPos;
    }
    
    
    protected MyAllposArr: Vector2D[] = [];/**路径点*/
    private roadArr1: number[][];
    private getI: number=0;//得到进过一段距离之后的x,y所在的线段
    private arr=[];//返回
    private flen:number=0;//所在线段剩余的长度,总的行驶距离减去其他线段的距离
    //已知一段距离和起点坐标，返回终点坐标
    //IsgetArrRoad是否得到组合路径，返回类似[起点,[x0,y0],[x1,y1],[x2,y2],终点]
    public getEndXY(arr:any,Mydist:number,IsgetArrRoad:boolean=true) {
//        var Mydist: number = 300;//像素
        //求对象位移一段路径dist之后的坐标
//        this.roadArr1 = [[1560,679],[1720,645],[1757,730],[1933,743],[1774,1224],[1516,1584],
//            [1382,1329],[1489,1276],[1451,1172],[1288,1082],[1139,935],[990,1018]];
        this.roadArr1=arr;
        var v2d: Vector2D;
        for(var i: number = 0;i < this.roadArr1.length;i++) {
            v2d = new Vector2D(this.roadArr1[i][0],this.roadArr1[i][1]);
            this.MyAllposArr.push(v2d);
           
             if(i > 0) {
                var dist:number = v2d.dist(this.MyAllposArr[i - 1]);
                this.getI=this.getCurveDistance(dist,i,Mydist);//得到进过Mydist距离之后，点所在的线段
                this.arr.push([this.roadArr1[i - 1][0],this.roadArr1[i- 1][1]]);
              }
              
            if(this.getI) {
                //求返回的坐标
                if(i>1){//不在起始线段上
                    this.flen = Mydist - this.CurveDist;
                }else{//在起始线段上
                    this.flen=Mydist;
                }
                 
                var endPosArr: any = this.GetPosMid(this.roadArr1[this.getI - 1][0],this.roadArr1[this.getI - 1][1],this.roadArr1[this.getI][0],this.roadArr1[this.getI][1],this.flen);
                if(IsgetArrRoad){//返回全路径
                    this.arr.push([endPosArr['x'],endPosArr['y']]);
                }else{
                    this.arr=[];//初始化,只返回终点坐标
                    this.arr.push([endPosArr['x'],endPosArr['y']]);
                }
                break;
            }
         }
         
         //循环完毕，范围超出最大值，则变成最大值
         if(!this.getI){
              this.arr.push([this.roadArr1[this.roadArr1.length - 1][0],this.roadArr1[this.roadArr1.length-1][1]]);
         }
        return this.arr;
    }
    
    //计算对象离初始位置的行走的距离
    protected CurveDist: number = 0;//总距离
    /*Dist每段累计行走的长度
     * CurrwayPointIndex第几条线段
     * Mydist,我的线段长度
     * */
    private getCurveDistance(Dist: number,CurrwayPointIndex: number,Mydist:number) {
        this.CurveDist += Dist;
        if(Mydist < this.CurveDist) {
//          console.log('累计距离为：' + this.CurveDist + '，当前路线点' + CurrwayPointIndex);
            return CurrwayPointIndex;//返回所在线段
        }
       
    }
  
    //end MyLinear
}
