import request from '@/utils/request';

export function getPageList(params) {
  return request({
    url: `/order/task/page/list`,
    method: 'get',
    params: params
  });
}


export function getTotal(params) {
  return request({
    url: '/order/task/get/total',
    method: 'get',
    params: params
  });
}

export function getPendingTotal(params) {
  return request({
    url: '/order/task/get/pending/total',
    method: 'get',
    params: params
  });
}