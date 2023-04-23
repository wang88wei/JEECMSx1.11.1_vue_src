<!-- <template>
  <section class="service-index">

    <el-row>
      <el-button @click="getUser">查询</el-button>
      <el-button @click="insertUser">新增</el-button>
      <el-button @click="updateUser">更新</el-button>
      <el-button @click="deleteUser">删除</el-button>
    </el-row>
  </section>

</template>
<script>
import baseHeader from '@/components/mixins/baseHeader'
export default {
  name: 'demoIndex',
  mixins: [baseHeader],
  data () {
    return {
      name: '测试',
      user: {
        name: '小',
        age: '6'
      }
    }
  },
  computed: {

  },
  created () {

  },
  methods: {
    getUser () {
      let data = { page: 2, size: 10 }
      this.$request.getAllUserList(data).then(res => {
        if (res.code === 200) {
          console.log(res)
        }
      }).catch(() => {})
    },
    insertUser () {
      let data = this.user
      this.$request.insertUser(data).then(res => {
        if (res.code === 200) {
          console.log(res)
        }
      }).catch(() => {})
    },
    updateUser () {
      let data = this.user
      data.id = 10

      this.$request.updateUser(data).then(res => {
        if (res.code === 200) {
          console.log(res)
        }
      }).catch(() => {})
    },
    deleteUser () {
      let data = [5, 6, 7, 8, 9, 10, 11]
      this.$request.deleteUser(data).then(res => {
        if (res.code === 200) {
          console.log(res)
        }
      }).catch(() => {})
    }
  }
}
</script>
<style>
.service-index {
  width: calc(100% + 60px) !important;
  height: 100%;

  margin: -30px 0 0 -30px;
}
</style> -->

<template>
  <section class="user-index-container">

    <base-header v-bind="headers"
      v-on:handleCreate="handleHeaderCreate"
      v-on:handleDelete="handleHeaderDelete"
    />

      <search-header
      class="search-header"
      v-bind="searchHeader"
      :params="list.params"
      @handleSearch="handleSearchs"
    ></search-header>
    <base-table
      v-bind="list"
      v-on:handleSelectionChange="handleSelectKeyChange"
      v-on:handleSizeChange="handleSizeChange"
      v-on:handleCurrentChange="handleCurrentChange"
      v-on:handleDelete="handleTableDelete"
      @handleStatus="handleModelStatus"
      @handleEdit="handleTableEdit"
    ></base-table>
    <msg-dialog
      v-bind="msgDialog"
      v-on:handleConfirm="handleConfirmMsg"
      v-on:handleCancel="hideMsgDialog"
    />
    <form-dialog
      ref="addDialog"
      :loading="addFormLoading"
      :form="addForm"
      :rules="addRules"
      :buttons="addButtons"
      :formItems="addFormItems"
      v-on:handleConfirm="handleConfirmAdd"
      v-on:handleConfirmRole="handleConfirmRole"
    ></form-dialog>
    <el-upload
      class="upload-demo"
      action="http://localhost:8083/file/upload"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      multiple
      :file-list="fileList">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>

    <div>
<!-- 回显 -->
<el-upload
      class="avatar-uploader"
      action="http://localhost:8083/file/upload"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon" style=""></i>
</el-upload>
    </div>

    <!-- <jee-image-resource-upload
        v-bind="uploadOption"
        :uploadOption="uploadOption"
        :defaultUrl="defaultUrl"
        :ImageDescShow="false"
        :isBan="false"
        :tipShow="false"
        v-model="val"
        @getUrl="aaa"
        ></jee-image-resource-upload> -->
    <!-- <el-form><aaaa ></aaaa></el-form> -->

<!-- <resource-upload
resourceType="simpleupload"
:uploadOption="uploadOption"
:fixed="false"
@handleConfirm="handleConfirm">
</resource-upload> -->

  <!-- <div>
    <v-chart :forceFit="true" :height="height" :data="data" :scale="scale">
      <v-tooltip :showTitle="false" dataKey="item*percent" />
      <v-axis />
      <v-legend dataKey="item" />
      <v-pie position="percent" color="item" :v-style="pieStyle" :label="labelConfig" />
      <v-coord type="theta" />
    </v-chart>
  </div> -->
  <div class="Echarts">
    <div id="main" style="width: 600px;height: 400px;"></div>
    <div id="main1" style="width: 600px;height: 400px;"></div>
    <div id="main2" style="width: 600px;height: 400px;"></div>

  </div>
  </section>

