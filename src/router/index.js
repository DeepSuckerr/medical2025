import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/views/Login.vue";
import Welcome from "@/views/Home/Welcome.vue";
import Home from "@/views/Home/Home.vue";
import CompanyMange from "@/views/Home/CompanyMange.vue";
import DoctorManage from "@/views/Home/DoctorManage.vue";


Vue.use(VueRouter)

// handle NavigationDuplicated error
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
      children: [
        {
          path:"welcome",
          component:Welcome
        },
        {
          path:"wel",
          component:Welcome
        },
        {
          path:"company",
          component: CompanyMange
        },
        {
          path:"DoctorManage",
          component: DoctorManage
        },
      ]
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
