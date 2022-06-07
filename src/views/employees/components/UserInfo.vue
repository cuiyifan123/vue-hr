<template>
  <div class="user-info">
    <!-- 个人信息 -->
    <el-form
      ref="userForm"
      label-width="220px"
      :model="userInfo"
      :rules="rules"
    >
      <!--手机 -->

      <el-form-item label="手机" prop="mobile">
        <el-input v-model="userInfo.mobile" style="width:220px" />
      </el-form-item>

      <!-- 工号 入职时间 -->

      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker
          v-model="userInfo.timeOfEntry"
          type="date"
          class="inputW"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>

      <!-- 员工照片 -->

      <el-form-item label="员工头像">
        <!-- 放置上传图片 -->
        <img>
      </el-form-item>

      <!-- 保存个人信息 -->
      <el-form-item>
        <el-button type="primary" @click="hUpdate">保存更新</el-button>
        <el-button @click="$router.back()">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getUserDetailById } from '@/api/user'
import { updateEmployee } from '@/api/employees'
export default {
  data() {
    return {
      userId: this.$route.params.id,
      userInfo: {
        mobile: '',
        timeOfEntry: ''
      },
      rules: {
        mobile: [{ pattern: /^1[3-9]\d{9}$/, required: true, message: '请输入正确手机号', trigger: 'blur' }],
        timeOfEntry: [{ required: true, message: '请选择入职日期', trigger: 'change' }]
      }
    }
  },
  created() {
    this.loadUserDetail()
  },
  methods: {
    async loadUserDetail() {
      const res = await getUserDetailById(this.userId)
      // console.log(res)
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
        // 返回上一级
        this.$router.back()
      } catch (e) {
        this.$message.error(e.message)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.user-info{
  padding-top:20px;
}
</style>
<template>
  <div class="user-info">
    <!-- 个人信息 -->
    <el-form
      ref="userForm"
      label-width="220px"
      :model="userInfo"
      :rules="rules"
    >
      <!--手机 -->

      <el-form-item label="手机" prop="mobile">
        <el-input v-model="userInfo.mobile" style="width:220px" />
      </el-form-item>

      <!-- 工号 入职时间 -->

      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker
          v-model="userInfo.timeOfEntry"
          type="date"
          class="inputW"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>

      <!-- 员工照片 -->

      <el-form-item label="员工头像">
        <!-- 放置上传图片 -->
        <img>
      </el-form-item>

      <!-- 保存个人信息 -->
      <el-form-item>
        <el-button type="primary" @click="hUpdate">保存更新</el-button>
        <el-button @click="$router.back()">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getUserDetailById } from '@/api/user'
import { updateEmployee } from '@/api/employees'
export default {
  data() {
    return {
      userId: this.$route.params.id,
      userInfo: {
        mobile: '',
        timeOfEntry: ''
      },
      rules: {
        mobile: [{ pattern: /^1[3-9]\d{9}$/, required: true, message: '请输入正确手机号', trigger: 'blur' }],
        timeOfEntry: [{ required: true, message: '请选择入职日期', trigger: 'change' }]
      }
    }
  },
  created() {
    this.loadUserDetail()
  },
  methods: {
    async loadUserDetail() {
      const res = await getUserDetailById(this.userId)
      // console.log(res)
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
        // 返回上一级
        this.$router.back()
      } catch (e) {
        this.$message.error(e.message)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.user-info{
  padding-top:20px;
}
</style>
