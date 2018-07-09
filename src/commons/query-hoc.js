import React, {Component} from 'react';
import queryString from "qs";

const query = ({propName = 'query'} = {}) => WrappedComponent => {
    class WithSubscription extends Component {
        constructor(props) {
            super(props);
            const search = queryString.parse(this.props.location.search, {ignoreQueryPrefix: true});
            this.query = search || {};
        }

        static displayName = `WithSubscription(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

        render() {
            const injectProps = {
                [propName]: this.query,
            };
            return <WrappedComponent {...injectProps} {...this.props}/>;
        }
    }

    return WithSubscription;
};

export default query;
