<template>
  <div>
    <el-container>
      <el-header><h1>项目评价人管理</h1></el-header>
      <el-main>





        <!--打分-->
        <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="900px">
          <div>
            <el-form :model="formInfo" :rules="rules" ref="studentInfo">
            <table border="1px" cellspacing="0px" style="border-collapse:collapse">
              <tr>
                <td style="width: 110px">姓名</td>
                <td style="width: 110px"><el-input v-model="formInfo.studentName" class="paperview-input-text"  readonly></el-input></td>
                <td style="width: 55px">性别</td>
                <td style="width: 110px"><el-input v-if="formInfo.sex == '0'"  value="男" class="paperview-input-text" readonly ></el-input>
                  <el-input v-if="formInfo.sex =='1'"  value="女" class="paperview-input-text"  readonly></el-input></td>
                <td style="width: 55px">民族</td>
                <td style="width: 110px"><el-input v-model="formInfo.nation" class="paperview-input-text" readonly></el-input></td>
                <td style="width: 110px" rowspan="4">一寸照片</td>
              </tr>
              <tr>
                <td>出生年月</td>
                <td><el-input v-model="formInfo.birthday" class="paperview-input-text" readonly></el-input></td>
                <td>籍贯</td>
                <td><el-input v-model="formInfo.nativePlace" class="paperview-input-text" readonly></el-input></td>
                <td>婚否</td>
                <td><el-input v-model="formInfo.maritalStatus" class="paperview-input-text" readonly></el-input></td>
              </tr>
              <tr>
                <td>联系电话</td>
                <td colspan="2"><el-input v-model="formInfo.phone" class="paperview-input-text" readonly></el-input></td>
                <td>身份证号码</td>
                <td colspan="2"><el-input v-model="formInfo.idNumber" class="paperview-input-text" readonly></el-input></td>
              </tr>
              <tr>
              <td>毕业学校</td>
              <td colspan="2"><el-input v-model="formInfo.college" class="paperview-input-text" readonly></el-input></td>
              <td>专业</td>
              <td colspan="2"><el-input v-model="formInfo.major" class="paperview-input-text" readonly></el-input></td>
            </tr>
              <tr>
                <td>备注</td>
                <td colspan="6"><el-input v-model="formInfo.remarks"  type="textarea" class="paperview-input-textarea" readonly></el-input></td>
              </tr>
            </table>
            </el-form>
          </div>



          <div>
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="学校" name="school">
                <el-form :model="formEvaInfoSc" :rules="rules" ref="studentEvaInfoSc">

                  <table border="1px" cellspacing="0px" style="border-collapse:collapse">
                    <tr>
                      <td colspan="12"></td>
                    </tr>
                    <tr >
                      <td colspan="2" rowspan="2">培训学校</td>
                      <td rowspan="2">班期</td>
                      <td rowspan="2">评价人</td>
                      <td colspan="6">评价分项</td>
                      <td colspan="2" rowspan="2">整体评价分数</td>

                    </tr>
                    <tr>
                      <td>HTML笔试</td>
                      <td>oracle笔试</td>
                      <td>JS笔试</td>
                      <td>java基础笔试</td>
                      <td>java高级笔试</td>
                      <td>L1面试</td>
                    </tr>
                    <tr>
                      <td colspan="2">学习评价</td>
                      <td><el-input v-model="formEvaInfoSc.gradeid" class="paperview-input-text"></el-input></td>
                      <td><el-input v-model="formEvaInfoSc.teachername" class="paperview-input-text"></el-input></td>
                      <td><el-input v-model="formEvaInfoSc.html" class="paperview-input-text"></el-input></td>
                      <td><el-input v-model="formEvaInfoSc.oracle" class="paperview-input-text"></el-input></td>
                      <td><el-input v-model="formEvaInfoSc.js" class="paperview-input-text"></el-input></td>
                      <td><el-input v-model="formEvaInfoSc.java_base" class="paperview-input-text"></el-input></td>
                      <td><el-input v-model="formEvaInfoSc.java_high" class="paperview-input-text"></el-input></td>
                      <td><el-input v-model="formEvaInfoSc.l1" class="paperview-input-text"></el-input></td>
                      <td colspan="2"><el-input v-model="formEvaInfoSc.appraisal_score" class="paperview-input-text"></el-input></td>

                    </tr>
                    <tr>
                      <td colspan="2">评价(包括主要优点及缺陷) </td>
                      <td colspan="10"><el-input v-model="formEvaInfoSc.appraisal_content"  type="textarea" class="paperview-input-textarea" readonly></el-input></td>
                    </tr>
                  </table>
                </el-form>
              </el-tab-pane>




              <el-tab-pane label="转正评价" name="zero">
                <el-form :model="formEvaInfo0" :rules="rules" ref="studentEvaInfo0">
                  <table border="1px" cellspacing="0px" style="border-collapse:collapse">
                    <tr>
                      <td colspan="12"></td>
                    </tr>
                    <tr >
                      <td colspan="2" rowspan="2">项目部</td>
                      <td rowspan="2">员工部门</td>
                      <td rowspan="2">员工职务</td>
                      <td rowspan="2">评价人</td>
                      <td colspan="5">评价分项</td>
                      <td colspan="2" rowspan="2">整体评价分数</td>
                    </tr>
                    <tr>
                      <td>能力</td>
                      <td>积极性</td>
                      <td>沟通交流</td>
                      <td>人品</td>
                      <td>性格</td>
                    </tr>
                    <tr>
                      <td colspan="2">工作评价</td>
                      <td><el-input v-model="formEvaInfo0.deptname" class="paperview-input-text"></el-input></td>
                      <td><el-input v-model="formEvaInfo0.jobname" class="paperview-input-text"></el-input></td>
                      <td><el-input v-model="formEvaInfo0.username" class="paperview-input-text"></el-input></td>
                      <td><el-input v-model="formEvaInfo0.ability" class="paperview-input-text"></el-input></td>
                      <td><el-input v-model="formEvaInfo0.initiative" class="paperview-input-text"></el-input></td>
                      <td><el-input v-model="formEvaInfo0.communication" class="paperview-input-text"></el-input></td>
                      <td><el-input v-model="formEvaInfo0.moral_quality" class="paperview-input-text"></el-input></td>
                      <td><el-input v-model="formEvaInfo0.characters" class="paperview-input-text"></el-input></td>
                      <td colspan="2"><el-input v-model="formEvaInfo0.appraisal_score" class="paperview-input-text"></el-input></td>
                    </tr>
                    <tr>
                      <td colspan="2">评价(包括主要优点及缺陷) </td>
                      <td colspan="10"><el-input v-model="formEvaInfo0.appraisal_content"  type="textarea" class="paperview-input-textarea" readonly></el-input></td>
                    </tr>
                  </table>
                </el-form>
              </el-tab-pane>


              <el-tab-pane label="一年评价" name="first">
                <el-form :model="formEvaInfo1" :rules="rules" ref="studentEvaInfo1">
                  <table border="1px" cellspacing="0px" style="border-collapse:collapse">
                    <tr>
                      <td colspan="12"></td>
                    </tr>
                    <tr >
                      <td colspan="2" rowspan="2">项目部</td>
                      <td rowspan="2">员工部门</td>
                      <td rowspan="2">员工职务</td>
                      <td rowspan="2">评价人</td>
                      <td colspan="5">评价分项</td>
                      <td colspan="2" rowspan="2">整体评价分数</td>
                    </tr>
                    <tr>
                      <td>能力</td>
                      <td>积极性</td>
                      <td>沟通交流</td>
                      <td>人品</td>
                      <td>性格</td>
                    </tr>
                    <tr>
                      <td colspan="2">工作评价</td>
                      <td><el-input v-model="formEvaInfo1.deptname" class="paperview-input-text"></el-input></td>
                      <td><el-input v-model="formEvaInfo1.jobname" class="paperview-input-text"></el-input></td>
                      <td><el-input v-model="formEvaInfo1.username" class="paperview-input-text"></el-input></td>
                      <td><el-input v-model="formEvaInfo1.ability" class="paperview-input-text"></el-input></td>
                      <td><el-input v-model="formEvaInfo1.initiative" class="paperview-input-text"></el-input></td>
                      <td><el-input v-model="formEvaInfo1.communication" class="paperview-input-text"></el-input></td>
                      <td><el-input v-model="formEvaInfo1.moral_quality" class="paperview-input-text"></el-input></td>
                      <td><el-input v-model="formEvaInfo1.characters" class="paperview-input-text"></el-input></td>
                      <td colspan="2"><el-input v-model="formEvaInfo1.appraisal_score" class="paperview-input-text"></el-input></td>
                    </tr>
                    <tr>
                      <td colspan="2">评价(包括主要优点及缺陷) </td>
                      <td colspan="10"><el-input v-model="formEvaInfo1.appraisal_content"  type="textarea" class="paperview-input-textarea" readonly></el-input></td>
                    </tr>
                  </table>
                </el-form>
              </el-tab-pane>


              <el-tab-pane label="两年评价" name="second">
                <el-form :model="formEvaInfo2" :rules="rules" ref="studentEvaInfo2">
                  <table border="1px" cellspacing="0px" style="border-collapse:collapse">
                    <tr>
                      <td colspan="12"></td>
                    </tr>
                    <tr >
                      <td colspan="2" rowspan="2">项目部</td>
                      <td rowspan="2">员工部门</td>
                      <td rowspan="2">员工职务</td>
                      <td rowspan="2">评价人</td>
                      <td colspan="5">评价分项</td>
                      <td colspan="2" rowspan="2">整体评价分数</td>
                    </tr>
                    <tr>
                      <td>能力</td>
                      <td>积极性</td>
                      <td>沟通交流</td>
                      <td>人品</td>
                      <td>性格</td>
                    </tr>
                    <tr>
                      <td colspan="2">工作评价</td>
                      <td><el-input v-model="formEvaInfo2.deptname" class="paperview-input-text"></el-input></td>
                      <td><el-input v-model="formEvaInfo2.jobname" class="paperview-input-text"></el-input></td>
                      <td><el-input v-model="formEvaInfo2.username" class="paperview-input-text"></el-input></td>
                      <td><el-input v-model="formEvaInfo2.ability" class="paperview-input-text"></el-input></td>
                      <td><el-input v-model="formEvaInfo2.initiative" class="paperview-input-text"></el-input></td>
                      <td><el-input v-model="formEvaInfo2.communication" class="paperview-input-text"></el-input></td>
                      <td><el-input v-model="formEvaInfo2.moral_quality" class="paperview-input-text"></el-input></td>
                      <td><el-input v-model="formEvaInfo2.characters" class="paperview-input-text"></el-input></td>
                      <td colspan="2"><el-input v-model="formEvaInfo2.appraisal_score" class="paperview-input-text"></el-input></td>
                    </tr>
                    <tr>
                      <td colspan="2">评价(包括主要优点及缺陷) </td>
                      <td colspan="10"><el-input v-model="formEvaInfo2.appraisal_content"  type="textarea" class="paperview-input-textarea" readonly></el-input></td>
                    </tr>
                  </table>
                </el-form>
              </el-tab-pane>

              <el-tab-pane label="三年评价" name="third">
                <el-form :model="formEvaInfo3" :rules="rules" ref="studentEvaInfo3">
                  <table border="1px" cellspacing="0px" style="border-collapse:collapse">
                    <tr>
                      <td colspan="12"></td>
                    </tr>
                    <tr >
                      <td colspan="2" rowspan="2">项目部</td>
                      <td rowspan="2">员工部门</td>
                      <td rowspan="2">员工职务</td>
                      <td rowspan="2">评价人</td>
                      <td colspan="5">评价分项</td>
                      <td colspan="2" rowspan="2">整体评价分数</td>
                    </tr>
                    <tr>
                      <td>能力</td>
                      <td>积极性</td>
                      <td>沟通交流</td>
                      <td>人品</td>
                      <td>性格</td>
                    </tr>
                    <tr>
                      <td colspan="2">工作评价</td>
                      <td><el-input v-model="formEvaInfo3.deptname" class="paperview-input-text"></el-input></td>
                      <td><el-input v-model="formEvaInfo3.jobname" class="paperview-input-text"></el-input></td>
                      <td><el-input v-model="formEvaInfo3.username" class="paperview-input-text"></el-input></td>
                      <td><el-input v-model="formEvaInfo3.ability" class="paperview-input-text"></el-input></td>
                      <td><el-input v-model="formEvaInfo3.initiative" class="paperview-input-text"></el-input></td>
                      <td><el-input v-model="formEvaInfo3.communication" class="paperview-input-text"></el-input></td>
                      <td><el-input v-model="formEvaInfo3.moral_quality" class="paperview-input-text"></el-input></td>
                      <td><el-input v-model="formEvaInfo3.characters" class="paperview-input-text"></el-input></td>
                      <td colspan="2"><el-input v-model="formEvaInfo3.appraisal_score" class="paperview-input-text"></el-input></td>
                    </tr>
                    <tr>
                      <td colspan="2">评价(包括主要优点及缺陷) </td>
                      <td colspan="10"><el-input v-model="formEvaInfo3.appraisal_content"  type="textarea" class="paperview-input-textarea" readonly></el-input></td>
                    </tr>
                  </table>
                </el-form>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-dialog>







        <div align="left" style="float: left">
          <el-input v-model="listQuery.filter" placeholeder="请输入部门评价人姓名" style="width: 200px;">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <el-button type="primary" @click="queryDeptEvaluators">查询</el-button>
        </div>
        <el-table
          :data="tableData"
          border
          stripe
          height="590"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >

          <el-table-column
            type="index"
            label="序号"
            width="50"
            align="center">
          </el-table-column>

          <el-table-column
            prop="student_name"
            label="姓名"
            width="75"
            align="center"
            header-align="center">
          </el-table-column>

          <el-table-column
            prop="sex"
            label="性别"
            width="52"
            align="center"
            header-align="center"
            :formatter="formatSex">
          </el-table-column>

          <el-table-column
            prop="college"
            label="学校"
            width="120"
            align="center"
            header-align="center">
          </el-table-column>

          <el-table-column
            prop="native_place"
            label="籍贯"
            width="100"
            align="center"
            header-align="center">
          </el-table-column>


          <el-table-column label="培训期间测试成绩"
          align="center">
            <el-table-column
              prop="html"
              label="HTML笔试"
              width="75"
              align="center"
              header-align="center">
            </el-table-column>
            <el-table-column
              prop="oracle"
              label="oracle成绩"
              width="75"
              align="center"
              header-align="center">
            </el-table-column>
            <el-table-column
              prop="js"
              label="JS笔试"
              width="75"
              align="center"
              header-align="center">
            </el-table-column>
            <el-table-column
              prop="java_base"
              label="java基础笔试"
              width="75"
              align="center"
              header-align="center">
            </el-table-column>
            <el-table-column
              prop="java_high"
              label="java高级笔试"
              width="75"
              align="center"
              header-align="center">
            </el-table-column>
            <el-table-column
              prop="l1"
                label="L1面试"
              width="75"
              align="center"
              header-align="center">
            </el-table-column>
          </el-table-column>

          <el-table-column
            prop="school_score"
            label="学校评价"
            width="100"
            align="center">
          </el-table-column>

          <el-table-column
            prop="score0"
            label="转正评价"
            width="100"
            align="center"
            :formatter="formatScore0">
          </el-table-column>

          <el-table-column
            prop="score1"
            label="一年评价"
            width="100"
            align="center"
            :formatter="formatScore1">
          </el-table-column>

          <el-table-column
            prop="score2"
            label="两年评价"
            width="100"
            align="center"
            :formatter="formatScore2">
          </el-table-column>

          <el-table-column
            prop="score3"
            label="三年评价"
            width="100"
            align="center"
            :formatter="formatScore3">
          </el-table-column>
          <el-table-column
            label="操作"
            width="100" align="center">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                @click="handleEdit(scope.row)">打分
              </el-button>

            </template>

          </el-table-column>

        </el-table>
        <el-pagination
          background
          :current-page.sync="page.currentPage"
          :page-sizes="page.sizes"
          :page-size="this.listQuery.limit"
          :total="total"
          layout="prev,pager,next,sizes,jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>

      </el-main>


    </el-container>
  </div>
