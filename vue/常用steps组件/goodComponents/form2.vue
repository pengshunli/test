<template>
  <div class="form2">
    <el-form
      :model="ruleForm"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      :rules="rules"
    >
      <el-form-item label="活动名称2" prop="name2">
        <el-input v-model="ruleForm.name2"></el-input>
      </el-form-item>
      <el-form-item label="活动区域2" prop="region2">
        <el-select v-model="ruleForm.region2" placeholder="请选择活动区域">
          <el-option label="郑州" value="shanghai"></el-option>
          <el-option label="南京" value="beijing"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'form2',
  props: {
    form2: Object,
  },
  data() {
    return {
      ruleForm: {
        name2: '',
        region2: '',
      },
      rules: {
        name2: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
        ],
        region2: [
          { required: true, message: '请选择活动区域', trigger: 'change' },
        ],
      },
    }
  },
  mounted() {
    this.ruleForm = this.form2
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
.form2 {
}
</style>