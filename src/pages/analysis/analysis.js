const service = require('../../service/test');
let globalData = getApp().globalData;

Page({
  data: {
    sideLength: 200,
    ec: {
      lazyLoad: false
    },
    outline: { //概览面板数据
      appNum: '', //异常应用数
      exceptionNum: '', //异常总数
      point: '' //系统总体评分
    },
    collections: [], //收藏列表数据
    exceptionList: [], //异常列表数据
    ifLoading: true, //标识加载态，以防多次触发上拉加载事件
    page: 0, //异常列表页码
    size: 10 //异常列表单页项数
  },

  // 绘制分数面板
  showScoreAnim2(value, max) {
    let shadowOffset = 2;
    let sideLength = this.data.sideLength - shadowOffset;
    let lineWidth = 12;
    let fontSize = 60;
    let radius = sideLength / 2 - lineWidth;

    let colors = [
      [240, 101, 67],
      [244, 224, 77],
      [6, 214, 160],
      // 背景色
      // [44, 117, 179]
    ];

    let ctx = wx.createCanvasContext('canvasArc');
    let t = 0;
    let timer = setInterval(() => {
      let frames = 50;
      let i = 0;
      if (t > 50) i = 1;

      let r = cubicEaseOut(t, colors[i][0], colors[i + 1][0] - colors[i][0], frames);
      let g = cubicEaseOut(t, colors[i][1], colors[i + 1][1] - colors[i][1], frames);
      let b = cubicEaseOut(t, colors[i][2], colors[i + 1][2] - colors[i][2], frames);

      t++;
      // 画底层圆
      ctx.setLineWidth(lineWidth * 2 / 3);
      ctx.setStrokeStyle('rgba(255, 255, 255, 0.2)');
      ctx.setLineCap('round');
      ctx.beginPath();
      ctx.arc(radius + lineWidth, radius + lineWidth, radius, 0, 2 * Math.PI, false);
      ctx.stroke();

      // 绘制主标题
      ctx.font = fontSize + "px Arial";
      ctx.fillStyle = "#fff";
      ctx.textAlign = 'center';//文本水平对齐
      ctx.textBaseline = 'middle';//文本垂直方向，基线位置
      ctx.fillText(t + '', sideLength / 2, sideLength / 2 - fontSize / 2); // x,y分别设置两条基线位置

      // ctx.fillText('-', sideLength / 2, sideLength / 2 ); // x,y分别设置两条基线位置

      // 绘制分割线
      ctx.beginPath();
      ctx.setLineWidth(1);
      ctx.setStrokeStyle('#eee');
      ctx.moveTo(fontSize, sideLength / 2 + 10);
      ctx.lineTo(sideLength - fontSize, sideLength / 2 + 10);
      ctx.stroke();

      // 绘制副标题
      ctx.font = "16px Arial";
      ctx.fillText('出现 ' + this.data.outline.exceptionNum + ' 个异常', sideLength / 2, sideLength / 4 * 3);

      // 画外层圆弧
      ctx.setLineWidth(lineWidth);
      ctx.setLineCap('round');
      ctx.setStrokeStyle('rgb(' + [r, g, b].join() + ')');
      ctx.shadowOffsetX = shadowOffset;
      ctx.shadowOffsetY = shadowOffset;
      ctx.shadowBlur = 10;
      ctx.shadowColor = 'rgba(0, 0, 0, 0.35)';
      ctx.beginPath();
      ctx.arc(radius + lineWidth, radius + lineWidth, radius, -Math.PI / 2, 2 * Math.PI * (t / max) - Math.PI / 2, false);
      ctx.stroke();

      ctx.draw();

      if (t >= value) {
        clearInterval(timer);
      }
    }, 15);

    // 动画算法，这里使用Cubic.easeOut算法
    function cubicEaseOut(t, b, c, d) {
      // return c * ((t = t/d - 1) * t * t + 1) + b;
      if (t > 50) return c * (t - 50) / d + b;
      else return c * (t / d) + b;
    }
  },

  // 绘制分数面板
  showScoreAnim(value, max) {
    let sideLength = this.data.sideLength;
    let fontSize = 60;
    let radius = sideLength / 2;
    let color = '#2C75B3';
    let ctx = wx.createCanvasContext('canvasArc');

    let rangeValue = value;
    let nowRange = 0;

    //Sin 曲线属性
    let sX = 0;
    let sY = sideLength / 2;
    let axisLength = sideLength; //轴长
    let waveWidth = 0.015 ;   //波浪宽度,数越小越宽
    let waveHeight = 4; //波浪高度,数越大越高
    let speed = 0.10; //波浪速度，数越大速度越快
    let xOffset = 0; //波浪x偏移量

    // 画圈
    let IsdrawCircled = false;
    function drawCircle (){
      ctx.beginPath();
      ctx.lineWidth = 0;
      ctx.strokeStyle = '#eee';
      ctx.fillStyle = '#eee';
      ctx.arc(radius, radius, radius, 0, 2 * Math.PI);
      // ctx.stroke();
      ctx.fill();

      ctx.beginPath();
      ctx.arc(radius, radius, radius - 8, 0, 2 * Math.PI);
      ctx.strokeStyle = '#eee';
      ctx.stroke();
      ctx.clip(); // 裁剪圆形区域，之后的绘制工作只在改区域上可见
    }


    // 画 sin 函数
    function drawSin (xOffset){
      ctx.save();

      let points=[];	//用于存放绘制Sin曲线的点

      ctx.beginPath();
      //在整个轴长上取点
      for(let x = sX; x < sX + axisLength; x += 20 / axisLength){
        //此处坐标(x,y)的取点，依靠公式 “振幅高*sin(x*振幅宽 + 振幅偏移量)”
        let y = -Math.sin((sX + x) * waveWidth + xOffset);

        let dY = sideLength * (1 - nowRange / 100 );

        points.push([x, dY + y * waveHeight]);
        ctx.lineTo(x, dY + y * waveHeight);
      }

      //封闭路径
      ctx.lineTo(axisLength, sideLength);
      ctx.lineTo(sX, sideLength);
      ctx.lineTo(points[0][0],points[0][1]);
      ctx.fillStyle = color;
      ctx.fill();

      ctx.restore();
    }

    this.render = function (){
      ctx.clearRect(0, 0, sideLength, sideLength);

      rangeValue = value;

      if(IsdrawCircled === false){
        drawCircle();
      }

      if(nowRange <= rangeValue){
        nowRange += 1;
      }

      if(nowRange > rangeValue){
        nowRange -= 1;
      }

      drawSin(xOffset);
      // drawText();

      if (nowRange > rangeValue - 2) {
        xOffset += speed;
      } else {
        xOffset += speed * 3;
      }
      ctx.draw();
    };

  },


  onLoad() {
    wx.setNavigationBarTitle({title: 'insight'});
    this.setData({
      ifLoading: true
    });
    service.getSystem(
      (res) => {
        this.setData({
          outline: res.data
        });
        this.setData({
          sideLength: 0.4 * globalData.windowHeight
        });
        setTimeout(
          () => this.showScoreAnim2(this.data.outline.point, 100),
          300
        )
      },
      (res) => {
      }
    );

    service.getUnhandledExceptions(
      (res) => {
        this.setData({
          exceptionList: res.records,
          page: this.data.page + 1
        });
        setTimeout(() => {
          this.setData({
            ifLoading: false
          })
        }, 1000);
        wx.stopPullDownRefresh()
      },
      (res) => {
        setTimeout(() => {
          this.setData({
            ifLoading: false
          })
        }, 1000);
        wx.stopPullDownRefresh()
      },
      this.data.page,
      this.data.size
    );

  },

  onFormSubmit (e) {
    service.patchUserFormId(
      (res) => {
        console.log(res);
      },
      (res) => {
      },
      globalData.openid,
      e.detail.formId
    );
  },

  loadExceptionList: function () {
    if (this.data.ifLoading) return;

    this.setData({
      ifLoading: true
    });

    service.getUnhandledExceptions(
      (res) => {
        let list = this.data.exceptionList;
        for (let i = 0; i < res.records.length; i++) {
          list.push(res.records[i]);
        }
        this.setData({
          exceptionList: list,
          page: this.data.page + 1,
          ifLoading: false
        });
      },
      (res) => {
        this.setData({
          ifLoading: false
        });
      },
      this.data.page,
      this.data.size
    );
  },

  onHide () {
    // 生命周期函数--监听页面隐藏
    wx.hideNavigationBarLoading();

  },

  onPullDownRefresh: function () {
    wx.startPullDownRefresh();
    if (this.data.ifLoading) return;
    this.onLoad();
  },
});
