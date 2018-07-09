import pageRoutes from '../page-route';

export default [
    {path: '/', component: () => import('../pages/home/index')},
].concat(pageRoutes);
