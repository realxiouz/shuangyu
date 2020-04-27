import request from '@/utils/request';
// 导不存在的订单
export function orderNonexist(params) {
    return request({
        url: `/qunar/order/export/nonexist?firmId=${params.firmId}&historyOrCurrent=${params.historyOrCurrent}&orderType=${params.orderType}&sourceOrderNo=${params.sourceOrderNo}&staffId=${params.staffId}`,
        method: 'post',
    });
}