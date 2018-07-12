import pageRoutes from '../page-route';
/*
* 非脚本抓取的路由，可以在这里编辑，脚本抓取的路由在./src/page-route.js中
* */
export default [
    {path: '/', component: () => import('../pages/home/index')},
].concat(pageRoutes);
