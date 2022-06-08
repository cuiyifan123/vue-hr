<template>
  <!-- // 分配角色 -->
  <div>
    <el-checkbox-group v-model="rolesIds">
      <el-checkbox v-for="item in roles" :key="item.id" :label="item.id">
        <span>{{ item.name }}</span>
      </el-checkbox>
    </el-checkbox-group>

    <div style="margin-top: 20px; text-align: right">
      <el-button type="primary">确定</el-button>
      <el-button @click="closeDialog">取消</el-button>
    </div>
  </div>
</template>

<script>
import emitter from '@/utils/emitter.js'
import { getRoles } from '@/api/roles.js'

export default {
  name: 'Role',
  mixins: [emitter],
  data() {
    return {
      roles: [],
      rolesIds: []
    }
  },
  created() {
    this.loadRoles()
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
    }
  }
}
</script>

<style scoped>

</style>
