<template>
  <div class="login">
    <el-card shadow="never">
      <div slot="header" class="title">
        <span>系统登录界面</span>
      </div>
      <el-form :model="loginForm" ref="loginForm" label-width="100px">
        <el-form-item
          label="用户名"
          prop="passname"
          :rules="[
            { required: true, message: '用户名不能为空', trigger: 'blur' },
            {
              min: 4,
              max: 12,
              message: '长度在 4 到 12 个字符',
              trigger: 'blur'
            }
          ]"
        >
          <el-input type="passname" v-model="loginForm.passname"></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
          :rules="[
            { required: true, message: '密码不能为空', trigger: 'blur' },
            {
              min: 6,
              max: 18,
              message: '长度在 6 到 18 个字符',
              trigger: 'blur'
            }
          ]"
        >
          <el-input type="password" v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login('loginForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      loginForm: {
        passname: "",
        password: ""
      }
    };
  },
  methods: {
    login(form) {
      //点击登录后传递数据并实现页面跳转
      //存在校验通过时validate中函数参数v返回的为true,否则返回false
      this.$refs[form].validate(v => {
        if (v) {
          //使用axios请求参数
          // this.axios.get("	http://127.0.0.1:4523/m1/1138821-0-default/login", this.loginForm)
          this.service
            .get("/api/login", this.loginForm)
            .then(res => {
              if (res.status === 200) {
                //找到数据中对象的名字是否对应
                let user = res.data.find(element => {
                  //判断如果
                  return element.username === this.loginForm.passname;
                });
                if (user && user.password === this.loginForm.password) {
                  //页面跳转
                  this.$router.push("/home");
                  //提示登录成功
                  this.$message({
                    message: "登录成功!",
                    type: "success",
                    duration: 1000
                  });
                  localStorage.setItem("passname", this.loginForm.passname);
                } else {
                  alert("请注册用户！！！");
                }
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("登录失败");
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.login {
  width: 100vw;
  height: 100vh;
  background: url(../assets/5.jpg); //导入背景图片
  background-size: cover; //让背景图片填满背景
  //样式穿透
  >>> .el-card__header {
    border-bottom: 0;
  }
  .el-card {
    width: 500px;
    height: 300px;
    text-align: center;
    line-height: 40px;
    position: absolute;
    margin: auto;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: transparent; //让卡片透明
    border: 0;
    //样式穿透
    >>> .el-form-item__label {
      color: white;
      opacity: 0.7;
    }
    .title {
      font-size: 32px;
      color: white;
      opacity: 0.7;
    }
    .el-button {
      width: 100%;
    }
  }
}
</style>
