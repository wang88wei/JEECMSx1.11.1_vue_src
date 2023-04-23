import common from '@/components/draggable/common'

export default {
  ...common,
  icon: 'jia',
  type: 'select',
  // 1文本2多行文本 3单选 4多选 5下拉 6日期 7单图上传 8多图上传 9视频上传 10音频上传 11附件上传 12富文本 13组织 14地址 15城市
  name: '是否有效',
  // 字段名称
  groupType: '', // 基础、扩展、SEO
  // 分组类型
  groupIndex: 28,
  // 分组排序 左侧拖动区顺序
  isCustom: false,
  // 是否自定义字段
  index: 2,
  disableFields: ['label', 'name'],
  hiddenFields: ['options', 'isRequired'],
  // 排序
  preview: 'NewDEffectivePreview',
  editor: 'NewDEffectiveEditor',
  value: {
    defaultValue: '01', // 默认值
    label: '是否有效', // 字段名称
    name: 'indexNumberIsValid', // 标签名称
    tip: '索引号中“01”表示有效,“02”表示失效', // 帮助信息
    options: [
      {
        value: '01',
        label: '有效'
      },
      {
        value: '02',
        label: '失效'
      }
    ],
    isOtherOption: false,
    isOtherOptionRequired: false,
    otherOption: {
      value: 999,
      label: '其他'
    },
    isRegister: false, // 是否应用到注册
    isRequired: false // 是否必填
  }
}
