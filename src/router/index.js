import Vue from 'vue'
import Router from 'vue-router'


//import Login from '@/components/login'
import Home from '@/components/Home'

import DeptEvaluatorManagement from '@/components/DeptEvaluatorManagement'
import Login from "@/components/Login";
import StudentManagement from "@/components/StudentManagement";
import editPwd from '@/components/editPwd';
import resetPwd from '@/components/resetPwd'
import MyInform from "@/components/MyInform";
import MyEvaluation from "@/components/MyEvaluation";

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Login',
            component: Login
        },
        {
            path: '/selfinfoMaintain',
            name: 'Home',
            component: Home,
            redirect: "/selfinfoMaintain",
            children: [
                {path: '/deptMaintain', component: DeptEvaluatorManagement},
                {path: '/studentManagement', component: StudentManagement},
                {path: '/changePassword', component: editPwd},
                {path: '/selfinfoMaintain', component: MyInform},
                {path: '/selfEvaluation', component: MyEvaluation},
                {path: '/resetPassword', component: resetPwd},

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
