<template>
  <section class="system-info-auth">
    <div class="auth-box" v-if="showIcon">
      <img class="img" v-if="!authData.trial" @click="showDialog" src="@/assets/img/shouq.png" />
      <img class="img" v-else  @click="showDialog" src="@/assets/img/shiy.png" />
    </div>
     <!-- 授权信息 -->
    <el-dialog
      ref="showDialog"
      width="484px"
      custom-class="info-auth-dialog"
      :visible.sync="showLog"
      :show-close="false"
    >
      <div class="info-auth-wrap">
        <div class="title">授权信息</div>
        <el-alert type="warning" :closable="false" v-if="hasMessage">
          <slot name="title">
            <div class="altTitle">
              <jee-icon iconClass="caozuoshuoming"/>
              温馨提示：
            </div>
            <div class="altDes">{{message}}</div>
          </slot>
        </el-alert>
        <div class="t-flex info">
          <div class="images">
            <img class="img" v-if="!authData.trial" src="@/assets/img/shouq2.png" />
            <img class="img" v-else src="@/assets/img/shiy2.png" />
          </div>
          <div class="cont">
            <p><span>{{authData.productName}} </span><span>{{authData.costPlanName}}</span></p>
            <p><span class="label">授权号： </span><span>{{authData.appid}}</span></p>
            <p v-if="!hasMessage"><span class="label">到期时间： </span><span>{{!authData.forever?authData.deadline:'永久授权'}}</span></p>
          </div>
        </div>
        <!-- 试用版本 -->
        <div class="btns" v-if="authData.trial">
          <el-button class="btn" plain @click="showDialog2">申请续期</el-button>
          <el-button class="btn" type="primary" @click="toBuy">前往购买</el-button>
        </div>
        <!-- 授权版本- -->
        <div class="btns" v-else>
          <!-- <el-button class="btn" plain @click="showMsg">稍后处理</el-button> -->
          <el-button class="btn" plain @click="showLog = false">稍后处理</el-button>
          <el-button class="btn" type="primary" @click="toBuy">{{authData.certType === 1?'联系我们':'前往购买'}}</el-button>
        </div>
        <div class="come">购买授权请访问：&nbsp;&nbsp;<span class="jee-color" @click="toBuy">www.jeecms.com</span></div>
      </div>
    </el-dialog>
    <!-- 申请授权 -->
    <el-dialog
      ref="showDialog2"
      width="484px"
      custom-class="info-auth-dialog"
      :visible.sync="showLog2"
      :show-close="false"
    >
      <div class="info-auth-wrap">
        <div class="title">申请续期</div>
        <div class="t-flex info">
          <div class="images">
            <img class="img" v-if="!authData.trial" src="@/assets/img/shouq2.png" />
            <img class="img" v-else src="@/assets/img/shiy2.png" />
          </div>
          <div class="cont">
            <p><span>{{authData.productName}} </span><span>{{authData.costPlanName}}</span></p>
            <p><span class="label">授权号： </span><span>{{authData.appid}}</span></p>
            <p>{{'试用期将于'+authData.deadline+'结束'}}</p>
          </div>
        </div>
        <div class="popover">选择续期类型
          <jee-popover :popoverText="popoverText" popoverWidth="300"/>
        </div>
        <div class="btns">
          <el-radio-group v-model="userInfo.applyType">
            <el-radio-button class="btn" :label="1" plain
              :class="userInfo.applyType === 1?'jee-color jee-border':''">限期授权</el-radio-button>
            <el-radio-button class="btn" :label="2" plain
              :class="userInfo.applyType === 2?'jee-color jee-border':''">个人非商业用途</el-radio-button>
          </el-radio-group>
        </div>
        <div class="user">
          <el-input size="small" maxlength="20" placeholder="请输入联系人姓名" v-model="userInfo.contactName"></el-input>
          <el-input size="small" maxlength="20" placeholder="请输入联系人电话" v-model="userInfo.contactTel"></el-input>
          <el-button type="primary" @click="toApply"
            :disabled="!userInfo.contactName||!userInfo.contactTel">立即申请</el-button>
        </div>
      </div>
    </el-dialog>
    <el-dialog
      title="系统提示"
      :visible.sync="msgVisible"
      width="320px"
      center>
      <p class="t-title" style="line-height:1.8">{{msgText}}</p>
      <span slot="footer">
        <el-button @click="closeAll">我知道了~</el-button>
        <el-button type="primary" @click="toBuy" v-if="showBuy">前往购买</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
