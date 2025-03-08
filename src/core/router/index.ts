import { lazy } from 'react';

const Home = lazy(() => import('../../screen/home'));
const Task = lazy(() => import('../../screen/task'));
const Login = lazy(() => import('../../screen/login'));

const routers = [
    {
        id: 1,
        path: '/home',
        component: Home,
    },
    {
        id: 2,
        path: '/task',
        component: Task,
    },
    {
        id: 3,
        path: '/login',
        component: Login
    }
]

export default routers
