<template>
    <div>
        <h4>我的信息</h4>
        <el-form :model="form" ref="myForm" label-position="right" :rules="rules" style="height: 600px">
            <el-form-item label="员工编号" style="display: none">
                <el-input v-model="form.studentid" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-col span="7">
                <el-form-item label="姓名" prop="studentName" :label-width="formLabelWidth">
                    <el-input v-model="form.studentName" placeholder="请输入姓名" style="width: 300px"></el-input>
                </el-form-item>
                <el-form-item label="民族" prop="nation" :label-width="formLabelWidth">
                    <el-input v-model="form.nation" placeholder="请输入毕业院校" style="width: 300px" readonly></el-input>
                </el-form-item>
                <el-form-item label="出生日期" prop="birthday" :label-width="formLabelWidth">
                    <el-date-picker
                            v-model="form.birthday"
                            type="date"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            placeholder="请选择出生日期" style="width: 300px" readonly>
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="联系电话" prop="phone" :label-width="formLabelWidth">
                    <el-input v-model="form.phone" placeholder="请输入联系电话" style="width: 300px"></el-input>
                </el-form-item>
                <el-form-item label="毕业院校" prop="college" :label-width="formLabelWidth">
                    <el-input v-model="form.college" placeholder="请输入毕业院校" style="width: 300px"></el-input>
                </el-form-item>
            </el-col>
            <el-col span="7" offset="2">
                <el-form-item label="性别"  :label-width="formLabelWidth">
                    <el-radio-group v-model="form.sex">
                        <el-radio :label="0">男</el-radio>
                        <el-radio :label="1">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="婚否" prop="maritalStatus" :label-width="formLabelWidth">
                    <el-select v-model="form.maritalStatus" placeholder="请选择婚否" style="width: 300px">
                        <el-option :value="0" label="未婚"></el-option>
                        <el-option :value="1" label="已婚"></el-option>
                        <el-option :value="2" label="丧偶"></el-option>
                        <el-option :value="3" label="离婚"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="籍贯" prop="nativePlace" :label-width="formLabelWidth">
                    <el-input v-model="form.nativePlace" placeholder="请输入毕业院校" style="width: 300px" readonly></el-input>
                </el-form-item>
                <el-form-item label="身份证号" prop="idNumber" :label-width="formLabelWidth">
                    <el-input v-model="form.idNumber" placeholder="请输入身份证号" style="width: 300px" readonly></el-input>
                </el-form-item>
                <el-form-item label="专业" prop="major" :label-width="formLabelWidth">
                    <el-input v-model="form.major" placeholder="请输入毕业院校" style="width: 300px"></el-input>
                </el-form-item>
            </el-col>
            <el-col span="3" offset="2">
                <el-upload
                        class="avatar-uploader"
                        action="/update"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-col>
            <el-col span="20" >
                <el-form-item label="备注" :label-width="formLabelWidth">
                    <el-input
                            type="textarea"
                            :rows="2"
                            readonly
                            placeholder="请输入内容"
                            v-model="form.remarks">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col span="24">
                <el-button type="primary" @click="editMyInform">保 存</el-button>
                <el-button @click="cancelMyEdit">取 消</el-button>
            </el-col>
        </el-form>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "MyInform",
        data() {
            return {
                readonly:true,
                formLabelWidth: "80px",
                span:"",
                form: {
                    studentid: "",
                    studentName: "",
                    birthday: "",
                    phone: "",
                    college: "",
                    sex: "0",
                    nativePlace: "",
                    maritalStatus: "",
                    idNumber:"",
                    nation:"",
                    remarks:""
                }
            }
        },
        methods: {
            getMyInform: function () {
                axios.get("/getMyInform/" + this.$store.state.userid).then(res => {
                    this.form = res.data.data;
                })
            },
            editMyInform: function () {
                axios.post("/editMyInform", this.form).then(res => {
                    if (res.data === "success") {
                        this.$message({
                            message: "修改成功",
                            type: "success"
                        });
                    }
                })
            },
            cancelMyEdit:function () {
                this.getMyInform();
            }
        },
        mounted() {
            this.getMyInform();
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
        font-size: 28px;
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
