import React, {Component} from 'react';
import {Button} from 'antd-mobile';
import {Link} from 'react-router-dom';
import NavBar from '../../components/nav-bar/index';
import Carousel from '../../components/carousel/index';
import ProvinceCityArea from '../../components/province-city-area';
// import TabBar from "../components/tabBar";
import './index.less';

export default class Home extends Component {
    componentDidMount() {
        // console.log(this.props);
        // this.props.ajax
        //     .get('/test-ajax', null, {successTip: 'ajax OK'})
        //     .then(res => {
        //         console.log(res);
        //     });
    }

    render() {
        return (
            <div>
                <Carousel data={
                    ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI']
                }/>

                <ProvinceCityArea
                    onLoad={(value, label) => {
                        // 首次初始化数据加载完成回调用，一般用于获取label，做回显时用
                        console.log('onLoad:', value, label);
                    }}
                    value={['2', '22', '223']}
                    onChange={(value, label) => {
                        console.log('onChange:', value, label);
                    }}
                    loadProvince={() => {
                        return Promise.resolve([
                            {key: '1', value: '1北京'},
                            {key: '2', value: '2上海'},
                            {key: '3', value: '3广州'},
                            {key: '4', value: '4深圳'},
                        ]);
                    }}
                    loadCity={(prov) => {
                        return Promise.resolve([
                            {key: prov + '1', value: prov + '1市'},
                            {key: prov + '2', value: prov + '2市'},
                            {key: prov + '3', value: prov + '3市'},
                            {key: prov + '4', value: prov + '4市'},
                        ]);
                    }}
                    loadArea={(city) => {
                        return Promise.resolve([
                            {key: city + '1', value: city + '1区'},
                            {key: city + '2', value: city + '2区'},
                            {key: city + '3', value: city + '3区'},
                            {key: city + '4', value: city + '4区'},
                        ]);
                    }}
                >
                    <div>省市区picker</div>
                </ProvinceCityArea>
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
