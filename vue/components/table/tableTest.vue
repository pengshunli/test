<template>
  <div class="tableWrap">
    <el-table :data="data" :row-class-name="tableRowClassName" >
      <el-table-column v-if="select" type="selection" width="60"></el-table-column>
      <template v-for="(item,index) in col">
        <el-table-column
          v-if="item.type=='function'"
          :key="index"
          :prop="item.prop"
          :label="item.label"
        >
          <template slot-scope="scope">
            <span
              :class="{'changeColor':item.prop=='address'}"
              @click="gotoTo(item.prop)"
              v-html="item.callback&&item.callback(scope.row,item.prop)"
            ></span>
          </template>
        </el-table-column>
        <el-table-column
          v-else-if="item.type=='switch'"
          :key="index"
          :prop="item.prop"
          :label="item.label"
        >
          <template slot-scope="scope">
            <el-switch v-model="scope.row.switch" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </template>
        </el-table-column>
        <el-table-column
          v-else-if="item.type=='slot'"
          :key="index"
          :prop="item.prop"
          :label="item.label"
        >
          <template slot-scope="scope">
            <slot :name="item.name" :data="scope.row"></slot>
          </template>
        </el-table-column>
        <el-table-column v-else width="180" :key="index" :prop="item.prop" :label="item.label"></el-table-column>
      </template>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="total, prev, pager, next"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  name: 'tableTest',
  props: {
    col: {
      type: Array,
      default: () => {
        return []
      },
    },
    data: {
      type: Array,
      default: () => {
        return []
      },
    },
    select: {
      type: Boolean,
      default: () => {
        return false
      },
    },
    currentPage: {
      type: Number,
    },
    pageSize: {
      type: Number,
    },
    total: {
      type: Number,
    },
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {
    gotoTo(item) {
      if (item == 'address') {
        this.$router.push('/login')
      }
    },
    chakan() {
      this.$emit('chakan')
    },
    //添加背景颜色
    tableRowClassName({ row, rowIndex }) {
      // if (rowIndex === 1) {
      //   return 'warning-row'
      // }
      return ''
    },
    //操作
    handleClick(row) {
      console.log('row', row)
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.$emit('handleCurrentChange1',val)
    },
  },
}
</script>
<style lang='less' scoped>
.tableWrap {
  padding: 30px;
  margin: 0 auto;
  font-size: 12px;
  .changeColor {
    color: blue;
  }
  /deep/.el-button {
    padding: 5px 10px;
  }

  /deep/.el-table .warning-row {
    background: rgba(0, 255, 255, 0.5);
  }
  /deep/.el-table .success-row {
    background: pink;
  }
  .el-pagination {
    margin-top: 10px;
    text-align: center;
  }
}
</style>