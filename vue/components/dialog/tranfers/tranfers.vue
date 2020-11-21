<template>
  <div class="tranfersWrap">
    <div class="content">
      <span class="item" v-for="(item, index) in chooseList" :key="index"
        >{{ item.dep }}{{ item.userName }}
      </span>
      <i class="el-icon-circle-plus-outline" @click="addLeader"></i>
    </div>
    <el-dialog title="添加分局领导" :visible.sync="dialogVisible" width="60%">
      <div class="transfer-container">
        <!-- 第一级 -->
        <div class="transfer-panel">
          <div
            class="transfer-item right-item"
            v-for="(item, index) in originData"
            :key="index"
            :class="{ active: currentIndex == index }"
          >
            <p class="item" @click="itemClick(item, index)">
              {{ item.dep }}{{ item.userName }}
            </p>
          </div>
        </div>
        <!-- 第二级 -->
        <div class="transfer-panel">
          <div
            class="transfer-item right-item"
            v-for="(item, index) in selectData"
            :key="index"
          >
            <p class="item1">
              {{ item.dep }}{{ item.userName
              }}<i
                style="margin-left: 10px;color:blue"
                @click="delClick(index)"
                class="el-icon-circle-close"
              ></i>
            </p>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confim">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'tranfers',
  mounted() {
    this.chooseList = this.selectData
  },
  data() {
    return {
      dialogVisible: false,
      chooseList: [],
      currentIndex: 0,
    }
  },
  props: {
    tranfersData: {
      //元数据
      type: Array,
      default: () => {
        return []
      },
    },
    selectData: {
      //元数据
      type: Array,
      default: () => {
        return []
      },
    },
  },
  computed: {
    originData: function () {
      return this.tranfersData
    },
    chooseListRes: function () {
      return this.chooseList
    },
  },
  watch: {
    handler: function (val) {
      this.$eimt('input', val)
    },
    deep: true,
  },
  methods: {
    addLeader() {
      this.dialogVisible = true
    },
    itemClick(value, index) {
      this.currentIndex = index
      if (this.selectData.indexOf(value) != -1) {
        return
      } else {
        this.selectData.push(value)
      }
    },
    delClick(index) {
      this.selectData.splice(index, 1)
    },
    confim() {
      this.dialogVisible = false
      this.chooseList = JSON.parse(JSON.stringify(this.selectData))
      this.$emit('confim')
    },
  },
}
</script>
<style lang='less' scoped>
.tranfersWrap {
  width: 100%;
  height: 30px;
  line-height: 30px;
  border: 1px solid #ccc;
  padding-left: 10px;
  .transfer-container {
    display: flex;
    justify-content: space-around;
    .transfer-panel {
      width: 300px;
      border: 1px solid #ccc;
      text-align: center;
      line-height: 30px;
      .item {
        width: 100%;
        &:hover {
          background: blue;
          color: #fff;
           opacity: 0.5;
        }
        &:active {
          width: 100%;
          background: blue;
          color: #fff;
          opacity: 0.5;
        }
      }
    }
  }
  /deep/.el-dialog__footer {
    text-align: center;
  }
}
</style>