</template>


<script>
  import axios from 'axios';

  export default {
    name: "StudentEvaluation",
    data() {

      return {
        uname: "",//存储从sessionStorage中的用户名
        //表格分页、查询等数据
        tableData: [],

        page: {
          currentPage: 1,//当前页码
          sizes: [6, 9, 12]
        },

        listQuery: {//初始查询条件
          limit: 9,
          page: 1,
          filter: "", //查询条件
          evaluatorid: sessionStorage.getItem("userid")
        },


        //总条数，后面会被覆盖
        total: 0,
        //总页数
        pageCount: 0,
        //新增或者编辑功能相关数据
        dialogTitle: "评价",
        //用于显示对话框的显示和隐藏
        dialogFormVisible: false,

        //学生基础信息的声明
        formInfo: {
          studentName:"",
          sex: "",
          nativePlace: "",
          birthday: "",
          maritalStatus: "",
          phone: "",
          idNumber: "",
          hiredate: "",
          college: "",
          major: "",
          imagesDirectory: "",
          remarks: "",
          deptno: "",
          gradeid: "",

        },



        //转正评价信息表单的声明
        formEvaInfo0:{
        deptname:"",
          jobname:"",
          username:"",
          ability:"",
          initiative:"",
          communication:"",
          moral_quality:"",
          characters:"",
          work_year:"",
          appraisal_socre:"",
          appraisal_content:""


      },
        //一年评价信息表单的声明
        formEvaInfo1:{
          deptname:"",
          jobname:"",
          username:"",
          ability:"",
          initiative:"",
          communication:"",
          moral_quality:"",
          characters:"",
          work_year:"",
          appraisal_socre:"",
          appraisal_content:""
        },
        //二年评价信息表单的声明
        formEvaInfo2:{
          deptname:"",
          jobname:"",
          username:"",
          ability:"",
          initiative:"",
          communication:"",
          moral_quality:"",
          characters:"",
          work_year:"",
          appraisal_socre:"",
          appraisal_content:""
        },
        //三年评价信息表单的声明
        formEvaInfo3:{
          deptname:"",
          jobname:"",
          username:"",
          ability:"",
          initiative:"",
          communication:"",
          moral_quality:"",
          characters:"",
          work_year:"",
          appraisal_socre:"",
          appraisal_content:""
        },
        //学校评价信息表单的声明
        formEvaInfoSc:{
        gradeid:"",
          teachername:"",
          html:"",
          oracle:"",
          js:"",
          java_base:"",
          java_high:"",
          l1:"",
          appraisal_score:"",
          appraisal_content:""
        },

        /*显示文本默认显示宽度*/
        formLabelWidth: "80px",

        rules: {},
        //被选中的学生员工信息
        checkData: [],
        //标签页的活动页 （当前页）
        activeName: ''
      }
    },

    methods: {
      getStudents: function () {
        //用于该部门评价人所在部门的金桥学员员工信息
        axios.post("/getStudentsByDeptno", this.listQuery).then(res => {
          //res.data返回的是对象数组
          this.tableData = res.data.students;
          this.total = res.data.total;
        });
      },

      queryDeptEvaluators: function () {
        //设置传递到后台的代码为1
        this.getStudents();
        this.page.currentPage = 1; //默认显示第一页
      },

      handleSizeChange: function (val) {
        //当每页显示条数发生变化时，触发该事件
        //需要根据当前参数重新去后台查询数据
        this.listQuery.limit = val;
        this.getStudents();
      },

      handleCurrentChange: function (val) {
        //当前页码发生变化时，触发该事件
        //获取当前页码，赋值给this.listQuery.page，getStudents
        //val代表当前页码
        this.listQuery.page = val;
        this.getStudents();
      },


      //新增对话框中的取消按钮事件
      closeDlog: function () {
        //清空数据
        this.form = {};
        //关闭对话框
        this.dialogFormVisible = false;
        //清空表单验证残余提示
        this.$nextTick(() => {
          this.$refs['deptEvalutorsForm'].clearValidate()
        })
      },

      handleEdit: function (rowData) {
        debugger;
        /*        //清空表单验证残余提示
        this.$nextTick(() => {
          this.$refs['deptEvalutorsForm'].clearValidate()
        })*/

        var studentid = rowData.studentid;
        this.dialogTitle = "员工评价";
        //根据员studentid获取员工的详细信息，展示到对话框
        axios.post("/getStudentAllInfoByStudentid" ,studentid).then(res => {
          debugger
          this.formInfo = res.data.studentInfo;
          this.formEvaInfoSc = res.data.studentEvaInfoSc;
          this.formEvaInfo0 = res.data.studentEvaInfo0;
          this.formEvaInfo1 = res.data.studentEvaInfo1;
          this.formEvaInfo2 = res.data.studentEvaInfo2;
          this.formEvaInfo3 = res.data.studentEvaInfo3;
          this.dialogFormVisible = true;
        })
      },

      handleSelectionChange: function (val) {
        //被选中的数据：行对象数组
        this.checkData = val;
      },

      //将后台数据库返还回来的 0 1 转换为男 女
      formatSex: function (row, column) {
        return row.sex == '0' ? "男" : row.sex == '1' ? "女" : "";
      },
      //四个总分的分数判断
      formatScore0: function (row, coulumn) {
        return row.score0 == null ? "未评价" : row.score0;
      },
      formatScore1: function (row, coulumn) {
        return row.score1 == null ? "未评价" : row.score1;
      },
      formatScore2: function (row, coulumn) {
        return row.score2 == null ? "未评价" : row.score2;
      },
      formatScore3: function (row, coulumn) {
        return row.score3 == null ? "未评价" : row.score3;
      },
      //测试选项卡数据
      handleClick(tab, event) {
        console.log(tab, event);
      }

    },

    created() {
    },

    mounted() {
      //查询数据
      this.getStudents();
      //从sessionStroage中获取用户名
      this.uname = sessionStorage.getItem("uname")
    }
  }

</script>

<style scoped >
  .paperview-input-text >>> .el-input__inner{
    -webkit-appearance: none;
    background-color: #FFF;
    background-image: none;
    border-radius: 4px;
    border: 0px;//改成0，边框就消失了！
  width: 100%;
  }
  .paperview-input-textarea >>> .el-textarea__inner {
    -webkit-appearance: none;
    background-color: #FFF;
    background-image: none;
    border-radius: 4px;

    border: 0px;//改成0，边框就消失了！
    width: 100%;
    resize: none;
  }

</style>



















