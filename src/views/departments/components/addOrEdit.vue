<template>
  <el-form ref="form" :rules="rules" :model="form" label-width="100px">
    <el-form-item label="部门名称" prop="name">
      <el-input v-model="form.name"/>
    </el-form-item>
    <el-form-item label="部门编码" prop="code">
      <el-input v-model="form.code"/>
    </el-form-item>
    <el-form-item label="部门负责人" prop="manager">
      <el-select v-model="form.manager" placeholder="请选择">
        <el-option
          v-for="deptName in deptNames"
          :key="deptName.id"
          :label="deptName.username"
          :value="deptName.username"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="部门介绍" prop="introduce">
      <el-input
        v-model="form.introduce"
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4 }"
        placeholder="请输入内容"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSubmit">确定</el-button>
      <el-button @click="closeDialog">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import {
  addDepartment,
  getDepartmentById,
  updateDepartment
} from '@/api/departments'
import { getSimpleEmployees } from '@/api/employees'
import { to } from '@/utils/await-to'
import emitter from '@/utils/emitter'

export default {
  mixins: [emitter],
  props: {
    id: {
      type: String,
      required: true
    },
    isEdit: {
      type: Boolean,
      required: true
    },
    originList: {
      type: Array,
      required: true
    }
  },
  data() {
    const validateCode = (rule, value, callback) => {
      let deptList = this.originList
      if (this.isEdit) {
        // 如果是编辑状态，code是默认就有的，将默认的code过滤掉
        deptList = this.originList.filter((item) => {
          return item.id !== this.id
        })
      }
      // 映射表
      const originObj = {}
      deptList.forEach(({ id, pid, name, code }) => {
        originObj[code] = { id, pid, name, code }
      })
      // 校验
      if (originObj[value]) {
        callback(new Error(value + '部门编码已存在'))
      } else {
        callback()
      }
    }
    const validateName = (rule, value, callback) => {
      // 需求: 添加时，不允许和子部门同名,编辑时：不允许和兄弟部门同名
      // 映射表
      const names = {}
      if (!this.isEdit) {
        // 如果是添加状态，找到当前部门的所有子部门，然后将子部门的name作为key映射到对象上,
        // 在校验时，如果value在对象上表示这个名字已经存在了，不允许添加子部门
        const children = this.originList.filter((item) => item.pid === this.id)
        children.forEach(({ name }) => {
          names[name] = {}
        })
      } else {
        // 如果是编辑状态，找到当前部门的父部门，然后找到父部门的所有子部门( 自身除外 ),将子部门的name作为key映射到对象上,
        // 在校验时，如果value在对象上表示这个名字已经存在了，不允许修改name
        const pid = this.originList.find(item => item.id === this.id).pid
        this.originList.forEach((item) => {
          if (item.pid === pid && item.id !== this.id) {
            names[item.name] = {}
          }
        })
      }
      if (names[value]) {
        callback(new Error(value + '部门名称已存在'))
      } else {
        callback()
      }
    }
    return {
      form: {
        name: '',
        code: '',
        introduce: '',
        pid: '',
        manager: ''
      },
      deptNames: [],
      rules: {
        name: [
          { required: true, message: '请输入部门名称', trigger: 'blur' },
          { min: 2, max: 10, message: '部门名称在 2 ~ 10 位之间!', trigger: 'blur' },
          { validator: validateName, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入部门编码', trigger: 'blur' },
          { min: 2, max: 10, message: '部门编码在 2 ~ 10 位之间!', trigger: 'blur' },
          { validator: validateCode, trigger: 'blur' }
        ],
        manager: [
          { required: true, message: '请选择部门负责人', trigger: 'change' }
        ],
        introduce: [
          { required: true, message: '请输入部门介绍', trigger: 'blur' },
          { min: 2, max: 300, message: '部门介绍在 2 ~ 300 位之间!', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.loadEmployees()
    this.loadDepartmentDetail()
  },
  methods: {
    // 获取部门的详细信息
    async loadDepartmentDetail() {
      if (this.isEdit) {
        const res = await getDepartmentById(this.id)
        this.form = res.data
      }
    },
    // 获取部门负责人的信息
    async loadEmployees() {
      const res = await getSimpleEmployees()
      this.deptNames = res.data
    },
    handleSubmit() {
      this.$refs.form.validate(async valid => {
        if (!valid) return
        let error = null
        let res = null
        if (!this.isEdit) {
          // 非编辑状态，表示是添加，发送添加请求
          [error, res] = await to(addDepartment({ ...this.form, pid: this.id }))
        } else {
          // 编辑状态，表示是编辑，发送编辑请求
          [error, res] = await to(updateDepartment(this.form))
        }
        if (error) return this.$message.error(error.message)
        this.$message.success(res.message)
        // this.$parent.$parent.$emit('closeDialog')
        this.dispatch('departments', 'closeDialog')
      })
    },
    closeDialog() {
      this.dispatch('departments', 'closeDialog')
    }
  }
}
</script>
