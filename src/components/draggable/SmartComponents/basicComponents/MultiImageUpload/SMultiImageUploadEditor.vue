<template>
  <base-form
    ref="baseForm"
    class="s-multi-image-upload-container d-multi-image-upload-editor-container z-draggable-editor new-content-editor"
    :showSubmitButton="false"
    :form="value"
    :formItems="getFormItems"
    :labelWidth="labelWidth"
    :rules="rules"
    label-position="top"
    :popperAppendToBody='false'
  >
    <template #size="scope">
      <el-form-item class="size-wrap" style="marginBottom: 0" prop="size">
        <el-input
          class="jee-input-append-select"
          v-model.number="scope.form.size">
          <el-select popper-class="jee-border"
            :popper-append-to-body="false"
            slot="append" v-model="scope.form.unit" placeholder="请选择">
            <el-option
              v-for="item in scope.item.options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-input>
        <span class="z-append-text">(留空表示不限制)</span>
      </el-form-item>
    </template>
    <template #imgSize="scope">
      <div class="image-size-wrap">
        <span class='text'>宽</span>
        <el-form-item prop='width' style="marginBottom: 0;">
          <el-input v-model.number="scope.form.width" size="small" class="z-input-line"></el-input>
        </el-form-item>
        <span class='text'>PX，高</span>
        <el-form-item prop='height' style="marginBottom: 0;">
          <el-input v-model.number="scope.form.height" size="small" class="z-input-line"></el-input>
        </el-form-item>
        <span class='text'>PX</span>
      </div>
    </template>
  </base-form>
</template>

<script>
import editorMixin from '@/components/draggable/Mixin/editorMixin'

export default {
  name: 'SMultiImageUploadEditor',
  mixins: [editorMixin],
  data () {
    return {
      labelWidth: '125px',
      formItems: [
        {
          prop: 'label',
          label: '字段名称：',
          maxlength: 15
        },
        {
          prop: 'tip',
          label: '帮助信息：',
          placeholder: '请输入内容',
          maxlength: 50
        },
        {
          prop: 'type',
          label: '限制图片类型：',
          type: 'select',
          multiple: true,
          options: this.$enums.imageType
        },
        {
          prop: 'size',
          label: '图片大小不超过：',
          type: 'slot',
          options: this.$enums.size
        },
        {
          prop: 'limit',
          label: '图片最大张数：',
          appendText: '(留空为不限制)'
        },
        {
          prop: 'imgSize',
          label: '图片建议宽高：',
          itemClass: 'width',
          type: 'slot'
        },
        {
          prop: 'isRequired',
          label: '是否必填：',
          itemClass: 'width',
          type: 'radio',
          options: this.$enums.boolYes
        },
        {
          prop: 'isRegister',
          label: '应用到会员注册：',
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
        type: [
          this.$rules.required()
        ],
        isRequired: [
          this.$rules.required()
        ],
        width: [
          this.$rules.number()
        ],
        height: [
          this.$rules.number()
        ],
        size: [
          this.$rules.float()
        ],
        max: [
          this.$rules.number()
        ],
        limit: [
          this.$rules.greaterNumber()
        ],
        isRegister: [
          this.$rules.required()
        ]
      }
    }
  }
}
</script>

<style lang="scss">
.s-multi-image-upload-container{
  .form-item-wrap{
    .el-form-item{
      .el-form-item__content{
        .el-select{
          .el-select__tags{
            .el-tag--light{
              color: #333;
            }
            .el-tag__close:hover{
                background: #999 !important;

            }
          }
        }
        .image-size-wrap{
          .z-input-line{
            display: flex;
            >.el-input__inner{
              // margin-top: 5px;
              border-right-color: #fff;
            }
          }
        }
      }
    }
  }

}
.d-multi-image-upload-editor-container .new-content-editor{
  .el-input-group__append{
    right: 96px !important;
    height: 35px !important;
    .el-input{
      height: 35px !important;
    }
    .el-input__inner{
      max-width: 60px !important;
      padding: 0 !important;
      padding-left: 20px !important;
      height: 35px !important;
    }
    .el-select-dropdown__item{
      width: 92px !important;
      height: 35px !important;
    }
    i{
      line-height: 35px !important;
    }
  }
  .image-size-wrap{
    display: flex;
    .text{
      padding: 0 3px;
      color: #666666;
    }
    .el-input{
      max-width: 65px;
    }
    .el-input__inner{
      max-width: 65px !important
    }
  }
  .el-form-item{
    .append-text{
      display: block;
      line-height: 12px;
      padding-top: 10px;
      padding-left: 0;
      color: #999999;
    }
  }
}
</style>
