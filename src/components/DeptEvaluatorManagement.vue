<template>
  <div>
    <el-container>
      <el-header>部门维护表</el-header>


      <el-main>
        <div align="left" style="float: left;">
          <el-input v-model="listQuery.filter" placeholeder="请输入部门姓名" style="width: 200px;"></el-input>
          <el-button type="primary" @click="query">查询</el-button>
        </div>

        <div align="right">
          <el-button type="primary" @click="showAdd">新增</el-button>
          <el-button type="primary" @click="delBatch">删除</el-button>
        </div>

        <!--新增和编辑的对话框-->
        <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="550px">

          <el-form :model="form" :label-position="right" :rules="rules" ref="deptForm">

            <el-form-item label="部门姓名" :label-width="formLabelWidth" prop="ename">
              <el-input v-model="form.deptname" autocomplete="off" style="width: 350px"></el-input>
            </el-form-item>

            <el-form-item label="部门描述">
              <el-input type="textarea" v-model="form.describe"></el-input>
            </el-form-item>

          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="closeDlog">取 消</el-button>
            <el-button type="primary" @click="addDept">确 定</el-button>
          </div>
        </el-dialog>


        <br>

        <el-table
          :data="tableData"
          border
          stripe
          height="650"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="160"
            align="center">
          </el-table-column>

          <el-table-column
            type="index"
            label="序号"
            width="160"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="deptname"
            label="部门名称"
            width="260"
            align="center"
            header-align="center"
          >
          </el-table-column>




          <el-table-column
            prop="describe"
            label="部门描述"
            width="430"
            align="center">
          </el-table-column>


          <el-table-column
            fixed="right"
            label="操作"
            width="170" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
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

      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: "DeptEvaluatorManagement",
    data() {
      return {
        uname:"",//存储从sessionStorage中的用户名

        //表格分页、查询等数据
        tableData: [],
        page: {
          currentPage: 1,//当前页码
          sizes: [9, 15, 25]
        },
        listQuery: {//初始查询条件
          limit: 9,
          page: 1,
          filter: ""  //查询条件
        },
        //总条数，后面会被覆盖
        total: 0,
        //总页数
        pageCount: 0,


        //新增或者编辑功能相关数据
        dialogTitle: "新增部门",
        //用于显示对话框的显示和隐藏
        dialogFormVisible: false,
        //定义表单数据
        form: {
          deptname: "",
          describe:""


        },
        /*显示文本默认显示宽度*/
        formLabelWidth: "80px",
        deptList: [],
        rules: {
          deptname: [
            {required: true, message: '请输入部门名称', trigger: 'blur'},
          ],
          describe: [
            {required: true, message: '请描述部门信息', trigger: 'blur'},
          ],

        },
        //被选中的部门信息
        checkData:[]


      }
    },
    methods: {
      getDepts: function () {
        //用于获取全部的部门信息

        axios.post("/getDepts", this.listQuery).then(res => {

          //res.data返回的是对象数组
          this.tableData = res.data.depts;
          this.total = res.data.total;

        });

      },
      queryDepts: function () {

        //设置传递到后台的代码为1
        this.listQuery.page = 1;
        this.getDepts();
        this.page.currentPage = 1; //默认显示第一页
      },
      handleSizeChange: function (abc) {
        //当每页显示条数发生变化时，触发该事件
        //需要根据当前参数重新去后台查询数据

        this.listQuery.limit = abc;
        this.listQuery.page = 1; //从第一页开始查询
        this.page.currentPage = 1; //默认显示在第一页
        this.getDepts();

      },
      handleCurrentChange: function (abc) {
        //当前页码发生变化时，触发该事件
        //获取当前页码，赋值给this.listQuery.page，调用getDept方法
        //val代表当前页码
        this.listQuery.page = abc;
        this.getDepts();


      },
      //获取全部的部门信息
      getDepts: function () {
        axios.get("/getDepts").then(res => {
          this.deptList = res.data;
        })

      },
      //打开新增对话框
      showAdd: function () {
        this.form={};

        this.dialogTitle = "新增部门";
        this.dialogFormVisible = true;
      },

      //新增对话框中的取消按钮事件
      closeDlog: function () {
        //清空数据
        this.form = {};
        //关闭对话框
        this.dialogFormVisible = false;
      },
      addDept:function () {
        this.$refs["deptForm"].validate((valid) => {
          if (valid) {
            axios.post("/addOrUpdDept",this.form).then(res =>{
              if (res.data=="success"){
                this.form={};
                this.dialogFormVisible =false;
                this.getDepts();
                this.$message({

                  message:this.dialogTitle.substr(0,2) +"成功",
                  type:"success"
                })
              } else {
                this.form={};
                this.dialogFormVisible =false;
                this.getDepts();
                this.$message({
                  message:this.dialogTitle.substr(0,2) +"失败",
                  type:"error"
                })
              }
            })
          }
        })
      },

      handleEdit:function (rowData) {

        this.dialogTitle ="编辑员工";


        //根据员工编号获取员工的详细信息，展示到对话框
        axios.get("/getDeptById/"+rowData.deptno).then(res => {
          this.form = res.data;
          this.dialogFormVisible = true;
        })
      },

      handleSelectionChange:function(val){
        //被选中的数据：行对象数组

        this.checkData = val;
      },


      delBatch:function () {

        if (this.checkData.length == 0){
          this.$message({
            message:"请选择要删除的记录",
            type:"warning"
          });
          return;
        }
        this.$confirm('确认删除选中的记录吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => { //确定
          var arrDeptnos = [];

          for (var i  = 0;i<this.checkData.length;i++){
            arrDeptnos[i] = this.checkData[i].Deptno;
          }
          axios.post("/delBatchDept",arrDeptnos).then(res =>{

            if (res.data == "success"){
              //更新列表
              this.getDepts();
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            } else {
              this.$message({
                type: 'error',
                message: '删除失败!'
              });
            }
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });



      }
    },

    created() {
    },
    mounted() {
      //查询数据
      this.getDepts();

      //从sessionStroage中获取用户名
      this.uname = sessionStorage.getItem("uname")
    }


  }


</script>

<style scoped>
  .el-header, .el-footer {
    color: #333;
    text-align: center;
    line-height: 60px;
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
