<template>
    <div>
        <div style="margin-left: 350px">
            <div style="margin-bottom: 50px;margin-right: 450px">
                <h3>修改密码</h3>
            </div>
            <el-col span="10">
                <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px"
                         class="demo-ruleForm"
                         style="height: 600px">
                    <el-form-item label="id" :label-width="formLabelWidth">
                        <el-input v-model="form.userid" autocomplete="off" style="width: 300px" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
                        <el-input v-model="form.username" autocomplete="off" style="width: 300px" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="原密码" :label-width="formLabelWidth" prop="oldPassword">
                        <el-input type="password" v-model="form.password" autocomplete="off"
                                  style="width: 300px"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" :label-width="formLabelWidth" prop="newPass">
                        <el-input type="password" v-model="form.newPass" autocomplete="off"
                                  style="width: 300px"></el-input>
                    </el-form-item>
                    <el-form-item label="确认新密码" :label-width="formLabelWidth" prop="checkNewPass">
                        <el-input type="password" v-model="form.checkNewPass" autocomplete="off"
                                  style="width: 300px"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="saveThisUser" style="width: 300px">保存</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "editPwd",
        data() {
            var passchk = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('原密码不能为空'));
                } else {
                    if (this.form.password !== '') {

                    }
                    callback();
                }
            };
            var newPasschk = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('新密码不能为空'));
                } else {
                    if (this.form.newPass !== '') {

                    }
                    callback();
                }
            };
            var newPassSamechk = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.form.newPass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                formLabelWidth: "100px",
                readonly: true,
                disabled: true,
                form: {
                    userid: "",
                    username: "",
                    password: "",
                    newPass: "",
                    checkNewPass: "",
                    role: ""
                },

                rules: {
                    oldPassword: [
                        {validator: passchk, trigger: 'blur'},
                        {validator: passchk, trigger: 'submit'},
                        {required: true, message: '原密码不能为空', trigger: 'blur'},
                        {required: true, message: '原密码不能为空', trigger: 'submit'}
                    ],
                    newPass: [
                        {validator: newPasschk, trigger: 'blur'},
                        {validator: newPasschk, trigger: 'submit'},
                        {min: 6, max: 12, message: '长度在6到12个字符', trigger: 'blur'},
                        {required: true, message: '新密码不能为空', trigger: 'blur'},
                        {required: true, message: '新密码不能为空', trigger: 'submit'}
                    ],
                    checkNewPass: [
                        {validator: newPassSamechk, trigger: 'blur'},
                        {validator: newPassSamechk, trigger: 'submit'},
                        {min: 6, max: 12, message: '长度在6到12个字符', trigger: 'blur'},
                        {required: true, message: '确认新密码不能为空', trigger: 'blur'},
                        {required: true, message: '确认新密码不能为空', trigger: 'submit'}
                    ]
                }
            }
        },
        methods: {
            getThisUser() {
                axios.get("/getThisUser/" + this.$store.state.userid).then(res => {
                    this.form = res.data.data;
                    this.form.password = "";
                });
            },
            saveThisUser() {
                //判断表单验证是否通过，提交数据到后台
                this.$refs["ruleForm"].validate((valid) => {
                    if (valid) {
                        this.form.password = this.form.newPass;
                        axios.post("/editMyPwd", this.form).then(res => {
                            if (res.data === "success") {
                                this.$message({
                                    message: "修改成功",
                                    type: "success"
                                });
                            }
                        })
                    } else {
                        this.$message({
                            message: "请检查您输入的信息",
                            type: "error"
                        })
                    }
                })
            }
        },
        mounted() {
            this.getThisUser();
        }
    }
</script>

<style scoped>

</style>
