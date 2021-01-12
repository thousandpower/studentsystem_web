<template>
  <div>

    <el-container>
      <el-main>
        <div style="text-align: center;font-size: 26px">
          <span> 金桥工程学员(第</span>
          <el-select v-model="grade" placeholder="请选择" style="width:75px;" @change="classChange()" >
            <el-option
              v-for="item in gradeList"
              :key="item.gradeid"
              :label="item.gradeid"
              :value="item.gradeid"
            ></el-option>
          </el-select><span style="padding-left: 20px">期)</span>
        </div>
        <div align="right">
          <template>
            <el-form :inline="true" class="demo-form-inline" @submit.native.prevent>
              <el-form-item>
                <el-input v-model="listQuery.filter" placeholder="请输入学生名称" @keyup.enter.native="query()"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" icon="el-icon-search" @click="query()">查询</el-button>
              </el-form-item>
            </el-form>
          </template>
        </div>
        <!--新增和编辑的对话框-->
        <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="550px">

          <el-form :model="form" :label-position="right" ref="form" :rules="rules" label-position="right">

            <el-form-item label="学生姓名" :label-width="formLabelWidth" prop="studentname" >
              <el-input v-model="form.studentname" autocomplete="off" style="width: 350px" readonly="true"></el-input>
            </el-form-item>
            <el-form-item label="学生班期" :label-width="formLabelWidth" prop="gradeid" >
              <el-input v-model="form.gradeid" autocomplete="off" style="width: 350px" readonly="true"></el-input>
            </el-form-item>

            <el-form-item label="指定部门" prop="deptno">
              <el-select v-model="form.deptno" placeholder="请指定部门"  style="width: 350px">
                <el-option
                  v-for="item in depts"
                  :key="item.deptno"
                  :label="item.deptname"
                  :value="item.deptno">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="入职日期" prop="hiredate" >
              <el-date-picker
                v-model="form.hiredate"
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
            <el-button type="primary" @click="submit">确 定</el-button>
          </div>
        </el-dialog>


        <el-table
          :data="tableData"
          border
          stripe
          height="588px"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >


          <el-table-column
            type="index"
            label="序号"
            width="150"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="studentid"
            label="学生id"
            width="180"
            align="center"
            header-align="center"
            v-if="false"
          >
          </el-table-column>
          <el-table-column
            prop="studentname"
            label="学生姓名"
            width="200"
            align="center"
            header-align="center"
          >
          </el-table-column>

          <el-table-column
            prop="nation"
            label="民族"
            width="180"
            align="center">
          </el-table-column>

          <el-table-column
            prop="gradeid"
            label="班期id"
            width="200"
            align="center"
            v-if="false">
          </el-table-column>

          <el-table-column
            prop="sex"
            label="性别"
            width="150"
            align="center">
          </el-table-column>

          <el-table-column
            prop="deptname"
            label="所属部门"
            width="330"
            align="center">
          </el-table-column>

          <el-table-column
            prop="appraisal_score"
            label="学校评价"
            width="240"
            align="center">
          </el-table-column>

          <el-table-column
            fixed="right"
            label="操作"
            width="190" align="center">
            <template slot-scope="scope">
              <el-button
                @click="handleEdit(scope.row)"
                type="text"
                size="small" v-show="scope.row.flag">
                <span style="text-decoration: underline">入职办理</span>
              </el-button>
              <el-button type="text"
                         size="small" v-show="!scope.row.flag">
                <span style="color: red;text-decoration: underline;">已入职</span>
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
        name: "DeptAssignment",
      data(){
        var checkTime = (rule, value, callback) => {
          if (value === ''|| value == null || value == undefined) {
            callback(new Error('请选择入职日期'));
          } else if (value < this.getdatatime()) {
            callback(new Error('选中时间不得早于当前时间!'));
          } else {
            callback();
          }
        };

        var checkDept = (rule, value, callback) => {
          if (value === ''|| value == null || value == undefined) {
            callback(new Error('请指定部门'));
          }  else {
            callback();
          }
        };

          return {
            page: {
              currentPage: 1,//当前页码
              sizes: [9, 15, 25]
            },
            gradeList:[],//班期列表
            tableData:[],//表格数据
            checkData: [],//被选中的信息
            tId:"", //教师id
            gradeid:"",//班期id
            grade:"",
            dialogFormVisible:false,
            dialogTitle:"",
            total:0,
            listQuery: {//初始查询条件
              limit: 9,
              page: 1,
              filter: "",  //查询条件
              gradeid:"",//班期号
            },
            form:{ //表单信息
              studentid:'',
              studentname:'',
              deptno:"",
              jobid:"",
              hiredate:"",
            },
            depts:[], //部门列表
            jobs:[], //职位列表
            rules: { //表单验证
              deptno: [
                {required: true,validator: checkDept, trigger: 'blur'}
              ],

              hiredate: [
                {required: true,validator: checkTime, trigger: 'blur'}
              ],
            },
          }
      },
      methods:{
        getGradeByTId(){ //根据当前教师获取所教授的班期
          if(this.tId === "" || this.tId === null || this.tId === undefined){
            this.tId = sessionStorage.getItem("userid");
          }
          axios.get('/getGradeByTId/'+this.tId).then(res => {
            this.grade = res.data[0].gradeid;
            this.gradeid = res.data[0].gradeid;
            this.gradeList =  res.data;
            this.listQuery.gradeid = this.gradeid;

            this.getAssignmentList();//获取可以分配部门的学生列表

          });
        },
        classChange(){ //班期改变之后重新查询
          this.listQuery.page=1;
          this.page.currentPage =1;
          for (var i = 0; i < this.gradeList.length; i++) {
            if(this.grade === parseInt(this.gradeList[i].gradeid)){
              this.gradeid = this.gradeList[i].gradeid;
              this.listQuery.gradeid = this.gradeid;
            }
          }
          this.getAssignmentList();
        },
        getAssignmentList(){ //获取可以分配部门的学生列表
          axios.post('/getAssignmentList/',this.listQuery).then(res =>{
            for(var i=0;i<res.data.students.length;i++){
              if(res.data.students[i].sex==0){ //0为男，1为女
                res.data.students[i].sex='男';
              } else {
                res.data.students[i].sex='女';
              }
            }

            this.tableData = res.data.students;
            this.total = res.data.total;

            for (var i = 0; i < this.tableData.length; i++) {
              this.tableData[i].flag = false;
              if(this.tableData[i].deptname ==null){ //如果已经有部门了，说明分配部门完成，此时隐藏分配按钮
                this.tableData[i].flag = true;
              };
            }
          })
        },

        getdatatime(){//默认显示今天
          this.curtime= new Date();
          var year=this.curtime.getFullYear();
          var month= this.curtime.getMonth()+1<10 ? "0"+(this.curtime.getMonth()+1) : this.curtime.getMonth()+1;
          var day=this.curtime.getDate()<10 ? "0"+this.curtime.getDate() : this.curtime.getDate();
          return year+"-"+month+"-"+day;
        },
        query(){ //执行模糊查询操作
          this.listQuery.page = 1;
          this.page.currentPage =1;
          this.getAssignmentList();
        },

        handleEdit:function (rowData) { //打开分配部门表单
          this.$nextTick(() => {
            this.$refs['form'].clearValidate() //清空表单验证信息
          })
          this.dialogTitle ="分配部门";
          this.form ={};

          //根据员工编号获取员工的详细信息，展示到对话框
          axios.get("/getThisStudent/"+rowData.studentid).then(res => {
            this.form = res.data;
            if(res.data.deptno==0){
              this.form.deptno = "";
            }
            if(res.data.jobid==0){
              this.form.jobid = "";
            }
            this.dialogFormVisible = true;
            this.form.studentname = rowData.studentname;
          })
        },
        //新增对话框中的取消按钮事件
        closeDlog: function () {
          //清空数据
          this.form = {};
          //关闭对话框
          this.dialogFormVisible = false;
        },

        submit(){ //提交表达那，分配部门
          this.$refs["form"].validate((valid) => { //表单验证通过
            if (valid) {
              axios.post('/assign/',this.form).then(res => {
                this.dialogFormVisible = false;
                this.getAssignmentList();
                if (res.data === 'success'){
                  this.$message({
                    message:"分配成功",
                    type:'success'
                  });

                }else {
                  this.$message({
                    message:"fail",
                    type:'error'
                  })
                }
              })
            }else {
              console.log('error submit!!');
              return false;
            }});
        },

        handleSizeChange: function (abc) {
          //当每页显示条数发生变化时，触发该事件
          //需要根据当前参数重新去后台查询数据

          this.listQuery.limit = abc;
          this.listQuery.page = 1; //从第一页开始查询
          this.page.currentPage = 1; //默认显示在第一页
          this.getAssignmentList();

        },
        handleCurrentChange: function (abc) {
          //当前页码发生变化时，触发该事件
          //获取当前页码，赋值给this.listQuery.page，调用g方法
          //val代表当前页码
          this.listQuery.page = abc;
          this.getAssignmentList();
        },

        getDept(){ //获取部门下拉框数据
          axios.get("/getAllDept").then(res =>{
            this.depts = res.data;
          })
        },
        getJob(){ //获取职位下拉框数据
          axios.get("/getAllJobs").then(res =>{
            this.jobs = res.data;
          })
        }
      },
      mounted() {
        //查询数据
        this.getGradeByTId();
        this.getDept();
        this.getJob();
      }
    }
</script>

<style scoped>

</style>
