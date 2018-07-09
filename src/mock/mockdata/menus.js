export default [
    {key: 'top1', icon: 'fa-file-code-o', text: '顶级菜单1'},
    {key: 'top11', parentKey: 'top1', icon: 'fa-file-code-o', text: '百度', url: 'https://www.baidu.com'},
    {key: 'top12', parentKey: 'top1', icon: 'fa-file-code-o', text: 'antd', url: 'https://ant.design/index-cn'},
    {key: 'top2', icon: 'fa-file-code-o', text: '顶级菜单2'},
    {key: 'top21', parentKey: 'top2', icon: 'fa-file-code-o', text: '子菜单2', path: '/sub2'},

    {key: 'example', text: 'Example', icon: 'fa-file-code-o', path: ''},
    {key: 'user-center', parentKey: 'example', text: '用户中心', icon: 'user', path: '/user-center', order: 10011},
    {key: 'user', parentKey: 'example', text: '用户列表', icon: 'user', path: '/example/users', order: 10011},
];
