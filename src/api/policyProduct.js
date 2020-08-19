import request from '@/utils/request';

export function getList(params) {
  return request({
    url: '/policy/product/search/flight',
    method: 'get',
    params
  });
}

export function getListByNo(no, params) {
  return request({
    url: `/policy/product/search/flight/${no}`,
    method: 'get',
    params
  });
}

export function searchFlightPrice(params) {
  return request({
    url: `/policy/product/search/flight/price`,
    method: 'get',
    params
  })
}

export function order(data) {
  return request({
    url: `/policy/order`,
    method: 'post',
    data
  })
}