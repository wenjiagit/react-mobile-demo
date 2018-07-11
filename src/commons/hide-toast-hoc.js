import React, {Component} from 'react';
import {Toast} from 'antd-mobile';

/* 切换页面时，隐藏当前页面的Toast */

const hideToast = WrappedComponent => {
    class WithSubscription extends Component {
        static displayName = `hide-toast-hoc(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

        componentWillUnmount() {
            Toast.hide();
        }

        render() {
            return <WrappedComponent {...this.props}/>;
        }
    }

    return WithSubscription;
};

export default hideToast;
