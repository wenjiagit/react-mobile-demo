import SXAjax, {createAjaxHoc} from 'sx-ajax';
import {stringify} from 'qs';
import mockUrls from '../mock/url-config';
import handleError from './handle-error';
import handleSuccess from './handle-success';

/**
 * 判断请求是否是mock
 * @param url
 * @returns {boolean|*}
 */
export function isMock(url /* url, data, method, options */) {
    return mockUrls.indexOf(url) > -1 || url.startsWith('/mock');
}

/**
 * ajax工具，含有errorTip 和 successTip
 * @type {SXAjax}
 */
export const sxAjax = new SXAjax({
    onShowErrorTip: (error, errorTip) => handleError({error, errorTip}),
    onShowSuccessTip: (response, successTip) => handleSuccess({successTip}),
    isMock,
});

// 默认配置
sxAjax.defaults.baseURL = '/api';
sxAjax.defaults.timeout = 1000 * 60;

// fixme 这种写法为什么不管用？
// sxAjax.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
sxAjax.mockDefaults.baseURL = '/';

sxAjax.instance.interceptors.request.use(cfg => {
    const {params, method, headers, data} = cfg;

    Object.keys(params).forEach(key => {
        const value = params[key];
        if (value === '' || value === null || value === void 0) {
            Reflect.deleteProperty(params, key);
        }
    });

    if (!headers['Content-Type'] && (method === 'post' || method === 'put')) {
        headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        cfg.data = stringify(data);
    }

    // Do something before request is sent
    return cfg;
}, error => {
    // Do something with request error
    return Promise.reject(error);
});

// ajax高阶组件
export const ajaxHoc = createAjaxHoc(sxAjax);

/**
 * ajax工具，不含有 errorTip和successTip
 * @type {SXAjax}
 */
export const ajax = new SXAjax({
    isMock,
});

// 默认配置
ajax.defaults.baseURL = '/api';
ajax.defaults.timeout = 1000 * 5;

// mockjs使用的axios实例
export const mockInstance = ajax.mockInstance = sxAjax.mockInstance;
