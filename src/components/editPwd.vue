<template>
    <div>
        <div style="margin-left: 350px">
            <div style="margin-bottom: 50px;margin-right: 450px">
                <h3>修改密码</h3>
            </div>
            <el-col :span="10">
                <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px"
                         class="demo-ruleForm"
                         style="height: 600px">
                    <el-form-item label="id" :label-width="formLabelWidth" style="display: none">
                        <el-input v-model="form.userid" autocomplete="off" style="width: 300px" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
                        <el-input v-model="form.username" autocomplete="off" style="width: 300px" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="原密码" :label-width="formLabelWidth" prop="oldPassword">
                        <el-input type="password" v-model="form.oldPassword" autocomplete="off"
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
            var newPassSamechk = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.form.newPass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            var oldPassChk = (rule, value, callback) => {
                axios.get("/getMyPassword/" + this.$store.state.userid).then(res => {
                    if (value === ''){
                        callback(new Error('原密码不能为空'))
                    } else if (res.data.data !== value && value !== '') {
                        callback(new Error('请输入正确的原密码'))
                    } else {
                        callback()
                    }
                })
            };
            return {
                formLabelWidth: "100px",
                readonly: true,
                disabled: true,
                form: {
                    userid: "",
                    username: "",
                    password: "",
                    oldPassword: "",
                    newPass: "",
                    checkNewPass: "",
                    role: ""
                },

                rules: {
                    oldPassword: [
                        {required: true, message: '原密码不能为空', trigger: 'blur'},
                        {validator: oldPassChk, trigger: 'blur'},
                        {required: true, message: '原密码不能为空', trigger: 'submit'}
                    ],
                    newPass: [
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
                axios.get("/getThisUser/" + sessionStorage.getItem("user")).then(res => {
                    this.form = res.data.data;
                    this.form.prasswod = "";
                });
            },
            saveThisUser() {
                //判断表单验证是否通过，提交数据到后台
                this.$refs["ruleForm"].validate((valid) => {
                    if (valid) {
                        this.$confirm('确定要修改密码吗?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.form.password = this.form.newPass;
                            axios.post("/editMyPwd", this.form).then(res => {
                                if (res.data === "success") {
                                    this.$message({
                                        message: "修改成功,请重新登录",
                                        type: "success"
                                    });
                                    //清空vuex中的userid并跳转到登录页面
                                    this.$store.state.userid = "";
                                    this.$router.push({
                                        path: "/"
                                    });
                                }
                            })
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消修改密码'
                            });
                        });
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
