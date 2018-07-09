import React, {Component} from 'react';
import {Button} from 'antd-mobile';
import {Link} from 'react-router-dom';
import NavBar from '../../components/nav-bar/index';
import Carousel from '../../components/carousel/index'
// import TabBar from "../components/tabBar";
import './index.less';

export default class Home extends Component {
    componentDidMount() {
        console.log(this.props);
        this.props.ajax
            .get('/test-ajax', null, {successTip: 'ajax OK'})
            .then(res => {
                console.log(res);
            })
    }

    render() {
        return (
            <div>
                <Carousel data={
                    ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI']
                }/>

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
