# models(redux) 封装
> 基于redux进行封装，不改变redux源码，可以结合使用redux社区中其他解决方案

models用于管理数据，要解决的问题：

1. 命名空间（防止数据、方法命名冲突）：数据与方法，都归属于具体model，比如：state.userCenter.xxx，this.props.action.userCenter.xxx();
1. 如何方便的获取数据：connect与组件连接；
1. 如何方便的修改数据：this.props.action中方法；
1. 客户端数据持久化（保存到LocalStorage中）：syncState配置；
1. 异步数据处理：基于promise异步封装；
1. 请求错误提示：error处理封装，errorTip配置，自动提示；
1. 请求成功提示：successTip配置，自动提示；
1. 简化写法：types actions reducers 可以在一个文件中编写，参见`models/side.js` `models/page-head.js`;

## all-models.js
此文件通过脚本自动生成，必要直接编辑，生成规则如下：

```
/path/to/models/user-center.js --> export userCenter from '/path/to/models/user-center';
/path/to/user-center.model.js  --> export userCenter from '/path/to/user-center.model.js';
/path/to/user-center/model.js  --> export userCenter from '/path/to/user-center/model.js';
```

## 组件与redux进行连接
提供了两种方式，装饰器方式、函数调用方式；

注：连接路由的组件已经自动`connect`，但是没有给组件传入任何redux中的数据，只可以使用`this.props.action`调用redux中的方法；非路由直接组件，需要显示connect；

### 装饰器
推荐使用装饰器方式

```jsx harmony
import {connect} from 'path/to/models';

@connect(state => {
    return {
        ...
    }
})
class Demo extends Component{
    ...
}
```

### 函数
```jsx harmony
import {connectComponent} from 'path/to/models';

class Demo extends Component {
   ... 
}
function mapStateToProps(state) {
    return {
        ...
    };
}

export default connectComponent({LayoutComponent: Demo, mapStateToProps});
```

## 简化写法：action reducer 二合一
一个model中，除了initialState syncState actions reducers 等关键字之外的属性，都视为action reducer合并写法;

缺陷是一个action只能被一个reducer处理，但是也同时保证了代码的简介性，一般情况下action与reducer都是一一对应的；

```js

const types = {
    GET_MENU_STATUS: 'MENU:GET_MENU_STATUS', // 防止各个模块冲突，最好模块名开头
};


export default {
    initialState: {
        title: '',
        show: true,
        users: [], 
        total: 0,
        loading: false,
        ...
    },
    // syncState: true, // initialState会全部同步到localStorage中
    syncState: { // 配置部分存储到localStorage中
        titel: true,
        user: {
            name: true,
        },
    },
    
    // 单独action定义，需要使用actionType与reducer进行关联
    actions: {
        getMenuStatus: createAction(types.GET_MENU_STATUS),
    },
    // 单独reducer定义，使用了actionType，不仅可以处理当前model中的action，也可以处理其他任意action（只要actionType能对应）
    reducers: {
        [types.GET_MENU_STATUS](state) {
            ...
            return {
                ...
            };
        }
    },
    
    // action reducer 合并写法，如果一个action 只对应一个reducer，这种写法不需要指定actionType，可以有效简化代码；
    // 如果action有额外的数据处理，请使用这种结构
    arDemo: {
        payload() { // 如果是函数返回值将作为action.payload 传递给reducer，如果非函数，直接将payload的值，作为action.payload;
        },
        meta() { // 如果是函数返回值将作为action.meta 传递给reducer，如果非函数，直接将meta的值，作为action.meta;
        },
        reducer(state, action) {
            // return {...state};
            returtn {...newState}; // 可以直接返回要修改的数据，内部封装会与原state合并`{...state, ...newState}`;
        },
    },
    
    // action 数据不需要特殊处理，会直接传递给 reducer的action.payload
    setBreadcrumbs: (state, {payload}) => ({breadcrumbs: payload}),
    show: () => ({show: true}),
    
    
    // 异步action写法
    fetchUser: {
        // 调用时（`this.props.action.user.fetchUser({params, options, successTip, errorTip, onResolve, onReject, onComplete})`）参数约定为一个对象，对象各个属性说明如下:
        // params: 请求参数
        // options: 请求配置
        // successTip: 成功提示信息
        // errorTip: 错误提示信息
        // onResolve: 成功回调
        // onReject: 失败回调
        // onComplete: 完成回调，无论成功、失败都会调用
        
        // 异步action payload 返回promise     
        payload: ({params, options}) => axios.get('/mock/users', params, options),
        
        // 异步action 默认使用通用异步meta配置 commonAsyncMeta，对successTip errorTip onResolve onReject onComplete 进行了合理的默认值处理，需要action以对象形式传参调用
        // meta: commonAsyncMeta, 
        // meta: { // 可以是函数，可以是对象
        //     successTip: '查询成功！欧耶~',
        //     errorTip: '自定义errorTip！马丹~',
        // },
        
        // 基于promise 异步reducer写法；
        reducer: {
            pending: () => ({loading: true}),
            resolve(state, {payload = {}}) {
                const {total = 0, list = []} = payload;
                return {
                    users: list,
                    total,
                }
            },
            complete: () => ({loading: false}),
        }
    },
};

```
注：所有的reducer方法，无论是什么写法中的，都可以直接返回新数据，不必关心与原数据合并（...state），封装内部做了合并；
