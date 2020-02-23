import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login/Login'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/ChooseInfo',
      name: 'chooseInfo',
      component: () => import(/* webpackChunkName: "chooseInfo" */ './views/Login/ChooseInfo/ChooseInfo')
    },
    {
      path: '/Sudoku',
      name: 'sudoku',
      component: () => import(/* webpackChunkName: "Sudoku" */ './views/Sudoku/Sudoku')
    },
    {
      path: '/Kanban',
      name: 'kanban',
      component: () => import(/* webpackChunkName: "Kanban" */ './views/Kanban/Kanban')
    },
    {
      path: '/Staff',
      name: 'staff',
      component: () => import(/* webpackChunkName: "Staff" */ './views/Kanban/Staff/Staff')
    },
    {
      path: '/ComPosition',
      name: 'comPosition',
      component: () => import(/* webpackChunkName: "ComPosition" */ './views/Kanban/ComPosition/ComPosition')
    },
    {
      path: '/Function',
      name: 'function',
      component: () => import(/* webpackChunkName: "Function" */ './views/Kanban/Function/Function')
    },
    {
      path: '/ScoreSum',
      name: 'scoreSum',
      component: () => import(/* webpackChunkName: "scoreSum" */ './views/Kanban/scoreSum/scoreSum')
    },
    {
      path: '/CultureCom',
      name: 'cultureCom',
      component: () => import(/* webpackChunkName: "scoreSum" */ './views/Kanban/cultureCom/cultureCom')
    },
    {
      path: '/CulturePos',
      name: 'culturePos',
      component: () => import(/* webpackChunkName: "scoreSum" */ './views/Kanban/culturePos/culturePos')
    },
    {
      path: '/KpiDis',
      name: 'kpiDis',
      component: () => import(/* webpackChunkName: "kpiDis" */ './views/Kanban/kpiDis/kpiDis')
    },
    {
      path: '/ManagementTrainee',
      name: 'managementTrainee',
      component: () => import(/* webpackChunkName: "ManagementTrainee" */ './views/Kanban/ManagementTrainee/ManagementTrainee')
    },
    {
      path: '/FunctionSum',
      name: 'functionSum',
      component: () => import(/* webpackChunkName: "FunctionSum" */ './views/Kanban/FunctionSum/FunctionSum')
    },
    {
      path: '/Promotion',
      name: 'promotion',
      component: () => import(/* webpackChunkName: "Promotion" */ './views/Kanban/Promotion/Promotion')
    },

    {
      path: '/Grade',
      name: 'grade',
      component: () => import(/* webpackChunkName: "Grade" */ './views/Grade/Grade')
    },
    {
      path: '/employeeGrade',
      name: 'employeeGrade',
      component: () => import(/* webpackChunkName: "employeeGrade" */ './views/Grade/employeeGrade/employeeGrade')
    }
  ]
})
