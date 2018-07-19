import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Picker} from 'antd-mobile';

/**
 *
 * 基于一组返回promise的方法，获取对应的 values labels dataSource
 * 如果指定value与数据无法对应，将自动获取数据中的一个value
 *
 * @param value array
 * @param dataSource array [{value, label, children: [{value, label}]}]
 * @param promises array 异步请求
 * @param useCache boolean 是否使用缓存
 * @return {value, label, item, dataSource}
 */
function getAsyncDataSourceAndValue(value = [], dataSource = [], promises, useCache) {
    return new Promise((resolve, reject) => {
        if (!promises || !promises.length) return resolve(value, dataSource);
        const allPromises = [...promises];
        const resultValue = [...value];
        const resultLabel = [];
        const resultItem = [];

        let firstPro = allPromises.shift();
        if (dataSource && dataSource.length && useCache) {
            firstPro = Promise.resolve(dataSource);
        } else {
            firstPro = firstPro().then(res => {
                dataSource = res;
                return dataSource;
            });
        }

        const setResult = (res, i) => {
            const firstValue = res[0].value;

            let nextItem = res.find(item => item.value === resultValue[i]);

            if (!nextItem) {
                nextItem = res.find(item => item.value === firstValue);
                resultValue[i] = firstValue;
            }

            resultLabel[i] = nextItem.label;
            resultItem[i] = [...nextItem];
        };

        allPromises.reduce((prev, next, index) => {
            return prev.then(res => {
                if (!res || !res.length) return [];

                const prevValue = resultValue[index];
                const prevItem = res.find(item => item.value === prevValue);
                const children = prevItem.children;

                if (useCache && children && children.length) {
                    setResult(children, index + 1);
                    return children;
                }

                return next(prevValue, prevItem).then(nextRes => {
                    if (!nextRes || !nextRes.length) return [];

                    setResult(nextRes, index + 1);

                    prevItem.children = nextRes;
                    return nextRes;
                });
            })
        }, firstPro.then(res => {
            if (!res || !res.length) return [];

            setResult(res, 0);

            return res;

        }))
            .then(() => resolve({value: resultValue, label: resultLabel, item: resultItem, dataSource}))
            .catch(reject);
    });
}

/**
 * 任意层级，异步级联下拉
 */
export default class AsyncCascadePicker extends Component {
    constructor(props) {
        super(props);
        const {value,} = props;

        this.state.value = value;
        this.getAsyncResult(value).then(({item, dataSource}) => this.setState({item, dataSource}));

    }

    static propTypes = {
        loadData: PropTypes.arrayOf(PropTypes.func),   // 函数数组，返回promise
    };

    static defaultProps = {
        cols: 3,
        value: [],
    };

    state = {
        value: [],
        label: [],
        dataSource: [],
    };

    // componentWillReceiveProps 有可能会被频繁调用，异步返回时顺序无法保证，通过一个哨兵变量 count，确保使用最后一次异步
    rpCount = 0;

    componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
            let {value: nextValue} = nextProps;
            let {value: prevValue} = this.props;

            if (!nextValue) nextValue = [];
            if (!prevValue) prevValue = [];

            if (nextValue.join('') !== prevValue.join('')) {
                this.rpCount = this.rpCount + 1;
                const n = this.rpCount;

                // 需要根据nextValue获取异步数据，这里不能简单的 this.setState({value: nextValue});
                this.getAsyncResult(nextValue).then(({value, label, item, dataSource}) => {
                    if (n < this.rpCount) return; // 由于闭包，n会保持当时调用componentWillReceiveProps设置的值

                    this.setState({value, label, item, dataSource});
                });
            }
        }
    }

    pcCount = 0;
    handlePickerChange = (value) => {
        const {onPickerChange} = this.props;

        if (onPickerChange) onPickerChange(value);

        this.pcCount = this.pcCount + 1;
        const n = this.pcCount;

        this.getAsyncResult(value).then(({value, label, item, dataSource}) => {
            if (n < this.pcCount) return;
            this.setState({value, label, item, dataSource});
        });
    };

    getAsyncResult(value) {
        const {loadData, cols} = this.props;
        const {dataSource} = this.state;
        const promises = loadData.slice(0, cols);

        return getAsyncDataSourceAndValue(value, dataSource, promises, true);
    }

    handleChange = () => {
        const {value} = this.state;
        const {onChange} = this.props;

        if (onChange) {
            this.getAsyncResult(value).then(({value, label}) => {
                onChange(value, label);
            });
        }
    };

    handleDismiss = () => {
        // 点击取消，恢复数据
        const {onDismiss, value} = this.props;
        if (onDismiss) onDismiss();
        this.setState({value});
    };

    render() {
        const {dataSource, value} = this.state;
        const {
            children,
            loadData,
            ...others,
        } = this.props;

        return (
            <Picker
                {...others}
                value={value}
                data={dataSource}
                onPickerChange={this.handlePickerChange}
                onChange={this.handleChange}
                onDismiss={this.handleDismiss}
            >
                {children}
            </Picker>
        );
    }
}