import formDialog from '@/components/mixins/formDialog'
import { mapGetters } from 'vuex'

export default {
  name: 'auth',
  mixins: [formDialog],
  computed: {
    ...mapGetters(['user', 'setting'])
  },
  props: {
    showIcon: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      showLog: false,
      showLog2: false,
      popoverText: '不同授权类型的时长及通过方式不一致，如下：限期授权：免审通过，第一次申请为60天；第二次申请为30天；第三次申请为7天。个人非商业用途：需通过平台审核，第一次申请为60天；第二次申请为30天；第三天申请为7天<br>注：一个授权号申请次数最多2次，申请次数为累加计算，不区分授权类型。',
      userInfo: {
        contactName: '',
        contactTel: '',
        applyType: 1
      },
      hasMessage: false,
      message: '',
      authData: {
        trial: true
      },
      // 提示弹窗
      msgVisible: false,
      msgText: '',
      showBuy: true
    }
  },
  methods: {
    closeAll () {
      this.msgVisible = false
      this.showLog2 = false
      this.showLog = false
    },
    showDialog () {
      this.hasMessage = false
      this.message = ''
      // 试用版本提示
      if (this.authData.certType === 1) {
        this.hasMessage = true
        this.message = '开发环境证书仅用于开发或测试阶段，具有时效性。如需续期或更换请联系我们！'
      }
      // 当前授权到期
      if (this.setting.licenseExpire) {
        this.hasMessage = true
        this.message = !this.authData.trial ? `当前授权于${this.authData.deadline}已结束，避免影响您的使用，请联系我们购买授权!` : `试用期于${this.authData.deadline}结束，避免影响您的使用，请联系我们购买授权!`
      }
      // 当前操作违规-进行通知
      if (this.setting.licenseNotify) {
        this.hasMessage = true
        this.message = !this.authData.trial ? `当前授权已违反${this.authData.productName}商业授权规则，违规使用在授权${this.authData.domain}域名外，避免影响您的使用，请联系我们购买授权!` : `当前试用授权已违反${this.authData.productName}商业授权规则，违规用于商业用途，避免影响您的使用，请联系我们购买授权!`
      }
      this.showLog = true
    },
    showDialog2 () {
      this.$request.fetchAuthCertSysConfig().then(res => {
        if (res.code === 200) {
          console.log(res)
          let txt1 = ''
          let txt2 = ''
          if (res.data.trialRule) {
            if (res.data.trialRule.deadline instanceof Array) {
              res.data.trialRule.deadline.forEach((v, i) => {
                txt1 += `第${this.$changeNumToHan(i + 1)}次申请为${v}天；`
              })
            }
            if (res.data.trialRule.noTrade instanceof Array) {
              res.data.trialRule.noTrade.forEach((v, i) => {
                txt2 += `第${this.$changeNumToHan(i + 1)}次申请为${v}天；`
              })
            }
          }
          this.popoverText = `不同授权类型的时长及通过方式不一致，如下：限期授权：免审通过，${txt1} 个人非商业用途：需通过平台审核，${txt2}<br>注：一个授权号申请次数最多${res.data.trialMaxCount}次，申请次数为累加计算，不区分授权类型。`
        }
      })
      this.$request.fetchAuthCertGetLastApplyInfo().then(res => {
        if (res.code === 200) {
          this.userInfo = Object.assign({}, this.userInfo, res.data)
        }
      })
      this.showLog2 = true
    },
    dialogClose () {
      this.showLog = false
    },
    // 去购买
    toBuy () {
      window.open('http://www.jeecms.com', '_black')
    },
    // 申请授权
    toApply () {
      let param = {
        ...this.userInfo
      }
      let s = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(16[2|6|7])|(18[0-9])|(17([0-1]|[3]|[5-8]))|(19[1|8|9]))\d{8}$/
      if (s.test(param.contactTel)) {
        this.$request.fetchAuthCertApply(param).then(res => {
          if (res.code === 200) {
            this.showLog2 = false
            this.showLog = false
            this.hasMessage = false
            this.message = ''
            // 系统提示
            this.showBuy = false
          }
          this.showMsg(res)
          // 申请成功
        })
      } else {
        this.$message('请输入正确格式的电话号码')
      }
    },
    // 申请结果提示
    showMsg (res) {
      if ([200, 50000, 50001, 50002].includes(res.code)) {
        this.msgVisible = true
        this.msgText = res.message
      }

      // msgText
    },
    // 获取授权信息
    getAuth () {
      this.$request.fetchAuthCertGetLicense().then(res => {
        if (res.code === 200) {
          this.authData = res.data
        }
      })
    }
  },
  mounted () {
    this.getAuth()
  }
}
</script>

