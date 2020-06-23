import request from '@/utils/request';

export function getList(params) {
  return request({
    url: `/order/total/report/list`,
    method: "get",
    params: params
  });
}

export function getTotal(params) {
  return request({
    url: `/order/total/report/total`,
    method: 'get',
    params: params
  });
}


export function getTotalSum(params) {
  return request({
    url: `/order/report/sum/count`,
    method: 'get',
    params: params
  });
}
