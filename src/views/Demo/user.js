import baseHeader from '@/components/mixins/baseHeader'
import searchHeader from '@/components/mixins/searchHeader'
import baseTable from '@/components/mixins/baseTable'
import selectTable from '@/components/mixins/selectTable'
import baseForm from '@/components/mixins/baseForm'
import msgDialog from '@/components/mixins/msgDialog'
import formDialog from '@/components/mixins/formDialog'
import { loginType } from '@/utils/index'
import { mapGetters, mapActions } from 'vuex'

export default {
  mixins: [baseHeader, baseTable, msgDialog, formDialog, searchHeader, baseForm, selectTable],
  data () {
    return {
      isDisFenBao: false,
      openSecurity: null,
      updateFormLoading: false,
      updateForm: {
        'username': '',
        'psw': '',
        'psw2': '',
        'id': '',
        'enabled': ''
      },
      updateRules: {

      },
      updateFormItems: [
        {
          prop: 'username',
          label: '用户名',
          maxlength: 20,
          type: 'text'
        },
        {
          prop: 'psw',
          label: '密码',
          type: 'password',
          maxlength: 50,
          autocomplete: 'off',
          placeholder: '请输入您的密码'
        },
        {
          prop: 'psw2',
          label: '重复密码',
          type: 'password',
          autocomplete: 'off',
          placeholder: '请再次输入您的密码'
        }
      ],
      updateButtons: [
        {
          text: '保存',
          type: 'Submit'
        }
      ],
      addFormLoading: false,
      addForm: {
        'id': '',
        'name': '',
        'age': ''
      },
      addButtons: [
        {
          text: '保存',
          type: 'Submit'
        }
      ],
      addRules: {
        name: [
          this.$rules.required()
        ],
        age: [
          this.$rules.required()
        ]
      },
      addFormItems: [
        {
          prop: 'name',
          label: '姓名',
          maxlength: 50,
          fixed: 'left',
          placeholder: '请输入您的姓名'
        },
        {
          prop: 'age',
          label: '年龄',
          maxlength: 20,
          placeholder: '请输入您的年龄'
        }

      ],
      type: 1

    }
  },
  methods: {
    ...mapActions('app', ['fetchSetting']),
    ...mapActions('system', ['FetchUserSecurityOptions', 'FetchOrganizeOptions', 'FetchRoleOptions']),

    handleSelectKeyChange (data) {
      // let isDisabled = false
      let show = false
      var ids = data.map(v => {
        // if (!v.deleteAble) {
        //   isDisabled = true
        // }
        // console.log(this.isDisFenBao && !v.userSecretName)
        if (this.isDisFenBao && !v.userSecretName) {
          show = true
        }
        return v[this.list.rowKey]
      })
      console.log(show)
      // this.headers.buttons.find(t => t.type === 'Enable').disabled = show || !this._checkPermission('/users/on', 'POST') || isDisabled
      // this.headers.buttons.find(t => t.type === 'Disable').disabled = show || !this._checkPermission('/users/off', 'POST') || isDisabled
      // this.headers.buttons.find(t => t.type === 'Delete').disabled = !this._checkPermission('/users', 'DELETE') || isDisabled
      this.list.selectedKeys = ids
    },
    // 新增并分配权限
    handleConfirmRole (data, btn) {
      this.handleConfirmAdd(data, btn, 'role')
    },
    async handleConfirmUpdate (data, btn) { // 密码重置
      this.updateFormLoading = true
      var params = data
      params.psw = await loginType(data.psw)
      delete params.psw2
      delete params.username
      this.$request.fetchSysUsersPwd(params).then(res => {
        if (res.code === 200) {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          if (this.list) {
            this.fetchTableApi()
          } else {
            // this.fetchaFormApi()
          }
        }
        this.updateFormLoading = false
      }).catch(() => {
        this.updateFormLoading = false
      })
    },
    async handleConfirmAdd (data, btn, type) { // 新增用户
      await this.$request.insertUser(data).then(res => {
        if (res.code === 200) {
          this.$message({
            message: '操作成功',
            type: 'success'
          })

          this.fetchTableApi()
        }
        this.addFormLoading = false
      }).catch(() => {
        this.addFormLoading = false
      })
    },
    // 开启双因子- 判断是否开启双因子
    getElementStatusData () {

    }

  },
  /* 分级管理 start */
  activated () {

  },
  /* 分级管理 end */
  mounted () {
    this.getElementStatusData()
  },
  watch: {
    reinsuranceShow (newVal) {
      this.setDis()
    }
  },
  computed: {
    // 获取系统设置项
    ...mapGetters('system', ['reinsuranceShow']),
    ...mapGetters(['setting', 'system', 'user', 'organizeOptions', 'roleOptions']),
    openContentSecurity () {
      const { openContentSecurity } = this.setting.attrs || {}
      return openContentSecurity
    },
    userSecurityOptions () {
      return this.system.userSecurityOptions
    }
  }
}
