<template>
  <div class="department-container">
    <div class="app-container">
      <el-card>
        <!-- 用一个行列布局 -->
        <el-row
          type="flex"
          justify="space-between"
          align="middle"
          style="height: 40px"
        >
          <el-col :span="20">
            <svg-icon icon-class="hongbao"/>
            <span>江苏传智播客教育科技股份有限公司</span>
          </el-col>
          <el-col :span="4">
            <el-row type="flex" justify="end">
              <!-- 两个内容 -->
              <el-col>负责人</el-col>
              <!-- 下拉菜单 element -->
              <el-col>
                <el-dropdown>
                  <span> 操作<i class="el-icon-arrow-down"/> </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                      @click.native="showAdd('')"
                    >添加子部门
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-tree default-expand-all :data="depts">
          <!-- 不是每个作用域插槽都是 row, 具体是什么得根据实际情况打印查看 -->
          <template v-slot="scope">
            <el-row
              type="flex"
              justify="space-between"
              align="middle"
              style="height: 40px; width: 100%"
            >
              <el-col :span="20">
                <span>{{ scope.data.name }}</span>
              </el-col>
              <el-col :span="4">
                <el-row type="flex" justify="end">
                  <!-- 两个内容 -->
                  <el-col>{{ scope.data.manager }}</el-col>
                  <!-- 下拉菜单 element -->
                  <el-col>
                    <el-dropdown>
                      <span> 操作<i class="el-icon-arrow-down"/> </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item
                          @click.native="showAdd(scope.data.id)"
                        >添加子部门
                        </el-dropdown-item>
                        <el-dropdown-item
                          @click.native="showEdit(scope.data.id)"
                        >修改部门
                        </el-dropdown-item>
                        <!-- 当没有children的时候才能删除-->
                        <el-dropdown-item
                          v-if="scope.data.children.length === 0"
                          @click.native="remove(scope.data.id)"
                        >删除部门
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-tree>
      </el-card>
    </div>
    <el-dialog
      title="添加"
      :visible.sync="isShowAddDialog"
      width="50%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <addOrEdit v-if="isShowAddDialog" :id="curId" :is-edit="isEdit"/>
    </el-dialog>
    <el-dialog
      title="编辑"
      :visible.sync="isShowEditDialog"
      width="50%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <addOrEdit v-if="isShowEditDialog" :id="curId" :is-edit="isEdit"/>
    </el-dialog>
  </div>
</template>
<script>
import { getDepts, removeDepartment } from '@/api/departments.js'
import { dataToTree } from '@/utils'
import addOrEdit from './components/addOrEdit'

export default {
  components: {
    addOrEdit
  },
  componentName: 'departments',
  data() {
    return {
      depts: [],
      isShowAddDialog: false,
      isShowEditDialog: false,
      curId: '',
      isEdit: false
    }
  },
  async created() {
    await this.loadDepts()
    this.$on('closeDialog', () => {
      this.close()
    })
  },
  methods: {
    async loadDepts() {
      const res = await getDepts()
      console.log(res)
      res.data.depts.shift()
      this.depts = dataToTree(res.data.depts, '', [])
    },
    //  控制 添加 部门弹窗的函数
    showAdd(id) {
      this.isShowAddDialog = true
      this.curId = id
      this.isEdit = false
    },
    //  控制 修改 部门弹窗的函数
    showEdit(id) {
      this.isShowEditDialog = true
      this.curId = id
      this.isEdit = true
    },
    async remove(id) {
      try {
        const res = await removeDepartment(id)
        this.$message.success(res.message)
        this.close()
      } catch (e) {
        this.$message.error(e.message)
      }
    },
    close() {
      this.loadDepts()
      this.isShowAddDialog = false
      this.isShowEditDialog = false
    }
  }
}
</script>
