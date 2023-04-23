<template>
  <section class="password-dialog-container">
    <form-dialog
      title="修改密码"
      ref="updateDialog"
      :loading="updateFormLoading"
      :form="updateForm"
      :rules="updateRules"
      :formItems="updateFormItems"
      :buttons="updateButtons"
      :handleClose="handleClose"
      @handleConfirm="handleConfirmUpdate"
    ></form-dialog>
  </section>
</template>
<script>
import formDialog from '@/components/mixins/formDialog'
import { loginType } from '@/utils/index'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'PasswordDialog',
  mixins: [formDialog],
  props: {
    //   showClose:{
    //       type:Boolean,
    //       default:false
    //   }
  },
  data () {
    var pswRepeat = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.updateForm.psw) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    var passoword = async (rule, value, callback) => {
      if (value === '') {
        callback()
      } else {
        let psw = await loginType(value)
        var params = {
          psw: psw,
          username: this.user.userName
        }
        await this.$request.fetchSysPwdUnique(params).then(res => {
          if (res.code === 200) {
            if (res.data === true) {
              callback()
            } else {
              callback(new Error(res.message))
            }
          } else {
            callback(new Error(res.message))
          }
        })
      }
    }
    var IsEqually = (rule, value, callback) => {
      if (value && value === this.updateForm.oldpsw) {
        callback(new Error('新密码与旧密码不允许相同'))
      } else {
        callback()
      }
    }
    var IsEqually2 = (rule, value, callback) => {
      if (value === '') {
        callback()
      } else {
        if (this.setting.attrs.passIsEqually === '0') {
          if (this.updateForm.psw === this.user.userName) {
            callback(new Error('密码与用户名不允许相同'))
          }
          callback()
        } else {
          callback()
        }
      }
    }
    /* global-weak-pwd start */
    var IsEqually3 = async (rule, value, callback) => {
      let that = this
      if (value === '') {
        callback()
      } else {
        if (that.setting.attrs.weakCipherOpen === '1') {
          let res = await that.$request.fetchUsersGetCipherWeak({ psw: that.$encode(value) })
          if (res.code === 200) {
            if (res.data) {
              that.updateButtons[0].disabled = false
              callback()
            } else {
              if (that.setting.attrs.weakCipherProcess === '1') {
                that.updateButtons[0].disabled = true
                callback(new Error('请输入安全系数更高的密码。建议您使用字母、数字和特殊符号的组合'))
              } else {
                that.updateButtons[0].disabled = false
                if (!that.updateForm.psw2) {
                  that.$message.closeAll()
                  that.$message.warning('当前密码安全系数较低。建议您使用字母、数字和特殊符号的组合')
                }
                callback()
              }
            }
          } else {
            callback(new Error(res.message))
          }
        } else {
          callback()
        }
      }
    }
    /* global-weak-pwd end */
    return {
      updateFormLoading: false,
      updateRules: {
        oldpsw: [
          this.$rules.required()
        ],
        psw: [
          this.$rules.required(),
          /* global-weak-pwd start */
          { validator: IsEqually3, trigger: 'blur' },
          /* global-weak-pwd end */
          { validator: passoword, trigger: 'blur' },
          { validator: IsEqually, trigger: 'blur' },
          { validator: IsEqually2, trigger: 'blur' }
        ],
        psw2: [
          this.$rules.required(),
          { validator: pswRepeat, trigger: 'blur' }
        ]
      },
      updateForm: {
        oldpsw: '',
        psw: '',
        psw2: ''
      },
      updateFormItems: [
        {
          prop: 'oldpsw',
          label: '原密码',
          type: 'password',
          maxlength: 50,
          placeholder: '请输入您的原密码'
        },
        {
          prop: 'psw',
          label: '密码',
          type: 'password',
          maxlength: 50,
          placeholder: '请输入您的密码'
        },
        {
          prop: 'psw2',
          label: '重复密码',
          type: 'password',
          maxlength: 50,
          placeholder: '请再次输入您的密码'
        }
      ],
      updateButtons: [
        {
          text: '保存',
          type: 'Submit'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['user', 'setting']),
    needChangePassword () {
      return localStorage.needchangepassword
    }
  },
  watch: {
    'needChangePassword' (newData) {
      if (newData && !this.$refs.updateDialog.dialogVisible) {
        this.$refs.updateDialog.showDialog()
      }
    }
  },
  methods: {
    ...mapActions('app', ['SetNeedChangePassword', 'fetchSetting']),
    showDialog () {
      this.fetchSetting()
      this.$refs.updateDialog.showDialog()
    },
    handleClose (done) {
      if (this.needChangePassword) {
        this.$message.error('请修改密码')
      } else {
        done()
      }
      this.$emit('handleClosePassword')
    },
    async handleConfirmUpdate (data, btn) { // 密码重置
      this.updateFormLoading = true
      let params = {}
      params.oldpsw = await loginType(data.oldpsw)
      params.psw = await loginType(data.psw)
      this.$message.closeAll()
      await this.$request.fetchAdminPsw(params).then(res => {
        if (res.code === 200) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.SetNeedChangePassword()
          this.$emit('handleSubmit')
        }
        this.updateFormLoading = false
      }).catch(() => {
        this.updateFormLoading = false
      })
    }
  },
  mounted () {
    if (this.needChangePassword && !this.$refs.updateDialog.dialogVisible) {
      // this.$refs.updateDialog.showDialog()
    }
  }
}
</script>
