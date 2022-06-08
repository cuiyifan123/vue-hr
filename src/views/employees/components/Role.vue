<template>
  <!-- // 分配角色 -->
  <div>
    <el-checkbox-group v-model="rolesIds" v-loading="loading">
      <el-checkbox v-for="item in roles" :key="item.id" :label="item.id">
        <span>{{ item.name }}</span>
      </el-checkbox>
    </el-checkbox-group>

    <div style="margin-top: 20px; text-align: right">
      <el-button type="primary" @click="handleSubmit">确定</el-button>
      <el-button @click="closeDialog">取消</el-button>
    </div>
  </div>
</template>

<script>
import emitter from '@/utils/emitter.js'
import { getRoles } from '@/api/roles.js'
import { getUserDetailById } from '@/api/user.js'
import { assignRoles } from '@/api/employees.js'

export default {
  name: 'Role',
  mixins: [emitter],
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      roles: [],
      rolesIds: [],
      loading: true
    }
  },
  created() {
    this.loadRoles()
    this.loadRolesById()
  },
  methods: {
    closeDialog() {
      this.dispatch('employees', 'roleDialogClose')
    },
    async loadRoles() {
      try {
        const res = await getRoles()
        this.roles = res.data.rows
      } catch (e) {
        console.log(e)
      }
    },
    async loadRolesById() {
      try {
        const res = await getUserDetailById(this.id)
        this.rolesIds = res.data.roleIds
        this.loading = false
      } catch (e) {
        console.log(e)
      }
    },
    async handleSubmit() {
      try {
        const res = await assignRoles({ id: this.id, roleIds: this.rolesIds })
        this.$message.success(res.message)
        this.dispatch('employees', 'roleDialogClose')
      } catch (e) {
        this.$message.success(e.message)
      }
    }
  }
}
</script>

<style scoped></style>
