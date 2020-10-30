
let wins = []
let mywin = []
let computerwin = []
let count = 0
  //赢法数组初始化
  for(let i=0;i<15;i++){
    wins[i]=[];
    for(let j=0;j<15;j++){
      wins[i][j]=[];
    }
  }
  //横线赢法
  for(let i=0;i<15;i++){
    for(let j=0;j<11;j++){
      for(let k=0;k<5;k++){
        wins[i][j+k][count]=true;
      }
      count++;
    }
  }
  //正斜线赢法
  for(let i=0;i<11;i++){
    for(let j=0;j<11;j++){
      for(let k=0;k<5;k++){
        wins[i+k][j+k][count]=true;
      }
      count++;
    }
  }	
  //反斜线赢法
  for(let i=0;i<11;i++){
    for(let j=14;j>3;j--){
      for(let k=0;k<5;k++){
        wins[i+k][j-k][count]=true;
      }
      count++;
    }
  }
  //竖线赢法
  for(let i=0;i<15;i++){
    for(let j=0;j<11;j++){
      for(let k=0;k<5;k++){
        wins[j+k][i][count]=true;
      }
      count++;
    }
  }
  //赢法统计数组初始化
  for(let i=0;i<count;i++)
  {
    mywin[i]=0;
    computerwin[i]=0;
  }

export {
    wins,
    mywin,
    computerwin,
    count
}