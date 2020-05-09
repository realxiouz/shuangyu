import request from '@/utils/request';

export function save(data) {
  return request({
    url: '/qunar/order/config/save',
    method: 'post',
    data
  });
}
