import common from '@/components/draggable/common'

export default {
  ...common,
  icon: 'xingming',
  type: 'realname',
  // 1手机号2邮箱3座机号4真实姓名5生日6性别7地址8组织9年龄10身份证号11城市12传真
  name: '真实姓名',
  // 字段名称
  groupType: 'input', // 基础、扩展、SEO
  // 分组类型
  groupIndex: 9,
  // 分组排序 左侧拖动区顺序
  isCustom: true,
  // 是否自定义字段
  index: 9,
  // 排序
  preview: 'SRealNamePreview',
  editor: 'SRealNameEditor',
  value: {
    defaultValue: '', // 默认值
    label: '真实姓名', // 字段名称
    name: 'realname', // 标签名称
    placeholder: '请输入真实姓名', // 默认提示文字
    tip: '', // 帮助信息
    isLengthLimit: true, // 是否字数限制
    min: '', // 最小长度
    max: '120', // 最大长度
    isInputLimit: false, // 是否输入限制
    inputLimit: '', // 限制类型
    isRegister: false, // 是否应用到注册
    isRequired: false, // 是否必填
    width: 80
  }
}
