<template>
  <div>
    <van-nav-bar @click-left="$router.back()" left-arrow />
    <h1>404</h1>
    <hr />
    <h5>Not Fount</h5>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="less">
h1,
h5 {
  text-align: center;
}
</style>
