<template>
  <div class="lianxi">
    <!-- 尺子效果，使用counter-increment -->
    <ul class="wrap clearFix">
      <li class="inner"></li>
      <li class="inner"></li>
      <li class="inner"></li>
      <li class="inner"></li>
      <li class="inner"></li>
      <li class="inner"></li>
      <li class="inner"></li>
      <li class="inner"></li>
      <li class="inner"></li>
      <li class="inner"></li>
      <li class="inner"></li>
      <li class="inner"></li>
      <li class="inner"></li>
      <li class="inner"></li>
      <li class="inner"></li>
      <li class="inner"></li>
      <li class="inner"></li>
      <li class="inner"></li>
      <li class="inner"></li>
      <li class="inner"></li>
      <li class="inner"></li>
      <li class="inner"></li>
      <li class="inner"></li>
      <li class="inner"></li>
      <li class="inner"></li>
      <li class="inner"></li>
      <li class="inner"></li>
      <li class="inner"></li>
      <li class="inner"></li>
      <li class="inner"></li>
      <li class="inner"></li>
      <li class="inner"></li>
      <li class="inner"></li>
      <li class="inner"></li>
      <li class="inner"></li>
      <li class="inner"></li>
      <li class="inner"></li>
      <li class="inner"></li>
      <li class="inner"></li>
      <li class="inner"></li>
      <li class="inner"></li>
      <li class="inner"></li>
      <li class="inner"></li>
      <li class="inner"></li>
      <li class="inner"></li>
      <li class="inner"></li>
      <li class="inner"></li>
      <li class="inner"></li>
      <li class="inner"></li>
      <li class="inner"></li>
      <li class="inner"></li>
      <li class="inner"></li>
      <li class="inner"></li>
      <li class="inner"></li>
      <li class="inner"></li>
      <li class="inner"></li>
      <li class="inner"></li>
      <li class="inner"></li>
      <li class="inner"></li>
      <li class="inner"></li>
      <li class="inner"></li>
      <li class="inner"></li>
      <li class="inner"></li>
      <li class="inner"></li>
      <li class="inner"></li>
    </ul>
  </div>
</template>
<script>
export default {}
</script>
<style lang='less' scoped>
.lianxi {
  .clearFix::after {
    content: '';
    display: block;
    clear: both;
    height: 0;
  }
  .wrap {
    margin: 0 auto;
    .inner {
      width: 1px;
      height: 10px;
      background: #fff;
      margin-left: 8px;
      float: left;
      position: relative;
      counter-increment: num;
      &:nth-child(5n + 1) {
        width: 1px;
        height: 15px;
        background: #fff;
      }
      &:nth-child(10n + 1) {
        width: 1px;
        height: 20px;
        background: #fff;
      }
      &:nth-child(10n)::after {
        content: counter(num);
        position: absolute;
        left: 0;
        top: 20px;
        color: #fff;
      }
      &:nth-child(1)::after {
        content: "0";
        position: absolute;
        left: 0;
        top: 20px;
        color: #fff;
      }
    }
  }
}
</style>