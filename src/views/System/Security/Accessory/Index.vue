<template>
  <section class="security-accessory-index-container">
    <base-header v-bind="headers"
      v-on:handleCreate="handleHeaderCreate"
      v-on:handleDelete="handleHeaderDelete"
    />
    <base-table
      v-bind="list"
      v-on:handleSelectionChange="handleSelectionChange"
      v-on:handleSizeChange="handleSizeChange"
      v-on:handleCurrentChange="handleCurrentChange"
      v-on:handleDelete="handleTableDelete"
    ></base-table>
    <form-dialog
      ref="addDialog"
      :loading="addFormLoading"
      :form="addForm"
      :rules="addRules"
      :formItems="addFormItems"
      v-on:handleConfirm="handleConfirmAdd"
    ></form-dialog>
    
  </section>
</template>

<script>
import baseHeader from '@/components/mixins/baseHeader'
import baseTable from '@/components/mixins/baseTable'
import formDialog from '@/components/mixins/formDialog'

import { mapState, mapActions, mapGetters } from 'vuex'
const columns = [
  {
    prop: 'name',
    label: 'system.security.name',
    scopeType: 'link',
    href: '/system/security/accessory/detail'
  },
  {
    prop: 'grade',
    label: '等级'
  }
]
export default {
  name: 'securityAccessoryIndex',
  mixins: [baseHeader, baseTable, formDialog],
  components: {
    // serDig
    
  },
  data () {
    return {
      allType: false,
      titleDig: '',
      predictionTimeConsuming: 0,
      secretCode: '',
      requestStatus: 1,
      secretData: {},
      secretdig: false,
      list: {
        columns,
        api: 'fetchSysSecretList',
        params: {
          secretType: 2
        },
        handleColumn: [
          {
            type: 'Delete',
            name: 'global.delete',
            icon: 'delete',
            disabled: !this._checkPermission('/secrets', 'DELETE')
          }
        ],
        handleColumnProp: {
          label: 'global.handle',
          align: 'left'
        }
      },
      headers: {
        buttons: [
          {
            type: 'Create',
            text: 'global.create',
            icon: 'xinjian',
            disabled: !this._checkPermission('/secrets', 'POST')
          },
          {
            type: 'Delete',
            text: 'global.delete',
            icon: 'delete',
            disabled: !this._checkPermission('/secrets', 'DELETE')
          }
        ],
        title: '',
        showAlertIcon: false,
        paddingBottom: '10px'
        // content: 'system.security.handleDesc3'
      },
      addFormLoading: false,
      addForm: {
        name: '',
        grade: ''
      },
      addFormItems: [
        {
          prop: 'name',
          label: 'system.security.name',
          placeholder: 'system.security.namePlaceholder',
          maxlength: 50
        },
        {
          prop: 'grade',
          label: '等级',
          placeholder: '请输入大于0的整数',
          maxlength: 6,
          popoverText: '数字越大，等级越高',
          popoverWidth: '120'
        }
      ]
    }
  },
  computed: {
    ...mapState('system', ['reflushSecurityAccessory']),
    ...mapGetters(['setting']),
    // 是否开启内容密级
    openAttachmentSecurity () {
      const { openAttachmentSecurity } = this.setting.attrs || {}
      return openAttachmentSecurity
    },
    // 是否开启内容密级
    openContentSecurity () {
      const { openContentSecurity } = this.setting.attrs || {}
      return openContentSecurity
    },
    addRules () {
      return {
        name: [
          this.$rules.required(),
          {
            validator: (rule, value, callback) => {
              if (value) {
                var params = {
                  name: value,
                  secretType: 2
                }
                this.$request.fetchSysSecretCheck(params).then(res => {
                  if (res.code === 200 && res.data) {
                    callback()
                  } else {
                    callback(new Error('密级名称不能重复'))
                  }
                })
              }
            },
            trigger: 'blur'
          }
        ],
        grade: [this.$rules.required(), this.$rules.moreThanZeroNumber()]
      }
    }
  },
  methods: {
    ...mapActions('system', ['ReflushSecurityAccessory', 'FetchAccessorySecurityOptions']),
    // 表格操作按钮
    handleTableDelete (row, index) {
      this.titleDig = '为保证数据安全,删除附件密级后建议重置所有附件的密级,是否删除后立即重置?'
      if (this.openAttachmentSecurity === '0' || this.openContentSecurity === '0') {
        this._confirmDelete().then(() => {
          this.fetchSysSecretDelete([ row.id ], this.requestStatus)
        })
      } else {
        this.secretData = row
        this.fetchSysSecretDelete([ row.id ], this.requestStatus)

      }
    },
    // 顶部操作按钮
    handleHeaderCreate () {
      this.$refs.addDialog.showDialog()
    },
    handleHeaderDelete () {
      this.allType = true
      let type = 1
      this.titleDig = '为保证数据安全,删除附件密级后建议重置所有附件的密级,是否删除后立即重置?'
      if (this.list.selectedKeys.length) {
        if (this.openAttachmentSecurity === '0' || this.openContentSecurity === '0') {
          this._confirmDelete().then(() => {
            this.fetchSysSecretDelete(this.list.selectedKeys, type)
          })
        } else {
          this.fetchSysSecretDelete(this.list.selectedKeys, type)

        }
      } else {
        this._messageOne()
      }
    },
    handAllDeleteData (type) {
      this.fetchSysSecretDelete(this.list.selectedKeys, type)
    },
    handleConfirmAdd (data, btn) {
      this.addFormLoading = true
      data.secretType = this.list.params.secretType
      this.$request.fetchSysSecretCreate(data).then(res => {
        if (res.code === 200) {
          this.$restBack(res, () => {
            this.fetchTableApi()
          })
          this.FetchContentSecurityOptions(true)
        }
        this.addFormLoading = false
      }).catch(() => {
        this.addFormLoading = false
      })
    },
    // 发送请求事件
    fetchSysSecretDelete (ids, requestStatus) {
      this.requestStatus = requestStatus
      let that = this
      this.list.loading = true
      this.$request.fetchSysSecretDelete({ secretIds: ids, type: 2, requestStatus: this.requestStatus }).then(res => {
        if (res.code === 200) {
          
          that.$restBack(res, () => {
            that.fetchTableApi()
          })
          that.FetchContentSecurityOptions(true)
        } else {
          
        }
      }).then(this.hideTableLoading)
        .catch(this.hideTableLoading)
    },
    fetchTableCallBack (res) {
      if (res.code === 200) {
        this.list.data = res.data.content
        this.list.totalCount = res.data.totalElements
      }
    }
  },
  activated () {
    if (this.reflushSecurityAccessory) {
      this.fetchTableApi()
      this.ReflushSecurityAccessory(false)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
