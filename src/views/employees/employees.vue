<template>
  <div class="employees-container">
    <div class="app-container">
      <page-tools>
        <!-- 插入到left插槽位置 -->
        <template #left>
          <span>本月: 社保在缴 公积金在缴</span>
        </template>
        <!-- 插入到right插槽位置 -->
        <template #right>
          <el-button type="warning" size="small">导入excel</el-button>
          <el-button type="danger" size="small">导出excel</el-button>
          <el-button type="primary" size="small">新增员工</el-button>
        </template>
      </page-tools>
    </div>
  </div>
</template>
<script>
export default {}
</script>
