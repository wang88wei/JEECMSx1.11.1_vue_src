<template>
  <section class="jee-content-upload-container">
    <div class="desc" v-if="getImageDesc">{{getImageDesc}}</div>
    <!-- 上传区 -->
    <div class="resource-upload-wrap">
      <div class="z-video-uploader jee-hover-border"
        @click="showResourceDialog"
        v-if="!isBtn"
      >
        <div class="text-wrap">
          <jee-icon :iconClass="iconClass"></jee-icon>
          <div class="text">点击上传文件</div>
        </div>
      </div>
      <div class="jee-hover-border" v-else>
        <label v-if="showLabel"><span class="t-red" v-if="uploadOption.isRequired">*</span>{{uploadOption.label}}：</label>
        <el-button class="upload-btn" size="small" type="primary" @click="showResourceDialog">上传附件</el-button>
      </div>
      <div slot="tip">
        <!-- 说明文字 -->
        <div class="z-tip-form-item" v-if="tip&&tipShow">{{tip}}</div>
      </div>
      <draggable
        :list="fileList"
        @end="end"
        v-bind="dragOptions"
        class='drag-wrap'
      >
        <template v-for="(item, index) in fileList">
          <div :key="index">
                <el-input
                autofocus
                v-if="editData.id === (item.id||item.resId)"
                class="edit-input file-name"
                type="text" v-model="editData.name"
                placeholder="请输入附件名称"
                @blur="editNameConfirm(index, item)"
            ></el-input>
            <div class="file-item-wrap" v-else>
                <div class="file-name">
                <span class="edit-text">{{item.fileName}}</span>
                    <span class="icons">
                        <jee-icon class="edit jee-hover-color" @click="editName(item)"
                            iconClass="bianji" :style="{fontSize:'14px'}"/>
                        <jee-icon class="icon" iconClass="gouxuan2" :style="{fontSize:'14px',fill:'#6CC050'}"/>
                        <jee-icon class="t-12 delete" iconClass="tangchuangguanbi" :style="{fontSize:'9px',fill:'#666'}" @click="handleRemove(index)"/>
                    </span>
                </div>
                <div class="right">
                    <jee-icon class="icon dragging" iconClass="tuozhuai" :style="{fontSize:'14px',fill:'#666666'}"/>
                </div>
                <el-select
                class="file-select"
                popper-class="jee-border"
                v-model="item.secretId"
                placeholder="选择附件密级"
                @change="handleChangeSecret($event, index)"
                v-if="isSecret"
                >
                <el-option
                    v-for="opt in options"
                    :key="opt.value"
                    :label="$t(opt.label)"
                    :value="opt.value">
                </el-option>
                </el-select>
                <div class="left">
                    <jee-icon class="icon dragging" iconClass="tuozhuai" :style="{fontSize:'14px',fill:'#666666'}"/>
                </div>
            </div>
          </div>
        </template>
      </draggable>
    </div>
    <!-- 资源上传 -->
    <upload
      ref="resourceUpload"
      resourceType="attachment"
      :uploadOption="uploadOption"
      @handleConfirm="handleConfirm"
    ></upload>
  </section>
</template>
<script>
import draggable from 'vuedraggable'
import Upload from '@/components/editor/Upload'
import { loopOptions } from '@/utils'
import { mapGetters } from 'vuex'

