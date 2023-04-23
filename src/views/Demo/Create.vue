<template>
  <section class="user-detail-container">
    <base-header v-bind="headers"
      v-on:handleBack="handleBack"
      v-on:handleLink="handleHeaderLink"
      v-on:handleReset="handleHeaderReset"
      v-on:handleDelete="handleHeaderDelete"
    />
    <base-form
      v-bind="form"
      v-on:handleConfirm="handleConfirm"
    ></base-form>

    <msg-dialog
          v-bind="msgDialog"
          v-on:handleConfirm="fetchSysUsersDelete"
          v-on:handleCancel="hideMsgDialog"
    />

  </section>

</template>
<script>
import user from './user'

export default {
  name: 'demoCreate',
  mixins: [user],
  data () {
    return {
      backUrl: '/demo/demo/index',
      statusType: false,
      headers: {
        buttons: [

        ],
        showAlertIcon: false
      },
      form: {
        api: 'getAllUserList',
        params: {
          id: ''
        },
        form: {
          'id': '',
          'name': '',
          'age': ''
        },
        formItems: [
          {
            prop: 'name',
            label: '姓名：',
            maxlength: 50,
            placeholder: '请输入您的姓名'
          },
          {
            type: 'select',
            prop: 'age',
            label: '年龄：',
            optionLabel: 'id',
            optionValue: 'name',
            placeholder: '请选择',
            options: [],
            disabled: false
          },
          {
            prop: 'sysImgId',
            label: '头像：',
            type: 'imageUpload',
            imgType: 'System',
            urlProp: 'sysImgUrl',
            option: {
              desc: '(请上传jpg, png, gif, bmp, jpeg格式的图片)',
              autoUpload: false,
              width: 110,
              height: 22
            }
          }

        ],
        rules: {
          name: [
            this.$rules.required()
          ],
          age: [
            this.$rules.required()
          ]

        },
        submitBtns: [{
          text: '保存',
          subType: 'submit',
          disabled: !this._checkPermission('/users', 'PUT')
        }]
      }
    }
  },
  inject: ['removeTab'],
  methods: {

    isShowPreview (preview) {
      return this.getPreviews.indexOf(preview) > -1
    },
    // 发送请求事件
    fetchSysUsersDelete (ids, type) {
      var params = {
        'ids': this.msgDialog.data,
        'type': this.type
      }
      this.$request.fetchSysUsersDelete(params).then(res => {
        if (res.code === 200) {
          // this.fetchFormApi()
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          this.type = 1
          setTimeout(() => {
            this.$routerLink(this.backUrl, 'list')
          }, 500)
        } else if (res.code === 14023) {
          this.type = 2
        }
        this.hideMsgDialog()
      })
    },
    handleHeaderReset (data, btn) {
      this.updateForm.username = this.form.form.username
      this.updateForm.id = this.form.form.id
      this.fetchSetting()
      this.$refs.updateDialog.showDialog()
    },
    // 顶部操作按钮
    handleHeaderDelete () {
      this.msgDialog.type = 'Delete'
      this.msgDialog.content = '是否确定删除所选用户？'
      this.msgDialog.data = [this.form.form.id]
      this.showMsgDialog()
    },
    async handleConfirm (data) {
      this.$request.updateUser(data).then(res => {
        if (res.code === 200) {
          this.fetchTableApi()
          this.$router.push({ name: 'demoIndex', query: { } })
          this.$message({
            message: '修改成功',
            type: 'success'
          })
        }
        this.hideFormLoading()
      }).catch(this.hideFormLoading)
    },

    fetchFormCallBack (res) {
      if (res.code === 200) {
        let managerAble = res.data.managerAble
        if (!managerAble) {
          this.headers.buttons.forEach(v => {
            v.disabled = true
          })
          if (this.user.userName === res.data.username) {
            this.form.formItems.find(d => d.prop === 'orgids').disabled = true
            this.form.formItems.find(d => d.prop === 'roleid').disabled = true
            this.form.formItems.find(d => d.prop === 'enabled').disabled = true
          } else {
            this.form.submitBtns.forEach(v => {
              v.disabled = true
            })
          }
        } else {
          this.headers.buttons.forEach(v => {
            v.disabled = false
          })
          this.form.submitBtns.forEach(v => {
            v.disabled = false
          })
        }
        this.form.form = Object.assign({}, this.form.form, res.data)
        this.form.form.roleid = res.data.roleIds
        this.form.form.orgid = res.data.orgId
        this.form.form.realname = (res.data.userExt && res.data.userExt.realname) ? res.data.userExt.realname : ''
        this.form.form.telephone = (res.data.userExt && res.data.userExt.linephone) ? res.data.userExt.linephone : ''
        this.form.form.usePhone = res.data.telephone
        this.form.form.orgids = (res.data.org && res.data.org.nodeIds) ? res.data.org.nodeIds : []
        console.log(!res.data.userSecretId && this.isDisFenBao)
        this.form.formItems.find(d => d.prop === 'enabled').disabled = (!res.data.userSecretId && this.isDisFenBao) || !res.data.deleteAble
        this.form.formItems.find(d => d.prop === 'orgids').disabled = !res.data.notCurrUser
        this.form.formItems.find(d => d.prop === 'roleid').disabled = !res.data.notCurrUser
        this.headers.buttons.find(d => d.type === 'Reset').disabled = !res.data.deleteAble
        this.headers.buttons.find(d => d.type === 'Delete').disabled = !res.data.deleteAble
        this.form.submitBtns.find(d => d.subType === 'submit').disabled = !res.data.managerAble
        this.getTreeData()
      }
    },
    getTreeData () {
      if (!this.form.form.orgids || !this.form.form.orgids.length) {
        var options = [{
          name: '无',
          id: 'parent'
        }]
        this.form.formItems.find(d => d.prop === 'orgids').options = options
        this.form.form.orgids = ['parent']
      } else {
        this.form.formItems.find(d => d.prop === 'orgids').options = this.organizeOptions
      }
      // 角色
      this.form.formItems[2].options = this.roleOptions
      // 人员密级
      if (this.openContentSecurity === '1') {
        this.form.formItems[3].options = this.userSecurityOptions
      } else {
        this.form.formItems[3].hiddenKey = 'hiddenKey'
        this.form.formItems[3].hiddenValue = 'hiddenValue'
      }
    },
    async getUserData () {
      const { id } = this.$route.query
      if (id) {
        this.form.params.id = id
        await this.$request.getAllUserList({ page: 1, size: 10, id: id }).then(res => {
          if (res.code === 200) {
            let user = res.data.content[0]
            this.form.form.id = user.id
            this.form.form.name = user.name
            this.form.form.age = user.age
          }
        }).catch(() => {})
      }
    },
    // 开启双因子- 判断是否开启双因子
    getElementStatusData () {

    }
  },
  mounted () {
    this.$nextTick(() => {
      this.getElementStatusData()

      let ageArr = []

      for (let i = 0; i <= 100; i++) {
        ageArr.push({ id: i, name: i })
      }
      this.form.formItems[1].options = ageArr
      this.getUserData()
    })
  },
  watch: {
    '$route': function (newRoute, oldRoute) {
      this.headers.buttons.find(v => v.type === 'Link').params.id = newRoute.query.id
      if (newRoute.name === 'userCreate') {
        this.getUserData()
      }
    },
    roleOptions (newVal) {
      this.form.formItems[2].options = newVal
    },
    organizeOptions (newVal, oldVal) {
      if (newVal) {
        this.getTreeData()
      }
    }
  }
}
</script>

<style lang="scss">
.user-index-container{
  .el-dialog__body:hover::-webkit-scrollbar,.scrollbar:hover::-webkit-scrollbar{
    display: none;
  }
  .box-items{
      padding: 0 9px;
    }
}

</style>
