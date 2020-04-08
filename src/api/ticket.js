import request from '@/utils/request';

export function getList(params) {
  return request({
    url: `/ticket/list`,
    method: "get",
    params: params
  });
}

export function getTotal(params) {
  return request({
    url: `/ticket/total`,
    method: 'get',
    params: params
  });
}
export function getCount(params) {
  return request({
    url: `/ticket/count`,
    method: 'get',
    params: params
  });
}