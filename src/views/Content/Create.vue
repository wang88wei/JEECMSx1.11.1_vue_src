<script>
import moment from 'moment'
import Detail from './Detail'
import { deepClone } from '@/utils'
export default {
  extends: Detail,
  name: 'contentCreate',
  provide () {
    return {
      changeColumn: ''
      // changeCurrentTab: ''
    }
  },
  data () {
    return {
      excludeList: ['imageUpload', 'singleImage', 'audioUpload', 'videoUpload', 'fileUpload'],
      bttons: [
        {
          name: '1',
          label: '存为初稿',
          icon: 'baocun',
          disabled: !this._checkPermission('/contentext', 'PUT')
        },
        {
          name: '2',
          label: '发布',
          icon: 'fabu',
          disabled: !this._checkPermission('/contentext', 'PUT')
        },
        {
          name: '3',
          label: '存为草稿',
          icon: 'cunweicaogao',
          disabled: !this._checkPermission('/contentext', 'PUT')
        },
        {
          name: '12',
          label: '提交审核',
          icon: 'shenhe',
          disabled: !this._checkPermission('/contentext', 'PUT')
        }
      ],
      handleHeaders: [],
      channelDefault: {}
    }
  },
  methods: {
    moment,
    handleSubmit (e, btn) {
    //   console.log(btn)
      this.$refs.form.validate(valid => {
        if (valid) {
          let params = this.getFormData
          params.tplMobile = this.$encode(params.tplMobile)
          params.tplPc = this.$encode(params.tplPc)
          if (params.outLink) {
            params.outLink.outLink = this.$encode(params.outLink.outLink)
          }
          if (params.contentSourceId) {
            params.contentSourceId.sourceLink = this.$encode(params.contentSourceId.sourceLink)
          }
          // 获取正文对象
          let keys = this.getContentKeys()
          if (params.json) {
            Object.keys(params.json).forEach(t => {
              if (keys.indexOf(t) > -1) {
                params.json[t] = this.$encode(params.json[t])
              }
            })
          }

          // console.log(params)
          this.loading = true
          this.$request.fetchContentCreate(params).then(res => {
            if (res.code === 200) {
              if (res.data === 10) {
                let _this = this
                this.examineObj = {
                  title: '',
                  icon: '',
                  text: '智能审核中，请稍后...',
                  visible: true,
                  showClose: false
                }
                setTimeout(function () {
                  _this.examineObj.visible = false
                  _this.removeTab(_this.$route.fullPath)
                  _this.$routerLink('/content/index', 'audit')
                }, 2000)
              } else {
                this._messageSuccess('create')
                this.removeTab(this.$route.fullPath)
                this.$routerLink('/content/index', 'list')
              }
            } else if (res.code === 10555) {
              this.$confirm('顺序号已到最大位数，请在系统设置-内容配置中重设顺序号位数', '提示', {
                confirmButtonText: '我知道了',
                showCancelButton: false,
                type: 'warning'
              }).then(() => {}).catch(() => {})
            }
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    setChannelDefault (channelId) {
      if ('viewControl' in this.form || 'allowComment' in this.form) {
        if (channelId) {
          this.$request.fetchChannelDefaults(channelId).then(res => {
            if (res.code === 200) {
              this.channelDefault = res.data
              if ('viewControl' in this.form) {
                this.form.viewControl = res.data.viewControl === 1 ? 1 : 2
              }
              if ('allowComment' in this.form) {
                this.form.allowComment = res.data.allowComment
              }
            }
          })
        } else {
          this.form.viewControl = this.channelDefault.viewControl === 1 ? 1 : 2
          this.form.allowComment = this.channelDefault.allowComment
        }
      }
    },

    detailResetData (list) {
      let data = deepClone(list)
      let excludeList = ['content', ...this.excludeList]
      // 去除多余数组
      // 返回空数据[[]]时会报异常
      let RowList = data.filter(d => d[0].length > 0).map((d) => {
        // 判断是否有多数组
        if (d.length > 1) {
          let list = []
          d.forEach(item => {
            // 判断是否有多个数据并且是需要合并的
            if (item.length > 1 && excludeList.indexOf(item[0].type) !== -1) {
              let obj = {
                type: item[0].type,
                index: item[0].index,
                name: item[0].name,
                list: item,
                canDelete: item[0].canDelete,
                value: {
                  name: item[0].value.name
                }
              }
              list.push([obj])
            } else {
              list.push([item[0]])
            }
          })
          return list
        } else if (excludeList.indexOf(d[0][0].type) !== -1) {
          let obj = {
            type: d[0][0].type,
            index: d[0][0].index,
            name: d[0][0].name,
            list: d[0],
            value: {
              name: d[0][0].value.name
            }
          }
          return obj
        } else {
          return d[0][0]
        }
      })
      // console.log('数据过滤')
      return RowList
    }
  },
  watch: {
    'form.channelId': function (newData) {
      this.setChannelDefault(newData)
    },
    sourceObj (val) {
      this.detail.dataField.contentSourceId = val
      this.setForm()
    }
  }
}
</script>
