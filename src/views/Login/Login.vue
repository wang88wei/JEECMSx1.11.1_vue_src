<template>
  <section class="login-container">
    <div class='login-wrap'>
      <div class="img-wrap">
        <img :src="$getPath(loginImg)" fit="contain"/>
      </div>
      <div class="form-wrap">
        <el-form
          ref="form"
          :model="form"
          :rules='rules'
        >

          <el-form-item prop='identity'>
            <el-input v-model="form.identity" :autofocus="true" placeholder="请输入您的用户名"  @focus="onFocusUsername" @blur="onBlurUsername" @keyup.enter.native="handleConfirm" :class="{'is-focus': focus === 'username'}">
              <jee-icon iconClass='denglutouxiang' slot="prefix"/>
            </el-input>

          </el-form-item>
          <el-form-item prop='desStr'>
            <el-input v-model="form.desStr" :show-password="showPassword" placeholder="请输入您的密码" @focus="onFocusPassword" @blur="onBlurPassword" @keyup.enter.native="handleConfirm" :class="{'is-focus': focus === 'password'}">
              <jee-icon iconClass='denglumima' slot="prefix"/>
              <!-- <jee-icon :iconClass="showPassword?'htmal5icon08':'htmal5icon09'" slot="suffix" @click="showPassword = !showPassword"/> -->
            </el-input>
          </el-form-item>
          <el-form-item prop='captcha' v-if="nextNeedCaptcha">
            <el-input v-model="form.captcha" placeholder="请输入验证码"  @focus="onFocusCaptcha" @blur="onBlurCaptcha" @keyup.enter.native="handleConfirm" :class="{'is-focus': focus === 'captcha'}">
              <jee-icon iconClass='yanzhengma' slot="prefix"/>
              <img :src="captchaSrc" alt="" slot="suffix" @click="fetchCaptcha">
            </el-input>
          </el-form-item>

          <el-form-item>
            <div class='submit' @click="handleConfirm">
              <span class='loading' v-if='loading'>
                <jee-icon iconClass='jiazaizhong'/>
              </span>
              <span v-if='loading' class='logining'>登录中...</span>
              <span v-else>登录</span>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <password-dialog
      ref="passwordDialog"
      @handleSubmit="handleSubmit"
    ></password-dialog>
  </section>
</template>
<script>
import PasswordDialog from '@/components/dialog/PasswordDialog'
import { loginType, desDecrypt } from '@/utils'

import {
  mapActions, mapGetters
} from 'vuex'

