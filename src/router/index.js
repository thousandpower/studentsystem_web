import Vue from 'vue'
import Router from 'vue-router'


//import Login from '@/components/login'
import Home from '@/components/Home'


Vue.use(Router)

export default new Router({
  routes: [
  {
      path: '/',
      name: 'Home',
      component: Home
    },
   /*   {
      path:'/studentManagement',
      name:'',
      component:Login

    },
    {
      path:'/teacherManagement',
      name:'EmpMain',
      component:EmpMain

    },
    {
      path:'/deptevaluatorManagement',
      name:'EmpMain',
      component:EmpMain

    },
    {
      path:'/courseMaintain',
      name:'EmpMain',
      component:EmpMain

    },
    {
      path:'/deptNaintain',
      name:'EmpMain',
      component:EmpMain

    },
    {
      path:'/resetPassword',
      name:'EmpMain',
      component:EmpMain

    },
    {
      path:'/studentRating',
      name:'EmpMain',
      component:EmpMain

    },
    {
      path:'/studentEvaluation',
      name:'EmpMain',
      component:EmpMain

    },


*/
  ]
})
