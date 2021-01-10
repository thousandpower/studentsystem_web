<template>
    <div class="back" style="width: 100%;height: 100%">
        <div style="text-align: center;width: 100%;height: 100%">
            <div class="loginContainer">

                <h4 style="font-size: 20px;line-height: 1.7;margin-left: 70px;color: #8c939d">欢迎登录金桥学员成长跟踪系统</h4>
                <el-form ref="loginForm" :model="form" :rules="rules" @submit.native.prevent label-width="80px">
                    <el-form-item prop="userid">
                        <el-input v-model="form.userid"  placeholder="请输入id"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model="form.password" type="password"  placeholder="请输入密码"></el-input>

                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" native-type="submit" @click="login" @keydown.enter="login"
                                   style="width: 250px">登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "Login",
        data() {
            return {
                //表单数据
                form: {
                    userid: "",
                    password: ""
                },
                rules: {
                    userid: [
                        {required: true, message: '请输入Id', trigger: 'blur'},
                        {required: true, message: '请输入Id', trigger: 'submit'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {required: true, message: '请输入密码', trigger: 'submit'}
                    ]
                }
            }
        },
        methods: {
            login: function () {
                //判断表单验证是否通过，提交数据到后台
                this.$refs["loginForm"].validate((valid) => {
                    if (valid) {
                        //提交
                        axios.post("/login", this.form).then(res => {
                            if (res.data.status === "200") {

                              sessionStorage.setItem("userid",res.data.data.userid);
                              sessionStorage.setItem("uname",res.data.data.username);
                              sessionStorage.setItem("role",res.data.data.role);

                              this.$message({
                                message: "登录成功",
                                type: "success"
                              });

                                this.$router.push({
                                    path: "/Home",
                                });

                                sessionStorage.setItem("user",this.form.userid);
                                this.$store.dispatch("setUser",this.form.userid);
                                this.$router.push({
                                    path: "/",
                                });
                                this.$message({
                                    message: "登录成功",
                                    type: "success"
                                })

                            } else {
                                this.$message({
                                    message: "Id或密码输入错误",
                                    type: "error"
                                })
                            }
                        })
                    } else {
                        this.$message({
                            message: "请检查您输入的Id或密码",
                            type: "error"
                        })
                    }
                })
            },
        }
    }
</script>

<style scoped>
    .back {
        background: url(../assets/back.jpg) top left;
        background-size: 100% 100%;
        height: 100%;
        position: fixed;
        width: 100%
    }

    .loginContainer {
        width: 400px;
        position: relative;
        left: 35%;
        top: 160px;
        padding: 10px 30px 20px 10px;
    }
</style>
