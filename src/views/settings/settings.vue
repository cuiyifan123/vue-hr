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
                  <el-button size="small" type="primary">编辑</el-button>
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
      </el-card>
    </div>
  </div>
</template>
<script>
import { getRoles, removeRole } from '@/api/roles.js'

export default {
  data() {
    return {
      pageParams: { page: 1, pagesize: 2 },
      rows: [],
      total: 0
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
    }
  }
}
</script>
