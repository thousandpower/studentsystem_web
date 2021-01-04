import Vue from 'vue'
import Router from 'vue-router'


//import Login from '@/components/login'
import Home from '@/components/Home'

import DeptEvaluatorManagement from '@/components/DeptEvaluatorManagement'
import Login from "@/components/Login";
import StudentManagement from "@/components/StudentManagement";
import resetPwd from '@/components/resetPwd'
import MyInform from "@/components/MyInform";
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/deptMaintain',
      name: 'Home',
      component: Home,
      redirect:"/deptMaintain",
      children: [
        {path: '/deptMaintain', component: DeptEvaluatorManagement},
        {path: '/studentManagement', component: StudentManagement},
        {path:'/resetPassword',component: resetPwd},
        {path:'/selfinfoMaintain',component: MyInform}
       /*
        {path: '/teacherManagement', component: EmpMain},
        {path: '/deptevaluatorManagement', component: EmpMain},
        {path: '/courseMaintain', component: EmpMain},
        {path: '/deptMaintain', component: DeptEvaluatorManagement}, {path: '/resetPassword', component: EmpMain},
        {path: '/studentRating', component: EmpMain},
        {path: '/studentEvaluation', component: EmpMain},*/

      ]

    },


  ]
})
