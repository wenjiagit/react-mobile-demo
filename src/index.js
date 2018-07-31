import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import FastClick from 'fastclick';
import * as storage from 'sx-utils/lib/storage';
import * as sxRedux from 'sx-redux';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import handleSuccess from './commons/handle-success';
import handleError from './commons/handle-error';
import {configureStore} from './models';

FastClick.attach(document.body);

sxRedux.init({storage, handleError, handleSuccess});

// models store
const store = configureStore();

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));
registerServiceWorker();
