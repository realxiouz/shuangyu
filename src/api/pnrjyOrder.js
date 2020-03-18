import request from '@/utils/request';

export function exportOrder(data) {
  debugger
  return request({
    url: '/pnrjy/order/export',
    method: 'post',
    data
  });
}

