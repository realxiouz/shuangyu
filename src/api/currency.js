import request from '@/utils/request';

export function getList(params) {
  return request({
    url: `/finance/currency/get/list`,
    method: 'get',
    params: params
  });
}

export function getOne(id) {
  return request({
    url: `/finance/currency/get/one/${id}`,
    method: 'get'
  });
}

export function getPageList(pageFlag, pageSize, params) {
  return request({
    url: `/finance/currency/get/page/list/${pageFlag}/${pageSize}`,
    method: 'get',
    params: params
  });
}

export function removeOne(id) {
  return request({
    url: `/finance/currency/remove/one/${id}`,
    method: 'delete'
  });
}

export function save(data) {
  return request({
    url: `/finance/currency/save/one`,
    method: 'post',
    data
  });
}

export function update(id, data) {
  return request({
    url: `/finance/currency/update/one/${id}`,
    method: 'put',
    data
  });
}
