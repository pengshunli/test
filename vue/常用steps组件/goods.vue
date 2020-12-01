<template>
  <div class="wrap">
    <div class="stepWrap">
      <el-steps :active="active" finish-status="success">
        <el-step title="活动1"></el-step>
        <el-step title="活动2"></el-step>
        <el-step title="活动3"></el-step>
      </el-steps>
    </div>
    <div class="wrap" v-if="type == 'daily'">
      <form1 v-show="active == 0" ref="daily0" :form1="form.form1" />
      <form2 v-show="active == 1" ref="daily1" :form2="form.form2" />
      <form3 v-show="active == 2" ref="daily2" :form3="form.form3" />
    </div>
    <div class="butWrap">
      <el-button style="margin-top: 12px" @click="pre" v-show="preIsShow"
        >上一步</el-button
      >
      <el-button style="margin-top: 12px" @click="next">下一步</el-button>
    </div>
  </div>
</template>
<script>
import form1 from './goodComponents/form1'
import form2 from './goodComponents/form2'
import form3 from './goodComponents/form3'
import { mapMutations } from 'vuex'
export default {
  name: 'good',
  data() {
    return {
      active: 0,
      preIsShow: false,
      type: 'daily',
      form: {
        form1: {
          name1: '',
          region1: '',
          date1: '',
          date2: '',
        },
        form2: {
          name1: '',
          region1: '',
          date1: '',
          date2: '',
        },
        form3: {
          name1: '',
          region1: '',
          date1: '',
          date2: '',
        },
      },
    }
  },
  components: {
    form1,
    form2,
    form3,
  },
  mounted() {},
  methods: {
    next() {
      console.log(this.active)
      this.preIsShow = true
      if (this.active < 2) {
        let fromName = this.type + this.active
        console.log('fromName', fromName)
        this.$refs[fromName].submit().then((result) => {
          console.log('result', result)
          this.active++
        })
      } else {
        console.log('最后一步没有下一步')
      }
      if (this.active == 2) {
        console.log('this.form:', this.form)
      }
    },
    pre() {
      if (this.active > 0) {
        this.active--
      } else {
        console.log('第一步没有上一步')
      }
      if (this.active == 0) {
        this.preIsShow = false
      }
    },
  },
}
</script>
<style lang='less' scoped>
.wrap {
  position: relative;
  transform: translateX(6.25rem) translateY(50px) scaleX() scaleY()
    rotateX(30deg);
    height: 100vh;
  .butWrap {
    position: absolute;
    left: 500px;
    right: 0;
    bottom: 200px;

  }
}
</style>