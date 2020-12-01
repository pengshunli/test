<template>
  <div class="form1">
    <el-form
      :model="ruleForm"
      ref="ruleForm"
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="活动名称1" prop="name1">
        <el-input v-model="ruleForm.name1"></el-input>
      </el-form-item>
      <el-form-item label="活动区域1" prop="region1">
        <el-select v-model="ruleForm.region1" placeholder="请选择活动区域">
          <el-option label="上海" value="shanghai"></el-option>
          <el-option label="深圳" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动时间" required>
        <el-col :span="11">
          <el-form-item>
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="ruleForm.date1"
              style="width: 100%"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item>
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="ruleForm.date2"
              style="width: 100%"
               value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'form1',

  props: {
    form1: Object,
  },
  data() {
    return {
      ruleForm: {},
      rules: {
        name1: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
        ],
        region1: [
          { required: true, message: '请选择活动区域', trigger: 'change' },
        ],
        date1: [
          {
            type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'change',
          },
        ],
        date2: [
          {
            type: 'date',
            required: true,
            message: '请选择时间',
            trigger: 'change',
          },
        ],
      },
    }
  },
  mounted() {
    this.ruleForm = this.form1
  },
  methods: {
    submit() {
      return new Promise((resolve, reject) => {
        try {
          this.$refs['ruleForm'].validate((valid) => {
            if (valid) {
              resolve(this.ruleForm)
            } else {
              console.log('error submit!!')
              return false
            }
          })
        } catch (error) {
          reject(error)
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
  },
}
</script>
<style lang='less' scoped>
.form1 {
}
</style>