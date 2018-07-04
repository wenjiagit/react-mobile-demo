import ReactLoadable from 'react-loadable';
import LoadingPage from '../components/loading-page';

const loadable = loader => ReactLoadable({loader, loading: LoadingPage});

// import 引入不能是变量，这里无法用循环，只能每个路由都写import
export default [
    {path: '/', component: loadable(() => import('../pages/home/index'))},
    {path: '/about', component: loadable(() => import('../pages/about/index'))},
    {path: '/mine', component: loadable(() => import('../pages/mine/index'))},
    {path: '/user', component: loadable(() => import('../pages/user/index'))},
];
