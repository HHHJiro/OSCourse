<template>
  <div class="admin">
    <p class="tag-wrap"><el-tag type="success">管理系统</el-tag></p>
    <el-tabs type="border-card" class="tabs-wrap">
      <el-tab-pane label="用户统计">
        <div ref="user" style="width: 600px;height:400px;margin: 30px auto">
        </div>
      </el-tab-pane>
      <el-tab-pane label="用户管理">
        <div class="table-wrap">
          <el-table
          :data="userUploadData"
          border
          style="width: 952px; margin: 0 auto">
          <el-table-column
          label="注册日期"
          width="180">
          <template scope="scope">
            <el-icon name="time"></el-icon>
            <span style="margin-left: 10px">{{ scope.row.user[0].meta.createAt | formDate}}</span>
          </template>
        </el-table-column>
        <el-table-column
        label="昵称"
        width="180">
        <template scope="scope">
        <div class="table-flex-nickname">
          <img style="width: 34px; height: 34px" :src="scope.row.user[0].avatar" alt="ava">
            <span style="margin-left: 10px">{{ scope.row.user[0].nickName }}</span>
        </div>
        </template>
      </el-table-column>
      <el-table-column
      prop="totleUpload"
      label="上传文件数量"
      width="180"
      >
    </el-table-column>
    <el-table-column
    prop="totlePv"
    label="上传点击总计"
    width="180"
    >
  </el-table-column>
  <el-table-column
  label="权限设置"
  width="150"
  >
  <template scope="scope" >
  <div class="table-flex">
    <el-tag :type="roleTagType[scope.row.user[0].role]">{{scope.row.user[0].role | formAllRole}}</el-tag>
  <el-button :type="roleIncnType[scope.row.user[0].role]" :icon="roelIcon[scope.row.user[0].role]" size="small"></el-button>
  </div>
</template>
</el-table-column>
<el-table-column label="操作" width="80">
  <template scope="scope">
    <el-button
    size="small"
    type="danger"
    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
  </template>
</el-table-column>
</el-table>
</div>

<div class="block">
  <el-pagination
  layout="prev, pager, next"
  :page-size="pageSize"
  :total="userUploadDataCount">
</el-pagination>
</div>
</el-tab-pane>
<el-tab-pane label="文件统计">
  <div class="pane-wrap">
    <div ref="file" style="width: 500px;height:400px;">
    </div>
    <div ref="filePv" style="width: 500px;height:400px;">
    </div>
  </div>
