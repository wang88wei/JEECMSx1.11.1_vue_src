<template>
  <base-form
    class="d-vip-editor-container z-draggable-editor"
    ref="baseForm"
    :showSubmitButton="false"
    :form="value"
    :formItems="getFormItems"
    :labelWidth="labelWidth"
    :rules="rules"
    :popperAppendToBody="false"
  ></base-form>
</template>

<script>
import editorMixin from '@/components/draggable/Mixin/editorMixin'

export default {
  name: 'DVipEditor',
  mixins: [editorMixin],
  data () {
    return {
      formItems: [
        {
          prop: 'label',
          label: '字段名称：',
          maxlength: 50
        },
        {
          prop: 'name',
          label: '标签名称：',
          maxlength: 50
        },
        {
          prop: 'placeholder',
          label: '默认提示文字：',
          maxlength: 50
        },
        {
          prop: 'tip',
          label: '帮助信息：',
          maxlength: 50
        },
        {
          prop: 'defaultValue',
          label: '默认值：',
          type: 'radio',
          itemClass: 'width',
          options: this.value.options
        },
        {
          prop: 'isRequired',
          label: '是否必填：',
          type: 'radio',
          itemClass: 'width',
          options: this.$enums.boolYes
        },
        {
          prop: 'isRegister',
          itemClass: 'width',
          label: '应用到会员注册：',
          type: 'radio',
          options: this.$enums.boolYes
        },
        {
          prop: 'isSmsVerification',
          label: '注册时开启手机短信验证：',
          type: 'radio',
          options: this.$enums.boolYes,
          itemClass: 'width',
          hiddenKey: 'isRegister',
          hiddenValue: true
        },
        {
          prop: 'isSmsFindPassword',
          label: '开启手机短信找回密码：',
          itemClass: 'width',
          type: 'radio',
          options: this.$enums.boolYes
        }
      ],
      rules: {
        label: [
          this.$rules.required()
        ],
        name: [
          this.$rules.enNumLine(),
          this.$rules.required()
        ],
        isRequired: [
          this.$rules.required()
        ],
        isRegister: [
          this.$rules.required()
        ],
        isSmsVerification: [
          this.$rules.required()
        ],
        isSmsFindPassword: [
          this.$rules.required()
        ]
      }
    }
  }
}
</script>
