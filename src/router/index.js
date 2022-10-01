import { createRouter, createWebHistory } from "vue-router";
import DashboardPage from "../views/Dashboard.vue";
import LoginPage from "../views/Login.vue";
const Overview = () => import('../views/dashboard/Overview.vue');
const Drugs = () => import('../views/dashboard/Drugs.vue');
const Vendors = () => import('../views/dashboard/Vendors.vue');
const SellingHistory = () => import('../views/dashboard/SellingHistory.vue');
const Setting = () => import('../views/dashboard/Setting.vue');

const routes = [
    {path:"/", component:LoginPage},
    {
        path:"/dashboard", 
        component:DashboardPage,
        redirect:"/dashboard/overview",
        children:[
            {path:"overview",component:Overview},
            {path:"drugs",component:Drugs},
            {path:"vendors",component:Vendors},
            {path:"selling-history",component:SellingHistory},
            {path:"setting",component:Setting},
        ]
    }
];

const router = createRouter({
    routes,
    history:createWebHistory()
});
export default router;