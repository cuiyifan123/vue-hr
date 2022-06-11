<template>
  <el-calendar v-model="curDate">
    <template #dateCell="{ date }">
      <div class="date-content">
        <span class="text">{{ date.getDate() }}</span>
        <span v-if="isWeekend(date)" class="rest">休</span>
      </div>
    </template>
  </el-calendar>
</template>
<script>
export default {
  data() {
    return {
      curDate: new Date()
    }
  },
  methods: {
    isWeekend(date) {
      return date.getDay() === 6 || date.getDay() === 0
    }
  }
}
</script>
