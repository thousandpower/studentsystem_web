<template>
  <div>
    <el-container>
      <el-header><h1>项目评价人管理</h1></el-header>
      <el-main>





        <!--打分-->
        <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="500px">







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
            :formatter="formatScore">
          </el-table-column>

          <el-table-column
            prop="score1"
            label="一年评价"
            width="100"
            align="center"
            :formatter="formatScore">
          </el-table-column>

          <el-table-column
            prop="score2"
            label="两年评价"
            width="100"
            align="center"
            :formatter="formatScore">
          </el-table-column>

          <el-table-column
            prop="score3"
            label="三年评价"
            width="100"
            align="center"
            :formatter="formatScore">
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
          evaluatorid:sessionStorage.getItem("userid")

        },


        //总条数，后面会被覆盖
        total: 0,
        //总页数
        pageCount: 0,
        //新增或者编辑功能相关数据
        dialogTitle: "评价",
        //用于显示对话框的显示和隐藏
        dialogFormVisible: false,

        //定义表单数据
        form: {

        },
        /*显示文本默认显示宽度*/
        formLabelWidth: "80px",

        rules: {

        },
        //被选中的学生员工信息
        checkData: []
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
        this.form = {sex:"0"};
        //关闭对话框
        this.dialogFormVisible = false;
        //清空表单验证残余提示
        this.$nextTick(() => {
          this.$refs['deptEvalutorsForm'].clearValidate()
        })
      },

      handleEdit: function (rowData) {
        //清空表单验证残余提示
        this.$nextTick(() => {
          this.$refs['deptEvalutorsForm'].clearValidate()
        })
        var evaluatorid = rowData.evaluatorid;
        this.dialogTitle = "编辑项目评价人";
        //根据员工编号获取员工的详细信息，展示到对话框
        axios.get("/getDeptEvaluatorById/" + evaluatorid).then(res => {
          debugger
          this.form = res.data;
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
      formatScore:function (row,coulumn) {
        return row.score1 == null ? "未评价" : row.score1;
        return row.score0 == null ? "未评价" : row.score0;
        return row.score2 == null ? "未评价" : row.score2;
        return row.score3 == null ? "未评价" : row.score3;
      }


    },

    created() {
    },

    mounted() {
      //查询数据
      this.getStudents();
      this.getDepts();
      this.getJobs();
      //从sessionStroage中获取用户名
      this.uname = sessionStorage.getItem("uname")
    }


  }


</script>






















