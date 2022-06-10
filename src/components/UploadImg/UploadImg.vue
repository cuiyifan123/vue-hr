<template>
  <div>
    <el-upload
      class="avatar-uploader"
      action="#"
      :show-file-list="false"
      :before-upload="beforeAvatarUpload"
      :http-request="upload"
    >
      <img v-if="staffPhoto" :src="staffPhoto" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"/>
    </el-upload>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
// 填写自己腾讯云cos中的key和id (密钥)
const cos = new COS({
  SecretId: 'AKIDYvqb9UZPBF6k9PQFsHSt76VihaJriRzV', // 身份识别ID
  SecretKey: 'lPuDLKJSRD7su1yiHbhaFsNhngMp8HF5' // 身份秘钥
})
export default {
  props: {
    staffPhoto: {
      required: true
    }
  },
  data() {
    return {}
  },
  methods: {
    upload(config) {
      if (!config.file) return
      // 执行上传操作
      cos.putObject({
        Bucket: '100-1259788072', /* 存储桶 */
        Region: 'ap-nanjing', /* 存储桶所在地域，必须字段 */
        Key: config.file.name, /* 文件名 */
        StorageClass: 'STANDARD', // 上传模式, 标准模式
        Body: config.file // 上传文件对象
      }, (err, data) => {
        console.log(data.Location)
        // 上传成功之后
        if (data.statusCode === 200) {
          this.$emit('update:staffPhoto', `https://${data.Location}`)
        }
      })
    },
    beforeAvatarUpload(file) {
      const isPNG = file.type.startsWith('image/')
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isPNG) {
        this.$message.error('上传头像图片只能是 PNG 格式!')
        return isPNG
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
        return isLt2M
      }
      return true
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
