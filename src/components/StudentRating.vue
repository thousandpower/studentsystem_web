<template>
  <div>
    <el-container>


     <el-main>
      <div align="center">
    <div style="text-align: center;font-size: 26px">
      <span> 金桥工程学员(第</span>
      <el-select v-model="grade" placeholder="请选择" style="width:70px;" @change="classChange()" >
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
    <el-table
      :data="tableData"
      stripe
      style="width: 100%;height: 100%;"
    height="528px">
      <el-table-column
        prop="studentid"
        label="学号"
        min-width="80"
        align="center">
      </el-table-column>
      <el-table-column
        prop="student_name"
        label="姓名"
        min-width="180"
        align="center">
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别"
        min-width="150"
        align="center">
      </el-table-column>
      <el-table-column
        label="培训期间成绩"  align="center">
        <el-table-column
          prop="html"
          label="HTML"
          align="center"
        min-width="100">
        </el-table-column>
        <el-table-column
          prop="java_base"
          label="JAVA基础"
          align="center"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="oracle"
          label="ORACLE"
          align="center"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="java_high"
          label="JAVA高级"
          align="center"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="js"
          label="JS"
          align="center"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="l1"
          label="L1面试"
          align="center"
          min-width="100">
        </el-table-column>
      </el-table-column>
      <el-table-column
        prop="appraisal_score"
        label="学校评价"
        min-width="200"
        align="center">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="150px"
        align="center">
        <template slot-scope="scope">
          <el-button
            @click="openEdit(scope.$index, scope.row)"
            type="text"
            size="small" v-show="!scope.row.flag">
            <span style="text-decoration: underline">打分</span>
          </el-button>
          <el-button
            @click="openEdit(scope.$index, scope.row)"
            type="text"
            size="small" v-show="scope.row.flag">
            <span style="color: red;text-decoration: underline;">已打分</span>
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
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="900px">
      <div>
        <el-form :model="formInfo" :rules="rules" ref="studentInfo">
          <table border="1px" cellspacing="0px" style="border-collapse:collapse" align="center">
            <tr>
              <td style="width: 110px">姓名</td>
              <td style="width: 110px">

                <el-input v-model="formInfo.studentName" class="paperview-input-text" readonly></el-input>
              </td>
              <td style="width: 55px">性别</td>
              <td style="width: 110px">
                <el-input v-if="formInfo.sex == '1'" value="男" class="paperview-input-text" readonly></el-input>
                <el-input v-if="formInfo.sex =='0'" value="女" class="paperview-input-text" readonly></el-input>
              </td>
              <td style="width: 55px">民族</td>
              <td style="width: 110px">
                <el-input v-model="formInfo.nation" class="paperview-input-text" readonly></el-input>
              </td>
              <td style="width: 110px" rowspan="4"><img v-if="formInfo.images_directory" :src="formInfo.images_directory" width="110px" >
                <img v-else ="formInfo.images_directory" src = "http://localhost:8087/upload/201e0451001545b6b0568ed6db4d8a53-defaultpicture.jpg"
                     width="110px"></td>
            </tr>
            <tr>
              <td>出生年月</td>
              <td>
                <el-input v-model="formInfo.birthday" class="paperview-input-text" readonly></el-input>
              </td>
              <td>籍贯</td>
              <td>
                <el-input v-model="formInfo.nativePlace" class="paperview-input-text" readonly></el-input>
              </td>
              <td>婚否</td>
              <td>
                <el-input v-if="formInfo.maritalStatus == '0'" value="未婚" class="paperview-input-text"
                          readonly></el-input>
                <el-input v-if="formInfo.maritalStatus =='1'" value="已婚" class="paperview-input-text"
                          readonly></el-input>
                <el-input v-if="formInfo.maritalStatus == '2'" value="丧偶" class="paperview-input-text"
                          readonly></el-input>
                <el-input v-if="formInfo.maritalStatus =='3'" value="离婚" class="paperview-input-text"
                          readonly></el-input>
              </td>
            </tr>
            <tr>
              <td>联系电话</td>
              <td colspan="2">
                <el-input v-model="formInfo.phone" class="paperview-input-text" readonly></el-input>
              </td>
              <td>身份证号码</td>
              <td colspan="2">
                <el-input v-model="formInfo.idNumber" class="paperview-input-text" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td>毕业学校</td>
              <td colspan="2">
                <el-input v-model="formInfo.college" class="paperview-input-text" readonly></el-input>
              </td>
              <td>专业</td>
              <td colspan="2">
                <el-input v-model="formInfo.major" class="paperview-input-text" readonly></el-input>
              </td>
            </tr>
            <tr>
              <td>备注</td>
              <td colspan="6">
                <el-input v-model="formInfo.remarks" type="textarea"
                          class="paperview-input-textarea" readonly rows="2"></el-input>
              </td>
            </tr>
          </table>
        </el-form>
      </div>
      <br>


      <div>


            <el-form :model="formEvaInfoSc" :rules="rules" ref="studentEvaInfoSc">

              <table border="1px" cellspacing="0px" style="border-collapse:collapse" align="center">
                <tr>
                  <td colspan="12"></td>
                </tr>
                <tr>
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
                  <td>
                    <el-input v-model="formEvaInfoSc.gradeid" class="paperview-input-text" readonly="true"></el-input>
                    <br><br>
                  </td>
                  <td>
                    <el-form-item prop="teachername"><el-input v-model="formEvaInfoSc.username" class="paperview-input-text" readonly="true"></el-input></el-form-item>
                  </td>
                  <td>
                    <el-form-item prop="html"><el-input v-model.number="formEvaInfoSc.html" class="paperview-input-text" :readonly="readonly"></el-input></el-form-item>
                  </td>
                  <td>
                    <el-form-item prop="oracle"><el-input v-model.number="formEvaInfoSc.oracle" class="paperview-input-text" :readonly="readonly"></el-input></el-form-item>
                  </td>
                  <td>
                    <el-form-item prop="js"> <el-input v-model.number="formEvaInfoSc.js" class="paperview-input-text" :readonly="readonly"></el-input></el-form-item>
                  </td>
                  <td>
                    <el-form-item prop="java_base"> <el-input v-model.number="formEvaInfoSc.java_base" class="paperview-input-text" :readonly="readonly"></el-input></el-form-item>
                  </td>
                  <td>
                    <el-form-item prop="java_high"><el-input v-model.number="formEvaInfoSc.java_high" class="paperview-input-text" :readonly="readonly"></el-input></el-form-item>
                  </td>
                  <td>
                    <el-form-item prop="l1"><el-input v-model.number="formEvaInfoSc.l1" class="paperview-input-text" :readonly="readonly"></el-input></el-form-item>
                  </td>
                  <td colspan="2">
                    <el-form-item prop="appraisal_score"><el-input v-model.number="formEvaInfoSc.appraisal_score" class="paperview-input-text"
                                                                   :readonly="readonly"></el-input></el-form-item>
                  </td>

                </tr>
                <tr>
                  <td colspan="2">评价(包括主要优点及缺陷)</td>
                  <td colspan="10">
                    <el-form-item prop="appraisal_content"><el-input v-model="formEvaInfoSc.appraisal_content" type="textarea"
                                                            class="paperview-input-textarea"  rows="3" :readonly="readonly"></el-input></el-form-item>
                  </td>
                </tr>
              </table>
              <br>
              <el-button type="primary" @click="submitForm" v-if="!readonly">确  认</el-button>
            </el-form>


      </div>
    </el-dialog>
  </div>

     </el-main>
      <el-footer></el-footer>
    </el-container>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "StudentRating"
    , data(){
      //自定义表单验证
      var checkItemScore = function (rule, value, callback) {
        if (value == '' || value == null || value == undefined) {
          callback(new Error('请输入成绩'));
        } else {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入整数'));
          } else {
            if (value > 100 || value < 0) {
              callback(new Error('请输入0-100'));
            } else {
              callback();
            }
          }
        }
      };
      var checkTotalScore = function (rule, value, callback) {
        if (value == '' || value == null || value == undefined) {
          callback(new Error('请输入成绩'));
        } else {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入整数'));
          } else {
            if (value > 5 || value < 0) {
              callback(new Error('总评价评分标准为5分制'));
            } else {
              callback();
            }
          }
        }
      };
      return{


        page: {
          currentPage: 1,//当前页码
          sizes: [9, 15, 25]
        },
        gradeList:[],//班期列表
        tableData:[],
        readonly:false,//设置只读属性
        checkData: [],//被选中的信息
        tId:"", //教师id
        gradeid:"",//班期号
        grade:"",
        dialogFormVisible:false,
        dialogTitle:"",
        sId:"", //选中学生信息
        total:0,
        listQuery: {//初始查询条件
          limit: 9,
          page: 1,
          filter: "",  //查询条件
          gradeid:"",//班期号
        },

        //学生基础信息的声明
        formInfo: {
          studentid: "",
          studentName: "",
          sex: "",
          nativePlace: "",
          birthday: "",
          maritalStatus: "",
          phone: "",
          idNumber: "",
          hiredate: "",
          college: "",
          major: "",
          imagesDirectory: "11",
          remarks: "",
          deptno: "",
          gradeid: "",
          jobname: "",
          nation:""
        },

        formEvaInfoSc: { //评分表单信息
          studentid: "",
          evaluatorid:2031,
          gradeid: "",
          username: "lrc",
          html: "",
          oracle: "",
          js: "",
          java_base: "",
          java_high: "",
          l1: "",
          appraisal_score: "",
          appraisal_content: ""
        },

        rules: { //评分的表单验证
          html:[
            {validator: checkItemScore, trigger: 'blur'}
          ],
          js:[
            {validator: checkItemScore, trigger: 'blur'}
          ],
          java_base:[
            {validator: checkItemScore, trigger: 'blur'}
          ],
          java_high:[
            {validator: checkItemScore, trigger: 'blur'}
          ],
          oracle:[
            {validator: checkItemScore, trigger: 'blur'}
          ],
          l1:[
            {validator: checkItemScore, trigger: 'blur'}
          ],
          appraisal_score:[
            {validator: checkTotalScore, trigger: 'blur'}
          ],
          appraisal_content:[
            {required: true, message: '请输入评价', trigger: 'blur'}
          ]
        },

      }
    },
    methods:{
      getGradeByTId(){ //根据当前教师获取班期列表
        if(this.tId === "" || this.tId === null || this.tId === undefined){
          this.tId = sessionStorage.getItem("userid");
        }
        axios.get('/getGradeByTId/'+this.tId).then(res => {
          this.grade = res.data[0].gradeid;
          this.gradeid = res.data[0].gradeid;
          this.gradeList =  res.data;
          this.listQuery.gradeid = this.gradeid;

          this.getAllStudentByPage();

        });
      },

      classChange(){ //班期改变后
        this.listQuery.page=1;
        this.page.currentPage = 1;
        for (var i = 0; i < this.gradeList.length; i++) {
          if(this.grade === parseInt(this.gradeList[i].gradeid)){
            this.gradeid = this.gradeList[i].gradeid;
            this.listQuery.gradeid = this.gradeid;
          }
        }
        this.getAllStudentByPage();
      },
      getAllStudentByPage(){ //获取当前班期下的所有学生信息
        axios.post('/getStudentByPage/',this.listQuery).then(res =>{
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
            if(!isNaN(this.tableData[i].appraisal_score)){ //如果总评成绩为数字，说明评分成功，隐藏评分按钮
              this.tableData[i].flag = true;
            };
          }
        })
      },

      query(){ //模糊查询
        this.listQuery.page = 1;
        this.page.currentPage = 1;
        this.getAllStudentByPage();
      },

      submitForm(){ //提交打分表单
        this.$refs["studentEvaInfoSc"].validate((valid) => { //通过验证
          if (valid) {
            axios.post('/marking/',this.formEvaInfoSc).then(res => {

              this.dialogFormVisible = false;
              this.getAllStudentByPage();
              if (res.data === 'success'){
                this.$message({
                  message:"评价成功",
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


      openEdit(index,row){ //打开评分表单页面
        this.$nextTick(() => { //清空表单验证内容
          this.$refs['studentEvaInfoSc'].clearValidate()
        })

        this.formEvaInfoSc={};
        this.sId = row.studentid; //获取选中学生id
        axios.get('/getInfoBysId/'+this.sId).then(res => {
          this.formInfo = res.data;
        });

        this.formEvaInfoSc.studentid = this.sId;
        this.formEvaInfoSc.username = sessionStorage.getItem("uname");
        this.formEvaInfoSc.evaluatorid = sessionStorage.getItem("userid");
        this.formEvaInfoSc.gradeid = this.gradeid;

        if(row.flag == true){ //如果以及评完分，设置表单内容只读
          axios.get('/getEvaluationBysId/'+this.sId).then(res => {
            this.formEvaInfoSc = res.data;
          });
          this.readonly = true;
        }

        this.dialogFormVisible = true;
        this.dialogTitle = "学生评价"
      },


      handleSizeChange: function (abc) {
        //当每页显示条数发生变化时，触发该事件
        //需要根据当前参数重新去后台查询数据

        this.listQuery.limit = abc;
        this.listQuery.page = 1; //从第一页开始查询
        this.page.currentPage = 1; //默认显示在第一页
        this.getAllStudentByPage();

      },
      handleCurrentChange: function (abc) {
        //当前页码发生变化时，触发该事件
        //获取当前页码，赋值给this.listQuery.page，调用g方法
        //val代表当前页码
        this.listQuery.page = abc;
        this.getAllStudentByPage();
      },
    },
    mounted() {
      this.getGradeByTId();
    }
  }
</script>

<style scoped>
  .Height >>>label{
    line-height: 20px;
  }
</style>
