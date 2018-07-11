import React, {Component} from 'react';
import {Router, Route, Switch} from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import ReactLoadable from 'react-loadable';
import routes from './routes';
import Error404 from '../pages/error404';
import LoadingPage from "../components/loading-page";
import queryHoc from '../commons/query-hoc';
import {ajaxHoc} from '../commons/ajax';
import {connect} from '../models';
import hideToastHoc from '../commons/hide-toast-hoc';
import {compose} from '../commons';

const history = createBrowserHistory();

const hocs = compose([
    queryHoc(),
    ajaxHoc(),
    connect(),
    hideToastHoc,
]);

const allRoutes = routes.map(item => {
    return {
        path: item.path,
        component: hocs(ReactLoadable({loader: item.component, loading: LoadingPage})),
    };
});

export default class AppRouter extends Component {
    render() {
        return (
            <Router history={history}>
                <div>
                    <Switch>
                        {allRoutes.map(item => {
                            return (
                                <Route key={item.path} exact path={item.path} component={item.component}/>
                            );
                        })}
                        <Route component={Error404}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}
