import Vue from 'vue'
import Router from 'vue-router'


import Home from '@/components/Home'
import DeptMaintain from '@/components/DeptMaintain'
import DeptEvaluatorManagement from '@/components/DeptEvaluatorManagement'
import resetPwd from '@/components/resetPwd'
import MyInform from "@/components/MyInform";
import MyEvaluation from "@/components/MyEvaluation";
import Login from "@/components/Login";
import editPwd from '@/components/editPwd'
import StudentManagement from '@/components/StudentManagement'
import Welcome from '@/components/Welcome'
import StudentEvaluation from '@/components/StudentEvaluation'
import GradeManagement from '@/components/GradeManagement'
import TeacherEvaluateManagement from '@/components/TeacherEvaluateManagement'
import StudentRating from '@/components/StudentRating'
import DeptAssignment from '@/components/DeptAssignment'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      redirect: "/Welcome",
      children: [
        {path: '/studentManagement', component: StudentManagement},
        {path: '/changePassword', component: editPwd},
        {path: '/selfinfoMaintain', component: MyInform},
        {path: '/selfEvaluation', component: MyEvaluation},
        {path: '/resetPassword', component: resetPwd},
        {path: '/deptMaintain', component: DeptMaintain},
        {path: '/studentManagement', component: StudentManagement},
        {path: '/changePassword', component: editPwd},
        {path: '/deptevaluatorManagement', component: DeptEvaluatorManagement},
        {path: '/Welcome', component: Welcome},
        //学生评价
        {path: '/studentEvaluation', component: StudentEvaluation},
        {path: '/courseMaintain', component: GradeManagement},
        {path: '/studentRating', component: StudentRating},
        {path: '/teacherManagement', component: TeacherEvaluateManagement},
        {path: '/deptAssignment', component: DeptAssignment},




      ]

    },
  ]
})
