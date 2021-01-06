<template>
    <div>
        <h1>学员信息列表</h1>
        <div align="left" style="float: left">
            <el-input v-model="listQuery.filter" placeholder="请输入学员姓名" style="width: 200px"></el-input>
            <el-button type="primary" @click="queryStudents">查询</el-button>
        </div>
        <div align="right">
            <el-button type="primary" @click="showAdd">新增</el-button>
            <el-button type="danger" @click="deleteBatch">删除</el-button>
        </div>
        <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" :modal-append-to-body="false" :width="'70%'">

        </el-dialog>
        <el-table
                :data="tableData"
                border
                stripe
                height="500"
                style="width: 100%"
                @selection-change="handleSelectionChange">
            <el-table-column
                    type="selection"
                    width="55" align="center">
            </el-table-column>
            <el-table-column
                    type="index"
                    width="50"
                    label="序号" align="center">
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
                    width="80"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="sex"
                    label="性别"
                    width="50"
                    align="center">
                <template slot-scope="scope">
                    {{sexData[(scope.row.sex)].label}}
                </template>
            </el-table-column>
            <el-table-column
                    prop="nation"
                    label="民族"
                    width="70"
                    show-overflow-tooltip
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="birthday"
                    label="出生日期"
                    width="100"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="id_number"
                    label="身份证号"
                    width="170"
                    header-align="center">
            </el-table-column>
            <el-table-column
                    prop="marital_status"
                    label="婚否"
                    width="60"
                    align="center">
                <template slot-scope="scope">
                    {{maritalData[(scope.row.marital_status)].label}}
                </template>
            </el-table-column>
            <el-table-column
                    prop="native_place"
                    label="籍贯"
                    width="130"
                    show-overflow-tooltip
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="phone"
                    label="手机号"
                    width="120"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="college"
                    label="毕业院校"
                    width="140"
                    show-overflow-tooltip
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="gradeid"
                    label="班期"
                    width="60"
                    align="center">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    align="center"
                    header-align="center">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="handleWatch(scope.row)">查看</el-button>
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
                imageUrl: "",
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
                    filter: ""
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
                form: {
                    studentid: "",
                    studentName: "",
                    birthday: "",
                    phone: "",
                    college: "",
                    sex: "0",
                    nativePlace: "",
                    maritalStatus: "",
                    idNumber: "",
                    nation: "",
                    remarks: "",
                    gradeid: "",
                    imagesDirectory: this.imageUrl
                },
                //设置文本显示宽度
                formLabelWidth: "80px",
                //被选中的员工信息
                checkData: []
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
                this.form = {};
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

        },
        mounted() {
            this.getAllStudent();
        }

    }
</script>

<style scoped>
    .avatar-uploader el-upload {
        border: 10px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 250px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>
