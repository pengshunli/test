<template>
  <div class="tabNavWrap">
    <div
      class="tabItem"
      v-for="(item,index) in tabData"
      :key="index"
      @click="active(index)"
      :class="{'activeTabItem':currentIndex==index}"
    >
      <span class="title">{{item.title}}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'tabNav',
  data() {
    return {
      tabData: [
        {
          id: '1',
          title: '数据展示',
        },
        {
          id: '1',
          title: '数据数据配置',
        },
      ],
      currentIndex: 0,
    }
  },
  methods: {
    active(index) {
      this.currentIndex = index;
      this.$emit('active',index)
    },
  },
}
</script>
<style lang='less' scoped>
.tabNavWrap {
  display: flex;
  .tabItem {
    width: 25%;
    height: 65px;
    line-height: 65px;
    text-align: center;
    position: relative;
    z-index: 100;
    .title {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: 10;
    }
    &::after {
      position: absolute;
      right: -10px;
      top: 0;
      width: 100%;
      content: '';
      display: block;
      height: 65px;
      background: url('../assets/images/tab-选中@2x.png') no-repeat center
        center;
    }
  }
  .activeTabItem {
    width: 25%;
    height: 65px;
    line-height: 65px;
    text-align: center;
    position: relative;
    background: rgba(255, 255, 255, 0.8);
    &::after {
      position: absolute;
      right: -10px;
      top: 0;
      width: 100%;
      content: '';
      display: block;
      height: 65px;
      color: blue;
      background: url('../assets/images/tab.png') no-repeat center center;
    }
  }
}
</style>