</el-tab-pane>
<el-tab-pane label="文件管理">
  <div class="file-wrap">
    <el-table
        :data="filesByPage"
        :default-sort = "{prop: 'date', order: 'descending'}"
        element-loading-text="拼命加载中"
        border
        style="width: 100%">
        <el-table-column
        label="上传日期"
        prop="date"
        :resizable="!isTrue"
        sortable
        width="150">
    <template scope="scope">
      <el-icon name="time"></el-icon>
      <span style="margin-left: 10px">{{ scope.row.date }}</span>
    </template>
  </el-table-column>
    <el-table-column
    label="文件名称"
    :resizable="!isTrue"
    width="180">
    <template scope="scope">
      <el-popover trigger="hover" placement="top" :title="scope.row.name">
        <p>文件描述: {{ scope.row.desc }}</p>
        <div slot="reference" class="name-wrapper">
        <router-link :to="'/file/' + scope.row._id" >
          <el-tag :type="tagSecType[scope.row.type]" class="tag-pointer">{{ scope.row.name }}</el-tag>
        </router-link>
        </div>
      </el-popover>
    </template>
  </el-table-column>
    <el-table-column
    label="文件类型"
    :resizable="!isTrue"
    width="100">
    <template scope="scope">
      <el-tag >{{scope.row.path | fileType}}</el-tag>
    </template>
  </el-table-column>
    <el-table-column
    label="所属版块"
    :resizable="!isTrue"
    width="140"
    prop="type"
    :filters="section"
    :filter-method="filterType"
    filter-placement="bottom-end"
    class="pointer"
    >
    <template scope="scope">
      <el-tag :type="tagSecType[scope.row.type]">{{ scope.row.type | formType}}</el-tag>
    </template>
  </el-table-column>
    <el-table-column
    :resizable="!isTrue"
    label="浏览人数"
    prop="pv"
    :sortable="isTrue"
    width="120">
    <template scope="scope">
      <el-tag type="danger">{{scope.row.pv}}人</el-tag>
    </template>
  </el-table-column>
    <el-table-column label="操作" :resizable="!isTrue">
      <template scope="scope">
        <el-popover
        ref="popover{{$index}}"
        v-model="scope.row.visible"
        placement="left-end"
        width="300"
        trigger="click">
        <el-form label-position="top" label-width="80px" :model="scope.row">
          <el-form-item label="文件名称">
            <el-input v-model="scope.row.newName" :placeholder="scope.row.name"></el-input>
          </el-form-item>
          <el-form-item label="文件描述">
            <el-input type="textarea" v-model="scope.row.newDesc" :placeholder="scope.row.desc"></el-input>
          </el-form-item>
          <el-form-item>
          <el-button type="primary" @click="editUpload(scope.row, scope.$index)">提交修改</el-button>
            <el-button @click="scope.row.visible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-popover>
        <el-button
        size="small"
        v-popover:popover{{$index}}
        icon="edit"
        type="primary"
        @click="handleEdit(scope.$index, scope.row)"></el-button>
        <el-button
        size="small"
        type="danger"
        icon="delete"
        @click="handleDelete(scope.$index, scope.row)"></el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
  <div class="block">
  <el-pagination
  layout="prev, pager, next"
  @current-change="handleCurrentChange"
  :page-size="pageSize"
  :total="filesCount">
