<template>
  <div>
    <el-container>
      <el-header><h1>项目评价人管理</h1></el-header>
      <el-main>

        <!--打分-->
        <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="900px">
          <div>
            <el-form :model="formInfo" :rules="rules" ref="studentInfo">
              <table border="1px" cellspacing="0px" style="border-collapse:collapse" align="center">
                <tr>
                  <td style="width: 110px">姓名</td>
                  <td style="width: 110px">

                    <el-input v-model="formInfo.student_name" class="paperview-input-text" readonly></el-input>
                  </td>
                  <td style="width: 55px">性别</td>
                  <td style="width: 110px">
                    <el-input v-if="formInfo.sex == '0'" value="男" class="paperview-input-text" readonly></el-input>
                    <el-input v-if="formInfo.sex =='1'" value="女" class="paperview-input-text" readonly></el-input>
                  </td>
                  <td style="width: 55px">民族</td>
                  <td style="width: 110px">
                    <el-input v-model="formInfo.nation" class="paperview-input-text" readonly></el-input>
                  </td>
                  <td style="width: 110px" rowspan="4">
                    <img v-if="formInfo.images_directory" :src="formInfo.images_directory" width="110px">
                    <img v-else="formInfo.images_directory"
                         src="http://localhost:8087/upload/201e0451001545b6b0568ed6db4d8a53-defaultpicture.jpg"
                         width="110px">
                  </td>
                </tr>
                <tr>
                  <td>出生年月</td>
                  <td>
                    <el-input v-model="formInfo.birthday" class="paperview-input-text" readonly></el-input>
                  </td>
                  <td>籍贯</td>
                  <td>
                    <el-input v-model="formInfo.native_place" class="paperview-input-text" readonly></el-input>
                  </td>
                  <td>婚否</td>
                  <td>
                    <el-input v-if="formInfo.marital_status == '0'" value="未婚" class="paperview-input-text"
                              readonly></el-input>
                    <el-input v-if="formInfo.marital_status =='1'" value="已婚" class="paperview-input-text"
                              readonly></el-input>
                    <el-input v-if="formInfo.marital_status == '2'" value="丧偶" class="paperview-input-text"
                              readonly></el-input>
                    <el-input v-if="formInfo.marital_status =='3'" value="离婚" class="paperview-input-text"
                              readonly></el-input>
                  </td>
                </tr>
                <tr>
                  <td>联系电话</td>
                  <td colspan="2">
                    <el-input v-model="formInfo.phone" class="paperview-input-text" readonly></el-input>
                  </td>
                  <td>身份证号码</td>
                  <td colspan="2">
                    <el-input v-model="formInfo.id_number" class="paperview-input-text" readonly></el-input>
                  </td>
                </tr>
                <tr>
                  <td>毕业学校</td>
                  <td colspan="2">
                    <el-input v-model="formInfo.college" class="paperview-input-text" readonly></el-input>
                  </td>
                  <td>专业</td>
                  <td colspan="2">
                    <el-input v-model="formInfo.major" class="paperview-input-text" readonly></el-input>
                  </td>
                </tr>
                <tr>
                  <td>备注</td>
                  <td colspan="6">
                    <el-input v-model="formInfo.remarks" type="textarea"
                              class="paperview-input-textarea" readonly rows="2"></el-input>
                  </td>
                </tr>
              </table>
            </el-form>
          </div>
          <br>


          <div>
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="学校评价" name="school">
                <el-form :model="formEvaInfoSc" :rules="rules" ref="studentEvaInfoSc">

                  <table border="1px" cellspacing="0px" style="border-collapse:collapse" align="center">
                    <tr>
                      <td colspan="12"></td>
                    </tr>
                    <tr>
                      <td colspan="2" rowspan="2">培训学校</td>
                      <td rowspan="2">班期</td>
                      <td rowspan="2">评价人</td>
                      <td colspan="6">评价分项</td>
                      <td colspan="2" rowspan="2">整体评价分数</td>

                    </tr>
                    <tr>
                      <td>HTML笔试</td>
                      <td>oracle笔试</td>
                      <td>JS笔试</td>
                      <td>java基础笔试</td>
                      <td>java高级笔试</td>
                      <td>L1面试</td>
                    </tr>
                    <tr>
                      <td colspan="2">学习评价</td>
                      <td>
                        <el-input v-model="formEvaInfoSc.gradeid" class="paperview-input-text" readonly></el-input>
                        <br><br>
                      </td>
                      <td>
                        <el-input v-model="formEvaInfoSc.teachername" class="paperview-input-text" readonly></el-input>
                      </td>
                      <td>
                        <el-input v-model="formEvaInfoSc.html" class="paperview-input-text" readonly></el-input>
                      </td>
                      <td>
                        <el-input v-model="formEvaInfoSc.oracle" class="paperview-input-text" readonly></el-input>
                      </td>
                      <td>
                        <el-input v-model="formEvaInfoSc.js" class="paperview-input-text" readonly></el-input>
                      </td>
                      <td>
                        <el-input v-model="formEvaInfoSc.java_base" class="paperview-input-text" readonly></el-input>
                      </td>
                      <td>
                        <el-input v-model="formEvaInfoSc.java_high" class="paperview-input-text" readonly></el-input>
                      </td>
                      <td>
                        <el-input v-model="formEvaInfoSc.l1" class="paperview-input-text" readonly></el-input>
                      </td>
                      <td colspan="2">
                        <el-input v-model="formEvaInfoSc.appraisal_score" class="paperview-input-text"
                                  readonly></el-input>
                      </td>

                    </tr>
                    <tr>
                      <td colspan="2">评价(包括主要优点及缺陷)</td>
                      <td colspan="10">
                        <el-input v-model="formEvaInfoSc.appraisal_content" type="textarea"
                                  class="paperview-input-textarea" readonly rows="3"></el-input>
                      </td>
                    </tr>
                  </table>
                  <br>
                  <el-button type="primary" disabled>评 价</el-button>
                </el-form>
              </el-tab-pane>


              <el-tab-pane label="转正评价" name="zero" :disabled="disabled0">
                <el-form :model="formEvaInfo0" :rules="rules" ref="StudentEvaInfo0">
                  <table border="1px" cellspacing="0px" style="border-collapse:collapse">
                    <tr>
                      <td colspan="12"></td>
                    </tr>
                    <tr>
                      <td colspan="2" rowspan="2">项目部</td>
                      <td rowspan="2">员工部门</td>
                      <td rowspan="2">员工职务</td>
                      <td rowspan="2">评价人</td>
                      <td colspan="5">评价分项</td>
                      <td colspan="2" rowspan="2">整体评价分数</td>
                    </tr>
                    <tr>
                      <td>能力</td>
                      <td>积极性</td>
                      <td>沟通交流</td>
                      <td>人品</td>
                      <td>性格</td>
                    </tr>
                    <tr>
                      <td colspan="2">工作评价</td>
                      <td>
                        <el-form-item prop="deptname">
                          <el-input v-model="formEvaInfo0.deptname" class="paperview-input-text" readonly></el-input>
                        </el-form-item>
                      </td>
                      <td>
                        <el-form-item prop="jobname">
                          <el-input v-model="formEvaInfo0.jobname" class="paperview-input-text" readonly></el-input>
                        </el-form-item>
                      </td>
                      <td>
                        <el-form-item prop="username">
                          <el-input v-model="formEvaInfo0.username" class="paperview-input-text" readonly></el-input>
                        </el-form-item>
                      </td>
                      <td>
                        <el-form-item prop="ability">
                          <el-input v-model.number="formEvaInfo0.ability" class="paperview-input-text"
                                    :readonly="readZero"></el-input>
                        </el-form-item>

                      </td>
                      <td>
                        <el-form-item prop="initiative">
                          <el-input v-model.number="formEvaInfo0.initiative" class="paperview-input-text"
                                    :readonly="readZero"></el-input>
                        </el-form-item>

                      </td>
                      <td>
                        <el-form-item prop="communication">
                          <el-input v-model.number="formEvaInfo0.communication" class="paperview-input-text"
                                    :readonly="readZero"></el-input>
                        </el-form-item>
                      </td>
                      <td>
                        <el-form-item prop="moral_quality">
                          <el-input v-model.number="formEvaInfo0.moral_quality" class="paperview-input-text"
                                    :readonly="readZero"></el-input>
                        </el-form-item>
                      </td>
                      <td>
                        <el-form-item prop="characters">
                          <el-input v-model.number="formEvaInfo0.characters" class="paperview-input-text"
                                    :readonly="readZero"></el-input>
                        </el-form-item>
                      </td>
                      <td colspan="2">
                        <el-form-item prop="appraisal_score">
                          <el-input v-model.number="formEvaInfo0.appraisal_score" class="paperview-input-text"
                                    :readonly="readZero"></el-input>
                        </el-form-item>

                      </td>
                    </tr>
                    <tr>
                      <td colspan="2">评价(包括主要优点及缺陷)</td>
                      <td colspan="10">
                        <el-form-item prop="appraisal_content">
                          <el-input v-model="formEvaInfo0.appraisal_content" type="textarea"
                                    class="paperview-input-textarea" :readonly="readZero" rows="2"></el-input>
                        </el-form-item>
                      </td>
                    </tr>
                  </table>
                  <br>
                  <el-button type="primary" @click="saveFormEvaInfo0" :disabled="readZero">评 价</el-button>
                </el-form>
              </el-tab-pane>


              <el-tab-pane label="一年评价" name="first" :disabled="disabled1">
                <el-form :model="formEvaInfo1" :rules="rules" ref="StudentEvaInfo1">

                  <table border="1px" cellspacing="0px" style="border-collapse:collapse">
                    <tr>
                      <td colspan="12"></td>
                    </tr>
                    <tr>
                      <td colspan="2" rowspan="2">项目部</td>
                      <td rowspan="2">员工部门</td>
                      <td rowspan="2">员工职务</td>
                      <td rowspan="2">评价人</td>
                      <td colspan="5">评价分项</td>
                      <td colspan="2" rowspan="2">整体评价分数</td>
                    </tr>
                    <tr>
                      <td>能力</td>
                      <td>积极性</td>
                      <td>沟通交流</td>
                      <td>人品</td>
                      <td>性格</td>
                    </tr>
                    <tr>
                      <td colspan="2">工作评价</td>
                      <td>
                        <el-form-item prop="deptname">
                          <el-input v-model="formEvaInfo1.deptname" class="paperview-input-text" readonly></el-input>
                        </el-form-item>
                      </td>
                      <td>
                        <el-form-item prop="jobname">
                          <el-input v-model="formEvaInfo1.jobname" class="paperview-input-text" readonly></el-input>
                        </el-form-item>
                      </td>
                      <td>
                        <el-form-item prop="username">
                          <el-input v-model="formEvaInfo1.username" class="paperview-input-text" readonly></el-input>
                        </el-form-item>
                      </td>
                      <td>
                        <el-form-item prop="ability">
                          <el-input v-model.number="formEvaInfo1.ability" class="paperview-input-text"
                                    :readonly="readFirst"></el-input>
                        </el-form-item>

                      </td>
                      <td>
                        <el-form-item prop="initiative">
                          <el-input v-model.number="formEvaInfo1.initiative" class="paperview-input-text"
                                    :readonly="readFirst"></el-input>
                        </el-form-item>

                      </td>
                      <td>
                        <el-form-item prop="communication">
                          <el-input v-model.number="formEvaInfo1.communication" class="paperview-input-text"
                                    :readonly="readFirst"></el-input>
                        </el-form-item>
                      </td>
                      <td>
                        <el-form-item prop="moral_quality">
                          <el-input v-model.number="formEvaInfo1.moral_quality" class="paperview-input-text"
                                    :readonly="readFirst"></el-input>
                        </el-form-item>
                      </td>
                      <td>
                        <el-form-item prop="characters">
                          <el-input v-model.number="formEvaInfo1.characters" class="paperview-input-text"
                                    :readonly="readFirst"></el-input>
                        </el-form-item>
                      </td>
                      <td colspan="2">
                        <el-form-item prop="appraisal_score">
                          <el-input v-model.number="formEvaInfo1.appraisal_score" class="paperview-input-text"
                                    :readonly="readFirst"></el-input>
                        </el-form-item>

                      </td>
                    </tr>
                    <tr>
                      <td colspan="2">评价(包括主要优点及缺陷)</td>
                      <td colspan="10">
                        <el-form-item prop="appraisal_content">
                          <el-input v-model="formEvaInfo1.appraisal_content" type="textarea"
                                    class="paperview-input-textarea" :readonly="readFirst" rows="2"></el-input>
                        </el-form-item>
                      </td>
                    </tr>
                  </table>
                  <br>
                  <el-button type="primary" @click="saveFormEvaInfo1" :disabled="readFirst">评 价</el-button>
                </el-form>
              </el-tab-pane>


              <el-tab-pane label="两年评价" name="second" :disabled="disabled2">
                <el-form :model="formEvaInfo2" :rules="rules" ref="StudentEvaInfo2">

                  <table border="1px" cellspacing="0px" style="border-collapse:collapse">
                    <tr>
                      <td colspan="12"></td>
                    </tr>
                    <tr>
                      <td colspan="2" rowspan="2">项目部</td>
                      <td rowspan="2">员工部门</td>
                      <td rowspan="2">员工职务</td>
                      <td rowspan="2">评价人</td>
                      <td colspan="5">评价分项</td>
                      <td colspan="2" rowspan="2">整体评价分数</td>
                    </tr>
                    <tr>
                      <td>能力</td>
                      <td>积极性</td>
                      <td>沟通交流</td>
                      <td>人品</td>
                      <td>性格</td>
                    </tr>
                    <tr>
                      <td colspan="2">工作评价</td>
                      <td>
                        <el-form-item prop="deptname">
                          <el-input v-model="formEvaInfo2.deptname" class="paperview-input-text" readonly></el-input>
                        </el-form-item>
                      </td>
                      <td>
                        <el-form-item prop="jobname">
                          <el-input v-model="formEvaInfo2.jobname" class="paperview-input-text" readonly></el-input>
                        </el-form-item>
                      </td>
                      <td>
                        <el-form-item prop="username">
                          <el-input v-model="formEvaInfo2.username" class="paperview-input-text" readonly></el-input>
                        </el-form-item>
                      </td>
                      <td>
                        <el-form-item prop="ability">
                          <el-input v-model.number="formEvaInfo2.ability" class="paperview-input-text"
                                    :readonly="readSecond"></el-input>
                        </el-form-item>

                      </td>
                      <td>
                        <el-form-item prop="initiative">
                          <el-input v-model.number="formEvaInfo2.initiative" class="paperview-input-text"
                                    :readonly="readSecond"></el-input>
                        </el-form-item>

                      </td>
                      <td>
                        <el-form-item prop="communication">
                          <el-input v-model.number="formEvaInfo2.communication" class="paperview-input-text"
                                    :readonly="readSecond"></el-input>
                        </el-form-item>
                      </td>
                      <td>
                        <el-form-item prop="moral_quality">
                          <el-input v-model.number="formEvaInfo2.moral_quality" class="paperview-input-text"
                                    :readonly="readSecond"></el-input>
                        </el-form-item>
                      </td>
                      <td>
                        <el-form-item prop="characters">
                          <el-input v-model.number="formEvaInfo2.characters" class="paperview-input-text"
                                    :readonly="readSecond"></el-input>
                        </el-form-item>
                      </td>
                      <td colspan="2">
                        <el-form-item prop="appraisal_score">
                          <el-input v-model.number="formEvaInfo2.appraisal_score" class="paperview-input-text"
                                    :readonly="readSecond"></el-input>
                        </el-form-item>

                      </td>
                    </tr>
                    <tr>
                      <td colspan="2">评价(包括主要优点及缺陷)</td>
                      <td colspan="10">
                        <el-form-item prop="appraisal_content">
                          <el-input v-model="formEvaInfo2.appraisal_content" type="textarea"
                                    class="paperview-input-textarea" :readonly="readSecond" rows="2"></el-input>
                        </el-form-item>
                      </td>
                    </tr>
                  </table>
                  <br>
                  <el-button type="primary" @click="saveFormEvaInfo2" :disabled="readSecond">评 价</el-button>
                </el-form>
              </el-tab-pane>

              <el-tab-pane label="三年评价" name="third" :disabled="disabled3">
                <el-form :model="formEvaInfo3" :rules="rules" ref="StudentEvaInfo3">

                  <table border="1px" cellspacing="0px" style="border-collapse:collapse">
                    <tr>
                      <td colspan="12"></td>
                    </tr>
                    <tr>
                      <td colspan="2" rowspan="2">项目部</td>
                      <td rowspan="2">员工部门</td>
                      <td rowspan="2">员工职务</td>
                      <td rowspan="2">评价人</td>
                      <td colspan="5">评价分项</td>
                      <td colspan="2" rowspan="2">整体评价分数</td>
                    </tr>
                    <tr>
                      <td>能力</td>
                      <td>积极性</td>
                      <td>沟通交流</td>
                      <td>人品</td>
                      <td>性格</td>
                    </tr>
                    <tr>
                      <td colspan="2">工作评价</td>
                      <td>
                        <el-form-item prop="deptname">
                          <el-input v-model="formEvaInfo3.deptname" class="paperview-input-text" readonly></el-input>
                        </el-form-item>
                      </td>
                      <td>
                        <el-form-item prop="jobname">
                          <el-input v-model="formEvaInfo3.jobname" class="paperview-input-text" readonly></el-input>
                        </el-form-item>
                      </td>
                      <td>
                        <el-form-item prop="username">
                          <el-input v-model="formEvaInfo3.username" class="paperview-input-text" readonly></el-input>
                        </el-form-item>
                      </td>
                      <td>
                        <el-form-item prop="ability">
                          <el-input v-model.number="formEvaInfo3.ability" class="paperview-input-text"
                                    :readonly="readThird"></el-input>
                        </el-form-item>

                      </td>
                      <td>
                        <el-form-item prop="initiative">
                          <el-input v-model.number="formEvaInfo3.initiative" class="paperview-input-text"
                                    :readonly="readThird"></el-input>
                        </el-form-item>

                      </td>
                      <td>
                        <el-form-item prop="communication">
                          <el-input v-model.number="formEvaInfo3.communication" class="paperview-input-text"
                                    :readonly="readThird"></el-input>
                        </el-form-item>
                      </td>
                      <td>
                        <el-form-item prop="moral_quality">
                          <el-input v-model.number="formEvaInfo3.moral_quality" class="paperview-input-text"
                                    :readonly="readThird"></el-input>
                        </el-form-item>
                      </td>
                      <td>
                        <el-form-item prop="characters">
                          <el-input v-model.number="formEvaInfo3.characters" class="paperview-input-text"
                                    :readonly="readThird"></el-input>
                        </el-form-item>
                      </td>
                      <td colspan="2">
                        <el-form-item prop="appraisal_score">
                          <el-input v-model.number="formEvaInfo3.appraisal_score" class="paperview-input-text"
                                    :readonly="readThird"></el-input>
                        </el-form-item>

                      </td>
                    </tr>
                    <tr>
                      <td colspan="2">评价(包括主要优点及缺陷)</td>
                      <td colspan="10">
                        <el-form-item prop="appraisal_content">
                          <el-input v-model="formEvaInfo3.appraisal_content" type="textarea"
                                    class="paperview-input-textarea" :readonly="readThird" rows="2"></el-input>
                        </el-form-item>
                      </td>
                    </tr>
                  </table>
                  <br>
                  <el-button type="primary" @click="saveFormEvaInfo3" :disabled="readThird">评 价</el-button>
                </el-form>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-dialog>


        <div align="left" style="float: left">
          <el-input v-model="listQuery.filter" placeholeder="请输入部门评价人姓名" style="width: 200px;">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <el-button type="primary" @click="queryDeptEvaluators">查询</el-button>
        </div>
        <el-table
          :data="tableData"
          border
          stripe
          height="590"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="index"
            label="序号"
            width="50"
            align="center">
            <template slot-scope="scope">
              <!--作用域插槽slot-scope，设置序号从1一直到获得数据的最后一个元素的数组下标+1-->
              <span>{{(page.currentPage - 1)*listQuery.limit + scope.$index +1}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="student_name"
            label="姓名"
            min-width="75"
            align="center"
            header-align="center">
          </el-table-column>
          <el-table-column
            prop="sex"
            label="性别"
            min-width="52"
            align="center"
            header-align="center"
            :formatter="formatSex">
          </el-table-column>
          <el-table-column
            prop="college"
            label="学校"
            min-width="120"
            align="center"
            show-overflow-tooltip
            header-align="center">
          </el-table-column>
          <el-table-column
            prop="native_place"
            label="籍贯"
            min-width="100"
            align="center"
            show-overflow-tooltip
            header-align="center">
          </el-table-column>
          <el-table-column label="培训期间测试成绩"
                           align="center">
            <el-table-column
              prop="html"
              label="HTML笔试"
              min-width="75"
              align="center"
              header-align="center">
            </el-table-column>
            <el-table-column
              prop="oracle"
              label="oracle成绩"
              min-width="75"
              align="center"
              header-align="center">
            </el-table-column>
            <el-table-column
              prop="js"
              label="JS笔试"
              min-width="75"
              align="center"
              header-align="center">
            </el-table-column>
            <el-table-column
              prop="java_base"
              label="java基础笔试"
              min-width="75"
              align="center"
              header-align="center">
            </el-table-column>
            <el-table-column
              prop="java_high"
              label="java高级笔试"
              min-width="75"
              align="center"
              header-align="center">
            </el-table-column>
            <el-table-column
              prop="l1"
              label="L1面试"
              min-width="75"
              align="center"
              header-align="center">
            </el-table-column>
          </el-table-column>
          <el-table-column
            prop="school_score"
            label="学校评价"
            min-width="100"
            align="center">
          </el-table-column>
          <el-table-column
            prop="score0"
            label="转正评价"
            min-width="100"
            align="center"
            :formatter="formatScore0">
          </el-table-column>
          <el-table-column
            prop="score1"
            label="一年评价"
            min-width="100"
            align="center"
            :formatter="formatScore1">
          </el-table-column>
          <el-table-column
            prop="score2"
            label="两年评价"
            min-width="100"
            align="center"
            :formatter="formatScore2">
          </el-table-column>
          <el-table-column
            prop="score3"
            label="三年评价"
            min-width="100"
            align="center"
            :formatter="formatScore3">
          </el-table-column>
          <el-table-column
            label="操作"
            align="center">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                @click="handleEdit(scope.row)">打分
              </el-button>
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
      </el-main>

    </el-container>
  </div>
</template>


<script>
  import axios from 'axios';

  export default {
    name: "StudentEvaluation",
    data() {

      //自定义表单验证
      var checkItemScore = function (rule, value, callback) {
        if (value == '' || value == null || value == undefined) {
          callback(new Error('请输入成绩'));
        } else {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入整数'));
          } else {
            if (value > 100 || value < 0) {
              callback(new Error('请输入0-100'));
            } else {
              callback();
            }
          }
        }
      };
      var checkTotalScore = function (rule, value, callback) {
        if (value == '' || value == null || value == undefined) {
          callback(new Error('请输入成绩'));
        } else {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入整数'));
          } else {
            if (value > 5 || value < 0) {
              callback(new Error('总评价评分标准为5分制'));
            } else {
              callback();
            }
          }
        }
      };


      return {
        uname: "",//存储从sessionStorage中的用户名
        //表格分页、查询等数据
        tableData: [],

        page: {
          //当前页码
          currentPage: 1,
          sizes: [2, 8, 12]
        },
        //初始查询条件
        listQuery: {
          limit: 8,
          page: 1,
          //查询条件 模糊查询名字
          filter: "",
          evaluatorid: sessionStorage.getItem("userid")
        },


        //总条数，后面会被覆盖
        total: 0,
        //总页数
        pageCount: 0,
        //新增或者编辑功能相关数据
        dialogTitle: "评价",
        //用于显示对话框的显示和隐藏
        dialogFormVisible: false,

        //学生基础信息的声明
        formInfo: {
          studentid: "",
          student_name: "",
          sex: "",
          native_place: "",
          birthday: "",
          marital_status: "",
          phone: "",
          id_number: "",
          hiredate: "",
          college: "",
          major: "",
          images_directory: "",
          remarks: "",
          deptno: "",
          gradeid: "",
          jobname: ""
        },

        //入职后工作时长
        workMonth: "",
        workYear: "",


        //选项卡禁用
        disabled0: false,
        disabled1: false,
        disabled2: false,
        disabled3: false,

        //转正评价信息表单的声明
        formEvaInfo0: {
          studentid: "",
          evaluatorid: "",
          deptno: "",
          jobid: "",
          deptname: "",
          jobname: "",
          username: "",
          ability: "",
          initiative: "",
          communication: "",
          moral_quality: "",
          characters: "",
          work_year: "",
          appraisal_score: "",
          appraisal_content: "",
          saveTime0: "",
          save0: ""
        },

        //一年评价信息表单的声明
        formEvaInfo1: {
          studentid: "",
          evaluatorid: "",
          deptno: "",
          jobid: "",
          deptname: "",
          jobname: "",
          username: "",
          ability: "",
          initiative: "",
          communication: "",
          moral_quality: "",
          characters: "",
          work_year: "",
          appraisal_score: "",
          appraisal_content: "",
          saveTime1: "",
          save1: ""
        },
        //二年评价信息表单的声明
        formEvaInfo2: {
          studentid: "",
          evaluatorid: "",
          deptno: "",
          jobid: "",
          deptname: "",
          jobname: "",
          username: "",
          ability: "",
          initiative: "",
          communication: "",
          moral_quality: "",
          characters: "",
          work_year: "",
          appraisal_score: "",
          appraisal_content: "",
          saveTime2: "",
          save2: ""
        },
        //三年评价信息表单的声明
        formEvaInfo3: {
          evaluatorid: "",
          studentid: "",
          deptno: "",
          jobid: "",
          deptname: "",
          jobname: "",
          username: "",
          ability: "",
          initiative: "",
          communication: "",
          moral_quality: "",
          characters: "",
          work_year: "",
          appraisal_score: "",
          appraisal_content: "",
          saveTime3: "",
          save3: ""
        },
        //学校评价信息表单的声明
        formEvaInfoSc: {
          gradeid: "",
          teachername: "",
          html: "",
          oracle: "",
          js: "",
          java_base: "",
          java_high: "",
          l1: "",
          appraisal_score: "",
          appraisal_content: ""
        },


        /*显示文本默认显示宽度*/
        formLabelWidth: "80px",

        rules: {
          ability: [
            {validator: checkItemScore, trigger: 'blur'}
          ],
          initiative: [
            {validator: checkItemScore, trigger: 'blur'}
          ],
          communication: [
            {validator: checkItemScore, trigger: 'blur'}
          ],
          moral_quality: [
            {validator: checkItemScore, trigger: 'blur'}
          ],
          characters: [
            {validator: checkItemScore, trigger: 'blur'}
          ],
          appraisal_score: [
            {validator: checkTotalScore, trigger: 'blur'}
          ],
          appraisal_content: [
            {required: true, message: '请输入评价', trigger: 'blur'}
          ]
        },
        //被选中的学生员工信息
        checkData: [],
        //标签页的活动页 （当前页）
        activeName: '',
        readZero: "",
        readFirst: "",
        readSecond: "",
        readThird: "",
        //选项卡下标，用于保存时传年份
        tableIndex: "",
      }
    },

    methods: {
      getStudents: function () {
        //用于该部门评价人所在部门的金桥学员员工信息
        axios.post("/getStudentsByDeptno", this.listQuery).then(res => {
          //res.data返回的是对象数组
          this.tableData = res.data.students;
          this.total = res.data.total;
        });
      },

      queryDeptEvaluators: function () {
        //设置传递到后台的代码为1
        this.getStudents();
        this.page.currentPage = 1; //默认显示第一页
      },

      handleSizeChange: function (val) {
        //当每页显示条数发生变化时，触发该事件
        //需要根据当前参数重新去后台查询数据
        this.listQuery.limit = val;
        this.getStudents();
      },

      handleCurrentChange: function (val) {
        //当前页码发生变化时，触发该事件
        //获取当前页码，赋值给this.listQuery.page，getStudents
        //val代表当前页码
        this.listQuery.page = val;
        this.getStudents();
      },


      //新增对话框中的取消按钮事件
      closeDlog: function () {
        this.formEvaInfoSc = {};
        this.formEvaInfo0 = {};
        this.formEvaInfo1 = {};
        this.formEvaInfo2 = {};
        this.formEvaInfo3 = {};
        //关闭对话框
        this.dialogFormVisible = false;

      },

      //打分
      handleEdit: function (rowData) {

        this.formEvaInfoSc = {};
        this.formEvaInfo0 = {};
        this.formEvaInfo1 = {};
        this.formEvaInfo2 = {};
        this.formEvaInfo3 = {};
        this.$nextTick(() => {
          this.$refs['StudentEvaInfo0'].clearValidate();
          this.$refs['StudentEvaInfo1'].clearValidate();
          this.$refs['StudentEvaInfo2'].clearValidate();
          this.$refs['StudentEvaInfo3'].clearValidate();

        })

        var studentid = rowData.studentid;
        this.dialogTitle = "员工评价";

        //根据员studentid获取员工的详细信息，展示到对话框
        axios.post("/getStudentAllInfoByStudentid", studentid).then(res => {

          debugger
          //部分为对当前评价人的预填充，后面会被覆盖。
          //另一部分为对表单隐藏数据的补充
          this.formEvaInfo0.username = sessionStorage.getItem("uname");
          this.formEvaInfo0.evaluatorid = sessionStorage.getItem("userid");
          this.formEvaInfo0.studentid = res.data.studentInfo.studentid;
          this.formEvaInfo0.deptno = res.data.studentInfo.deptno;
          this.formEvaInfo0.jobid = res.data.studentInfo.jobid;
          this.formEvaInfo0.deptname = res.data.studentInfo.deptname;
          this.formEvaInfo0.jobname = res.data.studentInfo.jobname;
          this.formEvaInfo0.work_year = "0";


          this.formEvaInfo1.username = sessionStorage.getItem("uname");
          this.formEvaInfo1.evaluatorid = sessionStorage.getItem("userid");
          this.formEvaInfo1.studentid = res.data.studentInfo.studentid;
          this.formEvaInfo1.deptno = res.data.studentInfo.deptno;
          this.formEvaInfo1.jobid = res.data.studentInfo.jobid;
          this.formEvaInfo1.deptname = res.data.studentInfo.deptname;
          this.formEvaInfo1.jobname = res.data.studentInfo.jobname;
          this.formEvaInfo1.work_year = "1";


          this.formEvaInfo2.username = sessionStorage.getItem("uname");
          this.formEvaInfo2.evaluatorid = sessionStorage.getItem("userid");
          this.formEvaInfo2.studentid = res.data.studentInfo.studentid;
          this.formEvaInfo2.deptno = res.data.studentInfo.deptno;
          this.formEvaInfo2.jobid = res.data.studentInfo.jobid;
          this.formEvaInfo2.deptname = res.data.studentInfo.deptname;
          this.formEvaInfo2.jobname = res.data.studentInfo.jobname;
          this.formEvaInfo2.work_year = "2";


          this.formEvaInfo3.username = sessionStorage.getItem("uname");
          this.formEvaInfo3.evaluatorid = sessionStorage.getItem("userid");
          this.formEvaInfo3.studentid = res.data.studentInfo.studentid;
          this.formEvaInfo3.deptno = res.data.studentInfo.deptno;
          this.formEvaInfo3.jobid = res.data.studentInfo.jobid;
          this.formEvaInfo3.deptname = res.data.studentInfo.deptname;
          this.formEvaInfo3.jobname = res.data.studentInfo.jobname;
          this.formEvaInfo3.work_year = "3";


          this.formInfo = res.data.studentInfo;
          this.formEvaInfoSc = res.data.studentEvaInfoSc == null ? this.formEvaInfoSc : res.data.studentEvaInfoSc;
          this.formEvaInfo0 = res.data.studentEvaInfo0 == null ? this.formEvaInfo0 : res.data.studentEvaInfo0;
          this.formEvaInfo1 = res.data.studentEvaInfo1 == null ? this.formEvaInfo1 : res.data.studentEvaInfo1;
          this.formEvaInfo2 = res.data.studentEvaInfo2 == null ? this.formEvaInfo2 : res.data.studentEvaInfo2;
          this.formEvaInfo3 = res.data.studentEvaInfo3 == null ? this.formEvaInfo3 : res.data.studentEvaInfo3;
          this.workMonth = res.data.workMonth;

          this.formEvaInfo0.save0 = res.data.save0;
          this.formEvaInfo0.saveTime0 = res.data.saveTime0;

          this.formEvaInfo1.save1 = res.data.save1;
          this.formEvaInfo1.saveTime1 = res.data.saveTime1;

          this.formEvaInfo2.save2 = res.data.save2;
          this.formEvaInfo2.saveTime2 = res.data.saveTime2;


          this.formEvaInfo3.save3 = res.data.save3;
          this.formEvaInfo3.saveTime3 = res.data.saveTime3;

          //部门被删除，则显示该部门被解散
          if (res.data.studentEvaInfo0.deptname = null) {
            this.formEvaInfo0.deptname = "部门已解散"
          }
          if (res.data.studentEvaInfo1.deptname = null) {
            this.formEvaInfo1.deptname = "部门已解散"
          }
          if (res.data.studentEvaInfo2.deptname = null) {
            this.formEvaInfo2.deptname = "部门已解散"
          }
          if (res.data.studentEvaInfo3.deptname = null) {
            this.formEvaInfo3.deptname = "部门已解散"
          };


          //根据入职后工作月份，来判断选项卡的开启禁用，以及是否可以编辑，

          //评价为空可以编辑，评价不为空，若第一次评价时间与当前时间相比不超过七天都可以进行重新的修改编辑
          //readnumber 为控制只读的变量，false 为不只读，即可以编辑。
          if (this.workMonth < 3) {
            this.disabled0 = true;
            this.disabled1 = true;
            this.disabled2 = true;
            this.disabled3 = true;
            this.activeName = "school";
          } else if (this.workMonth < 12) {
            // 1 2 3年 选项卡禁用
            this.disabled0 = false;
            this.disabled1 = true;
            this.disabled2 = true;
            this.disabled3 = true;

            //可编辑转正
            if (this.formEvaInfo0.appraisal_score == null) {
              this.readZero = false;
              this.activeName = "zero";
            } else {
              if (this.formEvaInfo0.saveTime0 <= 7) {
                this.readZero = false;
                this.activeName = "zero";
              }
              this.readZero = true;
              this.activeName = "school";
            }


            this.readFirst = true;
            this.readSecond = true;
            this.readThird = true;

          } else if (this.workMonth < 24) {
            // 2 3年 选项卡禁用
            this.disabled0 = false;
            this.disabled1 = false;
            this.disabled2 = true;
            this.disabled3 = true;

            //是空可以评价，评价之后不能再次编辑
            if (this.formEvaInfo0.appraisal_score == null) {
              this.readZero = false;
            } else {
              if (this.formEvaInfo0.saveTime0 <= 7) {
                this.readZero = false;
              } else {
                this.readZero = true;
              }
            }

            //是空可以评价，评价之后不能再次编辑
            if (this.formEvaInfo1.appraisal_score == null) {
              this.readFirst = false;
              this.activeName = "first"
            } else {
              if (this.formEvaInfo1.saveTime1 <= 7) {
                this.readFirst = false;

              } else {
                this.readFirst = true;
                this.activeName = "school";
              }
            }

            this.readSecond = true;
            this.readThird = true;

          } else if (this.workMonth < 36) {
            //第3年选项卡禁用
            this.disabled0 = false;
            this.disabled1 = false;
            this.disabled2 = false;
            this.disabled3 = true;


            //是空可以评价，评价之后不能再次编辑
            if (this.formEvaInfo0.appraisal_score == null) {
              this.readZero = false;
            } else {
              if (this.formEvaInfo0.saveTime0 <= 7) {
                this.readZero = false;
              } else {
                this.readZero = true;
              }
            }

            //是空可以评价，评价之后不能再次编辑
            if (this.formEvaInfo1.appraisal_score == null) {
              this.readFirst = false;
            } else {
              if (this.formEvaInfo1.saveTime1 <= 7) {
                this.readFirst = false;

              } else {
                this.readFirst = true;
              }
            }


            //是空可以评价，评价之后不能再次编辑
            if (this.formEvaInfo2.appraisal_score == null) {
              this.readSecond = false;
              this.activeName = "second"
            } else {
              debugger
              if (this.formEvaInfo2.saveTime2 <= 7) {
                this.readSecond = false;
                this.activeName = "second";
              } else {
                this.readSecond = true;
                this.activeName = "school"
              }
            }


            this.readThird = true;
          } else {
            this.disabled0 = false;
            this.disabled1 = false;
            this.disabled2 = false;
            this.disabled3 = false;
            //是空可以评价，评价之后不能再次编辑
            if (this.formEvaInfo3.appraisal_score == null) {
              this.readZero = false;
            } else {
              if (this.formEvaInfo3.saveTime3 <= 7) {
                this.readZero = false;
              } else {
                this.readZero = true;
              }
            }

            //是空可以评价，评价之后不能再次编辑
            if (this.formEvaInfo1.appraisal_score == null) {
              this.readFirst = false;
            } else {
              if (this.formEvaInfo1.saveTime1 <= 7) {
                this.readFirst = false;

              } else {
                this.readFirst = true;
              }
            }


            //是空可以评价，评价之后不能再次编辑
            if (this.formEvaInfo2.appraisal_score == null) {
              this.readSecond = false;
            } else {
              if (this.formEvaInfo2.saveTime2 <= 7) {
                this.readSecond = false;

              } else {
                this.readSecond = true;
              }
            }

            //是空可以评价，评价之后不能再次编辑
            if (this.formEvaInfo3.appraisal_score == null) {
              this.readThird = false;
            } else {
              if (this.formEvaInfo3.saveTime3 <= 7) {
                this.readThird = false;
              } else {
                this.readThird = true;
              }
            }
            this.activeName = "school";
          }

          this.dialogFormVisible = true;


        })
      },
      /**
       * 保存转正评价
       */
      saveFormEvaInfo0: function () {
        //表单验证
        this.$refs["studentEvaInfo0"].validate((valid) => {
          if (valid) {
            axios.post("/addOrUpdDeptEvaluation", this.formEvaInfo0).then(res => {
              if (res.data == "success") {
                this.getStudents();
                this.$message({
                  message: "评价成功",
                  type: "success"
                })
              } else {
                this.dialogFormVisible = false;
                this.getStudents();
                this.$message({
                  message: "评价失败",
                  type: "error"
                })
              }
            })
          }
        })
      },
      /**
       * 保存一年评价
       */
      saveFormEvaInfo1: function () {
        //表单验证
        this.$refs["studentEvaInfo1"].validate((valid) => {
          if (valid) {
            axios.post("/addOrUpdDeptEvaluation", this.formEvaInfo1).then(res => {
              if (res.data == "success") {
                this.getStudents();
                this.$message({
                  message: "评价成功",
                  type: "success"
                })
              } else {
                this.getStudents();
                this.$message({
                  message: "评价失败",
                  type: "error"
                })
              }
            })
          }
        })
      },
      /**
       * 保存二年评价
       */
      saveFormEvaInfo2: function () {
        //表单验证
        this.$refs["studentEvaInfo2"].validate((valid) => {
          if (valid) {
            axios.post("/addOrUpdDeptEvaluation", this.formEvaInfo2).then(res => {
              if (res.data == "success") {
                this.getStudents();
                this.$message({
                  message: "评价成功",
                  type: "success"
                })
              } else {
                this.getStudents();
                this.$message({
                  message: "评价失败",
                  type: "error"
                })
              }
            })
          }
        })
      },
      /**
       * 保存三年评价
       */
      saveFormEvaInfo3: function () {
        //表单验证
        this.$refs["studentEvaInfo3"].validate((valid) => {
          if (valid) {
            axios.post("/addOrUpdDeptEvaluation", this.formEvaInfo3).then(res => {
              if (res.data == "success") {
                this.getStudents();
                this.$message({
                  message: "评价成功",
                  type: "success"
                })
              } else {
                this.getStudents();
                this.$message({
                  message: "评价失败",
                  type: "error"
                })
              }
            })
          }
        })
      },


      handleSelectionChange: function (val) {
        //被选中的数据：行对象数组
        this.checkData = val;
      },

      //将后台数据库返还回来的 0 1 转换为男 女
      formatSex: function (row, column) {
        return row.sex == '0' ? "男" : row.sex == '1' ? "女" : "";
      },
      //四个总分的分数判断
      formatScore0: function (row, coulumn) {
        return row.score0 == null ? "未评价" : row.score0;
      },
      formatScore1: function (row, coulumn) {
        return row.score1 == null ? "未评价" : row.score1;
      },
      formatScore2: function (row, coulumn) {
        return row.score2 == null ? "未评价" : row.score2;
      },
      formatScore3: function (row, coulumn) {
        return row.score3 == null ? "未评价" : row.score3;
      },
      //测试选项卡数据
      handleClick(tab, event) {
        console.log(tab, event);
        this.workYear = tab.index - 1;
      },

    },

    created() {
    },

    mounted() {
      //查询数据
      this.getStudents();
      //从sessionStroage中获取用户名
      this.uname = sessionStorage.getItem("uname");

    }
  }

</script>

<style scoped>
  .paperview-input-text >>> .el-input__inner {
    text-align: center;
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
    vertical-align: middle;
    font-size: 19px;
    border: 0px;
    width: 100%;
    resize: none;
  }


</style>
