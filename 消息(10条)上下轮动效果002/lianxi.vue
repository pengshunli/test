<template>
  <div id="slide" @mouseover="onmouseover" @mouseout="onmouseout">
    <div id="slide1">
      <p v-for="(item, index) in list" :key="index">{{ item }}</p>
    </div>
    <div id="slide2"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        '今天天气真好啊1',
        '今天天气真好啊2',
        '今天天气真好啊3',
        '今天天气真好啊4',
        '今天天气真好啊5',
        '今天天气真好啊6',
        '今天天气真好啊7',
        '今天天气真好啊8',
        '今天天气真好啊9',
        '今天天气真好啊10',
      ],
      timer: null,
      speed: 80,
    }
  },
  methods: {
    screen() {
      var slide = document.getElementById('slide')
      var slide2 = document.getElementById('slide2')
      var slide1 = document.getElementById('slide1')
      slide2.innerHTML = slide1.innerHTML
      console.log('this.slide2.innerHTML', slide2.innerHTML)
      if (slide2.offsetTop - slide.scrollTop <= 0) {
        slide.scrollTop -= slide1.offsetHeight
      } else {
        slide.scrollTop++
      }
    },
    onmouseover() {
      clearInterval(this.timer)
    },
    onmouseout() {
      this.timer = setInterval(this.screen, this.speed)
    },
  },
  mounted() {
    this.timer = setInterval(this.screen, 80)
  },
}
</script>
<style lang='less' scoped>
#slide {
  position: absolute;
  height: 150px;
  width: 300px;
  color: #fa8e93;
  overflow: hidden;
  border: 1px solid #ccc;
  p {
    height: 30px;
    line-height: 30px;
    overflow: hidden;
    text-align: center;
  }
}
</style>