</el-pagination>
</div>
</el-tab-pane>
</el-tabs>
</div>  
</template>
<script>
  export default {
    data () {
      return {
        isTrue: true,
        value: '',
        filesByPage: [],
        pageSize: 8,
        files: [],
        section: [],
        tagSecType: {
          'micro': 'success',
          'teach': 'primary',
          'video': 'warning',
          'outline': 'success',
          'cala': 'primary'
        },
        options: [
          {
            value: 0,
            label: '学生'
          },
          {
            value: 10,
            label: '教师'
          }
        ],
        roelIcon: {
          '0': 'caret-top',
          '10': 'caret-bottom',
          '50': 'information'
        },
        roleIncnType: {
          '0': 'success',
          '10': 'danger',
          '50': 'info'
        },
        roleTagType: {
          '0': 'gray',
          '10': 'primary',
          '50': 'warning'
        },
        userCount: {},
        fileTypeCount: {},
        filePvCount: [],
        fileTypeChart: '',
        userChart: '',
        filePvChart: '',
        types: {
          'micro': '师生微课',
          'teach': '教学资源',
          'cala': '教学日历',
          'outline': '教学大纲',
          'video': '教学视频'
        },
        userUploadData: [],
        userUploadDataCount: 0,
        filesCount: 0
      }
    },
    mounted () {
      this.fileTypeChart = this.$echarts.init(this.$refs.file)
      this.userChart = this.$echarts.init(this.$refs.user)
      this.filePvChart = this.$echarts.init(this.$refs.filePv)
      this.getUserData()
      this.getFileTypeData()
      this.getFilePvData()
      this.getUserUploadInfo()
      this.getAllFiles()
    },
    methods: {
      printUserChart (countUser) {
        var self = this
        var option = {
          title: {
            text: '网站用户统计',
            subtext: '网站总注册用户 ' + countUser,
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['学生', '教师', '管理员']
          },
          series: [
            {
              name: '用户组成',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [
              { value: self.userCount['0'], name: '学生' },
              { value: self.userCount['10'], name: '教师' },
              { value: self.userCount['50'], name: '管理员' }
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
        this.userChart.setOption(option)
      },
      printFileChart (countFile) {
        var self = this
        var option = {
          title: {
            text: '模块文件统计',
            subtext: '文件总个数 ' + countFile,
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['教学视频', '师生微课', '教学大纲', '教学资源', '教学日历']
          },
          series: [
            {
              name: '用户组成',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [
              { value: self.fileTypeCount['video'], name: '教学视频' },
              { value: self.fileTypeCount['micro'], name: '师生微课' },
              { value: self.fileTypeCount['ouline'], name: '教学大纲' },
              { value: self.fileTypeCount['teach'], name: '教学资源' },
              { value: self.fileTypeCount['cala'], name: '教学日历' }
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
        this.fileTypeChart.setOption(option)
      },
      printFilePvChart (pvCount) {
        var self = this
        var option = {
          title: {
            text: '模块浏览量',
            subtext: '总浏览次数 ' + pvCount,
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            x: 'center',
            y: 'bottom',
            data: ['师生微课', '教学视频', '教学大纲', '教学日历', '教学资源']
          },
          toolbox: {
            show: true,
            feature: {
              mark: {show: true},
              magicType: {
                show: true,
                type: ['pie', 'funnel']
              }
            }
          },
          calculable: true,
          series: [
            {
              name: '面积模式',
              type: 'pie',
              radius: [30, 110],
              center: ['50%', '50%'],
              roseType: 'area',
              data: self.filePvCount
            }
          ]
        }
        this.filePvChart.setOption(option)
      },
      getUserData () {
        var self = this
        this.$http.get('api/admin/anauser')
          .then(res => {
            var data = res.data
            var countUser = 0
            data.map((val, index) => {
              self.userCount[val._id] = val.total
              countUser += val.total
            })
            return countUser
          })
          .then(res => {
            self.printUserChart(res)
          })
      },
      getFileTypeData () {
        var self = this
        this.$http.get('api/admin/anafile')
          .then(res => {
            var data = res.data.countQuery
            data.map((val, index) => {
              self.fileTypeCount[val._id] = val.total
            })
            return res.data.countFile
          })
          .then(res => {
            self.printFileChart(res)
          })
      },
      getFilePvData () {
        var self = this
        this.$http.get('api/admin/anafile?key=$pv')
          .then(res => {
            var data = res.data.countQuery
            var pvCount = 0
            data.map((val, index) => {
              let item = {
                'name': self.types[val._id],
                'value': val.total
              }
              self.filePvCount.push(item)
              pvCount += val.total
            })
            return pvCount
          })
          .then(res => {
            self.printFilePvChart(res)
          })
      },
      getUserUploadInfo () {
        this.$http.get('api/admin/anaUserInfo')
          .then(res => {
            this.userUploadData = res.data
            this.userUploadDataCount = res.data.length
          })
      },
      getAllFiles () {
        var self = this
        this.$http.get('api/admin/anaFilesInfo')
          .then(res => {
            this.files = res.data
            this.filesCount = this.files.length
            this.filesByPage = this.files.slice(0, this.pageSize)
            this.files.map((item, index) => {
              item.date = item.meta.createAt.substr(0, 10)
              self.$set(self.files[index], 'visible', false)
            })
          })
      },
      filterType (value, row) {
        return row.type === value
      },
      handleCurrentChange (val) {
        var self = this
        this.filesByPage = this.files.slice((val - 1) * self.pageSize, val * self.pageSize)
        console.log(`当前页: ${val}`)
      },
      handleDelete (index, row) {
        var removeIndex = this.filesByPage.indexOf(row)
        console.log(row)
        this.filesByPage.splice(removeIndex, 1)
        this.$message.success('操作成功')
      }
    }
  }
</script>
<style lang="sass" scoped>
  .admin
    margin: 30px 0 0
    .tag-wrap
      padding: 10px 0
    .tabs-wrap
      min-height: 600px
    .pane-wrap
      display: flex
      justify-content: space-around
      align-items: center
      flex-wrap: wrap
    .table-wrap
      min-height: 450px
    .block
      text-align: center
      padding: 10px 0
    .table-flex
      display: flex
      justify-content: space-between
      align-items: center
    .table-flex-nickname
      display: flex
      align-items: center
    .file-wrap
      min-width: 850px
      width: 850px
      margin: 0 auto
      min-height: 450px
</style>
