<template>
  <el-form
    ref="userForm"
    :model="userInfo"
    :rules="rules"
    label-width="120px"
    style="margin-left: 120px; margin-top: 30px"
  >
    <el-form-item label="姓名:" prop="username">
      <el-input v-model="userInfo.username" style="width:300px"/>
    </el-form-item>
    <el-form-item label="密码:" prop="password">
      <el-input v-model="userInfo.password" type="password" style="width:300px"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="hUpdate">更新</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { getUserDetailById } from '@/api/user'
import { updateEmployee } from '@/api/employees'

export default {
  data() {
    return {
      userInfo: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.loadUserDetail()
  },
  methods: {
    async loadUserDetail() {
      const res = await getUserDetailById(this.$route.params.id)
      this.userInfo = res.data
    },
    async hUpdate() {
      // 兜底校验
      const valid = await this.$refs.userForm.validate().catch(e => e)
      if (!valid) return

      try {
        // 发请求
        const res = await updateEmployee(this.userInfo)
        // 根据结果提醒用户
        this.$message.success(res.message)
      } catch (e) {
        this.$message.error(e.message)
      }
    }
  }
}
</script>

