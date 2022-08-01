<template>
  <div class="menu">
    <el-aside width="200px">
      <el-menu
        :default-active="activePath"
        router
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#003371"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <div v-for="(route, index) in routes">
          <el-submenu :index="index + ''" :key="index" v-if="!route.hidden">
            <template slot="title">
              <i :class="route.icon" aria-hidden="true"></i>
              <span>{{ route.name }}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                v-for="(emp, index) in route.children"
                :key="index"
                :index="emp.path"
              >
                <i :class="emp.icon" aria-hidden="true"></i>
                {{ emp.name }}
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </div>
      </el-menu>
    </el-aside>
  </div>
</template>

<script>
export default {
  name: "Menu",
  data() {
    return {
      routes: [],
      activePath: ""
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  created() {
    //获取router目录下index.js里面路由的值
    //[...数组] 扩展运算符的用法
    // console.log(typeof this.$router.options.routes);
    // console.log(...this.$router.options.routes);
    // console.log([this.$router.options.routes]);
    // console.log([...this.$router.options.routes]);
    //获取router文件下定义的routes数组
    this.routes = [...this.$router.options.routes];
    console.log(this.routes)
    //获取$router下的currentRoute对象中的一个属性path
    this.activePath = this.$router.currentRoute.path;
  }
};
</script>
<style lang="scss">
.menu {
  background-color: #003371;
  .el-aside {
    color: #333;
    text-align: center;
    line-height: 200px;
    overflow: hidden;
    .el-menu {
      border-right: 0;
    }
  }
}
</style>
