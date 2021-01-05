<template>
    <div>
        <el-tabs :tab-position="tabPosition" style="height: 600px;">
            <el-tab-pane label="培训学校评价">
                <div style="margin-bottom: 50px">
                    <h3>培训学校评价</h3>
                </div>
                <el-table
                        :data="studyTableData"
                        style="width: 100%">
                    <el-table-column
                            prop="name"
                            label="培训学校"
                            width="120"
                            align="center">
                        <h3>学习评价</h3>
                    </el-table-column>
                    <el-table-column
                            prop="gradeid"
                            label="班期"
                            width="120"
                            align="center">
                    </el-table-column>
                    <el-table-column
                            prop="evaluation"
                            label="评价人"
                            width="120"
                            align="center">
                    </el-table-column>
                    <el-table-column label="培训期间测试成绩" align="center">
                        <el-table-column
                                prop="course_html"
                                label="html"
                                width="110"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="course_javaEasy"
                                label="Java基础"
                                width="110"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="course_javaHard"
                                label="Java高级"
                                width="110"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="course_oracle"
                                label="Oracle"
                                width="110"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="course_javascript"
                                label="JavaScript"
                                width="110"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="course_interview"
                                label="L1面试"
                                width="110"
                                align="center">
                        </el-table-column>

                    </el-table-column>
                    <el-table-column
                            prop="appraisalScore"
                            label="整体评价分数"
                            width="126"
                            align="center">
                    </el-table-column>
                </el-table>
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
    export default {
        name: "MyEvaluation",
        data() {
            return {
                formLabelWidth: "80px",
                tabPosition: 'left',
                //培训学校评价数据
                studyTableData: [],
                //转正评价数据
                regularTableData: [],
                //第一年评价数据
                firstYearTableData: [],
                //第二年评价数据
                secondYearTableData: [],
                //第三年评价数据
                thirdYearTableData: []
            }
        },
        methods: {
            getMyEvaluation: function () {

            }
        },
        mounted() {
            this.getMyEvaluation();
        }
    }
</script>

<style scoped>

</style>
