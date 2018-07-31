# 异步任意级别picker

基于antd mobile picker

## 何时使用
类似于省市区等异步级联选择场景

## API

其他参数与antd的[Picker](http://antd-mobile.gitee.io/components/picker-cn/)相同

参数|说明|类型|默认值
---|---|---|---
loadData | 获取级联数据的一组函数，一般几级级联，就几个函数，函数参数为上一级别选中的value 以及对应的item，返回promise => `[{value, label}]` | array | -

## 用法

```
import AsyncCascadePicker from 'path/to/async-cascade-picker';
...
<AsyncCascadePicker
    cols={3}
    loadData={[
        () => {
            return Promise.resolve([
                {value: '1', label: '1北京'},
                {value: '2', label: '2上海'},
                {value: '3', label: '3广州'},
                {value: '4', label: '4深圳'},
            ]);
        },
        (prov, provItem) => {
            console.log(prov, provItem);
            return Promise.resolve([
                {value: prov + '1', label: prov + '1市'},
                {value: prov + '2', label: prov + '2市'},
                {value: prov + '3', label: prov + '3市'},
                {value: prov + '4', label: prov + '4市'},
            ]);
        },
        (city) => {
            return Promise.resolve([
                {value: city + '1', label: city + '1区'},
                {value: city + '2', label: city + '2区'},
                {value: city + '3', label: city + '3区'},
                {value: city + '4', label: city + '4区'},
            ]);
        },
        (area) => {
            return Promise.resolve([
                {value: area + '1', label: area + '1街'},
                {value: area + '2', label: area + '2街'},
                {value: area + '3', label: area + '3街'},
                {value: area + '4', label: area + '4街'},
            ]);
        },
        (town) => {
            return Promise.resolve([
                {value: town + '1', label: town + '1房'},
                {value: town + '2', label: town + '2房'},
                {value: town + '3', label: town + '3房'},
                {value: town + '4', label: town + '4房'},
            ]);
        }

    ]}
>
    <Item>Title</Item>
</AsyncCascadePicker>
...
```