import request from '@/utils/request';

export function save(data) {
  return request({
    url: '/qunar/order/config/save',
    method: 'post',
    data
  });
}

export function exportOrder(data) {
  return request({
    url: "/pnrjy/order/export",
    method: "post",
    data
  });
}

