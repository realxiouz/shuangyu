import request from '@/utils/request';

export function getPageList(params) {
  return request({
    url: `/order/task/all/page/list`,
    method: 'get',
    params: params
  });
}

export function getTotal(params) {
  return request({
    url: '/order/task/get/all/total',
    method: 'get',
    params: params
  });
}

export function getPendingTotal(params) {
  return request({
    url: '/order/task/get/pending/all/total',
    method: 'get',
    params: params
  });
}