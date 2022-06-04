<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <!-- 放置页签 -->
          <el-tab-pane label="角色管理">
            <!-- 新增角色按钮 -->
            <el-row style="height: 60px">
              <el-button
                icon="el-icon-plus"
                size="small"
                type="primary"
                @click="handleAdd()"
              >新增角色
              </el-button>
            </el-row>
            <!-- 表格 -->
            <el-table :data="rows" border>
              <el-table-column label="序号" width="120" type="index" />
              <el-table-column label="角色名称" width="240" prop="name" />
              <el-table-column label="描述" prop="description" />
              <el-table-column label="操作" width="300">
                <template v-slot="{ row }">
                  <el-button size="small" type="success">分配权限</el-button>
                  <el-button
                    size="small"
                    type="primary"
                    @click="handleEdit(row)"
                  >编辑</el-button>
                  <el-button
                    size="small"
                    type="danger"
                    @click="removeRole(row)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-row
              type="flex"
              justify="center"
              align="middle"
              style="height: 60px"
            >
              <!-- 分页组件 -->
              <el-pagination
                :current-page="pageParams.page"
                :page-sizes="[2, 3, 5, 10]"
                :page-size="pageParams.pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              />
            </el-row>
          </el-tab-pane>
        </el-tabs>
        <el-dialog
          title="编辑弹层"
          :close-on-click-modal="false"
          :close-on-press-escape="false"
          :visible.sync="showDialog"
          @closed="dialogClosed"
        >
          <el-form
            ref="roleForm"
            :model="roleForm"
            :rules="rules"
            label-width="100px"
          >
            <el-form-item label="角色名称" prop="name">
              <el-input v-model="roleForm.name" />
            </el-form-item>
            <el-form-item label="角色描述" prop="description">
              <el-input v-model="roleForm.description" />
            </el-form-item>
          </el-form>
          <!-- 底部 -->
          <el-row slot="footer" type="flex" justify="center">
            <el-col :span="6">
              <el-button
                size="small"
                @click="changeIsShwoDialog(false)"
              >取消</el-button>
              <el-button
                size="small"
                type="primary"
                @click="handleSubmit"
              >确定</el-button>
            </el-col>
          </el-row>
        </el-dialog>
      </el-card>
    </div>
  </div>
</template>
<script>
import { addRole, getRoles, removeRole, updateRole } from '@/api/roles.js'

export default {
  data() {
    return {
      pageParams: { page: 1, pagesize: 2 },
      rows: [],
      total: 0,
      // 控制dialog的显示与隐藏
      showDialog: false,
      roleForm: {
        name: '',
        description: ''
      },
      rules: {
        name: [
          { required: true, message: '角色名称为必填项', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '角色名称为必填项', trigger: 'blur' }
        ]
      },
      isEdit: false
    }
  },
  created() {
    this.loadRoles()
  },
  methods: {
    async loadRoles() {
      try {
        const res = await getRoles(this.pageParams)
        this.rows = res.data.rows
        this.total = res.data.total
      } catch (e) {
        console.log(e)
      }
    },
    handleCurrentChange(page) {
      this.pageParams.page = page
      this.loadRoles()
    },
    handleSizeChange(pagesize) {
      this.pageParams.pagesize = pagesize
      this.loadRoles()
    },
    async removeRole(row) {
      const { id } = row
      this.$confirm('真的要删除吗?', '提示', { type: 'success' })
        .then(async() => {
          try {
            // 判断当前分页，是否只有一条数据并且当前不在第一页，如果是则让下次请求页面 - 1
            const { pageParams, rows } = this
            if (pageParams.page > 1 && rows.length === 1) {
              this.pageParams.page = pageParams.page - 1
            }
            const res = await removeRole(id)
            // 成功提示用户
            this.$message.success(res.message)
            // 重新请求
            this.loadRoles()
          } catch (e) {
            this.$message.error(e.message)
          }
        })
        .catch(() => {})
    },
    // 改变是否显示dialog对话框 ”状态“ 的函数
    changeIsShwoDialog(status) {
      this.showDialog = status
    },
    handleSubmit() {
      this.isEdit ? this.doEdit() : this.doAdd()
    },
    // 点击新增按钮处理函数
    handleAdd() {
      this.isEdit = false
      // dialog显示
      this.changeIsShwoDialog(true)
    },
    //  点击编辑按钮处理函数
    handleEdit(row) {
      this.isEdit = true
      // dialog显示
      this.changeIsShwoDialog(true)
      this.roleForm = { ...row }
    },
    // dialog关闭后，清空表单数据
    dialogClosed() {
      // 清空表单
      this.$refs.roleForm.resetFields()
      // 清空 roleForm数据
      this.roleForm = { name: '', description: '' }
    },
    doAdd() {
      // 发送请求添加角色
      // 1、兜底校验
      this.$refs.roleForm.validate(async(valide) => {
        if (!valide) return
        try {
          const res = await addRole(this.roleForm)
          // 提示用户
          this.$message.success(res.message)

          // 关闭 dialog
          this.changeIsShwoDialog(false)
          // 需求：添加成功后，跳转到最后一页
          /*
              解决思路：
                数据的总数量( total ) / 每页需要显示多少条数据( params.pageSize ) 向上取整 = 最后一页的页码
                但是有可能 total / pageSize = 0 了,则需要让total +1
          */
          if (this.total % this.pageParams.pagesize === 0) {
            this.total++
          }
          this.pageParams.page = Math.ceil(
            this.total / this.pageParams.pagesize
          )
          // 重新获取数据
          this.loadRoles()
        } catch (e) {
          this.$message.success(e.message)
        }
      })
    },
    doEdit() {
      // 发送请求修改( 编辑 )角色
      // 1、兜底校验
      this.$refs.roleForm.validate(async(valide) => {
        if (!valide) return
        try {
          const res = await updateRole(this.roleForm)
          // 提示用户
          this.$message.success(res.message)
          // 关闭 dialog
          this.changeIsShwoDialog(false)
          // 重新获取数据
          this.loadRoles()
        } catch (e) {
          this.$message.success(e.message)
        }
      })
    }
  }
}
</script>
