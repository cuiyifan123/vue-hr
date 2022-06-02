<template>
  <div>
    我是洗脚彭, 累计洗脚次数: {{ value }}
    <!-- props 单向数据流 -->
    <el-button @click="$emit('input', value + 1)">今天下班早, 我要去洗脚</el-button>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      required: true
    }
  },

  data() {
    return {

    }
  },

  mounted() {

  },

  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>
