import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Picker} from 'antd-mobile';

/**
 * 数据有两种形式 {id, name}、{key, value}、{value, label} 都可以
 * @param item
 * @returns {*}
 */
function getItem(item) {
    if ('id' in item && 'name' in item) return {value: item.id, label: item.name};
    if ('key' in item && 'value' in item) return {value: item.key, label: item.value};

    return {...item};
}

export default class index extends Component {
    constructor(props) {
        super(props);
        const {value, onLoad} = props;

        this.state.value = value;
        this.setDataSourceByValue(value, () => {
            if (onLoad) {
                const {value} = this.state;
                const label = this.getLabelByValue(value);
                onLoad(value, label);
            }
        });
    }

    static propTypes = {
        loadProvince: PropTypes.func,   // 函数，返回promise
        loadCity: PropTypes.func,       // 函数，返回promise
        loadArea: PropTypes.func,       // 函数，返回promise
    };

    static defaultProps = {
        cols: 3,
        value: [],
    };

    state = {
        value: [],
        dataSource: [],
    };

    componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
            let {value: nextValue} = nextProps;
            let {value} = this.props;
            if (!nextValue) nextValue = [];
            if (!value) value = [];

            if (nextValue.join('') !== value.join('')) {
                this.setState({value: nextValue});
            }
        }
    }

    handlePickerChange = (value) => {
        const {onPickerChange} = this.props;
        if (onPickerChange) onPickerChange(value);
        this.setState({value});
        this.setDataSourceByValue(value);
    };

    setDataSourceByValue = (value, cb) => {
        if (!cb) cb = () => void 0;

        const {
            cols,
            loadProvince,
            loadCity,
            loadArea,
        } = this.props;
        if (!loadProvince) return;

        const [provValue, cityValue, areaValue] = value;
        let {dataSource} = this.state;

        const setArea = (cities, dataSource) => {
            const pv = provValue || dataSource[0].value;
            const cv = cityValue || cities[0].value;
            const city = cities.find(item => item.value === cv) || cities[0];
            const areas = city.children;

            // city 对应的area数据不存在，调用方法获取
            if (!areas || !areas.length) {
                if (!loadArea) {
                    this.setState({dataSource}, cb);
                    return;
                }
                loadArea(cv).then(result => {
                    if (!result || !result.length) {
                        this.setState({dataSource, value: [pv, cv]}, cb); // 异步，需要重新设置value，否则不回显
                        return;
                    }
                    city.children = result.map(getItem);
                    const av = areaValue || city.children[0].value;
                    this.setState({dataSource, value: [pv, cv, av]}, cb);
                });
            } else {
                const av = areaValue || city.children[0].value;
                this.setState({dataSource, value: [pv, cv, av]}, cb);
            }

        };

        const setCity = (dataSource) => {
            const pv = provValue || dataSource[0].value;
            const province = dataSource.find(item => item.value === pv) || dataSource[0];
            const cities = province.children;

            // prov对应的city数据不存在，调用方法获取
            if (!cities || !cities.length) {
                if (!loadCity) {
                    this.setState({dataSource}, cb);
                    return;
                }
                loadCity(pv).then(cities => {
                    if (!cities || !cities.length) {
                        this.setState({dataSource, value: [pv]}, cb);
                        return;
                    }
                    const children = cities.map(getItem);
                    const cv = cityValue || children[0].value;
                    province.children = children;

                    // 不需要显示area
                    if (cols < 3) {
                        this.setState({dataSource, value: [pv, cv]}, cb);
                        return;
                    }

                    setArea(children, dataSource);
                });
            } else {
                // 不需要显示area
                if (cols < 3) {
                    const cv = cityValue || cities[0].value;
                    this.setState({dataSource, value: [pv, cv]}, cb);
                    return;
                }

                setArea(cities, dataSource);
            }
        };

        // 省数据不存在，调用方法获取
        if (!dataSource || !dataSource.length) {
            loadProvince().then(pros => {
                if (!pros || !pros.length) {
                    this.setState({dataSource: []});
                    return;
                }

                dataSource = pros.map(getItem);

                const pv = provValue || dataSource[0].value;

                // 不需要显示city
                if (cols < 2) {
                    this.setState({dataSource, value: [pv]}, cb);
                    return;
                }

                // 基于当前 value 中的prov，设置city数据
                setCity(dataSource);
            })
        } else { // 省数据存在

            // 不需要显示city
            if (cols < 2) {
                const pv = provValue || dataSource[0].value;

                this.setState({dataSource, value: [pv]}, cb);
                return;
            }

            setCity(dataSource);
        }
    };

    getLabelByValue = (value = []) => {
        const {dataSource} = this.state;
        const [provinceValue, cityValue, areaValue] = value;
        let provinceLabel;
        let cityLabel;
        let areaLabel;

        if (dataSource && dataSource.length) {
            const prov = dataSource.find(item => item.value === provinceValue);

            if (prov) {
                provinceLabel = prov.label;

                if (prov.children && prov.children.length) {
                    const city = prov.children.find(item => item.value === cityValue);

                    if (city) {
                        cityLabel = city.label;

                        if (city.children && city.children.length) {
                            const area = city.children.find(item => item.value === areaValue);
                            if (area) areaLabel = area.label;
                        }
                    }
                }
            }
        }

        return [provinceLabel, cityLabel, areaLabel];

    };

    handleChange = () => {
        const {value} = this.state;
        const {onChange} = this.props;
        if (onChange) {
            const label = this.getLabelByValue(value);
            onChange(value, label);
        }
    };

    render() {
        const {dataSource, value} = this.state;
        const {
            children,
            loadProvince,
            loadCity,
            loadArea,
            onPickerChange,
            onChange,
            onLoad,
            ...others,
        } = this.props;

        return (
            <Picker
                {...others}
                value={value}
                data={dataSource}
                onPickerChange={this.handlePickerChange}
                onChange={this.handleChange}
            >
                {children}
            </Picker>
        );
    }
}
