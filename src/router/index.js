import Vue from 'vue'
import Router from 'vue-router'


//import Login from '@/components/login'
import Home from '@/components/Home'

import DeptMaintain from '@/components/DeptMaintain'
import DeptEvaluatorManagement from '@/components/DeptEvaluatorManagement'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {path: '/deptMaintain', component: DeptMaintain},
        {path: '/deptEvaluatorManagement', component: DeptEvaluatorManagement},
       /* {path: '/studentManagement', component: Login},
        {path: '/teacherManagement', component: EmpMain},

        {path: '/courseMaintain', component: EmpMain},
        {path: '/deptMaintain', component: DeptEvaluatorManagement}, {path: '/resetPassword', component: EmpMain},
        {path: '/studentRating', component: EmpMain},
        {path: '/studentEvaluation', component: EmpMain},*/

      ]

    },

  ]
})
