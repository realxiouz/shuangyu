import request from '@/utils/request';

export function getList(params) {
  return request({
    url: `/finance/trade/get/list`,
    method: 'get',
    params: params
  });
}

export function getOne(id) {
  return request({
    url: `/finance/trade/get/one/${id}`,
    method: 'get'
  });
}

export function getPageList(pageFlag, pageSize, params) {
  let url;
  if (params.lastId){
    url = `/finance/trade/get/page/list/${pageFlag}/${pageSize}`;
  } else {
    url = `/finance/trade/get/page/list/${pageFlag}/${pageSize}/${params.lastId}`;
  }
  return request({
    url: url,
    method: 'get',
    params: params
  });
}

export function removeOne(id) {
  return request({
    url: `/finance/trade/remove/one/${id}`,
    method: 'delete'
  });
}

export function save(data) {
  return request({
    url: `/finance/trade/save/one`,
    method: 'post',
    data
  });
}

export function update(id, data) {
  return request({
    url: `/finance/trade/update/one/${id}`,
    method: 'put',
    data
  });
}
