<template>
  <div class="permission-container">
    <div class="app-container">
      <!-- 表格 -->
      <el-card>
        <div style="text-align: right; margin-bottom: 20px">
          <el-button
            type="primary"
            size="small"
            @click="handleAdd(1, '0')"
          >添加权限
          </el-button>
        </div>
        <el-table border :data="rows" row-key="id" default-expand-all>
          <el-table-column label="名称" prop="name"/>
          <el-table-column label="标识" prop="code"/>
          <el-table-column label="描述" prop="description"/>
          <el-table-column label="操作">
            <template v-slot="{ row }">
              <!-- 如果row.type为1表示页面级权限， 2表示按钮级权限，按钮级权限是没有添加功能的 -->
              <el-button v-if="row.type === 1" type="text">添加</el-button>
              <el-button type="text" @click="handleEdit(row.id)">编辑</el-button>
              <el-button type="text" @click="handleDel(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <el-dialog title="提示" :visible.sync="isShowAddDialog" width="50%">
        <add-or-edit v-if="isShowAddDialog" action="add"/>
      </el-dialog>
      <el-dialog title="提示" :visible.sync="isShowEditDialog" width="50%">
        <add-or-edit v-if="isShowEditDialog" :id="formData.id" action="edit"/>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { getPermissions, addPermission, delPermission, updatePermission } from '@/api/permission'
import { dataToTree } from '@/utils'
import AddOrEdit from './components/addOrEdit'

export default {
  components: { AddOrEdit },
  componentName: 'permissions',
  data() {
    return {
      rows: [],
      isShowAddDialog: false,
      formData: {
        type: '',
        id: ''
      },
      isShowEditDialog: false
    }
  },
  created() {
    this.loadPermission()
    this.$on('add', (value) => {
      this.formData = { ...this.formData, ...value }
      this.addPermission()
    })
    this.$on('edit', (value) => {
      this.doEdit(value)
    })
  },
  methods: {
    async loadPermission() {
      try {
        const res = await getPermissions()
        this.rows = dataToTree(res.data)
      } catch (e) {
        console.log(e)
      }
    },
    handleAdd(type, id) {
      this.isShowAddDialog = true
      // 记录当前添加的关键信息
      this.formData.type = type
      this.formData.id = id
    },
    async addPermission() {
      try {
        await addPermission(this.formData)
        this.isShowAddDialog = false
        this.loadPermission()
        this.$message.success('添加成功')
      } catch (err) {
        this.$message.error('添加失败')
      }
    },
    handleDel(id) {
      this.$confirm('你确定要删除吗？').then(() => {
        this.doDel(id)
      }).catch(() => {

      })
    },
    async doDel(id) {
      try {
        await delPermission(id)
        this.loadPermission()
        this.$message.success('删除成功')
      } catch (err) {
        console.log(err)
        this.$message.error('删除失败')
      } finally {
        this.isShowAddDialog = false
      }
    },
    handleEdit(id) {
      this.formData.id = id
      this.isShowEditDialog = true
    },
    async doEdit(data) {
      try {
        const res = await updatePermission(data)
        this.$message.success(res.message)
        this.loadPermission()
      } catch (e) {
        console.log(e)
      } finally {
        this.isShowEditDialog = false
      }
    }
  }
}
</script>
