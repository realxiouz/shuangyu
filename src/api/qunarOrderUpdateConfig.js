import request from '@/utils/request';

export function getOne(domain) {
  return request({
    url: `/qunar/order/update/config/one/${domain}`,
    method: 'get'
  });
}

export function save(data) {
  return request({
    url: '/qunar/order/update/config/save',
    method: 'post',
    data
  });
}