</template>

<script>
import user from './user'
import ResourceUpload from '@/components/editor/ResourceUpload'
import NewDImageUploadPreview from '@/components/draggable/NewContent/NewCustomComponents/ImageUpload/NewDImageUploadPreview'
const columns = [
  {
    prop: 'id',
    label: '用户ID',
    scopeType: 'link',
    href: '/demo/demo/create',
    width: '122px'
  },
  {
    prop: 'name',
    label: '真实姓名',
    minWidth: '120px'
  },
  {
    prop: 'age',
    label: '年龄',
    minWidth: '142px'
  }
]

// const DataSet = require('@antv/data-set')

// const sourceData = [
//   { item: '事例一', count: 40 },
//   { item: '事例二', count: 21 },
//   { item: '事例三', count: 17 },
//   { item: '事例四', count: 13 },
//   { item: '事例五', count: 9 }
// ]

// const scale = [{
//   dataKey: 'percent',
//   min: 0,
//   formatter: '.0%'
// }]

// const dv = new DataSet.View().source(sourceData)
// dv.transform({
//   type: 'percent',
//   field: 'count',
//   dimension: 'item',
//   as: 'percent'
// })
// const data = dv.rows

export default {
  name: 'demoIndex',
  mixins: [user],
  components: {
    NewDImageUploadPreview,
    ResourceUpload
  },
  provide () {
    return {
      uploadOption: this.uploadOption
    }
  },
  data () {
    return {
      // data,
      // scale,
      height: 400,
      pieStyle: {
        stroke: '#fff',
        lineWidth: 1
      },
      labelConfig: ['percent', {
        formatter: (val, item) => {
          return item.point.item + ': ' + val
        }
      }],

      val: {},
      defaultUrl: '/u/cms/demo/202304/230808572j6l.jpg',
      uploadOption: {
        defaultValue: '',
        height: '',
        isRequired: false,
        label: '单图上传',
        modeObj: { fieldName: 'resource', modelId: 912 },
        name: 'resource',
        size: '',
        tip: '',
        type: ['jpg', 'png', 'gif', 'bmp', 'psd', 'jpeg'],
        unit: 'KB',
        width: ''
      },
      imageUrl: '',
      // imageUrl: 'http://localhost:8083/file/download?fileName=d7a071041d85072c4429b08699b9ef7a.jpg',
      fileList: [{ name: 'food.jpeg',
        url: 'http://localhost:8083/file/download/9131f91472c5740553c31b6af6d7f835.jpg' },
      { name: 'food2.jpeg',
        url: 'http://localhost:8083/file/download/17474f293150853585a986a096c42bd8.jpg' }],
      list: {
        columns: [],
        data: [],
        api: 'getAllUserList',
        params: { 'id': '', 'name': '' },
        handleColumn: [
          {
            type: 'Delete',
            name: '删除',
            icon: 'delete',
            notDisabled: true,
            power: 'deleteAble',
            disabled: true
          }
        ],
        handleColumnProp: {
          label: '操作',
          width: '280',
          align: 'left'
        }
      },
      headers: {
        buttons: [
          {
            type: 'Create',
            text: '新建',
            icon: 'xinjian',
            disabled: !this._checkPermission('/user/create/per', 'POST'),
            isHidden: !this._checkPermission('/user/create/per', 'POST')

          },
          {
            type: 'Delete',
            text: '删除',
            icon: 'delete',
            disabled: !this._checkPermission('/users', 'DELETE')
          }
        ],
        title: '',
        showAlertIcon: false
        // content: '任何用户不能删除自己；也不可编辑自己的权限；不可禁用或启用自己；'
      },
      searchHeader: {
        searchItems: [
          {
            type: 'cascader',
            value: 'id',
            props: {
              label: 'name',
              value: 'id',
              checkStrictly: true
            },
            style: {
              width: '163px'
            },
            label: '姓名：',
            placeholder: '请选择',
            options: [
              {
                name: '所有',
                id: ''
              }
            ]
          },
          {
            type: 'searchInput',
            value: 'name',
            placeholder: '请输入关键字'
          }
        ]
      }
    }
  },
  computed: {
  },
  async activated () {
    this.list.columns = columns
    await this.fetchTableApi()
    this.setUserName(this.list.data)
  },
  watch: {

  },
  mounted () {
    // 柱状图
    this.myEcharts()
    // 折线图
    this.myEcharts1()
    // 柱状图
    this.myEcharts2()
  },
  methods: {
    myEcharts2 () {
      var myChart2 = this.$echarts.init(document.getElementById('main2'))
      let option2 = {
        title: {
          x: 'center',
          y: 'bottom',
          text: 'echarts入门示例'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [
          {
            name: '访问来源',
            type: 'pie', // 设置图表类型为饼图
            radius: '55%', // 饼图的半径，外半径为可视区尺寸（容器高宽中较小一项）的 55% 长度。
            data: [ // 数据数组，name 为数据项名称，value 为数据项值
              { value: 235, name: '视频广告' },
              { value: 274, name: '联盟广告' },
              { value: 310, name: '邮件营销' },
              { value: 335, name: '直接访问' },
              { value: 400, name: '搜索引擎' }
            ]
            // label: {
            //   normal: {
            //     position: 'outer', // 设置标签位置，默认在饼状图外 可选值：'outer' ¦ 'inner（饼状图上）'
            //     formatter: '{a} {b} : {c}个 ({d}%)' // 设置标签显示内容 ，默认显示{b}
            //     // {a}指series.name  {b}指series.data的name
            //     // {c}指series.data的value  {d}%指这一部分占总数的百分比
            //     // formatter: '{c}'
            //   }
            // }
          }
        ]

      }
      myChart2.setOption(option2)
    },
    myEcharts1 () {
      let lineData = {
        x: [
          '9月15日',
          '9月16日',
          '9月17日',
          '9月18日',
          '9月19日',
          '9月20日',
          '9月21日',
          '9月22日',
          '9月23日',
          '9月24日',
          '9月25日',
          '9月26日'
        ],
        y_green: [103, 98, 120, 65, 63, 130, 125, 75, 130, 125, 75, 115],
        y_red: [210, 190, 190, 160, 170, 210, 207, 176, 176, 210, 170, 180],
        y_blue: [315, 316, 315, 315, 317, 317, 316, 316, 315, 315, 315, 315]
      }
      var myChart1 = this.$echarts.init(document.getElementById('main1'))
      const option1 = {
        title: {
          x: 'center',
          y: 'bottom',
          text: 'echarts入门示例'
        },
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '1%',
          right: '4%',
          bottom: '23%',
          containLabel: true
        },
        legend: {
          padding: 10,
          tooltip: {
            show: true
          },
          x: 'right',
          y: 'top',
          data: ['实际巡检', '计划巡检', '漏检次数']
        },
        xAxis: { type: 'category', data: lineData.x },
        yAxis: { type: 'value' },
        series: [
          {
            name: '实际巡检',
            data: lineData.y_green,
            type: 'line',
            itemStyle: { normal: { color: 'green', lineStyle: { color: 'green' } } }
          },
          {
            name: '计划巡检',
            data: lineData.y_red,
            type: 'line',
            itemStyle: { normal: { color: 'red', lineStyle: { color: 'red' } } }
          },
          {
            name: '漏检次数',
            data: lineData.y_blue,
            type: 'line',
            itemStyle: { normal: { color: 'blue', lineStyle: { color: 'blue' } } }
          }
        ]
      }

      // 配置

      myChart1.setOption(option1)
    },
    myEcharts () {
      var myChart = this.$echarts.init(document.getElementById('main'))
      // 配置
      var option = {
        title: {
          x: 'center',
          y: 'bottom',
          text: 'echarts入门示例'
        },
        tooltip: {},
        legend: {
          x: 'right',
          y: 'top',
          data: ['销量']
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      }
      myChart.setOption(option)
    },
    // 系统图片上传回调
    aaa (data, bb) {

    },

    // 回显
    handleAvatarSuccess (res, file) {
      this.$message('上传成功！')
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 多文件
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    // handleExceed (files, fileList) {
    //   this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    // },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleFilterParams (params, name = 'list') {
      if (params instanceof Object && this[name].filterParams instanceof Array) {
        let p = Object.assign({}, params)
        this.list.filterParams.forEach(d => {
          delete p[d]
        })
        return p
      }
      return params
    },
    // 表格操作按钮
    handleTableEdit (data, btn) {
      this.updateForm.username = data.username
      this.updateForm.id = data.id
      this.$refs.updateDialog.showDialog()
    },
    handleTableDelete (row, index) {
      this.msgDialog.type = 'DeleteOne'
      this.msgDialog.content = '是否确定删除该用户？'
      this.msgDialog.data = [row.id]
      this.showMsgDialog()
    },
    // 顶部操作按钮
    handleSearchs (data) {
      if (data instanceof Array) {
        this.list.params.id = data[data.length - 1]
      }
      this.fetchTableApi()
    },
    handleHeaderCreate () {
      if (this.isDisFenBao) {
        this.addForm.enabled = false
      }
      this.$refs.addDialog.showDialog()
    },
    handleHeaderEnable () {
      if (this.list.selectedKeys.length) {
        this.msgDialog.type = 'Enable'
        this.msgDialog.content = '确定要启用所有选择的数据吗？'
        this.showMsgDialog()
      } else {
        this.$message('至少选择一项进行操作')
      }
    },
    handleHeaderDisable () {
      if (this.list.selectedKeys.length) {
        this.msgDialog.type = 'Disable'
        this.msgDialog.content = '确定要禁用所有选择的数据吗？'
        this.showMsgDialog()
      } else {
        this.$message('至少选择一项进行操作')
      }
    },
    handleHeaderDelete () {
      if (this.list.selectedKeys.length) {
        this.msgDialog.type = 'Delete'
        this.msgDialog.content = '是否确定删除所选用户？'
        this.showMsgDialog()
      } else {
        this.$message('至少选择一项进行操作')
      }
    },
    getRoleList (id) {
      this.$request.fetchRolesList({ orgId: id }).then(res => {
        if (res.code === 200) {
          let arr2 = [{ roleName: '所有', id: '' }]
          this.searchHeader.searchItems[2].options = arr2.concat(res.data)
        }
      })
    },
    handleModelStatus (row, index) {
      if (row.enabled) {
        this.fetchSysUsersOn([row.id])
      } else {
        this.fetchSysUsersOff([row.id])
      }
    },
    // 弹出框操作按钮
    async handleConfirmMsg (type) {
      switch (type) {
        case 'DeleteOne':
          await this.$request.deleteUser(this.msgDialog.data)
          this.fetchTableApi()
          break
        case 'Delete':
          await this.$request.deleteUser(this.list.selectedKeys)
          this.fetchTableApi()
          break
      }
    },
    // 启用
    fetchSysUsersOn (ids, type) {
      this.list.loading = true
      this.$request.fetchSysUsersOn({ ids: ids, type: this.type }).then(res => {
        if (res.code === 200) {
          this.fetchTableApi()
          this.$message({
            type: 'success',
            message: '启用成功'
          })
          this.type = 1
        } else if (res.code === 14023) {
          this.type = 2
          this.fetchTableApi()
        }
        this.hideMsgDialog()
      }).then(this.hideTableLoading)
        .catch(this.hideTableLoading)
    },
    // 禁用
    fetchSysUsersOff (ids, type) {
      this.list.loading = true
      this.$request.fetchSysUsersOff({ ids: ids, type: this.type }).then(res => {
        if (res.code === 200) {
          this.type = 1
          this.$message({
            type: 'success',
            message: '禁用成功'
          })
          this.fetchTableApi()
        } else if (res.code === 14023) {
          this.type = 2
          this.fetchTableApi()
        }
        this.hideMsgDialog()
      }).then(this.hideTableLoading)
        .catch(this.hideTableLoading)
    },
    // 发送请求事件
    fetchSysUsersDelete (ids, type) {
      this.list.loading = true
      var params = {
        'ids': ids,
        'type': this.type
      }
      this.$request.fetchSysUsersDelete(params).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '操作成功'
          })
          this.fetchTableApi()
          this.type = 1
        } else if (res.code === 14023) {
          this.type = 2
        }
        this.hideMsgDialog()
      }).then(this.hideTableLoading)
        .catch(this.hideTableLoading)
    },
    fetchTableCallBack (res) {
      if (res.code === 200) {
        this.list.data = res.data.content.map((d, i) => {
          d.disabled = d.managerAble
          return d
        })
        this.list.totalCount = res.data.totalElements
      }
    },
    setUserName (_arr) {
      let arr1 = [{ name: '所有', id: '' }]
      _arr.forEach(user => {
        arr1.push({ id: user.id, name: user.name })
      })
      this.searchHeader.searchItems[0].options = arr1
    }
  }

}
</script>
<style lang="scss">
.user-index-container{
  .box-items{
    padding: 0 9px;
  }
.el-button{
    margin-bottom: 0 !important;//删除操作说明新增样式
  }
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    text-align: center !important;

  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    // text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: inline-block;
  }
</style>
