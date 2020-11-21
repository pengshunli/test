<template>
  <div class="wrap">
    <div class="content">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="请选择城市" label-width="100px">
          <City :city1.sync='city1' />
        </el-form-item>
         <el-form-item label="请选择省份" label-width="100px">
          <City :city1.sync='city2' />
        </el-form-item>
        <el-form-item label="分局领导">
          <Tranfers
            :tranfersData="tranfersData"
            @confim="handleConfim"
            v-model="form.leader"
            :selectData="selectData"
          />
        </el-form-item>
        <el-form-item label="市局领导">
          <Tranfers
            :tranfersData="tranfersData1"
            @confim="handleConfim"
            v-model="form.leader1"
            :selectData="selectData1"
          />
        </el-form-item>
        <el-form-item label="参会人员">
          <TranferTree :selectData="selectData2" />
        </el-form-item>
        <editor-bar
          v-model="detail"
          :isClear="isClear"
          @change="change"
        ></editor-bar>
      </el-form>
    </div>
  </div>
</template>
<script>
import Tranfers from '../../components/dialog/tranfers/tranfers'
import TranferTree from '../../components/dialog/tranfers/tranferTree/tranferTree'
import EditorBar from '../../components/editor/editor'
import Swiper from '../../components/swiper/swiper'
import City from '../../components/city/city'
export default {
  data() {
    return {
      isClear: false,
      detail: '',
      city1:["zhinan", "shejiyuanze", "yizhi"],
      city2:["zujian", "basic", "color"],
      form: {
        leader: [{ dep: '副局长', userName: '欧阳晓峰1111' }],
        leader1: [],
      },
      tranfersData: [
        { dep: '副局长', userName: '李超群' },
        { dep: '政治处', userName: '贵礼强' },
        { dep: '副局长', userName: '杨建波' },
        { dep: '局长', userName: '江枫' },
        { dep: '指挥处处长', userName: '张宝军' },
        { dep: '副局长', userName: '欧阳晓峰' },
      ],
      tranfersData1: [
        { dep: '出入境管理支队' },
        { dep: '特种证件研究制作中心' },
        { dep: '网络警察支队' },
        { dep: '法制处' },
        { dep: '交通警察支队' },
        { dep: '禁毒支队' },
      ],
      selectData: [{ dep: '副局长', userName: '欧阳晓峰1111' }],
      selectData1: [{ dep: '副局长', userName: '欧阳晓峰2' }],
      selectData2: [{ dep: '副局长', userName: '欧阳2' }],
    }
  },
  components: {
    Tranfers,
    TranferTree,
    EditorBar,
    Swiper,
    City
  },
  mounted() {
    this.form.leader = this.selectData
  },
  methods: {
    handleConfim() {
      console.log(this.form.leader)
      console.log(this.selectData)
    },
    change(val) {
      console.log('change', val)
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
  }
}
</style>