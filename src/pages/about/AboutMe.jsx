import React, {Component} from 'react';
import NavBar from '../../components/nav-bar/index';
import './index.less'

export default class About extends Component {
    render() {
        return (
            <div>
                <h2 styleName="content">关于我自己</h2>
                <div styleName="des">
                    这个是关于我自己的页面
                </div>
                <NavBar/>
            </div>
        );
    }
}
