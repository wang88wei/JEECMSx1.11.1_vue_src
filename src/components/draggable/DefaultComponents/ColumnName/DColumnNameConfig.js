import common from '@/components/draggable/common'

export default {
  ...common,
  canDelete: false,
  icon: 'jia',
  type: 'columnName',
  name: '栏目名称',
  // 字段名称
  groupType: '', // 基础、扩展、SEO
  // 分组类型
  groupIndex: 2,
  // 分组排序 左侧拖动区顺序
  isCustom: false,
  // 是否自定义字段
  index: 1,
  // 排序
  preview: 'DColumnNamePreview',
  editor: 'DColumnNameEditor',
  hiddenFields: ['placeholder', 'rules'],
  disableFields: ['label', 'name', 'isRequired'],
  value: {
    defaultValue: '', // 默认值
    label: '栏目名称', // 字段名称
    name: 'channelName', // 标签名称
    placeholder: '请输入内容', // 默认提示文字
    tip: '', // 帮助信息
    isLengthLimit: true, // 是否字数限制
    min: '', // 最小长度
    max: 50, // 最大长度
    isInputLimit: true, // 是否输入限制
    inputLimit: 'cnEnNumSymbol', // 限制类型
    isRequired: true // 是否必填
  }
}
