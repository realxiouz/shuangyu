import request from '@/utils/request';

export function save(data) {
  return request({
    url: "/finance/trade/save/one",
    method: "post",
    data
  });
}
export function getOne(id) {
  return request({
    url: `/finance/trade/get/one/${id}`,
    method: 'get'
  });
}
export function removeOne(id) {
  return request({
    url: `/finance/trade/remove/one/${id}`,
    method: "delete"
  });
}

export function getList(filter) {
  return request({
    url: `/finance/trade/get/list`,
    method: 'get',
    params: filter
  });
}

export function getTotal(filter) {
  return request({
    url: '/finance/trade/get/total',
    method: 'get',
    params: filter
  });
}

export function getPageList(pageFlag, pageSize, lastId, filter) {
  return request({
    url: `/finance/trade/get/page/list/${pageFlag}/${pageSize}/${lastId}`,
    method: 'get',
    params: filter
  });
}
