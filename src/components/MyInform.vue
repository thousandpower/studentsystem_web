<template>
    <div>
        <h4>我的信息</h4>
        <el-form :model="form" ref="myForm" label-position="right" :rules="rules" style="height:575px">
            <el-col span="7">
                <el-form-item label="姓名" :label-width="formLabelWidth" prop="studentName">
                    <el-input v-model="form.studentName" autocomplete="off" style="width: 300px"></el-input>
                </el-form-item>
            </el-col>
            <el-col span="7">
                <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
                    <el-radio-group v-model="form.sex">
                        <el-radio v-model="radio" label="1">男</el-radio>
                        <el-radio v-model="radio" label="2">女</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-col>
            <el-col span="7">
                <el-form-item label="民族" :label-width="formLabelWidth" prop="nation">
                    <el-input v-model="form.nation" autocomplete="off" style="width: 300px"></el-input>
                </el-form-item>
            </el-col>
            <el-col span="3">
                <el-upload
                        class="avatar-uploader"
                        action=""
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                    <img v-if="form.imagesDirectory" :src="form.imagesDirectory" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-col>
            <el-col span="7">
                <el-form-item label="出生日期" :label-width="formLabelWidth" prop="hiredate">
                    <el-date-picker
                            v-model="form.hiredate"
                            type="date"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            placeholder="选择出生日期" style="width: 300px">
                    </el-date-picker>
                </el-form-item>
            </el-col>
            <el-col span="7">
                <el-form-item label="籍贯" :label-width="formLabelWidth" prop="nativePlace">
                    <el-input v-model="form.nativePlace" autocomplete="off" style="width: 300px"></el-input>
                </el-form-item>
            </el-col>
            <el-col span="7">
                <el-form-item label="联系电话" :label-width="formLabelWidth" prop="phone">
                    <el-input v-model="form.phone" autocomplete="off" style="width: 300px"></el-input>
                </el-form-item>
            </el-col>
            <el-col span="7">
                <el-form-item label="身份证号" :label-width="formLabelWidth" prop="idNumber">
                    <el-input v-model="form.idNumber" autocomplete="off" style="width: 300px"></el-input>
                </el-form-item>
            </el-col>
            <el-col span="7">
                <el-form-item label="入职日期" :label-width="formLabelWidth" prop="hiredate">
                    <el-input v-model="form.hiredate" autocomplete="off" style="width: 300px"></el-input>
                </el-form-item>
            </el-col>
            <el-col span="7">
                <el-form-item label="毕业院校" :label-width="formLabelWidth" prop="college">
                    <el-input v-model="form.college" autocomplete="off" style="width: 300px"></el-input>
                </el-form-item>
            </el-col>
            <br>
            <el-col span="24">
                <el-form-item label="备注" :label-width="formLabelWidth" prop="remarks">
                    <el-input
                            type="textarea"
                            placeholder="请输入内容"
                            v-model="form.remarks"
                            maxlength="255"
                            show-word-limit
                    >
                    </el-input>
                </el-form-item>
            </el-col>
            <el-form-item label="学员编号" :label-width="formLabelWidth" style="display: none">
                <el-input v-model="form.studentid" autocomplete="off" style="width: 300px"></el-input>
            </el-form-item>
            <el-col span="24">
                <el-form-item>
                    <el-button type="primary" @click="saveStudent">保 存</el-button>
                    <el-button @click="">取 消</el-button>
                </el-form-item>
            </el-col>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "MyInform",
        data() {
            return {
                form: {
                    studentid: sessionStorage.getItem("userid"),
                    studentName: "",
                    sex: "1",
                    nation: "",
                    imagesDirectory: "",
                    hiredate: "",
                    nativePlace: "",
                    phone: "",
                    idNumber: "",
                    hiredate: "",
                    college: "",
                    remarks: ""
                }
            }
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
