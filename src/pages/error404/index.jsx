import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Error404 extends Component {
    state = {};

    componentWillMount() {
    }

    componentDidMount() {

    }

    handleBack = () => {
        this.props.history.goBack();
    };

    render() {
        return (
            <div>
                <h1>404</h1>
                <h3>您访问的页面不存在，您可以访问<Link to="/">首页</Link> , 或者<a onClick={this.handleBack}>返回</a></h3>
            </div>
        );
    }
}
