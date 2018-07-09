import {Toast} from 'antd-mobile';

export default function handleSuccess({successTip}) {
    successTip && Toast.success(successTip, 3);
}
