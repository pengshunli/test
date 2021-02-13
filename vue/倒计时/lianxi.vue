<template>
  <div class="wrap">
    <div class="content">
      <div v-for="(item, index) in timeData" :key="index">
        <span>{{ item.time }}</span>
        <span>倒计时时间：{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value3: '',
      timer: null,
      timeData: [
        {
          time: '2020-12-16 12:11:15',
          name: '',
        },
        {
          time: '2020-12-20 12:11:15',
          name: '',
        },
        {
          time: '2020-12-21 12:11:15',
          name: '',
        },
        {
          time: '2020-12-22 12:11:15',
          name: '',
        },
        {
          time: '2020-12-23 12:11:15',
          name: '',
        },
      ],
    }
  },
  mounted() {
    this.form.leader = this.selectData
    this.startInter()
  },
  beforeDestroy() {
    clearInterval(this.timer)
    console.log(this.timer)
  },
  methods: {
    startInter() {
      this.timer = setInterval(() => {
        this.timeData.map((item) => {
          var timestamp = new Date().getTime()
          let data = new Date(item.time)
          let itemTimeStamp = data.getTime()
          let chan = itemTimeStamp - timestamp
          if (chan < 0) {
            chan = 0
          }
          let aa = this.formatDuring(chan)
          item.name = aa
        })
      }, 1000)
    },
    formatDuring(mss) {
      var days = parseInt(mss / (1000 * 60 * 60 * 24))

      var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

      var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60))

      var seconds = parseInt((mss % (1000 * 60)) / 1000)
      return days + '天' + hours + '小时' + minutes + '分' + seconds + ' 秒 '
    },
    handleConfim() {
      
    },
    change(val) {
     
    },
  },
}
</script>
<style lang='less' scoped>
.wrap {
  height: 1000px;
  .content {
    width: 100%;
    height: 30px;
    line-height: 30px;
    // border: 1px solid #ccc;
    padding: 30px;
    .canlenderWrap {
      position: relative;
    }
  }
}
</style>