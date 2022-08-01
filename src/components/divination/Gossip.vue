<template>
  <div class="gossip">
    <el-button @click="askDivination" type="warning" size="medium">算卦</el-button>
    <!-- 八卦图形-->
    <div class="guaImg">
      <div class="left">
      </div>
      <div class="right">
      </div>
    </div>
    <div class="content">
      <div class="left">
        <div class="leftTitle">
            {{guaName}}
        </div>
<!--        <div class="fontShow" v-for="(val,index) in yaoDetail" :key="index">{{ val }}</div>-->
      </div>
      <div class="showTime right">
        <div class="yao" v-for="(val,index) in yaoArr" :key="index" :title="yaoDetail[index]" @click="changeClassName(index)">
          <div :class="val ? 'yang' : 'yin'">
          </div>
          <div class="yaoDetail" v-show="true">
            {{yaoDetail[index]}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "gossip",
  data() {
    return {
      active: "",
      //用于接收后台传输卦相关的数据
      data: [],
      //用于显示的数组
      yaoArr:[],
      //爻辞
      yaoDetail:[],
      //卦名
      guaName:"",
      //卦的解析
      guaDetail:""
    };
  },
  created() {
    this.getInfo()
  },
  methods: {
    //点击每个爻时触发事件
    changeClassName(index) {
      let arr = this.yaoArr
      arr[index] = arr[index] ? 0 : 1
      this.yaoArr = []
      arr.forEach(item =>{
        this.yaoArr.push(item)
      })
      this.jieXi();
    },
    //解析数据
    jieXi(){
      let yaoObj={};
      //遍历64卦数据
      yaoObj =this.data.find((item)=>{
        //把yaoArr转换为字符串
        return  item["gua-xiang"] === this.yaoArr.join("")
      })
      //把爻辞存入数组中
      this.yaoDetail = yaoObj["yao-detail"].slice().reverse();
      //存储卦名
      this.guaName = yaoObj["gua-name"]
      //存入卦的解析
      this.guaDetail = yaoObj["gua-detail"]
    },
    //请请求数据
    getInfo(){
      this.service.get("/api/gua").then(res =>{
          if (res.status===200){
            //把后台传递的数据赋值给data
            this.data = res.data.gua;
          }
        }
      ).catch(error =>{
        console.log(error)
      })
    },
    //点击算卦获取卦值
    askDivination() {
      //取四个随机数
      //模仿3个硬币获取2个随机数的数组
      let arr = [];
      //把三枚硬币的和放入每一次的和放入数组
      let arrSum = [];
//三个硬币抛一次获得一个爻(yao 第二声),抛六次整合后得到一个卦象
      for (let i = 0; i < 6; i++) {
        //清空arr数组
        arr = [];
        //模仿3个硬币，每次抛一个硬币获取1个随机数，并存入数组
        for (let j = 0; j < 3; j++) {
          //这里定义每一次抛的结果为2或3
          let number = this.randomNum(2, 3);
          //把随机获取的随机数放入数组
          arr.push(number);
        }
        //把抛三次硬币的结果的和放入一个数组
        //从左往右数，数组的最后一个为第一个随机数和，倒数第二个为第二个随机数的和，依次类推
        arrSum.push(this.sum(...arr));
      }
      //转换为1或0的数组表示每个爻
      this.yaoArr = arrSum.map((item) => {
        if (item === 7 || item === 9) {
          return 1
        } else {
          return 0
        }
      })
    //  解析数据
      this.jieXi();
    },
    //求随机数
    randomNum(max, min) {
      if (max < min) {
        max = max ^ min;
        min = max ^ min;
        max = max ^ min;
      }
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    /* 求任意数字的和 */
    sum() {
      var res = 0;
      for (let i = 0; i < arguments.length; i++) {
        res += arguments[i];
      }
      return res;
    }
  }
};
</script>

<style scoped lang="scss">
.gossip {
  height: 100vh;
  .guaImg{
    width: 100px;
    height: 100px;
    position: relative;
    animation: rotate 6s linear infinite;
    .left{
      width: 50%;
      height: 100%;
      background: black;
      border-radius: 50px 0 0 50px;
      position: relative;
      &:before{
        content: "";
        background: white;
        width: 50px;
        height: 50px;
        box-sizing: border-box;
        position: absolute;
        border: black solid 15px;
        border-radius: 50%;
        z-index: 1;
        left: 50%;
      }
    }
    .right{
      position: absolute;
      top: 0;
      left: 50%;
      width: 50%;
      height: 100%;
      background: white;
      border-radius: 50px 0 0 50px;
      transform: rotate(180deg);
      &:before{
        content: "";
        background: black;
        width: 50px;
        height: 50px;
        box-sizing: border-box;
        position: absolute;
        border: white solid 15px;
        border-radius: 50%;
        z-index: 1;
        left: 50%;
      }
    }
  }
  //旋转的八卦卦图
  //.guaImg{
  //  width: 50px;
  //  height: 100px;
  //  background: black;
  //  border-radius: 50px 0 0 50px;
  //  //animation: rotate 6s linear infinite;
  //  transform-origin:100% 50%;
  //  position: relative;
  //  &:before{
  //    content: "";
  //    width: 25px;
  //    height: 50px;
  //    background: rgb(233,238,243);
  //    border-radius: 50px 0 0 50px;
  //    position: absolute;
  //  }
  //  &:after{
  //    content: "";
  //    width: 25px;
  //    height: 50px;
  //    background: black;
  //    border-radius: 50px 0 0 50px;
  //    position: absolute;
  //    transform: rotate(180deg);
  //    left: 50px;
  //    top: 50px;
  //  }
  //}

  @keyframes rotate {
    0% {
      transform: rotateZ(0deg);//从零度开始
    }
    50% {
      transform: rotateZ(180deg);//从零度开始
    }
    100% {
      transform: rotateZ(360deg);//从零度开始
    }
  }
  .content {
    margin-top: 50px;
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    .left{
        width: 50%;
        font-size: 25px;
        margin-top: 50px;
      .leftTitle{
        position: absolute;
        top: 60%;
        right: 50%;
        transform: translate(50%);
        text-align: center;
        font-size: 400px;
        color: rgba(115,124,123,0.5);
        cursor: default;
        transition-duration: 1s;
      }
    }
    .right{
      position: relative;
      .yaoDetail{
        position: absolute;
        width: 900px;
        height: 50px;
        right: 400px;
        font-size: 24px;
      }
    }
    .showTime {
      height: 600px;
      position: relative;
      vertical-align: middle;
      //display: flex;
      .yao:hover{
        transition-duration: 1s;
        background: #a4cab6;
      }
      .yao {
        right: 100px;
        margin-top: 20px;
        width: 300px;
        height: 50px;
        background: black;
        position: relative;
        .yin {
          position: absolute;
          width: 20px;
          height: 50px;
          left: 50%;
          transform: translate(-50%, 0);
          background: white;
        }

        .yang {
          background: #2c3e50;
        }
      }

    }
  }

}
</style>
