import React, {Component} from 'react';
import {Button} from 'antd-mobile';
import {Link} from 'react-router-dom';
import NavBar from '../../components/nav-bar/index';
import Carousel from '../../components/carousel/index'
// import TabBar from "../components/tabBar";


export default class Home extends Component {
    componentDidMount() {
        console.log(this.props);
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
            </div>
        );
    }
}
