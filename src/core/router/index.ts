import { lazy } from 'react';

const Home = lazy(() => import('../../screen/home'));
const Task = lazy(() => import('../../screen/task'));
const Login = lazy(() => import('../../screen/login'));
const Dashboard = lazy(() => import('../../screen/dashboard'));
const Register = lazy(() => import('../../screen/register'));

const routers = [
    {
        id: 1,
        path: '/home',
        component: Home,
        authenticated: true
    },
    {
        id: 2,
        path: '/task/:id?',
        component: Task,
        authenticated: true
    },
    {
        id: 3,
        path: '/login',
        component: Login,
        authenticated: false
    },
    {
        id: 4,
        path: '/dashboard',
        component: Dashboard,
        authenticated: true
    },
    {
        id: 5,
        path: '/register',
        component: Register,
        authenticated: false
    }
]

export default routers
