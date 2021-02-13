<template>
  <div v-click-outside>
    <el-input
      :value="forMatDate"
      placeholder="请输入内容"
      style="width: 230px"
    ></el-input>
    <div class="pannel" v-if="visible">
      <div class="pannel-nav">
        <span @click="preYear">&lt;</span>
        <span @click="prevMonth">&lt;&lt;</span>
        <span>{{ time.year }}年</span>
        <span>{{ time.month + 1 }}月</span>
        <span @click="nextMonth">&gt;&gt;</span>
        <span @click="nextYear">&gt;</span>
      </div>
      <div class="pannel-cointent">
        <div class="day">
          <div>
            <span
              class="cell1"
              v-for="(item, index) in weekDays"
              :key="index"
              >{{ item }}</span
            >
          </div>
          <!-- 列出一个6*7一个列表，99乘法表 -->
          <div v-for="i in 6" :key="i">
            <span
              class="cell"
              v-for="j in 7"
              :key="j"
              @click="chooseDate(visibleDay[(i - 1) * 7 + (j - 1)])"
              :class="[
                {
                  notCurrentMonth: !isCurrentMonth(
                    visibleDay[(i - 1) * 7 + (j - 1)]
                  ),
                },
                {
                  today: isToday(visibleDay[(i - 1) * 7 + (j - 1)]),
                },
                {
                  select: isSelect(visibleDay[(i - 1) * 7 + (j - 1)]),
                },
              ]"
            >
              {{ visibleDay[(i - 1) * 7 + (j - 1)].getDate() }}
            </span>
          </div>
        </div>
      </div>
    
    </div>
  </div>
</template>
<script>
import { getYearMonthDay, getDate } from '../../utils/date'
export default {
  name: 'canlender',
  directives: {
    clickOutside: {
      // 指令的定义
      bind(el, bings, vnode) {
        console.log('vnode', vnode)
        let handler = (e) => {
          // debugger;
          if (el.contains(e.target)) {
            //判断当前面板是否已经显示
            if (!vnode.context.visible) {
              vnode.context.focus()
              console.log('包含')
            }
          } else {
            if (vnode.context.visible) {
              vnode.context.blur()
              console.log('不包含')
            }
          }
        }
        el.handler = handler
        document.addEventListener('click', handler)
      },
      unbind(el) {
        document.removeEventListener('click', el.handler)
      },
    },
  },
  data() {
    let { year, month } = getYearMonthDay(this.value)
    return {
      visible: false,
      time: { year, month },
      weekDays: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    }
  },
  props: {
    value: {
      type: Date,
      default: () => {
        return new Date()
      },
    },
  },
  computed: {
    //显示当前选中时间
    forMatDate() {
      let { year, month, day } = getYearMonthDay(this.value)
      return year + '-' + (month + 1) + '-' + day
    },
    visibleDay() {
      //获取当前的月份
      let { year, month } = getYearMonthDay(
        getDate(this.time.year, this.time.month, 1)
      )
      //获取当前月份的第一天
      let currentDay = getDate(year, month, 1)
      //获取当前是周几
      let week = currentDay.getDay()
      //当前开始的天数
      let startDay = currentDay - week * 60 * 60 * 1000 * 24
      //循环42天
      let arr = []
      for (let i = 0; i < 42; i++) {
        arr.push(new Date(startDay + i * 60 * 60 * 1000 * 24))
      }
      return arr
    },
  },
  mounted() {
    
  },
  methods: {
    preYear() {
      let d = getDate(this.time.year, this.time.month)
      d.setFullYear(d.getFullYear() - 1)
      this.time = getYearMonthDay(d)
    },
    nextYear() {
      let d = getDate(this.time.year, this.time.month)
      d.setFullYear(d.getFullYear() + 1)
      this.time = getYearMonthDay(d)
    },
    prevMonth() {
      let d = getDate(this.time.year, this.time.month)
      d.setMonth(d.getMonth() - 1) + 1
      this.time = getYearMonthDay(d)
    },
    nextMonth() {
      let d = getDate(this.time.year, this.time.month)
      d.setMonth(d.getMonth() + 1) + 1
      this.time = getYearMonthDay(d)
    },

    focus() {
      this.visible = true
    },
    blur() {
      this.visible = false
    },
    isCurrentMonth(date) {
      //判断是不是当月
      let { year, month } = getYearMonthDay(
        getDate(this.time.year, this.time.month, 1)
      )
      let { year: y, month: m } = getYearMonthDay(date)
      return year == y && month == m
    },
    isToday(date) {
      let { year, month, day } = getYearMonthDay(new Date())
      let { year: y, month: m, day: d } = getYearMonthDay(date)
      return year == y && month == m && day == d
    },
    chooseDate(date) {
      this.time = getYearMonthDay(date)
      this.$emit('input', date)
      this.blur()
    },
    isSelect(date) {
      let { year, month, day } = getYearMonthDay(this.value)
      console.log(this.time)
      let { year: y, month: m, day: d } = getYearMonthDay(date)
      return year == y && month == m && day == d
    },
  },
}
</script>
<style lang='less' scoped>
.canlenderWrap {
  .pannel {
    position: absolute;
    background: #fff;
    box-sizing: border-box;
    border: 1px solid #ccc;
    z-index: 20;
    .pannel-nav {
      display: flex;
      justify-content: space-around;
      font-size: 14px;
      line-height: 32px;
      height: 32px;
      span {
        cursor: pointer;
        user-select: none;
        text-align: center;
        &:hover{
          color:rgba(0, 0, 255, 0.6)
        }
      }
    }
    .pannel-cointent {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      .cell1 {
        width: 32px;
        height: 32px;
        display: inline-block;
        text-align: center;
        font-weight: 700;
      }
      .cell {
        width: 32px;
        height: 32px;
        display: inline-block;
        text-align: center;
        font-weight: 700;
        &:hover {
          background: rgba(0, 0, 255, 0.6);
          border-radius: 50%;
        }
      }
      .select {
        background: rgba(0, 0, 255, 0.6);
        border: 1px solid rgba(0, 0, 255, 0.6);
        border-radius: 50%;
      }
      .notCurrentMonth {
        color: #ccc;
      }
      .today {
        background: rgba(255, 102, 0, 0.6);
        border: 1px solid rgba(255, 102, 0, 0.6);
        box-sizing: border-box;
        border-radius: 50%;
      }
    }
    .pannel-footer {
      height: 32px;
      text-align: center;
    }
  }
}
</style>