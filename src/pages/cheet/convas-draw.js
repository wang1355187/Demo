let padding = 15;           //绘制起点离画布边缘的距离
let line_interval = 30;     //线之间的距离
let side = 450;             //画布的边长

//获取线第inedx条线的（横或纵）坐标
function getLine (index) {
  return padding+line_interval*index
}

//绘制15*15的棋盘
function drawCheckerboard (context) {
  for(var i=0;i<15;i++){
    let line_position = getLine(i);
    context.beginPath();
    context.moveTo(padding, line_position);
    context.lineTo(side-padding, line_position);
    context.stroke();
    context.beginPath();
    context.moveTo(line_position, padding);
    context.lineTo(line_position, side-padding);
    context.stroke();
  }
}

//落棋方法
function cheetAt (i,j,color,context) {

  //棋子绘制
  context.beginPath();
  context.arc(getLine(i), getLine(j), 13, 0, Math.PI*2);
  context.closePath();
  var gradient=context.createRadialGradient(getLine(i)+2, getLine(j)-2, 13, getLine(i)+2, getLine(j)-2, 0);

  //偏移颜色
  if(color){
    gradient.addColorStop(0,"#0A0A0A");
    gradient.addColorStop(1,"#636766");
  }
  else{
    gradient.addColorStop(0,"#D1D1D1");
    gradient.addColorStop(1,"#F9F9F9");
  }

  context.fillStyle=gradient;
  context.fill();
}

export {
  cheetAt,
  drawCheckerboard
}