<template>
  <div class="header">
    <el-header>
      <div class="title">个人管理系统</div>
        <el-popconfirm title="是否退出系统？" @confirm="confirmEvent">
        <img slot="reference" class="img" :src="userImg" />
      </el-popconfirm>
      <div>{{ username }}</div>
    </el-header>

  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      username: "",
      userImg: require("../.././assets/头像.jpg")
    };
  },
  created() {
    this.username = localStorage.getItem("passname");
  },
  methods: {
    confirmEvent() {
      this.$router.push("/")
    }
  }
};
</script>
<style scoped lang="scss">
.header {
  .el-header {
    background: #003371;
    display: flex;
    justify-content: space-between;
    line-height: 60px;
    align-items: center;
    position: relative;
    color: aliceblue;
    .title {
      font-size: 32px;
    }
    .img {
      position: absolute;
      transform: translate(0, -50%);
      right: 60px;
      width: 40px;
      border-radius: 50%;
    }

  }
}
</style>
