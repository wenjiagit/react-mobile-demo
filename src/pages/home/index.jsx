import React, {Component} from 'react';
import {Button, List} from 'antd-mobile';
import {createForm} from 'rc-form';
import {Link} from 'react-router-dom';
import NavBar from '../../components/nav-bar/index';
import Carousel from '../../components/carousel/index';
import ProvinceCityArea from '../../components/async-cascade-picker';
// import TabBar from "../components/tabBar";
import './index.less';

const Item = List.Item;

@createForm()
export default class Home extends Component {
    state = {
        value: [],
        label: [],
    };

    componentDidMount() {
        // console.log(this.props);
        // this.props.ajax
        //     .get('/test-ajax', null, {successTip: 'ajax OK'})
        //     .then(res => {
        //         console.log(res);
        //     });
        setTimeout(() => {
            this.setState({provValue: ["420000", "5280"]})
        }, 1000);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
            } else {
                console.log(err);
            }
        });
    };

    render() {
        console.log('render provValue label', this.state.provValue, this.state.label);
        const {getFieldDecorator} = this.props.form;

        return (
            <div>
                <Carousel data={
                    ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI']
                }/>

                <List renderHeader={() => 'Basic Style'} className="my-list">
                    {getFieldDecorator('city', {
                        rules: [
                            {required: true, message: '请选择城市'}
                        ],
                    })(
                        <ProvinceCityArea
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
                        </ProvinceCityArea>
                    )}


                    <ProvinceCityArea
                        title="选择省市"
                        onChange={(value, label) => {
                            console.log('onchange:', value, label);
                            this.setState({provValue: value, label});
                        }}
                        loadData={[
                            () => this.props.ajax.post(`/front/auth/addressList?pid=0`, null, {headers: {'SXF-TOKEN': 'cd34a05fb9f7f573e736dbcda6a39d0c'}})
                                .then((result) => {
                                    const prov = (result && result.data && result.data.length) ? result.data : [];
                                    return prov.map(item => ({value: item.key, label: item.value}));
                                }),
                            (prov) => this.props.ajax.get(`/front/auth/addressList?pid=${prov}`, null, {headers: {'SXF-TOKEN': 'cd34a05fb9f7f573e736dbcda6a39d0c'}})
                                .then(result => {
                                    const city = (result && result.data && result.data.length) ? result.data : [];
                                    return city.map(item => ({value: item.key, label: item.value}));
                                }),
                        ]}
                        cols={2}
                        value={this.state.provValue}
                        onOk={() => this.setState({provPickerVisible: false})}
                    >
                        <List.Item>
                            居住地址{this.state.provValue}
                        </List.Item>
                    </ProvinceCityArea>
                    <Button
                        onClick={this.handleSubmit}
                    >提交</Button>
                </List>


                <Link to="/about">关于</Link>
                <Link to="/user">用户</Link>
                <div onClick={() => this.props.history.push('/mine')}>我的</div>

                <NavBar/>
                {/*<TabBar/>*/}
                <Button>OK</Button>
                <Button>OK</Button>
                <Button>OK</Button>
                <div styleName="test">测试样式</div>
            </div>
        );
    }
}