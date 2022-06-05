<template>
  <!-- 表单 -->
  <el-form ref="form" label-width="120px" :model="formData" :rules="rules">
    <el-form-item label="姓名" prop="username">
      <el-input
        v-model="formData.username"
        style="width: 80%"
        placeholder="请输入姓名"
      />
    </el-form-item>
    <el-form-item label="手机" prop="mobile">
      <el-input
        v-model="formData.mobile"
        style="width: 80%"
        placeholder="请输入手机号"
      />
    </el-form-item>
    <el-form-item label="入职时间" prop="timeOfEntry">
      <el-date-picker
        v-model="formData.timeOfEntry"
        style="width: 80%"
        placeholder="请选择入职时间"
      />
    </el-form-item>
    <el-form-item label="聘用形式" prop="formOfEmployment">
      <el-select
        v-model="formData.formOfEmployment"
        style="width: 80%"
        placeholder="请选择"
      >
        <el-option
          v-for="item in hireType"
          :key="item.id"
          :value="item.id"
          :label="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="工号" prop="workNumber">
      <el-input
        v-model="formData.workNumber"
        style="width: 80%"
        placeholder="请输入工号"
      />
    </el-form-item>
    <el-form-item label="部门" prop="departmentName">
      <el-input
        v-model="formData.departmentName"
        style="width: 80%"
        placeholder="请选择部门"
        @focus="handleFocus"
      />
      <el-tree
        v-if="isShowTree"
        :data="dept"
        default-expand-all
        :props="{ label: 'name' }"
        @node-click="handleTreeClick"
      />
    </el-form-item>
    <el-form-item label="转正时间" prop="correctionTime">
      <el-date-picker
        v-model="formData.correctionTime"
        style="width: 80%"
        placeholder="请选择转正时间"
      />
    </el-form-item>
    <el-form-item>
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="handleSubmit">确定</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import employeesConst from '@/constant/employees'
import emitter from '@/utils/emitter'
import { getDepts } from '@/api/departments'
import { dataToTree } from '@/utils'
import { addEmployees } from '@/api/employees.js'

export default {
  mixins: [emitter],
  data() {
    return {
      formData: {
        username: '', // 用户名
        mobile: '', // 手机号
        formOfEmployment: '', // 聘用形式
        workNumber: '', // 工号
        departmentName: '', // 部门
        timeOfEntry: '', // 入职时间
        correctionTime: '' // 转正时间
      },
      rules: {
        username: [
          { required: true, message: '用户姓名不能为空', trigger: 'blur' },
          { min: 1, max: 4, message: '用户姓名为1-4位', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: '手机号格式不正确',
            trigger: 'blur'
          }
        ],
        formOfEmployment: [
          { required: true, message: '聘用形式不能为空', trigger: 'blur' }
        ],
        workNumber: [
          { required: true, message: '工号不能为空', trigger: 'blur' }
        ],
        departmentName: [
          { required: true, message: '部门不能为空', trigger: 'change' }
        ],
        timeOfEntry: [
          { required: true, message: '请选择入职时间', trigger: 'blur' }
        ]
      },
      hireType: employeesConst.hireType,
      dept: [],
      isShowTree: false
    }
  },

  methods: {
    // 向上派发一个close事件，提示employees组件关闭dialog
    close() {
      this.dispatch('employees', 'close')
    },
    handleClose() {
      this.close()
    },
    handleSubmit() {
      this.$refs.form.validate(async(valid) => {
        if (!valid) return
        try {
          const res = await addEmployees(this.formData)
          this.$message.success(res.message)
          this.dispatch('employees','success')
        } catch (e) {
          this.$message.error(e.message)
        }
      })
    },
    async loadDepts() {
      try {
        const res = await getDepts()
        res.data.depts.shift()
        this.dept = dataToTree(res.data.depts)
        // 显示el-tree组件
        this.isShowTree = true
      } catch (e) {
        console.log(e)
      }
    },
    // 获取焦点请求数据
    async handleFocus() {
      // 获取数据
      this.loadDepts()
    },
    handleTreeClick(data) {
      if (data.children.length > 0) return
      this.formData.departmentName = data.name
      this.isShowTree = false
    }
  }
}
</script>
<style>
.el-tree {
  margin-top: 10px;
  width: 479px;
}
</style>
