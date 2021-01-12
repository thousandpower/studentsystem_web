<template>

  <div>
    <h1>项目评价人管理</h1>
    <el-container>
      <el-main>
        <div align="left" style="float: left">
          <el-input v-model="listQuery.filter" placeholeder="请输入部门评价人姓名" style="width: 200px;">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <el-button type="primary" @click="queryDeptEvaluators">查询</el-button>
        </div>

        <div align="right">
          <el-button type="primary" @click="showAdd">新增</el-button>
        </div>

        <!--新增和编辑的对话框-->
        <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="500px">

          <el-form :model="form" :rules="rules" ref="deptEvalutorsForm">

            <el-form-item label="姓名" :label-width="formLabelWidth" prop="username">
              <el-input v-model="form.username" autocomplete="off" style="width: 370px">
                <i slot="prefix" class="el-input__icon el-icon-user-solid"></i>
              </el-input>
            </el-form-item>

            <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
              <el-radio v-model="form.sex" :label= 0>
                男
              </el-radio>
              <el-radio v-model="form.sex" :label= 1>
                女
              </el-radio>
            </el-form-item>

            <el-form-item label="年龄" :label-width="formLabelWidth" prop="age">
              <el-input v-model.number="form.age" autocomplete="off" style="width: 370px">
                <i slot="prefix" class="el-input__icon el-icon-date"></i>
              </el-input>
            </el-form-item>

            <el-form-item label="手机号" :label-width="formLabelWidth" prop="phone">
              <el-input v-model="form.phone" autocomplete="off" style="width: 370px" clearable>
                <i slot="prefix" class="el-input__icon el-icon-phone"></i>
              </el-input>
            </el-form-item>

            <el-form-item label="所属部门" :label-width="formLabelWidth" prop="deptno">
              <el-select v-model="form.deptno" placeholder="请选择所属部门" style="width: 370px">
                <el-option v-for="dept in this.deptList" :value="dept.deptno" :label="dept.deptname"
                           :key="dept.deptno"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="职务" :label-width="formLabelWidth" prop="jobid">
              <el-select v-model="form.jobid" placeholder="请选择职务" style="width: 370px">
                <el-option v-for="job in this.jobList" :value="job.jobid" :label="job.jobname"
                           :key="job.jobid"></el-option>
              </el-select>
            </el-form-item>

          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="closeDlog">取 消</el-button>
            <el-button type="primary" @click="addDeptEvaluator">确 定</el-button>
          </div>
        </el-dialog>


        <el-table
          :data="tableData"
          border
          stripe
          height="591"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >

          <el-table-column
            type="index"
            label="序号"
          width="115"
            align="center">
            <template slot-scope="scope">
              <!--作用域插槽slot-scope，设置序号从1一直到获得数据的最后一个元素的数组下标+1-->
              <span>{{(page.currentPage - 1)*listQuery.limit + scope.$index +1}}</span>
            </template>
          </el-table-column>

          <el-table-column
            prop="username"
            label="姓名"
            min-width="200"
            align="center"
            header-align="center">
          </el-table-column>

          <el-table-column
            prop="sex"
            label="性别"
            min-width="105"
            align="center"
            header-align="center"
            :formatter="formatSex">
          </el-table-column>

          <el-table-column
            prop="age"
            label="年龄"
            min-width="105"
            align="center"
            header-align="center">
          </el-table-column>

          <el-table-column
            prop="phone"
            label="手机号"
            min-width="300"
            align="center"
            header-align="center">
          </el-table-column>

          <el-table-column
            prop="deptname"
            label="所属部门"
            min-width="180  "
            align="center">
          </el-table-column>

          <el-table-column
            prop="jobname"
            label="职务"
            min-width="170"
            align="center">
          </el-table-column>

          <el-table-column
            label="操作"
            width="250"
           align="center">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                @click="handleEdit(scope.row)">编辑
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete( scope.row)">删除
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
    name: "DeptEvaluatorManagement",
    data() {
      //自定义表单验证
      var checkAge = function (rule, value, callback) {
        if (value == '') {
          callback(new Error('请输入年龄'));
        } else {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 18 || value > 60) {
              callback(new Error('劳动法年龄要求在18-60岁之间'));
            } else {
              callback();
            }
          }
        }
      };

      var checkPhone = function (rule, value, callback) {
        if (value == undefined) {
          callback(new Error('手机号不能为空'))
        } else {
          if  (!/^(((13[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[3-8]{1})|(18[0-9]{1})|(19[0-9]{1})|(14[5-7]{1}))+\d{8})$/.test(value)) {
              callback(new Error('手机号格式错误'))
            }else {
              callback()
            }
      }};


      return {
        uname: "",//存储从sessionStorage中的用户名
        //表格分页、查询等数据
        tableData: [],

        page: {
          currentPage: 1,//当前页码
          sizes: [6, 10, 12]
        },

        listQuery: {//初始查询条件
          limit: 10,
          page: 1,
          filter: ""  //查询条件
        },


        //总条数，后面会被覆盖
        total: 0,
        //总页数
        pageCount: 0,
        //新增或者编辑功能相关数据
        dialogTitle: "新增项目评价人",
        //用于显示对话框的显示和隐藏
        dialogFormVisible: false,

        //定义表单数据
        form: {
          evaluatorid: "",
          username: "",
          deptno: "",
          age: "",
          sex:"",
          phone: "",
          //离职状态
          flag: "",
          jobid: "",
        },
        /*显示文本默认显示宽度*/
        formLabelWidth: "80px",
        jobList: [],
        deptList: [],


        rules: {
          username: [
            {required: true, message: '请输入姓名', trigger: 'blur'},
          ],
          deptno: [
            {required: true, message: '请选择所属部门', trigger: 'blur'},
          ],
          age: [
            {validator: checkAge, trigger: 'blur'},
          ],
          sex: [
            {required: true, message: '请选择性别', trigger: 'blur'},
          ],

          jobid: [
            {required: true, message: '请选择职务', trigger: 'blur'},
          ],
          phone: [
            {validator: checkPhone, trigger: 'blur'},
          ],
        },
        //被选中的部门信息
        checkData: []
      }
    },

    methods: {
      /**
       * 获取部门评价人
       */
      getDeptEvaluators: function () {
        //用于获取全部的部门评价人信息
        axios.post("/getDeptEvaluators", this.listQuery).then(res => {
          //res.data返回的是对象数组
          this.tableData = res.data.deptEvaluators;
          this.total = res.data.total;
        });
      },
      //获取全部的部门信息
      getDepts: function () {
        axios.get("/getDepts").then(res => {
          this.deptList = res.data;
        })

      },
      //获取全部的职务信息
      getJobs: function () {
        axios.get("/getJobs").then(res => {
          this.jobList = res.data;
        })
      },

      /**
       * 查询
       */
      queryDeptEvaluators: function () {
        //设置传递到后台的代码为1
        this.listQuery.page = 1;
        this.getDeptEvaluators();
        this.page.currentPage = 1; //默认显示第一页
      },

      /**
       *
       * @param val
       */
      handleSizeChange: function (val) {
        //当每页显示条数发生变化时，触发该事件
        //需要根据当前参数重新去后台查询数据
        this.listQuery.limit = val;
        this.getDeptEvaluators();
      },

      handleCurrentChange: function (val) {
        //当前页码发生变化时，触发该事件
        //获取当前页码，赋值给this.listQuery.page，调用getDeptEvaluators方法
        //val代表当前页码
        this.listQuery.page = val;
        this.getDeptEvaluators();


      },

      //打开新增对话框
      showAdd: function () {
        this.form = {sex:0};
        this.dialogTitle = "新增项目评价人";
        this.dialogFormVisible = true;
        //清空表单验证残余提示
        this.$nextTick(() => {
          this.$refs['deptEvalutorsForm'].clearValidate()
        })

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

      /**
       * 新增部门评价人
       */
      addDeptEvaluator: function () {
        //表单验证
        this.$refs["deptEvalutorsForm"].validate((valid) => {
          if (valid) {
            axios.post("/addOrUpdDeptEvaluator", this.form).then(res => {
              if (res.data == "success") {
                this.form = {};
                this.dialogFormVisible = false;
                this.getDeptEvaluators();
                this.$message({
                  message: this.dialogTitle.substr(0, 2) + "成功",
                  type: "success"
                })
              } else {
                this.form = {};
                this.dialogFormVisible = false;
                this.getDeptEvaluators();
                this.$message({
                  message: this.dialogTitle.substr(0, 2) + "失败",
                  type: "error"
                })
              }
            })
          }
        })
      },

      /**
       * 点击编辑按钮
       * @param rowData
       */
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

      /**
       * 单个删除
       * @param rowData
       */
      handleDelete: function (rowData) {
        this.$confirm('确认删除选中的记录吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => { //确定
          axios.post("/delDeptEvaluatorById", rowData.evaluatorid).then(res => {
            if (res.data == "success") {
              //更新列表
              this.queryDeptEvaluators()
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            } else {
              this.$message({
                type: 'error',
                message: '删除失败，该部门下仍有员工!'
              });
            }
          })
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

    },

    created() {
    },
    mounted() {
      //查询数据

      this.getDeptEvaluators();
      this.getDepts();
      this.getJobs();
      //从sessionStroage中获取用户名
      this.uname = sessionStorage.getItem("uname");

    }


  }


</script>

<style scoped>
  .el-header, .el-footer {
    color: #333;
    text-align: center;
    line-height: 30px;
    height: 50px !important;
  }


  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
