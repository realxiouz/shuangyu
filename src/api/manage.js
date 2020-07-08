import request from '@/utils/request';

export function notify(filter) {
  return request({
    url: '/mock/order/notify',
    method: 'get',
    params: filter
  });
}


