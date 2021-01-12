<template>
  <div>
    <h1>教师管理</h1>
    <el-container>
      <el-main>
        <div align="left" style="float: left;">
          <el-input v-model="listQuery.filter" placeholder="请输入姓名" style="width: 200px;"></el-input>
          <el-button type="primary" @click="queryTeacher">查询</el-button>
        </div>

        <div align="right">
          <el-button type="primary" @click="showAdd">新增</el-button>
          <el-button type="danger" @click="delBatch">删除</el-button>
        </div>

        <!--新增和编辑的对话框-->
        <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="550px">

          <el-form :model="form" :label-position="right" ref="teacherform" :rules="rules" >

            <el-form-item label="教师id" prop="teacherid" v-if="false" :label-width="formLabelWidth">
              <el-input v-model="form.teacherid" autocomplete="off" style="width: 350px" ></el-input>
            </el-form-item>

            <el-form-item label="教师姓名" prop="username" :label-width="formLabelWidth">
              <el-input v-model="form.username" autocomplete="off" style="width: 350px"></el-input>
            </el-form-item>

            <el-form-item label="教师年龄" prop="age" :label-width="formLabelWidth">
              <el-input v-model.number="form.age" autocomplete="off" style="width: 350px"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex" :label-width="formLabelWidth">
              <el-radio-group v-model="form.sex" size="medium">
                <el-radio :label="0" >男</el-radio>
                <el-radio :label="1">女</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="手机号码" prop="phone" :label-width="formLabelWidth">
              <el-input v-model="form.phone" autocomplete="off" style="width: 350px"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="closeDlog">取 消</el-button>
            <el-button type="primary" @click="addTeacher">确 定</el-button>
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
            type="selection"

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
            prop="teacherid"
            label="教师编号"

            align="center"
            header-align="center"
          >
          </el-table-column>

          <el-table-column
            prop="username"
            label="教师姓名"

            align="center">
          </el-table-column>

          <el-table-column
            prop="age"
            label="教师年龄"

            align="center"
            >
          </el-table-column>

          <el-table-column
            prop="sex"
            label="性别"

            align="center">
          </el-table-column>



          <el-table-column
            prop="phone"
            label="手机号码"

            align="center">
          </el-table-column>

          <el-table-column
            fixed="right"
            label="操作"
            width="170" align="center">
            <template slot-scope="scope">
              <el-button type="primary" @click="handleEdit(scope.row)" size="mini">编辑</el-button>
              <el-button type="danger" @click="handleDelete(scope.row)" size="mini">删除</el-button>
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
        name: "TeacherEvaluateManagement",
      data() {
        var checkName = function (rule, value, callback) {
          if (value == '' || value == null || value == undefined) {
            callback(new Error('请输入姓名'));
          } else {
            if (!isNaN(value)) {
              callback(new Error('请正确输入姓名'));
            } else {
              callback();
            }
          }
        };
        var checkage = function (rule, value, callback) {
          if (value == '' || value == null || value == undefined) {
            callback(new Error('年龄不能为空'));
          } else {
            if (!Number.isInteger(value)) {
              callback(new Error('请输入整数'));
            } else {
              if (value > 100 || value < 18) {
                callback(new Error('年龄范围为18-100'));
              } else {
                callback();
              }
            }
          }
        };

        var checksex = function (rule, value, callback) {
          if (value == '' || value == null || value == undefined) {
            callback(new Error('请选择性别'));
          } else {
            callback();
          }
        };

        var checkPhone = function (rule, value, callback) {
          if (value == '' || value == null || value == undefined) {
            callback(new Error('请输入手机号码'));
          } else {
            if  (!/^(((13[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[3-8]{1})|(18[0-9]{1})|(19[0-9]{1})|(14[5-7]{1}))+\d{8})$/.test(value)) {
              callback(new Error('手机号格式错误'))
            }else {
              callback()
            }
          }};
        return {
          uname:"",//存储从sessionStorage中的用户名
          teacherform:{ //表单验证的属性
            username:"",
            age:"",
            sex:"",
            phone:"",
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
          //新增或者编辑功能相关数据
          dialogTitle: "新增教师",
          //用于显示对话框的显示和隐藏
          dialogFormVisible: false,
          //定义表单数据
          form: {
            teacherid:"",
            username:"",
            age:"",
            sex:0,
            phone:"",
          },
          /*显示文本默认显示宽度*/
          formLabelWidth: "80px",

          //被选中的班期信息
          checkData:[],
          rules: { //表单验证功能
            username:[
              {required: true,validator:checkName,trigger:'blur'}
            ],
            age:[
              {required: true,validator:checkage,trigger:'blur'}
            ],
            sex:[
              {required: true, message: '请选择性别', trigger: 'blur'},
            ],
            phone:[
              {required: true,validator:checkPhone,trigger:'blur'}
            ]

          },
        }
      },
      methods: {
        getAllTeacher: function () {
          //用于获取全部的教师信息

          axios.post("/getAllTeacher", this.listQuery).then(res => {

            //res.data返回的是对象数组

            for(var i=0;i<res.data.teacher.length;i++){
              if(res.data.teacher[i].sex==0){
                res.data.teacher[i].sex='男';
              } else {
                res.data.teacher[i].sex='女';
              }
            }
            this.tableData = res.data.teacher;
            this.total = res.data.total;

          });

        },
        queryTeacher: function () {

          //设置传递到后台的代码为1
          this.listQuery.page = 1;
          this.getAllTeacher();
          this.page.currentPage = 1; //默认显示第一页
        },
        handleSizeChange: function (abc) {
          //当每页显示条数发生变化时，触发该事件
          //需要根据当前参数重新去后台查询数据

          this.listQuery.limit = abc;
          this.listQuery.page = 1; //从第一页开始查询
          this.page.currentPage = 1; //默认显示在第一页
          this.getAllTeacher();

        },
        handleCurrentChange: function (abc) {
          //当前页码发生变化时，触发该事件
          //获取当前页码，赋值给this.listQuery.page，调用getDept方法
          //val代表当前页码
          this.listQuery.page = abc;
          this.getAllTeacher();
        },

        //打开新增对话框
        showAdd: function () {
          this.$nextTick(() => { //清空表单验证
            this.$refs['teacherform'].clearValidate()
          });
          this.form={};
          this.dialogTitle = "新增教师";
          this.dialogFormVisible = true;
        },

        //新增对话框中的取消按钮事件
        closeDlog: function () {
          //清空数据
          this.form = {};
          //关闭对话框
          this.dialogFormVisible = false;
        },

        addTeacher:function () { //新增或编辑教师
          this.$refs['teacherform'].validate((valid) => {
            if (valid) {
              axios.post("/addOrUpdTeacher",this.form).then(res =>{
                if (res.data=="success"){
                  this.form={};
                  this.dialogFormVisible =false;
                  this.getAllTeacher();
                  this.$message({
                    message:this.dialogTitle.substr(0,2) +"成功",
                    type:"success"
                  })
                } else {
                  this.form={};
                  this.dialogFormVisible =false;
                  this.getAllTeacher();
                  this.$message({
                    message:this.dialogTitle.substr(0,2) +"失败",
                    type:"error"
                  })
                }
              })
            }
          })
        },

        handleEdit:function (rowData) { //编辑页面
          this.$nextTick(() => {
            this.$refs['teacherform'].clearValidate()
          });

          this.dialogTitle ="编辑教师信息";

          //根据员工编号获取员工的详细信息，展示到对话框
          axios.get("/getTeacherById/"+rowData.teacherid).then(res => {
            this.form = res.data;
            this.dialogFormVisible = true;
          })
        },

        handleDelete:function (rowData) { //按行删除
          this.$confirm('确认删除该条数据吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => { //确定

            axios.get("/delTeacherById/"+rowData.teacherid).then(res =>{

              if (res.data == "success"){
                //更新列表
                this.getAllTeacher();
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
        },

        handleSelectionChange:function(val){
          //被选中的数据：行对象数组

          this.checkData = val;
        },

        delBatch:function () { //批量删除教师

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
            var arrTeacher = [];

            for (var i  = 0;i<this.checkData.length;i++){
              arrTeacher[i] = this.checkData[i].teacherid;
            }
            axios.post("/delBatchTeacher",arrTeacher).then(res =>{

              if (res.data == "success"){
                //更新列表
                this.getAllTeacher();
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
        this.getAllTeacher();
        //从sessionStroage中获取用户名
        this.uname = sessionStorage.getItem("uname");
      }
    }

</script>

<style scoped>

</style>
