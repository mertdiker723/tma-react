import { lazy } from 'react';

const Home = lazy(() => import('../../screen/home'));
const Task = lazy(() => import('../../screen/task'));
const Login = lazy(() => import('../../screen/login'));
const Dashboard = lazy(() => import('../../screen/dashboard'));

const routers = [
    {
        id: 1,
        path: '/home',
        component: Home,
    },
    {
        id: 2,
        path: '/task/:id?',
        component: Task,
    },
    {
        id: 3,
        path: '/login',
        component: Login
    },
    {
        id: 4,
        path: '/dashboard',
        component: Dashboard
    }
]

export default routers
