import request from '@/utils/request';

export function getList(params) {
  return request({
    url: `/finance/currency/get/list`,
    method: 'get',
    params: params
  });
}

export function getOne(params) {
  return request({
    url: `/finance/currency/get/one/${params.currencyId}`,
    method: 'get'
  });
}

export function getPageList(args) {
  const {pageFlag, pageSize, ...params} = args;
  return request({
    url: `/finance/currency/get/page/list/${pageFlag}/${pageSize}`,
    method: 'get',
    params
  });
}

export function removeOne(params) {
  return request({
    url: `/finance/currency/remove/one/${params.currencyId}`,
    method: 'delete'
  });
}

export function saveOne(data) {
  return request({
    url: `/finance/currency/save/one`,
    method: 'post',
    data
  });
}

export function update(data) {
  return request({
    url: `/finance/currency/update/one/${data.currencyId}`,
    method: 'put',
    data
  });
}
