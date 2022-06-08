<template>
  <el-form ref="form" :model="formData" label-width="100px" :rules="rules">
    <el-form-item label="权限名称" prop="name">
      <el-input v-model="formData.name"/>
    </el-form-item>
    <el-form-item label="权限标识" prop="code">
      <el-input v-model="formData.code"/>
    </el-form-item>
    <el-form-item label="权限描述" prop="description">
      <el-input v-model="formData.description"/>
    </el-form-item>
    <el-form-item label="权限启用">
      <el-switch
        v-model="formData.enVisible"
        active-text="启用"
        active-value="1"
        inactive-text="不启用"
        inactive-value="0"
      />
    </el-form-item>
    <el-form-item>
      <el-button @click="handleClick">确定</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import emitter from '@/utils/emitter.js'
import { getPermission } from '@/api/permission.js'

export default {
  name: 'AddOrEdit',
  mixins: [emitter],
  props: {
    action: {
      type: String,
      required: true
    },
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      formData: {
        enVisible: '',
        name: '',
        code: '',
        description: ''
      },
      rules: {
        name: [
          { required: true, message: '权限名称必填项', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '权限标识必填项', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '权限描述必填项', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    // 如果是编辑，那么数据回显
    if (this.action === 'edit') {
      this.loadPermission()
    }
  },
  methods: {
    handleClick() {
      this.$refs.form.validate(valid => {
        if (!valid) return
        this.dispatch('permissions', this.action, this.formData)
      })
    },
    async loadPermission() {
      try {
        const res = await getPermission(this.id)
        this.formData = res.data
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
