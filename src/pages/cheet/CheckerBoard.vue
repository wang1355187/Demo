<template>
  <div>
    <canvas
      id="board" 
      ref="checkerboard" 
      height="450px" 
      width="450px"
      @click="handleClick"
    >
    </canvas>
  </div>
</template>
<script>
import { wins, mywin, computerwin, count } from './rules-init'
import { cheetAt, drawCheckerboard } from './convas-draw'
import { mapMutations } from 'vuex'

export default {
  name: 'Checkboard',
  props: ['game_info'],
  data () {
    return {
      over: false,      //游戏是否结束标志
      color: true,     //true为黑棋，false为白棋
      cheets: [],     //棋盘记录数组
      context: null   //canvas.context对象
    }
  },
  mounted () {
    const canvas = this.$refs.checkerboard
    this.context=canvas.getContext('2d')
    drawCheckerboard(this.context)
    for(let i =0; i<15; i++) {
      this.cheets[i] = []
      for(let j =0; j<15; j++) {
        this.cheets[i][j] = 0
      }
    }
    this.reGame()
  },
  watch: {
    game_info:{
      handler () {
        if(!this.game_info.isFirst&&this.game_info.state == 'start'){
          this.computerAI()
        }
        if(this.game_info.state == 'replay'){
          this.reGame()
        }
      },
      deep: true
    }
  },
  methods: {
    //用于更改游戏状态提示
    ...mapMutations(['updateMessage']),
    //重置游戏
    reGame () {
      this.context.clearRect(0,0,450,450)
      drawCheckerboard(this.context)
      this.over = false
      this.color = true
      this.cheets.forEach( (arr,i) => {
        arr.forEach( (item,j) => {
          this.cheets[i][j] = 0
        })
      })
      for(let i=0;i<count;i++)
      {
        mywin[i]=0;
        computerwin[i]=0;
      }
    },
    handleClick (e) {
      //初始化时game_info为空不进行操作
      if(!this.game_info) {
        return;
      }
      //判断是否点击开始按钮
      if(this.game_info.state !== 'start') {
        return;
      }
      //游戏结束不能进行操作
			if(this.over){
				return;
			}
      //非我方落棋时不能操作
      if(this.game_info.isFirst){
        if(!this.color){
          return;
        }
      }
      else {
        if(this.color){
          return;
        }       
      }
      //获取鼠标点击的棋盘坐标
			var x=e.offsetX;
			var y=e.offsetY;
			var i=Math.floor(x/30);
			var j=Math.floor(y/30);
			//己方落棋逻辑
			if(this.cheets[i][j]==0){
        if(this.game_info.isBlack){
          cheetAt(i,j,this.color,this.context);
        }
        else{
				  cheetAt(i,j,!this.color,this.context);
        }
				this.cheets[i][j]=1;
        for(var k=0;k<count;k++){
          if(wins[i][j][k]){
            mywin[k]++;
            computerwin[k]=6;
            if(mywin[k]==5){
              setTimeout(()=>{
                window.alert('你赢了！！！')
                this.updateMessage('游戏结束，你赢了！！！')
              },100)
              this.over=true;
            }
          }
        }
        //计算机落棋
        if(!this.over){
          this.color=!this.color;
          this.computerAI();
        }
			}
    },
    computerAI () {
      var myScore=[];          //防守价值
			var computerScore=[];   //攻击价值
			var max=0;              //综合价值最大的一步棋
      var u=0,v=0;            //记录最有价值的棋的位置
			//棋价值数组初始化
			for(var i=0;i<15;i++){
				myScore[i]=[];
				computerScore[i]=[];
				for(var j=0;j<15;j++){
					myScore[i][j]=0;
					computerScore[i][j]=0;
				}
      }
      
			//遍历棋盘
			for(var i=0;i<15;i++){
				for(var j=0;j<15;j++){         
					//判断该位置是否可放棋
					if(this.cheets[i][j]==0){
					  //计算该位置防守价值及攻击价值
            for(var k=0;k<count;k++){
              if(wins[i][j][k]){
                switch(mywin[k]) {
                  case 1:
                    myScore[i][j]+=200
                    break;
                  case 2:
                    myScore[i][j]+=400
                    break;
                  case 3:
                    myScore[i][j]+=2000
                    break;
                  case 4:
                    myScore[i][j]+=10000
                    break;                 
                }
                switch(computerwin[k]) {
                  case 1:
                    computerScore[i][j]+=220
                    break;
                  case 2:
                    computerScore[i][j]+=420
                    break;
                  case 3:
                    computerScore[i][j]+=2200
                    break;
                  case 4:
                    computerScore[i][j]+=20000
                    break;
                }					
              }
            }
            //max记录最高综合价值；u，v记录位置
            if(myScore[i][j]>max) {
              u=i;
              v=j;
              max=myScore[i][j];
            }
            else if(myScore[i][j]==max) {
              if(computerScore[i][j]>computerScore[u][v]){
                u=i;
                v=j;
              }
            }
            if(computerScore[i][j]>max) {
              u=i;
              v=j;
              max=computerScore[i][j];
            }
            else if(computerScore[i][j]==max) {
              if(myScore[i][j]>myScore[u][v]) {
                u=i;
                v=j;
              }
            }
				  }
				}
      }
      //电脑先手时，棋子放最中间
      if (max==0) {
        u = 7
        v = 7
      }
      //绘制棋子并记录到棋盘
      if(this.game_info.isBlack){
        cheetAt(u,v,this.color,this.context);
      }
      else{
        cheetAt(u,v,!this.color,this.context);
      }
      this.cheets[u][v]=2;
      
      //遍历赢法数组，判断是否胜利
      for(var k=0;k<count;k++){
        if(wins[u][v][k]){
          computerwin[k]++;
          mywin[k]=6;
          if(computerwin[k]==5){
              setTimeout(()=>{
                window.alert('电脑赢了！！！')
                this.updateMessage('游戏结束，电脑赢了！！！')
              },100)
            this.over=true;
          }
        }
      }
			if(!this.over){
				this.color=!this.color;
			}
    }
  }
}
</script>
<style lang="stylus" scoped>
  #board
    background-color: orange;
    box-shadow: 5px 5px 5px black; 
</style>