<template>
    <div>
        <el-tabs :tab-position="tabPosition" style="height: 600px;">
            <el-tab-pane label="培训学校评价">
                <div style="margin-bottom: 50px">
                    <h3>培训学校评价</h3>
                </div>
                <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
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
            </el-tab-pane>
            <el-tab-pane label="转正工作评价">
                <div style="margin-bottom: 50px">
                    <h3>转正工作评价</h3>
                </div>
            </el-tab-pane>
            <el-tab-pane label="工作一年评价">
                <div style="margin-bottom: 50px">
                    <h3>工作一年评价</h3>
                </div>
            </el-tab-pane>
            <el-tab-pane label="工作两年评价">
                <div style="margin-bottom: 50px">
                    <h3>工作两年评价</h3>
                </div>
            </el-tab-pane>
            <el-tab-pane label="工作三年评价">
                <div style="margin-bottom: 50px">
                    <h3>工作三年评价</h3>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "MyEvaluation",
        data() {
            return {
                formLabelWidth: "80px",
                tabPosition: 'left',
                form:{

                }
            }
        },
        methods: {
            getMySchoolEvaluation: function () {
                axios.get("/getMySchoolEvaluation/"+ this.$store.state.userid).then(res =>{

                })
            },
            handleWatch:function () {

            }
        },
        mounted() {
            this.getMySchoolEvaluation();
        }
    }
</script>

<style scoped>

</style>
