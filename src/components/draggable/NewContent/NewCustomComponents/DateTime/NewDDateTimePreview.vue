<template>
  <section class="d-datetime-preview z-draggable-preview new-content">
    <el-form-item
      :label="option.label"
      :prop="option.name"
      :rules="getRules"
      :show-message="isValidator"
      :required="option.isRequired"
    >
      <!-- 日期 -->
      <el-date-picker
        v-if="option.type === 'date'"
        v-model="val"
        :type="getDateType"
        :format="getFormat"
        :appendToBody='false'
        align='right'
        placeholder="选择日期">
      </el-date-picker>
      <!-- 时间 -->
      <el-time-picker
        v-else-if="option.type === 'time'"
        v-model="val"
        :format="getFormat"
        :appendToBody='false'
        align='right'
        placeholder="选择时间">
      </el-time-picker>
      <!-- 日期+时间 -->
      <el-date-picker
        v-else-if="option.type === 'datetime'"
        v-model="val"
        :format="getFormat"
        type="datetime"
        :appendToBody='false'
        align='right'
        value-format="yyyy-MM-dd HH:mm:ss"
        placeholder="选择日期时间">
      </el-date-picker>
      <div class="z-tip-form-item" v-if="option.tip">{{option.tip}}</div>
    </el-form-item>
  </section>
</template>

<script>
import moment from 'moment'
import previewMixin from '@/components/draggable/Mixin/previewMixin'

export default {
  name: 'NewDDateTimePreview',
  mixins: [previewMixin],
  computed: {
    getDateType () {
      switch (this.option.format) {
        case 'yyyy':
          return 'year'
        case 'MM':
          return 'month'
        case 'yyyy-MM':
          return 'month'
        default:
          return 'date'
      }
    },
    getFormat () {
      switch (this.option.type) {
        case 'date':
          return this.option.format
        case 'time':
          return this.option.accuracy
        case 'datetime':
        default:
          return [this.option.format, this.option.accuracy].join(' ')
      }
    },
    val: {
      get () {
        let datetime = this.value ? this.value + '' : ''
        if (datetime.length && (datetime.indexOf('-') === -1)) {
          datetime = this.$moment(this.value, 'YYYY-MM-DD HH:mm:ss', true)
        }
        return datetime || null
      },
      set (val) {
        const datetime = val ? this.moment(val).format('YYYY-MM-DD HH:mm:ss') : ''
        this.$emit('input', datetime)
      }
    }
  },
  methods: {
    moment
  }
}
</script>

<style lang="scss">
.d-datetime-preview.new-content .el-form-item{
  .el-date-editor.el-input{
    width: 100%;
  }
}
</style>
