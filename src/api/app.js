import request from '@/utils/request';


export function removeOne(id) {
  return request({
    url: `/firm/app/remove/one/${id}`,
    method: 'delete'
  });
}

export function updateOne(data) {
  return request({
    url: '/firm/app/update/one',
    method: 'post',
    data
  });
}

export function getPageList(args) {
  const {pageFlag, pageSize, lastId, ...params} = args;
  return request({
    url: `/firm/app/page/list/${pageFlag}/${pageSize}/${lastId}`,
    method: 'get',
    params
  });
}

export function getTotal(params) {
  return request({
    url: `/firm/app/total`,
    method: 'get',
    params: params
  });
}

export function save(data) {
  return request({
    url: '/firm/app/save',
    method: 'post',
    data
  });
}

export function getOne(id) {
  return request({
    url: `/firm/app/one/${id}`,
    method: 'get'
  });
}
