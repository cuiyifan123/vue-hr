<template>
  <div class="app-container">
    <Excel :on-success="handleSuccess" :before-upload="beforeUpload"/>
  </div>
</template>

<script>
// 将导入的excel中的中文标题创建一个对应英文映射表
import { addBatchEmployees } from '@/api/employees.js'
import { formatExcelDate } from '@/utils/formatExcelDate.js'

const mapInfo = {
  '入职日期': 'timeOfEntry',
  '手机号': 'mobile',
  '姓名': 'username',
  '转正日期': 'correctionTime',
  '工号': 'workNumber',
  '部门': 'departmentName',
  '聘用形式': 'formOfEmployment'
}
export default {
  name: 'UploadExcel',
  data() {
    return {}
  },
  methods: {
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1
      if (isLt1M) {
        return true
      }

      this.$message({
        message: 'Please do not upload files larger than 1m in size.',
        type: 'warning'
      })
      return true
    },
    handleSuccess({ results }) {
      // 将中文标题转换为英文
      console.log(this.transExcel(results))
      results = this.transExcel(results)
      this.addBatchEmployees(results)
    },
    // 将excel中的中文标题转换为英文
    transExcel(source) {
      return source.map(item => {
        const result = {}
        //  将对象中的key全部取出来，如果key在映射表中，则添加到result对象中，并return出去
        Object.keys(item).forEach(key => {
          if (key in mapInfo) {
            // 因为 excel的时间是从1990开始计算的，js是1970年开始，时间有问题，需要转换下
            if (key === '入职日期' || key === '转正日期') {
              result[mapInfo[key]] = formatExcelDate(item[key])
            } else {
              result[mapInfo[key]] = item[key]
            }
          }
        })
        return result
      })
    },
    async addBatchEmployees(data) {
      try {
        // 将转换好的数据发送给后台
        const res = await addBatchEmployees(data)
        // 成功后提示用户
        this.$message.success(res.message)
        // 并push到员工管理页面
        this.$router.push({ path: '/employees' })
      } catch (e) {
        this.$message.error(e.message)
      }
    }

  }
}
</script>
