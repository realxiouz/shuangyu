import request from '@/utils/request';


export function removeOne(id) {
  return request({
    url: `/app/remove/one/${id}`,
    method: 'delete'
  });
}

export function updateOne(data) {
  return request({
    url: '/app/update/one',
    method: 'post',
    data
  });
}

export function getPageList(pageFlag, pageSize, lastId, params) {
  return request({
    url: `/app/page/list/${pageFlag}/${pageSize}/${lastId}`,
    method: 'get',
    params: params
  });
}

export function getTotal(params) {
  return request({
    url: `/app/total`,
    method: 'get',
    params: params
  });
}

export function save(data) {
  return request({
    url: '/app/save',
    method: 'post',
    data
  });
}

export function getOne(id) {
  return request({
    url: `/app/one/${id}`,
    method: 'get'
  });
}