<style lang="scss">
.system-info-auth{
  .auth-box{
        padding-top: 7px;
        .img{
          max-width: 32px;
          max-height: 30px;
          margin-left: 8px;
          cursor: pointer;
        }
      }
}
.info-auth-dialog{
  .el-dialog__header{
    display: none;
  }
  .info-auth-wrap{
    .title{
      font-size: 18px;
      color: #333;
      text-align: center;
      padding: 28px 0 0;
      line-height: 1;
    }
    .el-alert{
      margin-top: 18px;
      .el-alert__content{
        padding-right: 5px;
      }
    }
    .altTitle{
      font-size: 14px;
      line-height: 1;
      color: #FF9300;
      letter-spacing: -0.3px;
      .jee-svg-icon{
        margin-right: 5px;
        fill: #FF9300;
      }
    }
    .altDes{
      font-size: 12px;
      line-height: 21px;
      color: #FF9300;
      letter-spacing: -0.3px;
      margin-top: 13px;
    }
    .info{
      margin-top: 30px;
      margin-bottom: 30px;
      align-items: center;
      .images{
        width: 120px;
        height: 115px;
        margin-right: 18px;
        .img{
          width: 100%;
          height: auto;
        }
      }
      .cont{
        p{
          line-height: 1;
          margin-top: 15px;
          font-size: 14px;
          font-size: #333;
          &:first-of-type{
            font-size: 24px;
            font-weight: 600;
            margin-bottom: 15px;
          }
          .label{
            color: #666;
            margin-right: 6px;
          }
        }
      }
    }
    .btns{
      height: 40px;
      line-height: 40px;
      .btn{
        width: 202px;
        font-size: 16px;
        border: 1px solid #E6E6E6;
        box-sizing: border-box;
        border-radius: 4px;
        font-weight: 400;
        overflow: hidden;
        &:last-of-type{
          margin-left: 20px;
        }
        .el-radio-button__inner{
          background-color: #fff;
          color: inherit;
          width: 100%;
          font-size: 16px;
          border: none;
          font-weight: 400;
          user-select: none;
        }
      }
    }
    .come{
      font-size: 14px;
      margin-top: 48px;
      line-height: 1;
      text-align: center;
    }
    .jee-popover{
      .jee-svg-icon{
        font-size: 14px;
      }
    }
    .popover{
      line-height: 1;
      font-size: 14px;
      margin-bottom: 20px;
    }
    .user{
      .el-input{
        height: 32px;
        margin-top: 20px;
        display: block;
        line-height: 32px;
      }
      .el-button{
        margin-top: 30px;
        width: 100%;
      }
    }
  }
  .el-dialog__body{
    &:hover::-webkit-scrollbar{
      width: 0;
      height: 0;
    }
  }
}
</style>
