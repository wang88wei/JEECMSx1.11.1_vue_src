<template>
  <div class="d-city-editor-container z-draggable-editor new-content">
    <base-form
      ref="baseForm"
      :showSubmitButton="false"
      :form="value"
      :formItems="getFormItems"
      :labelWidth="labelWidth"
      :rules="rules"
      :popperAppendToBody='false'
    >
      <template #default="scope">
        <div class="option-wrap">
          <el-checkbox v-model="scope.form.isSetDefault"
          @change="handleChangeDefault"
          class="z-checkbox-single default">设置默认值</el-checkbox>
        </div>
      </template>
    </base-form>
    <transition name="fade" mode="out-in">
      <div class="address-wrap" v-if="value.isSetDefault">
        <el-select
          class="option-item"
          size="small"
          popper-class="jee-border"
          v-model="value.defaultValue.provinceCode"
          :popper-append-to-body="false"
          placeholder="省"
          @change="handleChangeProvince"
        >
          <el-option
            v-for="option in getProvinces || []"
            :key="option.value"
            :label="option.label"
            :value="option.value">
          </el-option>
        </el-select>
        <el-select
          class="option-item"
          size="small"
          popper-class="jee-border"
          v-model="value.defaultValue.cityCode"
          :popper-append-to-body="false"
          placeholder="市">
          <el-option
            v-for="option in getCitys(value.defaultValue.provinceCode) || []"
            :key="option.value"
            :label="option.label"
            :value="option.value">
          </el-option>
        </el-select>
      </div>
    </transition>
  </div>
</template>

<script>
import editorMixin from '@/components/draggable/Mixin/editorMixin'
import {
  mapGetters
} from 'vuex'

export default {
  name: 'NewDCityEditor',
  mixins: [editorMixin],
  data () {
    return {
      labelWidth: 'auto',
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
          prop: 'tip',
          label: '帮助信息：',
          maxlength: 50
        },
        {
          prop: 'isRequired',
          label: '是否必填：',
          type: 'radio',
          itemClass: 'width',
          options: this.$enums.boolYes
        },
        {
          prop: 'default',
          label: '默认值：',
          type: 'slot',
          class: 'sm-height margin-bottom10 width'
        },
        {
          prop: 'isRegister',
          label: '应用到会员注册：',
          type: 'radio',
          itemClass: 'width',
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
        ]
      }
    }
  },
  computed: {
    ...mapGetters('system', ['getProvinces', 'getCitys'])
  },
  methods: {
    handleChangeDefault (val) {
      if (!val) {
        this.value.defaultValue = {
          provinceCode: '',
          cityCode: ''
        }
      }
    },
    handleChangeProvince (val) {
      this.value.defaultValue.cityCode = ''
    }
  }
}
</script>

<style lang="scss">
.d-city-editor-container.new-content{
  .address-wrap{
    width: 330px;
    .el-input__inner{
      width: 100%;
    }
    .option-item{
      line-height: 32px;
      width: 100%;
      &.el-select{
        padding-bottom: 10px;
      }
    }
  }
  .option-wrap{
    .z-checkbox-single{
      line-height: 14px;
      padding-bottom: 0px;
      .el-checkbox__inner {
          border-radius: 2px;
      }
    }
  }
  .form-item-wrap{
    .el-form-item__content{
      margin-left: 0 !important;
    }
    .el-form-item__label-wrap{
      // margin-bottom: 9px;
      margin-left: 0 !important;
    }
    .el-input__inner{
      margin-top: 9px;
    }
  }
}
</style>
