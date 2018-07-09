/**
 * 系统级数据 及 操作
 */
export default {
    initialState: {
        loading: false,
    },

    showLoading: () => ({loading: true}),
    hideLoading: () => ({loading: false}),
}
