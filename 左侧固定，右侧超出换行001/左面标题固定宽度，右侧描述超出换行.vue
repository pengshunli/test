<template>
  <div class="wrap">
    <!-- 实现左侧标题，固定，右侧，超出换行 -->
    <div class="newsWrap">
      <div class="title">标题一:</div>
      <div class="info">今天天真还在那儿好啊今天天真还在那儿好啊今天天真还在那儿好啊今天天真还在那儿好啊今天天真还在那儿好啊今天天真还在那儿好啊</div>
    </div>
     <div class="newsWrap">
      <div class="title">标题一:</div>
      <div class="info">今天天真还在那儿好啊今天天真还在那儿好啊今天天真还在那儿好啊今天天真还在那儿好啊今天天真还在那儿好啊今天天真还在那儿好啊</div>
    </div>
    
    
  </div>
</template>
<script>
export default {
  name:'lianxi',
  data(){
    return {

    }
  }
}
</script>
<style lang='less' scoped>
.wrap{
  width: 300px;
  .newsWrap{
    display: flex;
    line-height: 30px;
    .title{
      font-size: 15px;
      font-weight: 700;
      width: 100px;
    }
    .info{
      flex:1;
      font-size:13px;
      word-wrap: break-word;
      word-break: break-all;
    }
  }
}
</style>