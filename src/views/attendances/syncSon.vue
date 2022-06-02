<template>
  <div>
    我是 xiuson, 今天透支自己次数: {{ count }}
    <el-button @click="$emit('update:count', count + 1)">今天下班早, 我要去洗脚</el-button>
  </div>
</template>

<script>
export default {
  props: {
    count: {
      type: Number,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
