<template>
  <div>
    <h1>学员信息列表</h1>
    <div align="left" style="float: left">
      <el-input v-model="listQuery.filter" placeholder="请输入学员姓名" style="width: 200px"></el-input>
      <el-select v-model="listQuery.gradeid" placeholder="请选择班期" style="width: 200px">
        <el-option value="全部" label="全部"></el-option>
        <el-option v-for="item in gradeData" :key="item" :value="item" :label="item"></el-option>
      </el-select>
      <el-button type="primary" @click="queryStudents">查询</el-button>
    </div>
    <div align="right">
      <el-button type="primary" @click="showAdd">新增</el-button>
      <el-button type="danger" @click="deleteBatch">删除</el-button>
    </div>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" :width="'70%'" :top="'3%'">
      <el-form :model="studentForm" ref="ruleForm" label-position="right" :rules="rules" style="height: 520px">
        <el-form-item label="学员编号" style="display: none">
          <el-input v-model="studentForm.studentid"></el-input>
        </el-form-item>
        <el-col :span="7">
          <el-form-item label="姓名" prop="studentName" :label-width="formLabelWidth">
            <el-input v-model="studentForm.studentName" placeholder="请输入姓名" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item label="民族" prop="nation" :label-width="formLabelWidth">
            <el-input v-model="studentForm.nation" placeholder="请输入民族" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item label="出生日期" prop="birthday" :label-width="formLabelWidth">
            <el-date-picker
              v-model="studentForm.birthday"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="请选择出生日期" style="width: 300px">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="联系电话" prop="phone" :label-width="formLabelWidth">
            <el-input v-model="studentForm.phone" placeholder="请输入联系电话" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item label="毕业院校" prop="college" :label-width="formLabelWidth">
            <el-input v-model="studentForm.college" placeholder="请输入毕业院校" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item label="班期" prop="gradeid" :label-width="formLabelWidth">
            <el-select v-model="studentForm.gradeid" placeholder="请选择班期" style="width: 300px">
              <el-option v-for="item in gradeData" :key="item" :value="item" :label="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="2">
          <el-form-item label="性别" :label-width="formLabelWidth">
            <el-radio-group v-model="studentForm.sex">
              <el-radio :label="0">男</el-radio>
              <el-radio :label="1">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="婚否" prop="maritalStatus" :label-width="formLabelWidth">
            <el-select v-model="studentForm.maritalStatus" placeholder="请选择婚否" style="width: 300px">
              <el-option :value="0" label="未婚"></el-option>
              <el-option :value="1" label="已婚"></el-option>
              <el-option :value="2" label="丧偶"></el-option>
              <el-option :value="3" label="离婚"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="籍贯" prop="nativePlace" :label-width="formLabelWidth">
            <el-input v-model="studentForm.nativePlace" placeholder="请输入籍贯" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item label="身份证号" prop="idNumber" :label-width="formLabelWidth">
            <el-input v-model="studentForm.idNumber" placeholder="请输入身份证号" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item label="专业" prop="major" :label-width="formLabelWidth">
            <el-input v-model="studentForm.major" placeholder="请输入专业" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item label="职务" :label-width="formLabelWidth" style="visibility: hidden">
            <el-input v-model="studentForm.jobid" placeholder="请输入职务" style="width: 300px"
                      readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4" :offset="3">
          <span>个人证件照</span>
          <el-upload
            class="avatar-uploader"
            action="http://localhost:8087/upload/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <div style="border-style: dashed;border-color: #4A5064;border-width:1px">
              <img v-if="studentForm.imagesDirectory" :src="studentForm.imagesDirectory" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </div>
          </el-upload>
        </el-col>
        <el-col :span="16">
          <el-form-item label="备注" :label-width="formLabelWidth">
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容"
              v-model="studentForm.remarks"
              align="center"
              style="width: 690px"
              class="el-row">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-button type="primary" @click="saveThisStudent">保 存</el-button>
          <el-button @click="cancelThisDialog">取 消</el-button>
        </el-col>
      </el-form>
    </el-dialog>
    <el-table
      :data="tableData"
      border
      stripe
      height="631"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55"
        align="center">
      </el-table-column>
      <el-table-column
        type="index"
        width="55"
        label="序号"
        align="center">
        <template slot-scope="scope">
          <!--作用域插槽slot-scope，设置序号从1一直到获得数据的最后一个元素的数组下标+1-->
          <span>{{(page.currentPage - 1)*listQuery.limit + scope.$index +1}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="studentid"
        label="学生编号"
        v-if="show"
        align="center">
      </el-table-column>
      <el-table-column
        prop="student_name"
        label="学员姓名"
        min-width="6%"
        align="center">
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别"
        min-width="5%"
        align="center">
        <template slot-scope="scope">
          {{sexData[(scope.row.sex)].label}}
        </template>
      </el-table-column>
      <el-table-column
        prop="nation"
        label="民族"
        min-width="5%"
        show-overflow-tooltip
        align="center">
      </el-table-column>
      <el-table-column
        prop="birthday"
        label="出生日期"
        min-width="7%"
        align="center">
      </el-table-column>
      <el-table-column
        prop="id_number"
        label="身份证号"
        min-width="12%"
        align="center">
      </el-table-column>
      <el-table-column
        prop="marital_status"
        label="婚否"
        min-width="6%"
        align="center">
        <template slot-scope="scope">
          {{maritalData[(scope.row.marital_status)].label}}
        </template>
      </el-table-column>
      <el-table-column
        prop="native_place"
        label="籍贯"
        min-width="7%"
        show-overflow-tooltip
        align="center">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机号"
        min-width="9%"
        align="center">
      </el-table-column>
      <el-table-column
        prop="college"
        label="毕业院校"
        min-width="8%"
        show-overflow-tooltip
        align="center">
      </el-table-column>
      <el-table-column
        prop="gradeid"
        label="班期"
        min-width="5%"
        align="center">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        min-width="10%"
        align="center"
        header-align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="removeThis(scope.row)">删除</el-button>
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
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "StudentManagement",
    data() {
      return {
        readonly: true,
        show: false,
        tableData: [],
        page: {
          //当前页码
          currentPage: 1,
          sizes: [5, 8, 10, 20]
        },
        //初始查询条件
        listQuery: {
          limit: 8,
          page: 1,
          filter: "",
          gradeid: ""
        },
        //总条数
        total: 0,
        //总页数
        pageCount: 0,
        sexData: {
          '0': {
            label: '男'
          },
          '1': {
            label: '女'
          }
        },
        maritalData: {
          '0': {
            label: '未婚'
          },
          '1': {
            label: '已婚'
          },
          '2': {
            label: '丧偶'
          },
          '3': {
            label: '离婚'
          }
        },
        //新增或编辑相关数据
        dialogTitle: "新增学员",
        //控制对话框的显示和隐藏
        dialogFormVisible: false,
        studentForm: {
          studentid: "",
          studentName: "",
          birthday: "",
          phone: "",
          college: "",
          sex: 0,
          nativePlace: "",
          maritalStatus: 0,
          idNumber: "",
          nation: "",
          remarks: "",
          gradeid: "",
          jobid: "0",
          imagesDirectory: ""
        },
        //设置文本显示宽度
        formLabelWidth: "80px",
        //被选中的员工信息
        checkData: [],
        //班期数据
        gradeData: [],
        rules: {
          studentName: [
            {required: true, message: '学员姓名不能为空', trigger: 'blur'},
            {required: true, message: '学员姓名不能为空', trigger: 'submit'}
          ],
          nation: [
            {required: true, message: '民族不能为空', trigger: 'blur'},
            {required: true, message: '民族不能为空', trigger: 'submit'}
          ],
          birthday: [
            {required: true, message: '出生日期不能为空', trigger: 'blur'},
            {required: true, message: '出生日期不能为空', trigger: 'submit'}
          ],
          phone: [
            {required: true, message: '联系电话不能为空', trigger: 'blur'},
            {
              pattern: /^1[0-9]{10}$/,
              message: '请输入正确的手机号码',
              trigger: 'blur'
            },
            {
              pattern: /^1[0-9]{10}$/,
              message: '请输入正确的手机号码',
              trigger: 'submit'
            },
            {required: true, message: '联系电话不能为空', trigger: 'submit'}
          ],
          college: [
            {required: true, message: '毕业院校不能为空', trigger: 'blur'},
            {required: true, message: '毕业院校不能为空', trigger: 'submit'}
          ],
          nativePlace: [
            {required: true, message: '籍贯不能为空', trigger: 'blur'},
            {required: true, message: '籍贯不能为空', trigger: 'submit'}
          ],
          idNumber: [
            {required: true, message: '身份证号码不能为空', trigger: 'blur'},
            {required: true, message: '身份证号码不能为空', trigger: 'submit'},
            {
              pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
              message: '请输入正确的身份证号码',
              trigger: 'blur'
            },
            {
              pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
              message: '请输入正确的身份证号码',
              trigger: 'submit'
            }
          ],
          major: [
            {required: true, message: '专业不能为空', trigger: 'blur'},
            {required: true, message: '专业不能为空', trigger: 'submit'}
          ],
          gradeid: [
            {required: true, message: '班期不能为空', trigger: 'submit'},
          ]
        }
      }
    },
    methods: {
      getAllStudent: function () {
        axios.post("/getAllStudent", this.listQuery).then(res => {
          this.tableData = res.data.students;
          this.total = res.data.total;
        })
      },
      handleSizeChange: function (val) {
        //当每页显示条数发生变化时触发该事件
        //根据当前参数重新去后台查询数据
        //val代表limit
        this.listQuery.limit = val;
        this.listQuery.page = 1;
        //默认显示第一页
        this.page.currentPage = 1;
        this.getAllStudent();
      },
      handleCurrentChange: function (val) {
        //当前页码发生变化时触发该事件
        //获取当前页码赋值给this.listQuery.page，然后调用getEmps方法
        //val代表当前页码
        this.listQuery.page = val;
        this.getAllStudent();
      },
      queryStudents: function () {
        this.listQuery.page = 1;
        this.getAllStudent();
        //默认显示第一页
        this.page.currentPage = 1;
      },
      showAdd: function () {
        this.dialogTitle = "新增学员";
        this.dialogFormVisible = true;
      },
      handleSelectionChange: function (val) {
        //被选中的数据：行对象数组
        this.checkData = val;
      },
      deleteBatch: function () {
        if (this.checkData.length == 0) {
          this.$message({
            message: "请选择要删除的记录",
            type: "warning"
          });
          return;
        } else {
          this.$confirm('确认删除选中的记录吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {//确定
            var arrStudents = [];
            for (var i = 0; i < this.checkData.length; i++) {
              arrStudents[i] = this.checkData[i].studentid;
            }
            axios.post("/removeAnyStudents", arrStudents).then(res => {
              if (res.data == 'success') {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                this.getAllStudent();
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
      removeThis: function (rowData) {
        this.$confirm('确认删除选中的记录吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //确定后执行
          var arrStudentid = [rowData.studentid];
          axios.post("/removeAnyStudents", arrStudentid).then(res => {
            if (res.data === 'success') {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getAllStudent();
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
      getAllGrade: function () {
        axios.get("/getAllGrade").then(res => {
          this.gradeData = res.data.data;
        })
      },
      cancelThisDialog: function () {
        //关闭弹框
        this.dialogFormVisible = false;
        //清空表单
        this.studentForm = {
          studentid: "",
          studentName: "",
          birthday: "",
          phone: "",
          college: "",
          sex: 0,
          nativePlace: "",
          maritalStatus: 0,
          idNumber: "",
          nation: "",
          remarks: "",
          gradeid: "",
          jobid: "0",
          imagesDirectory: ""
        };
        //清空表单验证
        this.$refs.ruleForm.resetFields();
      },
      saveThisStudent: function () {
        if (this.studentForm.remarks === '') {
          this.studentForm.remarks = "无";
        }
        if (this.dialogTitle === "新增学员") {
          this.$refs["ruleForm"].validate((valid) => {
            if (valid) {
              axios.post("/saveThisStudent", this.studentForm).then(res => {
                if (res.data === "success") {
                  this.dialogFormVisible = false;
                  this.studentForm = {
                    studentid: "",
                    studentName: "",
                    birthday: "",
                    phone: "",
                    college: "",
                    sex: 0,
                    nativePlace: "",
                    maritalStatus: 0,
                    idNumber: "",
                    nation: "",
                    remarks: "",
                    gradeid: "",
                    jobid: "0",
                    imagesDirectory: ""
                  };
                  this.getAllStudent();
                  this.$message({
                    message: "新增成功",
                    type: "success"
                  });
                } else {
                  this.studentForm = {
                    studentid: "",
                    studentName: "",
                    birthday: "",
                    phone: "",
                    college: "",
                    sex: 0,
                    nativePlace: "",
                    maritalStatus: 0,
                    idNumber: "",
                    nation: "",
                    remarks: "",
                    gradeid: "",
                    jobid: "0",
                    imagesDirectory: ""
                  };
                  this.dialogFormVisible = false;
                  this.getAllStudent();
                  this.$message({
                    message: "新增失败",
                    type: "error"
                  })
                }
              })
            }
          })
        } else {
          this.$refs["ruleForm"].validate((valid) => {
            if (valid) {
              axios.post("/editThisStudent", this.studentForm).then(res => {
                if (res.data === "success") {
                  this.dialogFormVisible = false;
                  this.studentForm = {
                    studentid: "",
                    studentName: "",
                    birthday: "",
                    phone: "",
                    college: "",
                    sex: 0,
                    nativePlace: "",
                    maritalStatus: 0,
                    idNumber: "",
                    nation: "",
                    remarks: "",
                    gradeid: "",
                    jobid: "0",
                    imagesDirectory: ""
                  };
                  this.getAllStudent();
                  this.$message({
                    message: "修改成功",
                    type: "success"
                  });
                } else {
                  this.studentForm = {
                    studentid: "",
                    studentName: "",
                    birthday: "",
                    phone: "",
                    college: "",
                    sex: 0,
                    nativePlace: "",
                    maritalStatus: 0,
                    idNumber: "",
                    nation: "",
                    remarks: "",
                    gradeid: "",
                    jobid: "0",
                    imagesDirectory: ""
                  };
                  this.dialogFormVisible = false;
                  this.getAllStudent();
                  this.$message({
                    message: "修改失败",
                    type: "error"
                  })
                }
              })
            }
          })
        }
      },
      //上传成功的钩子
      handleAvatarSuccess(res) {
        this.$message({
          message: "头像上传成功",
          type: "success"
        });
        this.studentForm.imagesDirectory = 'http://localhost:8087/upload/' + res;
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      handleEdit: function (rowData) {
        this.dialogTitle = "编辑学员";
        axios.get("/getMyInform/" + rowData.studentid).then(res => {
          this.studentForm = res.data.data;
          this.dialogFormVisible = true;
        })
      },
      isLogin: function () {
        if (!sessionStorage.getItem("user")) {
          this.$router.push("/");
        }
      },

    },
    mounted() {
      this.getAllStudent();
      this.getAllGrade();
      this.isLogin();
    }

  }
</script>

<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 50px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