export default {
  name: 'login',
  components: {
    PasswordDialog
  },
  data () {
    return {
      codeNum: 60, // 开启双因子-保存倒计时
      codeType: false, // 开启双因子- 判断验证码和倒计时
      codeSHowHide: false, // 开启双因子- 判断是否绑定手机
      loginImg: '',
      loading: false,
      showPassword: true,
      nextNeedCaptcha: false,
      captchaSrc: '',
      focus: '',
      form: {
        identity: '',
        desStr: '',
        captcha: '',
        sessionId: '',
        codeMessage: ''
      },

      rules: {
        identity: [
          this.$rules.required()
        ],
        desStr: [
          this.$rules.required()
        ],
        captcha: [
          this.$rules.required()
        ]
      }
    }
  },
  computed: {
    ...mapGetters('system', ['reinsuranceShow'])
  },
  methods: {
    loginType,
    desDecrypt,
    ...mapActions('app', ['fetchLogin']),

    onFocusUsername () {
      this.focus = 'username'
    },
    onBlurUsername () {
      this.focus = ''
    },
    onFocusPassword () {
      this.focus = 'password'
    },
    onBlurPassword () {
      this.focus = ''
    },
    onFocusCaptcha () {
      this.focus = 'captcha'
    },
    onBlurCaptcha () {
      this.focus = ''
    },
    fetchCaptcha () {
      this.$request.fetchCode().then(res => {
        if (res.code === 200) {
          this.captchaSrc = 'data:image/jpeg;base64,' + res.data.img
          this.form.sessionId = res.data.sessionId
        }
      })
    },
    handleConfirm () {
      this.$refs.form.validate(valid => {
        if (valid) {
          const data = Object.assign({}, this.form)
          this.handleFetchLogin(data)
        }
      })
    },
    // 判断单点登录
    handleSsoLogin () {
      this.$request.fetchSingleLogin().then(res => {
        if (res.code === 200 && res.data.open) {
          const { loginUrl, appId, appSecret } = res.data
          window.localStorage.setItem('ssoLogin', '1')
          if (loginUrl) {
            window.location.href = `${loginUrl}?id=${escape(appId)}&sec=${escape(appSecret)}&type=1&&origin=${escape(window.location.origin + window.location.pathname + '#/callback')}`
          }
        }
      })
    },
    // 本地登录
    handleFetchLogin (data) {
      this.loading = true
      if (this.codeSHowHide === true) {
        if (!data.codeMessage) {
          this.$message.error('验证码不能为空')
          this.loading = false
          return
        }
      }
      this.fetchLogin(data).then(res => {
        this.loading = false
        if (res.data.nextNeedCaptcha) {
          this.nextNeedCaptcha = true
          this.fetchCaptcha()
        }
        // if (res.data.needChangePassword) {
        //   this.$refs.passwordDialog.showDialog()
        // }
        if (res.code === 200) {
          this.onNavgate()
        } else if (res.code === 504) {
          // 验证码错误
          this.fetchCaptcha()
        }
      }).catch(() => {
        this.loading = false
      })
    },
    handleSubmit () {
      this.onNavgate()
    },
    onNavgate () {
      let { redirect } = this.$route.query
      if (redirect && localStorage.getItem('pageList')) {
        // console.log('重定向到：', redirect)
        this.$router.replace(unescape(redirect)).catch(() => {})
      } else {
        // console.log('重定向到工作台')
        this.$router.replace('/workplace').catch(() => {})
      }
    },
    // 获取登录封面图片
    LoginImgFun () {
      this.$request.fetchRegisterGetImage().then(res => {
        if (res.code === 200) {
          this.loginImg = res.data
        }
      })
    }

  },
  mounted () {
    this.LoginImgFun()
    this.handleSsoLogin()
  }
}
</script>
<style lang="scss">
.login-container{
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color:#F2F6F7;
  .login-wrap{
    width: 973px;
    background-color: #ffffff;
    box-shadow:0px 5px 50px 0px rgba(51,51,51,0.1);
    border-radius:8px;
    display: flex;
    .img-wrap{
      width: 373px;
      height: 540px;
      margin: 15px 0 15px 15px;
      border-radius: 8px 0 0 8px;
      box-shadow:0px 5px 50px 0px rgba(51,51,51,0.1);
      img{
        width: 373px;
        height: 540px;
        display: block;
      }
    }
    .form-wrap{
      padding: 0 80px;
      flex: 1;
      .el-form{
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .el-form-item{
          width: 100%;
          margin-bottom: 50px;
          &:last-of-type{
            margin-top: 25px;
            margin-bottom: 0;
          }
          .el-input{
            .el-input__inner{
              border-width: 0 0 1px 0!important;
              border-radius: 0!important;
              padding: 0 25px!important;
              font-size: 16px;
              &:focus{
                border-color: #4E646E!important;
              }
            }
            .el-input__prefix{
              left: 0;
            }
            .el-input__suffix{
              right: 0;
              cursor: pointer;
              .el-input__clear{
                display: none;
              }
            }
            .jee-svg-icon{
              fill: #AFAFAF;
            }
            &.is-focus,
            .el-input__suffix:hover{
              .jee-svg-icon{
                fill: #4E646E;
              }
            }
          }
          .el-form-item__error{
            left: 25px;
          }
          .submit{
            text-align: center;
            height: 45px;
            line-height: 45px;
            font-size: 18px;
            background-color: #4E646E;
            box-shadow:0px 3px 7px 0px rgba(85,110,121,0.25);
            border-radius:4px;
            cursor: pointer;
            color: #ffffff;
            &:hover{
              background-color: #59737E;
            }
            .logining{
              padding-left: 10px;
            }
            @keyframes rotate {
              from {
                transform: rotate(0);
              }
              to {
                transform: rotate(360deg);
              }
            }
            .loading{
              display: inline-block;
              animation: rotate 1s linear infinite;
              .jee-svg-icon{
                font-size: 20px;
                fill: #ffffff;
              }
            }
          }
          &.is-error .el-input__inner {
            border-color: #e8e8e8;
          }
        }

        .code-butShow{
          color: #4E646E;
        }
        .code-butHide{
          color: #999999;
        }
      }
    }
  }
}
</style>
