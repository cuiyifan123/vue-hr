<template>
  <div>
    <el-tree
      ref="tree"
      node-key="id"
      show-checkbox
      check-strictly
      default-expand-all
      :data="permission"
      :props="{ label: 'name' }"
    >
    </el-tree>
    <div class="footer">
      <el-button @click="$emit('closeAssign')">取消
      </el-button>
      <el-button @click="hSubmit">确定</el-button>
    </div>
  </div>
</template>

<script>
import { getPermissions } from '@/api/permission.js'
import { dataToTree } from '@/utils/index.js'
import { getRolePermissionById, updateRolePermission } from '@/api/roles.js'

export default {
  name: 'AssignPermission',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      permission: []
    }
  },
  created() {
    // 获取所有权限
    this.loadPermissions()
    // 获取当前用户的权限
    this.loadPermission()
  },
  methods: {
    async loadPermissions() {
      try {
        const res = await getPermissions()
        this.permission = dataToTree(res.data)
      } catch (e) {
        console.log(e)
      }
    },
    async hSubmit() {
      try {
        const ids = this.$refs.tree.getCheckedKeys()
        const res = await updateRolePermission({ permIds: ids, id: this.id })
        this.$message.success(res.message)
        this.$emit('closeAssign')
      } catch (e) {
        this.$message.error(e.message)
      }
    },
    async loadPermission() {
      try {
        const res = await getRolePermissionById(this.id)
        this.$refs.tree.setCheckedKeys(res.data.permIds)
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.footer {
  display: flex;
  justify-content: end;
}
</style>
