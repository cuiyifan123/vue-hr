<template>
  <el-image :src="src" class="img-container">
    <template #error>
      <img :src="head" alt="avatar">
    </template>
  </el-image>
</template>
<script>
import head from './head1.jpg'
export default {
  name: 'ImgHolder',
  props: {
    src: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      head
    }
  }
}
</script>
<style scoped lang="scss">
.img-container {
  border-radius: 50%;
  ::v-deep img {
    width: 50px;
    height: 50px;
  }
}
</style>
