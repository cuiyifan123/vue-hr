<template>
  <div class="employees-container">
    <div class="app-container">
      <page-tools>
        <!-- 插入到left插槽位置 -->
        <template #left>
          <span>总记录数: {{ total }}条</span>
        </template>
        <!-- 插入到right插槽位置 -->
        <template #right>
          <el-button type="warning" size="small" icon="el-icon-document">
            <router-link to="/employees/upload-excel">导入excel</router-link>
          </el-button>
          <el-button
            type="warning"
            size="small"
            icon="el-icon-document"
            :loading="downloadLoading"
            @click="handleDownload"
          >
            导出excel
          </el-button>
          <el-button
            type="primary"
            size="small"
            @click="changeIsShowDialog(true)"
          >新增员工
          </el-button>
        </template>
      </page-tools>
      <el-card>
        <el-table :data="rows" style="width: 100%" border>
          <el-table-column
            type="index"
            label="序号"
            width="100"
            align="center"
          />
          <el-table-column
            prop="username"
            label="姓名"
            width="140"
            align="center"
          />
          <el-table-column label="图片" width="140" align="center">
            <template v-slot="{ row }">
              <img-holder :src="row.staffPhoto"/>
            </template>
          </el-table-column>
          <el-table-column
            prop="workNumber"
            label="工号"
            width="140"
            align="center"
          />
          <el-table-column
            prop="formOfEmployment"
            label="聘用形式"
            align="center"
          >
            <template v-slot="{ row }">
              {{ formatFormOfEmployment(row.formOfEmployment) || '未知' }}
            </template>
          </el-table-column>
          <el-table-column
            prop="departmentName"
            label="部门"
            width="140"
            align="center"
          />
          <el-table-column label="入职时间" sortable align="center">
            <template v-slot="{ row }">
              {{ formatDate(row.timeOfEntry) }}
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template v-slot="{ row }">
              <el-button
                type="text"
                @click="$router.push('/employees/detail/' + row.id)"
              >
                查看
              </el-button>
              <el-button type="text" @click="isShowRoleDialog = true">分配角色</el-button>
              <el-button
                type="text"
                @click="handleDel(row.id)"
              >删除角色
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="page">
          <el-pagination
            :current-page="pageParams.page"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pageParams.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
          />
        </div>
      </el-card>
      <el-dialog title="编辑" :visible.sync="isShowDialog" width="50%">
        <add-or-edit v-if="isShowDialog"/>
      </el-dialog>
      <el-dialog title="查看权限" :visible.sync="isShowRoleDialog" width="50%">
        <Role/>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { getUser, removeEmployees } from '@/api/employees'
