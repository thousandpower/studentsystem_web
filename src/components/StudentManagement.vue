<template>
    <div>
        <div>
            <div style="text-align: center;font-size: 26px">
                <el-form :inline="true" class="demo-form-inline">
                    <span>金桥工程学员跟踪表（第</span>
                    <el-select v-model="className" style="width: 100px" @change="changeClass()">
                        <el-option
                                v-for="item in classes"
                                :key="item.classid"
                                :label="parseInt(item.classname)"
                                :value="parseInt(item.classname)">
                        </el-option>
                    </el-select>
                    <span>期）</span>
                </el-form>
            </div>
            <div align="right">
                <el-form :inline="true" class="demo-form-inline" @submit.native.prevent><!--防止回车自动刷新-->
                    <el-form-item>
                        <el-input v-model="search" placeholder="请输入学员姓名" @keyup.enter.native="query()"></el-input><!--回车搜索-->
                    </el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="query()">查询</el-button>
                </el-form>
            </div>
            <el-table
                    :data="studentData"
                    border
                    stripe
                    style="width: 100%;text-align: center"
                    :header-cell-style="{background:'#F5F7FA',color:'#606266'}">
                <el-table-column
                        prop="sid"
                        label="编号"
                        width="50px"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="sname"
                        label="姓名"
                        width="65px"
                        align="center">
                    <template slot-scope="scope">
                        <span @click="showInfo(scope.row)" style="text-decoration: underline;cursor: pointer;color: #409EFF">{{scope.row.sname}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="sex"
                        label="性别"
                        width="50px"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="school"
                        label="学校"
                        width="115px"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="addr"
                        label="籍贯"
                        width="110px"
                        align="center">
                </el-table-column>
                <el-table-column label="培训期间测试成绩" align="center">
                    <el-table-column
                            v-for="item in courses"
                            :key="item.cid"
                            :label="item.cname"
                            :value="item.cname"
                            align="center"
                            :prop="'course'+item.cid">
                    </el-table-column>
                </el-table-column>
                <el-table-column
                        prop="schoolMark"
                        label="学校评价"
                        width="45px"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="year0"
                        label="转正评价"
                        width="45px"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="year1"
                        label="一年评价"
                        width="45px"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="year2"
                        label="两年评价"
                        width="45px"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="year3"
                        label="三年评价"
                        width="45px"
                        align="center">
                </el-table-column>
            </el-table>
            <div>
                <el-pagination
                        @current-change="getStudentListByPage"
                        :current-page.sync="curPage"
                        :page-size="pageSize"
                        :pager-count="7"
                        :total="total"
                        background
                        layout="total, prev, pager, next, jumper">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "StudentManagement",
        data() {
            return {
                sName: "all",
                search: "",//搜索框的内容
                title:"",//编辑和添加时弹出框的标题
                pageSize: 5,
                curPage: 1,
                studentData: [],//分页数据
                total:0,
                classes: [],
                className :"10",//选中的班期名称
                classId: 10,//选中的班期的id
                courses:[]
            }
        },methods: {
            getAllClass(){
                axios.get('/getAllClass').then(res => {
                    this.classes = res.data;
                });
            },
            getAllCourse(){
                axios.get('/getAllCourseByClassId/'+ this.classId).then(res => {
                    this.courses = res.data;
                });
            },
            //获取分页列表
            getStudentListByPage() {
                if (this.search !== "") {
                    this.sName = this.search;
                } else {
                    this.sName = "all";
                }
                for (var i = 0; i < this.classes.length; i++) {
                    if(this.className === parseInt(this.classes[i].classname)){
                        this.classId = this.classes[i].classid;
                    }
                }
                this.getAllClass();
                this.getAllCourseByClassId(this.classId);
                axios.get('/getAllStudents/'+this.curPage+'/'+this.pageSize+'/'+this.sName+'/'+this.classId).then(res =>{
                    this.studentData = res.data.records;
                    this.total = res.data.total;
                });
            },
            query(){
                this.curPage = 1;
                this.getStudentListByPage();
            },
            changeClass(){
                this.curPage = 1;
                this.getStudentListByPage();
            },
            showInfo(row){
                this.$router.push({path:'/main/growthTracking?sid='+row.sid});
            },
        },
        mounted() {
            this.isLogin();
            this.getStudentListByPage();
        }
    }
</script>

<style scoped>

</style>
