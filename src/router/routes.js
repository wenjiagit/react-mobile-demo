import ReactLoadable from 'react-loadable';
import LoadingPage from '../components/loading-page';

const routes = [
    {path: '/', component: () => import('../pages/home/index')},
    {path: '/about', component: () => import('../pages/about/index')},
    {path: '/mine', component: () => import('../pages/mine/index')},
    {path: '/user', component: () => import('../pages/user/index')},
];

export default routes.map(item => {
    return {
        path: item.path,
        component: ReactLoadable({loader: item.component, loading: LoadingPage}),
    };
});