export default {
  name: 'JeeFileContentUpload',
  props: {
    value: {
      type: [Array, String],
      default: () => []
    },
    uploadOption: {
      type: Object,
      default: () => ({})
    },
    isDescShow: {
      type: Boolean,
      default: true
    },
    isBtn: {
      type: Boolean,
      default: true
    },
    autoUpload: {
      type: Boolean,
      default: true
    },
    desc: {
      type: String,
      default: ''
    },
    tipShow: {
      type: Boolean,
      default: true
    },
    tip: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: '点击上传图片'
    },
    iconClass: {
      type: String,
      default: 'fujianshangchuan02'
    },
    typeLimit: {
      type: Number,
      default: 1
    },
    enableType: {
      type: String,
      default: ''
    },
    disableType: {
      type: String,
      default: ''
    },
    size: {
      type: [String, Number],
      default: ''
    },
    unit: {
      type: String,
      default: ''
    },
    isLengthLimit: {
      type: Boolean,
      default: false
    },
    isImageDesc: {
      type: Boolean,
      default: true
    },
    max: {
      type: [String, Number],
      default: ''
    },
    min: {
      type: [String, Number],
      default: ''
    },
    limit: {
      type: [String, Number],
      default: ''
    },
    isSecret: {
      type: Boolean,
      default: true
    },
    showLabel: {
      type: Boolean,
      default: true
    },
    form: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    draggable,
    Upload
  },
  data () {
    return {
      loading: false,
      val: [],
      fileList: [],
      percentage: 0,
      dragOptions: {
        group: 'filelist',
        sort: true,
        forceFallback: true,
        ghostClass: 'ghost',
        chosenClass: 'chosen',
        dragClass: 'dragging',
        swapThreshold: 0.5,
        animation: 100,
        delay: 50
      },
      options: [],
      editData: {
        name: '',
        id: '',
        suffix: ''
      }
    }
  },
  computed: {
    ...mapGetters(['onlyContentSecurityOptions']),
    getImageDesc () {
      let desc = ''
      if (this.typeLimit === 1) {
        desc = '不限制格式'
      } else if (this.typeLimit === 2) {
        desc = this.enableType ? `支持 ${this.enableType} 格式` : ''
      } else if (this.typeLimit === 3) {
        desc = this.disableType ? `不支持 ${this.disableType} 格式` : ''
      }
      if (Number(this.size) && this.unit) desc = desc + ` (文件大小不超过${this.size}${this.unit})`
      return this.isDescShow ? desc : ''
    },
    getValue () {
      return this.fileList.map(d => {
        let value = this.autoUpload ? {
          resId: d.resId || d.id,
          fileName: d.fileName
        } : d
        if (this.isSecret) {
          value.secretId = d.secret ? d.secret.id : (d.secretId || '')
        }
        return value
      })
    },
    getAccept () {
      if (this.typeLimit === 2) {
        const allowTypes = this.enableType instanceof Array ? this.enableType : (this.enableType ? this.enableType.split(',') : [])
        return allowTypes.length ? allowTypes.map(t => `.${t}`) : '*'
      }
      return '*'
    }
  },
  watch: {
    value (newVal) {
      if (newVal && newVal.length && newVal !== this.getValue) {
        this.initData()
      } else if (!newVal || !newVal.length) {
        this.fileList = []
      }
    },
    'form.contentSecretId': {
      deep: true,
      handler (newVal, oldVal) {
        if (newVal !== oldVal) {
          this.getSecurityOptions(newVal)
        }
      }
    }
  },
  methods: {
    showResourceDialog () {
      this.$refs.resourceUpload.showDialog()
    },
    // 排序
    end: function (evt) {
      // evt.item //可以知道拖动的本身
      // evt.to    // 可以知道拖动的目标列表
      // evt.from  // 可以知道之前的列表
      // evt.oldIndex  // 可以知道拖动前的位置
      // evt.newIndex  // 可以知道拖动后的位置
      let b
      for (let i in this.fileList) {
        if (i === evt.oldIndex) {
          let x = this.fileList[i]
          this.fileList.splice(i, 1)
          this.fileList.splice(evt.newIndex, 0, x)
          let a = this.fileList
          for (let j in a) {
            delete a[j].name
            b = a
          }
          this.fileList = b
        }
      }
      this.$emit('input', this.getValue)
    },
    // 移除
    handleRemove (index) {
      this.fileList.splice(index, 1)
      this.$emit('input', this.getValue)
    },
    handleChangeSecret (val, index) {
      const newFile = Object.assign({}, this.fileList[index], { secretId: val })
      this.fileList.splice(index, 1, newFile)
      this.$emit('input', this.getValue)
    },
    initData () {
      this.fileList = (this.value || []).map(d => {
        if (d.resourcesSpaceData) {
          d.id = d.resourcesSpaceData.id
          d.fileName = d.resourcesSpaceData.alias
          if (d.resourcesSpaceData.suffix) {
            d.fileName += d.resourcesSpaceData.suffix
          }
        }
        if (this.isSecret && d.secret) {
          let obj = this.options.find(t => t.id === d.secret.id)
          d.secretId = obj ? obj.id : ''
        } else if (d.secretId) {
          let obj = this.options.find(t => t.id === d.secretId)
          d.secretId = obj ? obj.id : ''
        }
        // console.log(d)
        return d
      })
      this.$emit('input', this.getValue)
    },
    // 资源上传提交
    handleConfirm (url, data, file) {
      // 判断是否超过数量限制
      if (this.isNumLimit()) return
      // data: { url, id, fileName }
      // 上传file: {uploadFile, mark, addToRes, spaceId}
      // 资源库file：{uploadFile，typeStr, addToRes, spaceId}
      file.id = data.id
      file.fileName = data.fileName
      this.fileList.push(file)
      this.$emit('input', this.getValue)
    },
    isNumLimit () {
      const lmt = this.limit && this.fileList.length >= this.limit
      if (lmt) {
        this.$message.error(`附件数量不能超过 ${this.limit} 个!`)
      }
      return lmt
    },
    getOptions (grade) {
      this.$request.fetchSysSecretsContentAll({ secretType: 2 }).then(res => {
        if (res.code === 200 && res.data instanceof Array) {
          this.options = grade ? loopOptions(res.data).filter(t => t.grade <= grade) : loopOptions(res.data)
          this.initData()
        }
      })
    },
    getSecurityOptions (id) {
      let obj = this.onlyContentSecurityOptions.find(v => v.id === id)
      if (obj && obj.grade) {
        this.getOptions(obj.grade)
      } else {
        this.getOptions()
      }
    },
    // == 修改附件名称
    editName (data) {
      let i = data.fileName.lastIndexOf('.')
      this.$set(this, 'editData', {
        name: data.fileName.slice(0, i),
        id: data.resId || data.id,
        suffix: data.fileName.slice(i)
      })
    },
    editNameConfirm (index) {
      if (this.editData.name) {
        var params = {
          'id': this.editData.id,
          'alias': this.editData.name
        //   'spaceId': this.list.params.id // 资源空间id
        }
        this.$request.resourceSpaceDatasNameUnique(params).then(res => {
          if (res.code === 200) {
            if (res.data) {
              this.$request.resourceSpaceDatasUpdate(params).then(res => {
                if (res.code === 200) {
                  this.$message({
                    message: '修改成功',
                    type: 'success'
                  })
                  this.$set(this.fileList, index, {
                    ...this.fileList[index],
                    fileName: this.editData.name + this.editData.suffix,
                    resId: this.editData.id,
                    id: this.editData.id
                  })
                  this.$set(this, 'editData', {
                    name: '',
                    id: '',
                    suffix: ''
                  })
                }
              })
            } else {
              this.$message({
                message: '资源名重复',
                type: 'error'
              })
            }
          } else {
            this.$message({
              message: res.message,
              type: 'error'
            })
          }
        })
      } else {
        this.editData = {
          name: '',
          id: '',
          suffix: ''
        }
        return false
      }
    }
  },
  mounted () {
    setTimeout(() => {
      this.getSecurityOptions()
    }, 500)
  }
}
</script>
<style lang="scss">
.jee-content-upload-container{
  margin-right: 2px;
  .desc{
    color: #B3B3B3;
    font-size: 12px;
    line-height: 1.5;
    padding-top: 11px;
    padding-bottom: 17px;
  }
  .resource-upload-wrap{
    color: #666;
    .z-video-uploader{
      cursor: pointer;
      border: 1px dashed #E2E2E2;
      border-radius: 4px;
      max-width: 414px;
      width: 100%;
      height: 91px;
    }
    .upload-btn{
      &.el-button--small{
        padding: 8px 15px;
        font-size: 12px;
        line-height: 14px;
      }
    }
  }
  .file-item-wrap{
    display: flex;
    flex-wrap: wrap;
    padding: 10px 0 0;
    max-width: 100%;
    .file-name{
      max-width: 260px !important;
      min-width:114px;
      height: 38px;
      padding: 0 10px 0 20px;
      line-height: 38px;
      color: #666666;
      border: 1px solid #e8e8e8;
      border-radius: 4px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex: 1;
      max-width: 300px;
      margin-right: 10px;
      >span{
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        padding-right: 8px;
      }
      .icons{
          min-width: 38px;
          text-align: right;
      }
      .delete,.edit{
          display: none;
      }
      .jee-svg-icon{
        fill: #B3B3B3;
        cursor: pointer;
        min-width: 12px;
        margin-left: 5px;
        &:hover{
          fill: #3178EE;
        }
      }
      &:hover{
        .delete,.edit{
          display: inline-block;
        }
        .icon{
          display: none;
        }
      }
    }
    .file-select{
      width: 144px !important;
      border-radius: 4px;
      .el-input__inner{
        border-width:1px !important;
        border-color: #e8e8e8;
        line-height: 38px !important;
        padding: 0 20px !important;
      }
      .el-input__suffix{
        right: 10px !important;
      }
    }
    .dragging{
        margin-left: 10px;
        margin-top: 15px;
        cursor: pointer;
    }
    .right{
      display: none;
    }
    .left{
      display: block;
    }
    &:last-of-type{
      .file-name{
        margin-bottom: 0px;
      }
    }
    &:first-of-type{
      padding-top: 20px;
    }
  }
  .edit-input{
    margin-top: 10px;
    border: 1px solid #e8e8e8;
    .el-input__inner{
        color: #666666;
        padding-left: 20px !important;
    }
  }
}
.content-block-right .jee-content-upload-container {
  .file-item-wrap{
    .file-name{
      margin-right: 0px;
      min-width: auto;
    }
    .file-select{
      width: 284px !important;
    }
    .right{
      display: block;
    }
    .left{
      display: none;
    }
    &:last-of-type{
      .file-name{
        margin-bottom: 10px;
      }
    }
    &:first-of-type{
      padding-top: 30px;
    }
  }
}
.model-left-label.widgetBr{
  .jee-content-upload-container {
    .file-item-wrap{
      .file-name{
        margin-right: 0px;
        min-width: auto;
      }
      .file-select{
        width: 270px !important;
      }
      .right{
        display: block;
      }
      .left{
        display: none;
      }
      &:last-of-type{
        .file-name{
          margin-bottom: 10px;
        }
      }
    }
  }
}
</style>
