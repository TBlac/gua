<template>
  <div class="home">
    <Header></Header>
    <el-container>
      <Menu></Menu>
      <el-container>
        <el-main>
          <div>
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item
                v-for="(item, index) in $route.matched"
                :key="index"
                >{{ item.name }}</el-breadcrumb-item
              >
            </el-breadcrumb>

            <router-view></router-view>
          </div>
          <Footer></Footer>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from "./comm/Header.vue";
import Footer from "./comm/Footer.vue";
import Menu from "./comm/Menu.vue";
export default {
  components: {
    Header,
    Footer,
    Menu
  },
  name: "Home",
  data() {
    return {};
  },
  methods: {}
};
</script>
<style scoped lang="scss">
.home {
  display: flex;
  flex-direction: column;
  height: 100vh;
  .el-container {
    flex: 1;
    .el-container {
      direction: "horizontal";
      .el-main {
        background-color: #e9eef3;
        color: #333;
        text-align: center;
        line-height: 50px;
      }
    }
  }
}
</style>
