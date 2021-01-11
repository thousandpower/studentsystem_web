<template>
    <div>
        <el-tabs :tab-position="tabPosition" style="height: 763px;">
            <el-tab-pane label="培训学校评价">
                <div style="margin-bottom: 50px">
                    <h3>培训学校评价</h3>
                </div>
                <div class="table">
                    <table border="1" cellspacing="0" cellpadding="10" width="100%">
                        <thead>
                        <tr class="firstHead">
                            <th colspan="1" rowspan="2">培训学校</th>
                            <th colspan="1" rowspan="2">班期</th>
                            <th colspan="1" rowspan="2">评价人</th>
                            <th colspan="6">培训期间测试成绩</th>
                            <th colspan="1" rowspan="2">整体评价分数</th>
                        </tr>
                        <tr class="twoHead">
                            <th>html</th>
                            <th>oracle</th>
                            <th>java基础</th>
                            <th>java高级</th>
                            <th>js笔试</th>
                            <th>L1面试</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th style="font-weight: bold">学习评价</th>
                            <td>{{schoolList.gradeid}}</td>
                            <td>{{schoolList.username}}</td>
                            <td v-if="schoolList.html < 60" style="color: red">{{schoolList.html}}</td>
                            <td v-else>{{schoolList.html}}</td>
                            <td v-if="schoolList.oracle < 60" style="color: red">{{schoolList.oracle}}</td>
                            <td v-else>{{schoolList.oracle}}</td>
                            <td v-if="schoolList.java_base < 60" style="color: red">{{schoolList.java_base}}</td>
                            <td v-else>{{schoolList.java_base}}</td>
                            <td v-if="schoolList.java_high < 60">{{schoolList.java_high}}</td>
                            <td v-else>{{schoolList.java_high}}</td>
                            <td v-if="schoolList.js < 60" style="color: red">{{schoolList.js}}</td>
                            <td v-else>{{schoolList.js}}</td>
                            <td v-if="schoolList.l1 < 60" style="color: red">{{schoolList.l1}}</td>
                            <td v-else>{{schoolList.l1}}</td>
                            <td v-if="schoolList.appraisal_score < 3" style="color: red">{{schoolList.appraisal_score}}</td>
                            <td v-else>{{schoolList.appraisal_score}}</td>
                        </tr>
                        <tr>
                            <th colspan="1" rowspan="2" style="font-weight: bold">评价</th>
                            <td colspan="14" rowspan="2">{{schoolList.appraisal_content}}</td>
                        </tr>
                        <tr>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </el-tab-pane>
            <el-tab-pane label="转正工作评价">
                <div style="margin-bottom: 50px">
                    <h3>转正工作评价</h3>
                </div>
                <div class="table">
                    <table border="1" cellspacing="0" cellpadding="10" width="100%">
                        <thead>
                        <tr class="firstHead">
                            <th colspan="1" rowspan="2">项目</th>
                            <th colspan="1" rowspan="2">员工部门</th>
                            <th colspan="1" rowspan="2">员工职务</th>
                            <th colspan="1" rowspan="2">评价人</th>
                            <th colspan="5">评价分项</th>
                            <th colspan="1" rowspan="2">整体评价分数</th>
                        </tr>
                        <tr class="twoHead">
                            <th>能力</th>
                            <th>积极性</th>
                            <th>沟通交流</th>
                            <th>人品</th>
                            <th>性格</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th style="font-weight: bold">工作评价</th>
                            <td>{{beginList.deptname}}</td>
                            <td>{{beginList.jobname}}</td>
                            <td>{{beginList.username}}</td>
                            <td v-if="beginList.ability < 60" style="color: red">{{beginList.ability}}</td>
                            <td v-else>{{beginList.ability}}</td>
                            <td v-if="beginList.initiative < 60" style="color: red">{{beginList.initiative}}</td>
                            <td v-else>{{beginList.initiative}}</td>
                            <td v-if="beginList.communication < 60" style="color: red">{{beginList.communication}}</td>
                            <td v-else>{{beginList.communication}}</td>
                            <td v-if="beginList.moral_quality < 60" style="color: red">{{beginList.moral_quality}}</td>
                            <td v-else>{{beginList.moral_quality}}</td>
                            <td v-if="beginList.characters < 60" style="color: red">{{beginList.characters}}</td>
                            <td v-else>{{beginList.characters}}</td>
                            <td v-if="beginList.appraisal_score < 3" style="color: red">{{beginList.appraisal_score}}</td>
                            <td v-else>{{beginList.appraisal_score}}</td>
                        </tr>
                        <tr >
                            <th colspan="1" rowspan="2" style="font-weight: bold">评价</th>
                            <td colspan="10" rowspan="2" text-align = "left"><div text-align="left">{{beginList.appraisal_content}}</div></td>
                        </tr>

                        </tbody>
                    </table>
                </div>
            </el-tab-pane>
            <el-tab-pane label="工作一年评价">
                <div style="margin-bottom: 50px">
                    <h3>工作一年评价</h3>
                </div>
                <div class="table">
                    <table border="1" cellspacing="0" cellpadding="10" width="100%">
                        <thead>
                        <tr class="firstHead">
                            <th colspan="1" rowspan="2">项目</th>
                            <th colspan="1" rowspan="2">员工部门</th>
                            <th colspan="1" rowspan="2">员工职务</th>
                            <th colspan="1" rowspan="2">评价人</th>
                            <th colspan="5">评价分项</th>
                            <th colspan="1" rowspan="2">整体评价分数</th>
                        </tr>
                        <tr class="twoHead">
                            <th>能力</th>
                            <th>积极性</th>
                            <th>沟通交流</th>
                            <th>人品</th>
                            <th>性格</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th style="font-weight: bold">工作评价</th>
                            <td>{{firstList.deptname}}</td>
                            <td>{{firstList.jobname}}</td>
                            <td>{{firstList.username}}</td>
                            <td v-if="firstList.ability < 60" style="color: red">{{firstList.ability}}</td>
                            <td v-else>{{firstList.ability}}</td>
                            <td v-if="firstList.initiative < 60" style="color: red">{{firstList.initiative}}</td>
                            <td v-else>{{firstList.initiative}}</td>
                            <td v-if="firstList.communication < 60" style="color: red">{{firstList.communication}}</td>
                            <td v-else>{{firstList.communication}}</td>
                            <td v-if="firstList.moral_quality < 60" style="color: red">{{firstList.moral_quality}}</td>
                            <td v-else>{{firstList.moral_quality}}</td>
                            <td v-if="firstList.characters < 60" style="color: red">{{firstList.characters}}</td>
                            <td v-else>{{firstList.characters}}</td>
                            <td v-if="firstList.appraisal_score < 3" style="color: red">{{firstList.appraisal_score}}</td>
                            <td v-else>{{firstList.appraisal_score}}</td>
                        </tr>
                        <tr>
                            <th colspan="1" rowspan="2" style="font-weight: bold">评价</th>
                            <td colspan="10" rowspan="2">{{firstList.appraisal_content}}</td>
                        </tr>
                        <tr>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </el-tab-pane>
            <el-tab-pane label="工作两年评价">
                <div style="margin-bottom: 50px">
                    <h3>工作两年评价</h3>
                </div>
                <div class="table">
                    <table border="1" cellspacing="0" cellpadding="10" width="100%">
                        <thead>
                        <tr class="firstHead">
                            <th colspan="1" rowspan="2">项目</th>
                            <th colspan="1" rowspan="2">员工部门</th>
                            <th colspan="1" rowspan="2">员工职务</th>
                            <th colspan="1" rowspan="2">评价人</th>
                            <th colspan="5">评价分项</th>
                            <th colspan="1" rowspan="2">整体评价分数</th>
                        </tr>
                        <tr class="twoHead">
                            <th>能力</th>
                            <th>积极性</th>
                            <th>沟通交流</th>
                            <th>人品</th>
                            <th>性格</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th style="font-weight: bold">工作评价</th>
                            <td>{{secondList.deptname}}</td>
                            <td>{{secondList.jobname}}</td>
                            <td>{{secondList.username}}</td>
                            <td v-if="secondList.ability < 60" style="color: red">{{secondList.ability}}</td>
                            <td v-else>{{secondList.ability}}</td>
                            <td v-if="secondList.initiative < 60" style="color: red">{{secondList.initiative}}</td>
                            <td v-else>{{secondList.initiative}}</td>
                            <td v-if="secondList.communication < 60" style="color: red">{{secondList.communication}}</td>
                            <td v-else>{{secondList.communication}}</td>
                            <td v-if="secondList.moral_quality < 60" style="color: red">{{secondList.moral_quality}}</td>
                            <td v-else>{{secondList.moral_quality}}</td>
                            <td v-if="secondList.characters < 60" style="color: red">{{secondList.characters}}</td>
                            <td v-else>{{secondList.characters}}</td>
                            <td v-if="secondList.appraisal_score < 3" style="color: red">{{secondList.appraisal_score}}</td>
                            <td v-else>{{secondList.appraisal_score}}</td>
                        </tr>
                        <tr>
                            <th colspan="1" rowspan="2" style="font-weight: bold">评价</th>
                            <td colspan="10" rowspan="2" >{{secondList.appraisal_content}}</td>
                        </tr>
                        <tr>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </el-tab-pane>
            <el-tab-pane label="工作三年评价">
                <div style="margin-bottom: 50px">
                    <h3>工作三年评价</h3>
                </div>
                <div class="table">
                    <table border="1" cellspacing="0" cellpadding="10" width="100%">
                        <thead>
                        <tr class="firstHead">
                            <th colspan="1" rowspan="2">项目</th>
                            <th colspan="1" rowspan="2">员工部门</th>
                            <th colspan="1" rowspan="2">员工职务</th>
                            <th colspan="1" rowspan="2">评价人</th>
                            <th colspan="5">评价分项</th>
                            <th colspan="1" rowspan="2">整体评价分数</th>
                        </tr>
                        <tr class="twoHead">
                            <th>能力</th>
                            <th>积极性</th>
                            <th>沟通交流</th>
                            <th>人品</th>
                            <th>性格</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th style="font-weight: bold">工作评价</th>
                            <td>{{thirdList.deptname}}</td>
                            <td>{{thirdList.jobname}}</td>
                            <td>{{thirdList.username}}</td>
                            <td v-if="thirdList.ability < 60" style="color: red">{{thirdList.ability}}</td>
                            <td v-else>{{thirdList.ability}}</td>
                            <td v-if="thirdList.initiative < 60" style="color: red">{{thirdList.initiative}}</td>
                            <td v-else>{{thirdList.initiative}}</td>
                            <td v-if="thirdList.communication < 60" style="color: red">{{thirdList.communication}}</td>
                            <td v-else>{{thirdList.communication}}</td>
                            <td v-if="thirdList.moral_quality < 60" style="color: red">{{thirdList.moral_quality}}</td>
                            <td v-else>{{thirdList.moral_quality}}</td>
                            <td v-if="thirdList.characters < 60" style="color: red">{{thirdList.characters}}</td>
                            <td v-else>{{thirdList.characters}}</td>
                            <td v-if="thirdList.appraisal_score < 3" style="color: red">{{thirdList.appraisal_score}}</td>
                            <td v-else>{{thirdList.appraisal_score}}</td>
                        </tr>
                        <tr>
                            <th colspan="1" rowspan="2" style="font-weight: bold">评价</th>
                            <td colspan="10" rowspan="2">{{thirdList.appraisal_content}}</td>
                        </tr>
                        <tr>
                        </tr>
                        </tbody>
                    </table>
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
                tabPosition: 'left',
                schoolList: [],
                beginList:[],
                firstList:[],
                secondList:[],
                thirdList:[]
            }
        },
        methods: {
            getMySchoolEvaluation: function () {
                axios.get("/getMySchoolEvaluation/" + sessionStorage.getItem("user")).then(res => {
                    this.schoolList = res.data.data;
                });
            },
            getMyBeginDeptEvaluation: function () {
                axios.get("/getMyDeptEvaluation/" + sessionStorage.getItem("user") + "/0").then(res => {
                    this.beginList = res.data.data;
                });
            },
            getMyFirstDeptEvaluation: function () {
                axios.get("/getMyDeptEvaluation/" + sessionStorage.getItem("user") + "/1").then(res => {
                    this.firstList = res.data.data;
                });
            },
            getMySecondDeptEvaluation: function () {
                axios.get("/getMyDeptEvaluation/" + sessionStorage.getItem("user") + "/2").then(res => {
                    this.secondList = res.data.data;
                });
            },
            getMyThirdDeptEvaluation: function () {
                axios.get("/getMyDeptEvaluation/" + sessionStorage.getItem("user") + "/3").then(res => {
                    this.thirdList = res.data.data;
                });
            },
        },
        mounted() {
            this.getMySchoolEvaluation();
            this.getMyBeginDeptEvaluation();
            this.getMyFirstDeptEvaluation();
            this.getMySecondDeptEvaluation();
            this.getMyThirdDeptEvaluation();

        }
    }
</script>

<style scoped>
    td,
    th {
        font-style: normal;
        font-weight: normal;
        text-align: center;
    }

    tr {
        height: 48px;
    }

    .twoHead th {
        width: 7.25%;
        height: 48px;
        padding: 0 10px;
        font-size: 14px;
        font-weight: normal;
    }

    .firstHead th {
        font-size: 14px;
        font-weight: bold;
    }

    table {
        border: none;
        border-collapse: collapse;
        border-color: #D8DFE6;
    }

    table thead {
        background: #F3FDFF;
    }

    .paperview-input-text >>> .el-input__inner {
        -webkit-appearance: none;
        background-color: #FFF;
        background-image: none;
        border-radius: 4px;
        border: 0px;
        width: 100%;
    }

    .paperview-input-textarea >>> .el-textarea__inner {
        -webkit-appearance: none;
        background-color: #FFF;
        background-image: none;
        border-radius: 4px;
        border: 0px;
        width: 100%;
        resize: none;
    }

    changeColor {
        color: red;
    }
</style>
