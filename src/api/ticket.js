import request from '@/utils/request';

export function getList(params) {
  return request({
    url: `/order/ticket/list`,
    method: "get",
    params: params
  });
}

export function getTotal(params) {
  return request({
    url: `/order/ticket/total`,
    method: 'get',
    params: params
  });
}
export function getCount(params) {
  return request({
    url: `/order/ticket/count`,
    method: 'get',
    params: params
  });
}
