<template>
  <section class="d-select-preview z-draggable-preview">
    <el-form-item
      :label="option.label"
      :prop="option.name"
      :rules="getRules"
    >
      <el-select
        v-model="val"
        popper-class="jee-border"
        placeholder='请选择'
        :popperAppendToBody='false'
        clearable
      >
        <el-option
          v-for="opt in onlyContentSecurityOptions || []"
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
import {
  mapGetters,
  mapActions
} from 'vuex'

export default {
  name: 'NewDContentSecurityPreview',
  mixins: [previewMixin],
  computed: {
    ...mapGetters(['onlyContentSecurityOptions']),
    val: {
      get () {
        let obj = this.onlyContentSecurityOptions.find(t => t.id === this.value)
        return obj ? obj.id : ''
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    ...mapActions('system', ['FetchOnlyContentSecurityOptions'])
  },
  mounted () {
    this.FetchOnlyContentSecurityOptions()
  }
}
</script>
