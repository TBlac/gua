<template>
  <div class="notFound">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: "NotFound",
  data() {
    return {
      msg: "页面找不到"
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.notFound {
  h1 {
    color: red;
  }
}
</style>
