<template>
  <div>
    <h1>班期维护</h1>
    <el-container>
      <el-main>
        <div align="left" style="float: left;">
          <el-input v-model="listQuery.filter" placeholeder="请输入班期号" style="width: 200px;"></el-input>
          <el-button type="primary" @click="queryGrade">查询</el-button>
        </div>

        <div align="right">
          <el-button type="primary" @click="showAdd">新增</el-button>
          <el-button type="danger" @click="delBatch">删除</el-button>
        </div>

        <!--新增和编辑的对话框-->
        <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="550px">

          <el-form :model="form" :label-position="right" ref="gradeForm" :rules="rules" label-position="right">

            <el-form-item label="班期号" :label-width="formLabelWidth" prop="gradeid" >
              <el-input v-model="form.gradeid" autocomplete="off" style="width: 350px" readonly="true"></el-input>
            </el-form-item>

            <el-form-item label="指定教师" prop="teacherid">
              <el-select v-model="form.teacherid" placeholder="请指定教师"  style="width: 350px">
                <el-option
                  v-for="item in teachers"
                  :key="item.teacherid"
                  :label="item.username"
                  :value="item.teacherid">
                </el-option>
              </el-select>
            </el-form-item>


            <el-form-item label="开班日期" prop="startDate" >
              <el-date-picker
                v-model="form.startDate"
                type="date"
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
                placeholder="选择日期"
              style="width: 350px">
              </el-date-picker>
            </el-form-item>

          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="closeDlog">取 消</el-button>
            <el-button type="primary" @click="addGrade">确 定</el-button>
          </div>
        </el-dialog>



        <el-table
          :data="tableData"
          border
          stripe
          height="590"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="100"
            align="center">
          </el-table-column>

          <el-table-column
            type="index"
            label="序号"
            width="100"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="gradeid"
            label="班期期号"
            width="230"
            align="center"
            header-align="center"
          >
          </el-table-column>

          <el-table-column
            prop="username"
            label="指定教师"
            width="350"
            align="center">
          </el-table-column>

          <el-table-column
            prop="teacherid"
            label="指定教师id"
            width="430"
            align="center"
            v-if="false">
          </el-table-column>

          <el-table-column
            prop="date"
            label="开班日期"
            width="450"
            align="center">
          </el-table-column>

          <el-table-column
            fixed="right"
            label="操作"
            width="200" align="center">
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


    </el-container>
  </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "GradeManagement",
      data() {
        return {
          uname:"",//存储从sessionStorage中的用户名
          gradeForm:{
            teacherid:"" ,//表单验证选择教师
            startDate:"",//表单验证日期
          },

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

          max:'',
          rules: { //表单验证内容
            teacherid: [
              {required: true, message: '请指定教师', trigger: 'change'},
            ],
            startDate: [
              {required: true, message: '请选择开班日期', trigger: 'blur'},
            ],

          },

          //新增或者编辑功能相关数据
          dialogTitle: "新增班期",
          //用于显示对话框的显示和隐藏
          dialogFormVisible: false,
          //定义表单数据
          form: {
            gradeid:"",
            teacherid:"",
            startDate:"",
          },
          /*显示文本默认显示宽度*/
          formLabelWidth: "80px",
          teachers:[],

          //被选中的班期信息
          checkData:[]

        }
      },
      methods: {
        getAllGrade: function () {
          //用于获取全部的部门信息

          axios.post("/getAllGrade", this.listQuery).then(res => {

            //res.data返回的是对象数组
            this.tableData = res.data.grade;
            this.max = res.data.grade[0].gradeid; //获取当前班期的最大值，用于为下一次增加班期存储值
            this.total = res.data.total;
          });

        },
        queryGrade: function () {

          //设置传递到后台的代码为1
          this.listQuery.page = 1;
          this.getAllGrade();
          this.page.currentPage = 1; //默认显示第一页
        },
        handleSizeChange: function (abc) {
          //当每页显示条数发生变化时，触发该事件
          //需要根据当前参数重新去后台查询数据

          this.listQuery.limit = abc;
          this.listQuery.page = 1; //从第一页开始查询
          this.page.currentPage = 1; //默认显示在第一页
          this.getAllGrade();

        },
        handleCurrentChange: function (abc) {
          //当前页码发生变化时，触发该事件
          //获取当前页码，赋值给this.listQuery.page，调用getDept方法
          //val代表当前页码
          this.listQuery.page = abc;
          this.getAllGrade();


        },
        //获取全部的部门信息
        getTeachers: function () {
          axios.get("/getTeachers").then(res => {
            this.teachers = res.data;
          })

        },
        //打开新增对话框
        showAdd: function () {
          this.form={}; //情况表单数据
          this.$nextTick(() => { //清空表单验证内容
            this.$refs['gradeForm'].clearValidate()
          })
          this.dialogTitle = "新增班期";
          this.dialogFormVisible = true;
          this.form.gradeid = this.max+1;//新增班期班期号为当前最大班期号+1
        },

        //新增对话框中的取消按钮事件
        closeDlog: function () {
          //清空数据
          this.form = {};
          //关闭对话框
          this.dialogFormVisible = false;
        },

        //新增或修改班期操作
        addGrade:function () {
          this.$refs["gradeForm"].validate((valid) => { //表单验证通过
            if (valid) {
              axios.post("/addOrUpdGrade",this.form).then(res =>{
                if (res.data=="success"){
                  this.form={};
                  this.dialogFormVisible =false;
                  this.getAllGrade();
                  this.$message({
                    message:this.dialogTitle.substr(0,2) +"成功",//提示信息
                    type:"success"
                  })
                } else {
                  this.form={};
                  this.dialogFormVisible =false;
                  this.getAllGrade();
                  this.$message({
                    message:this.dialogTitle.substr(0,2) +"失败",
                    type:"error"
                  })
                }
              })
            }
          })
        },

        handleEdit:function (rowData) { //打开编辑页面
          this.$nextTick(() => { //清空表单验证内容
            this.$refs['gradeForm'].clearValidate()
          })
          this.dialogTitle ="编辑班期";

          //根据员工编号获取员工的详细信息，展示到对话框
          axios.get("/getGradeById/"+rowData.gradeid).then(res => {
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
            var arrGrade = [];

            for (var i  = 0;i<this.checkData.length;i++){
              arrGrade[i] = this.checkData[i].gradeid;
            }
            axios.post("/delBatchGrade",arrGrade).then(res =>{

              if (res.data == "success"){
                //更新列表
                this.getAllGrade();
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
        this.getAllGrade();
        //从sessionStroage中获取用户名
        this.uname = sessionStorage.getItem("uname");

        this.getTeachers();//预加载信息
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
    margin-bottom: 20px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
