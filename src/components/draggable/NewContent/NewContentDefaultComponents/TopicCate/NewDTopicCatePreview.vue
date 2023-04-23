<template>
  <section class="d-organize-preview z-draggable-preview new-content">
    <el-form-item
      :label="option.label"
      :prop="option.name"
      :rules="getRules"
    >
      <div class="organize-wrap">
          <!-- :show-all-levels="false" -->
          <el-cascader
            v-model="val"
            class="org-cascader"
            :options="options"
            :props="{
                label:'markName',
                value:'id',
                checkStrictly: true
            }"
            popper-class="jee-border"
            :show-all-levels="false"
            clearable
            :appendToBody="false"
            ref='cascader'
            @change="closeCascader"
          ></el-cascader>
          <el-input class="cate-input" v-model="cateCode" :placeholder="placeholder" readonly></el-input>
          <div class="z-tip-form-item" v-if="option.tip">{{option.tip}}</div>
      </div>
    </el-form-item>
  </section>
</template>

<script>
import previewMixin from '@/components/draggable/Mixin/previewMixin'
// import { getTreeIds } from '@/utils'

export default {
  name: 'NewDTopicCatePreview',
  mixins: [previewMixin],
  data () {
    return {
      options: [],
      cateCode: '',
      markType: 4,
      placeholder: '根据所选项生成主题分类代码'
    }
  },
  computed: {
    val: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },
  watch: {
    value (newVal) {
      this.cateCode = this.getCode(newVal)
      this.$emit('input', newVal)
    }
  },
  methods: {
    fetchGetOptions () {
      this.$request
        .fetchContentMarksThemeList({
          'markName': '',
          'markType': this.markType
        })
        .then(res => {
          if (res.code === 200) {
            this.options = res.data
            this.cateCode = this.getCode(this.value)
          }
        })
    },
    closeCascader (val) {
      this.cateCode = this.getCode(val)
      this.$refs.cascader.dropDownVisible = false
    },
    getCode (ids) {
      let code = ''
      const loop = (data, ids) => {
        if (data instanceof Array) {
          data.forEach(t => {
            if (ids.indexOf(t.id) > -1) {
              code += t.markCode
            }
            if (t.children) {
              loop(t.children, ids)
            }
          })
        }
      }
      if (this.options.length) {
        loop(this.options, ids)
      }

      return code
    }
  },
  mounted () {
    this.fetchGetOptions()
  }
}
</script>
<style lang="scss" scoped>
    .org-cascader{
        width: 220px!important;
        margin-right: 20px;
    }
    .cate-input{
        width: 220px;
    }
    .content-block-right{
        .cate-input,.org-cascader{
            width: 100%!important;
        }
        .org-cascader{
            margin-bottom: 10px;
        }
    }
</style>
