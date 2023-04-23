<template>
  <section class="d-select-preview z-draggable-preview new-content">
    <el-form-item
      :label="option.label"
      :prop="option.name"
      :rules="isValidator ? getMyRules : []"
      :required="option.isRequired"
    >
      <el-select
        v-model="form[option.name]"
        popper-class="jee-border"
        placeholder='请选择'
        :popperAppendToBody='false'
      >
        <el-option
          v-for="opt in getOptions || []"
          :key="opt.value"
          :label="opt.label"
          :value="opt.value">
        </el-option>
      </el-select>
      <div class="z-tip-form-item" v-if="option.tip">{{option.tip}}</div>
    </el-form-item>
  </section>
</template>

<script>
import previewMixin from '@/components/draggable/Mixin/previewMixin'

export default {
  name: 'NewDEffectivePreview',
  mixins: [previewMixin],
  props: {
    value: {
      type: [String, Number],
      default: ''
    }
  },
  computed: {
    getOptions () {
      let options = [...this.option.options]
      return options
    },
    getMyRules () {
      const requiredRule = {
        validator: (rule, value, callback) => {
          if (value && value.value) {
            callback()
          } else {
            callback(new Error('此项必填'))
          }
        },
        trigger: ['blur', 'change']
      }
      let rules = this.getRules
      if (this.option.isRequired) rules.push(requiredRule)
      return rules
    }
  }
}
</script>
