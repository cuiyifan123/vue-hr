<template>
  <div class="attendances-container">
    <div class="app-container">
      <el-card>
        <!-- 具体页面结构 -->
        考勤
        <!-- <son :value="num" @input="e => num = e" /> -->
        <!-- v-model 是一个语法糖, 它本质上做了两件事情:
          1. 绑定一个 value 属性给子组件
          2. 绑定一个 input 事件, 子组件触发后重新赋值
         -->
        <son v-model="num" />
        <!-- v-model 也有一些限制:
          1. 绑定的属性必须要叫 value
          2. 事件必须要叫 input
          3. 组件只能用一个 v-model 指令
          所以诞生了一个新的修饰符: .sync
         -->
        <!-- <syncSon :count="num" @update:count="e => num = e" /> -->
        <!-- .sync 帮我们省去了事件绑定, 事件名必须是 update:属性名 -->
        <!-- .sync 完美解决了 v-model 的三点限制 -->
        <syncSon :count.sync="num" />
      </el-card>
    </div>
  </div>
</template>

<script>
import son from './son.vue'
import syncSon from './syncSon.vue'
export default {
  components: {
    son,
    syncSon
  },
  data() {
    return {
      num: 0
    }
  }
}
</script>
