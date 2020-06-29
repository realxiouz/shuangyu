import request from '@/utils/request';


export function saveOne(data) {
  return request({
    url: '/policy/product/property/save/one',
    method: 'post',
    data
  });
}

export function removeOne(id) {
  return request({
    url: `/policy/product/property/remove/one/${id}`,
    method: 'delete'
  });
}


export function getPageList(pageFlag, pageSize, params) {
  return request({
    url: `/policy/product/property/page/list/${pageFlag}/${pageSize}`,
    method: 'get',
    params: params
  });
}

export function getList(params) {
  return request({
    url: `/policy/product/property/list`,
    method: 'get',
    params: params
  });
}

export function getTotal(params) {
  return request({
    url: `/policy/product/property/total`,
    method: 'get',
    params: params
  });
}


export function getOne(id) {
  return request({
    url: `/policy/product/property/one/${id}`,
    method: 'get'
  });
}
