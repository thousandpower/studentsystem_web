import Vue from 'vue'
import Router from 'vue-router'


import Home from '@/components/Home'
import DeptMaintain from '@/components/DeptMaintain'
import DeptEvaluatorManagement from '@/components/DeptEvaluatorManagement'
import Login from "@/components/Login";
import editPwd from '@/components/editPwd'
import StudentManagement from '@/components/StudentManagement'
import Welcome from '@/components/Welcome'
import StudentEvaluation from '@/components/StudentEvaluation'
import test from '@/components/test'
import test1 from '@/components/test1'





Vue.use(Router)

export default new Router({
  routes: [
    {
      path:"/test",
      name:"test",
      component:test
    },
        {
      path:"/test1",
      name:"test1",
      component:test1
    },


    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      redirect:"/Welcome",
      children: [
        {path: '/deptMaintain', component: DeptMaintain},
        {path: '/studentManagement', component: StudentManagement},
        {path:'/changePassword',component: editPwd},
        {path: '/deptevaluatorManagement', component: DeptEvaluatorManagement},
        {path: '/Welcome', component: Welcome},
        //学生评价
        {path: '/studentEvaluation', component: StudentEvaluation},



      ]

    },

  ]
})
