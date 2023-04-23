<script>
import compoment from '@/components/draggable/CustomComponents/ImageUpload/DImageUploadPreview'
export default {
  name: 'DPortraitPreview',
  extends: compoment,
  data () {
    return {
      fixed: true, // 是否开启截图框宽高固定比例
      defaultUrl: ''
    }
  },
  watch: {
    value: {
      handler (newData) {

        if (newData) {
          this.defaultUrl = this.form.userImg
        }
      },
      deep: true
    }
  },
  mounted () {
    if (this.value) {
      this.defaultUrl = this.form.userImg
    }
  }
}
</script>
<style lang="scss">
  .imgcss{
    .jee-border{
      top: 38px !important;
    }
  }
  .personlp .el-input__icon{
    line-height: 33px !important;
  }
</style>
