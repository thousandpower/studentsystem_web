<template>
    <div>
        <div align="left" style="margin-bottom: 20px">
            <el-input v-model="listQuery.filter" placeholder="请输入用户名" style="width: 200px"></el-input>
            <el-button type="primary" @click="queryUsers">查询</el-button>
        </div>
        <el-table
                :data="tableData"
                border
                stripe
                height="546"
                style="width: 100%"
                @selection-change="handleSelectionChange">
            <el-table-column
                    type="selection"
                    width="55" align="center">
            </el-table-column>
            <el-table-column
                    type="index"
                    width="80"
                    label="序号" align="center">
                <template slot-scope="scope">
                    <!--作用域插槽slot-scope，设置序号从1一直到获得数据的最后一个元素的数组下标+1-->
                    <span>{{(page.currentPage - 1)*listQuery.limit + scope.$index +1}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="userid"
                    label="用户id"
                    width="200" align="center">
            </el-table-column>
            <el-table-column
                    prop="username"
                    label="用户名"
                    width="200" align="center">
            </el-table-column>
            <el-table-column
                    prop="password"
                    label="密码"
                    width="200" align="center">
            </el-table-column>
            <el-table-column
                    prop="role"
                    label="权限"
                    width="200" align="center">
                <template slot-scope="scope">
                    {{roleData[(scope.row.role)].label}}
                </template>
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    align="center"
                    header-align="center">
                <template slot-scope="scope">
                    <el-button type="danger" @click="handleReset(scope.row)">重置密码</el-button>
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
    import axios from 'axios';
    export default {
        name: "resetPwd",
        data() {
            return {
                username: "",//用来存储用户名
                show: false,
                tableData: [],
                page: {
                    currentPage: 1,//当前页码
                    sizes: [5,7,10, 20]
                },
                listQuery: {//初始查询条件
                    limit: 7,
                    page: 1,
                    filter: ""
                },
                total: 0,//总条数
                pageCount: 0,//总页数
                //设置文本显示宽度
                formLabelWidth: "130px",
                checkData: [],//被选中的用户信息
                roleData: {
                    '0': {
                        label: '管理员'
                    },
                    '1': {
                        label: '学校评价人'
                    },
                    '2': {
                        label: '项目评价人'
                    },
                    '3':{
                        label: '学员'
                    }
                }
            }
        },
        methods:{
            getAllUser:function () {
                //参数过多时，推荐使用post方式传参
                axios.post("/getAllUser", this.listQuery).then(res => {
                    this.tableData = res.data.users;
                    this.total = res.data.total;
                })
            },
            handleSizeChange: function (val) {
                //当每页显示条数发生变化时触发该事件
                //根据当前参数重新去后台查询数据
                //val代表limit
                this.listQuery.limit = val;
                this.listQuery.page = 1;
                this.page.currentPage = 1;//默认显示第一页
                this.getAllUser();
            },
            handleCurrentChange: function (val) {
                //当前页码发生变化时触发该事件
                //获取当前页码赋值给this.listQuery.page，然后调用getEmps方法
                //val代表当前页码
                this.listQuery.page = val;
                this.getAllUser();
            },
            queryUsers:function () {
                this.listQuery.page = 1;
                this.getAllUser();
                this.page.currentPage = 1;//默认显示第一页
            },
            handleReset: function (rowData) {
                //将用户id传到后端
                axios.get("/resetMyPwd/"+rowData.userid).then(res => {
                    if (res.data === "success"){
                        this.$message({
                            message: "重置成功",
                            type: "success"
                        });
                        this.getAllUser();
                    } else {
                        this.$message({
                            message: "重置失败",
                            type: "error"
                        })
                    }
                })
            },
            handleSelectionChange: function (val) {
                //被选中的数据：行对象数组
                this.checkData = val;
            },
            isLogin: function () {
                if (!sessionStorage.getItem("user")) {
                    this.$router.push("/");
                }
            },
        },
        mounted() {
            this.getAllUser();
            this.isLogin();
        }
    }
</script>

<style scoped>

</style>
