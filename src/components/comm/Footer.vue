<template>
  <div class="footer">
    <el-card>{{ msg }}</el-card>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      msg: "footer"
    };
  }
};
</script>
<style scoped lang="scss">
.footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 80px;
}
</style>
