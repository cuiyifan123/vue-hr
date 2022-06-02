<template>
  <div class="approvals-container">
    <div class="app-container">
      <el-card>
        <!-- 具体页面结构 -->
        审批
        <!-- .native 修饰符: 给子组件的根标签绑定事件 -->
        <!-- 技巧: 如果需要给组件绑定事件, 绑了没生效就加一个 .native -->
        <son @click.native="hClick" />
        <el-button @click="hBtn">点我</el-button>
      </el-card>
    </div>
  </div>
</template>

<script>
import son from './son'
export default {
  components: {
    son
  },
  methods: {
    hClick() {
      console.log('xiuson 被点了')
    },
    hBtn() {
      console.log('btn 被点了')
    }
  }
}
</script>
