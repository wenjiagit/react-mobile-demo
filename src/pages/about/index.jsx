import React, {Component} from 'react';
import NavBar from '../../components/nav-bar/index';
import './index.less'

export default class About extends Component {
    render() {
        return (
            <div>
                <h2 styleName="content">关于</h2>
                <div styleName="des">
                    上来看附件文件佛我服你弗兰克完饭了
                </div>
                <NavBar/>
            </div>
        );
    }
}
