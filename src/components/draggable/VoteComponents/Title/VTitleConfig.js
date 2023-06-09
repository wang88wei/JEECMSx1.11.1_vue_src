import common from '@/components/draggable/common'

export default {
  ...common,
  canDelete: false,
  icon: 'jia',
  type: 'title',
  name: '标题',
  // 分组类型
  groupIndex: 7,
  // 分组排序 左侧拖动区顺序
  isCustom: false,
  // 是否自定义字段
  index: 1,
  // 排序
  preview: 'VTitlePreview',
  editor: 'VTitleEditor',
  hiddenFields: [],
  disableFields: ['label', 'name', 'isRequired'],
  value: {
    defaultValue: {
      title: '',
      titleIsBold: true,
      titleColor: '#333333'
    }, // 默认值
    label: '', // 字段名称
    name: 'title', // 标签名称
    placeholder: '这里显示标题最多50个字', // 默认提示文字
    tip: '', // 帮助信息
    isLengthLimit: true, // 是否字数限制
    min: 1, // 最小长度
    max: 50, // 最大长度
    isInputLimit: true, // 是否输入限制
    inputLimit: '', // 限制类型
    isRequired: true, // 是否必填
    titleStyle: {
      fontSize: 24,
      fontWigth: 600,
      fontColor: '#333333',
      fontAlign: 'left'
    }
  }
}
