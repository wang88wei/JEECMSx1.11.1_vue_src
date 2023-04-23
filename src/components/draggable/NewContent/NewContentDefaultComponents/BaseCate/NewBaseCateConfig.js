import common from '@/components/draggable/common'

export default {
  ...common,
  icon: 'jia',
  type: 'baseCate',
  // 1手机号2邮箱3座机号4真实姓名5生日6性别7地址8组织9年龄10身份证号11城市12传真
  name: '基础分类',
  // 字段名称
  groupType: '', // 基础、扩展、SEO
  // 分组类型
  groupIndex: 30,
  // 分组排序 左侧拖动区顺序
  isCustom: false,
  // 是否自定义字段
  index: 1,
  disableFields: ['label', 'name'],
  hiddenFields: ['isRequired'],
  // 排序
  preview: 'NewBaseCatePreview',
  editor: 'NewBaseCateEditor',
  value: {
    defaultValue: [], // 默认值
    label: '基础分类', // 字段名称
    name: 'baseCate', // 标签名称
    tip: '', // 帮助信息
    isIncludeVirtual: false, // 是否包含虚拟组织
    isRegister: false, // 是否应用到注册
    isRequired: false // 是否必填
  }
}