import employeesConst from '@/constant/employees'
import AddOrEdit from './components/addOrEdit.vue'
import Role from './components/Role.vue'
import dayjs from 'dayjs'
import ImgHolder from '@/components/ImgHolder/index.vue'
// 映射表
// const hireTypeObj = {}
// employeesConst.hireType.forEach((item) => {
//   hireTypeObj[item.id] = item.value
// })
// 使用reduce来形成映射表
const hireTypeObj = employeesConst.hireType.reduce((total, currentValue) => {
  return { ...total, [currentValue.id]: currentValue.value }
}, {})
const mapInfo = {
  id: '编号',
  password: '密码',
  mobile: '手机号',
  username: '姓名',
  timeOfEntry: '入职日期',
  formOfEmployment: '聘用形式',
  correctionTime: '转正日期',
  workNumber: '工号',
  departmentName: '部门',
  staffPhoto: '头像地址'
}
export default {
  components: { AddOrEdit, ImgHolder, Role },
  componentName: 'employees',
  data() {
    return {
      // 获取员工信息页码的参数
      pageParams: {
        page: 1,
        size: 5
      },
      // 保存员工信息
      rows: [],
      // 总条数
      total: 0,
      isShowDialog: false,
      downloadLoading: false,
      isShowRoleDialog: false
    }
  },
  created() {
    this.loadUser()
    //  监听addOrEdit组件派发的close事件，监听到之后关闭dialog对话框
    this.$on('close', () => {
      this.changeIsShowDialog(false)
    })
    // 监听addOrEdit组件派发的success事件，监听到之后关闭dialog对话框，重新获取员工信息
    this.$on('success', () => {
      this.changeIsShowDialog(false)
      // 如果total 除以 size 取余等于0，表示当前页已经满了，此时在添加员工，要跳转到新的page页面，暂时刚刚添加的员工
      if (this.total % this.pageParams.size === 0) {
        this.total++
      }
      this.pageParams.page = Math.ceil(this.total / this.pageParams.size)
      this.loadUser()
    })
    this.$on('roleDialogClose', () => {
      this.isShowRoleDialog = false
    })
  },
  methods: {
    async loadUser() {
      try {
        const res = await getUser(this.pageParams)
        this.rows = res.data.rows
        this.total = res.data.total
      } catch (e) {
        console.log(e)
      }
    },
    // formatFormOfEmployment(code) {
    //   // 根据code来渲染聘用形式的内容
    //   // employeesConst.hireType保存了 code对应的内容（ 数组的形式：[ {id:code,value:文字} ] ）
    //   const result = employeesConst.hireType.find((item) => item.id === code)
    //   // 如果后台给的code有问题，没有找到对应的文字，则返回 “未知”,避免直接 .value报错( 在 undefined上读取value ),来挺高代码的健壮性
    //   if (result) {
    //     return result.value
    //   } else {
    //     return '未知'
    //   }
    // }
    formatFormOfEmployment(code) {
      return hireTypeObj[code]
    },
    handleCurrentChange(page) {
      this.pageParams.page = page
      this.loadUser()
    },
    handleSizeChange(size) {
      this.pageParams.size = size
      this.loadUser()
    },
    async handleDel(id) {
      this.$confirm('真的要删除吗？', '提示', { type: 'warning' })
        .then(async() => {
          try {
            // 如果当前页面只有一条数据，并且当前不在第一页，则删除完成后，请求上一页的数据( 当前页面没有了，显示上一页 )
            if (this.rows.length === 1 && this.pageParams.page > 1) {
              this.pageParams.page = this.pageParams.page - 1
            }
            const res = await removeEmployees(id)
            this.$message.success(res.message)
            this.loadUser()
          } catch (e) {
            console.log(e)
          }
        })
        .catch(() => {
        })
    },
    changeIsShowDialog(status) {
      this.isShowDialog = status
    },
    formatDate(date) {
      return dayjs(date).format('YYYY-MM-DD')
    },
    async handleDownload() {
      this.downloadLoading = true
      // 获取所有员工信息
      const res = await getUser({ page: 1, size: this.total })
      const list = res.data.rows
      // 取出一位用户的信息
      const first = list[0]
      if (!first) return
      // 将用户信息的key作为excel的标题
      const header = this.englishToChinese(first)
      const data = this.formatData(list)
      const excel = await import('@/vendor/Export2Excel')
      excel.export_json_to_excel({
        header, // excel标题,接收一个数组 ['id','密码']
        data, // excel内容,接收一个 "二维数组" [ ['id','密码'],['id','密码'] ]
        filename: '员工信息', // excel的文件名
        autoWidth: true, // 宽度是否自适应
        bookType: 'xlsx' // 导出的文件类型
      })
      this.downloadLoading = false
    },
    // 将获取的用户对象的key作为excel的标题，后台的key是英文的，将其转换为中文
    englishToChinese(first) {
      return Object.keys(first).map((key) => mapInfo[key])
    },
    // 将请求的数据格式化一下，方便写入excel
    formatData(data) {
      return data.map((item, index) => {
        // 格式化时间
        item['correctionTime'] = dayjs(item['correctionTime']).format(
          'YYYY-MM-DD'
        )
        // 将编号转换为 下标
        item['id'] = index + 1
        // 格式化时间
        item['timeOfEntry'] = dayjs(item['timeOfEntry']).format('YYYY-MM-DD')
        // 将密码隐藏
        item['password'] = '抱歉，没有权限查看'
        item['formOfEmployment'] = hireTypeObj[item['formOfEmployment']]
        return Object.values(item)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar {
  height: 50px;
  width: 50px;
  border-radius: 50%;
}

.page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}
</style>
