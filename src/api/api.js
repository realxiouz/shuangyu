import request from '@/utils/request';


export function removeOne(id) {
  return request({
    url: `/api/remove/one/${id}`,
    method: 'delete'
  });
}

export function updateOne(data) {
  return request({
    url: '/api/update/one',
    method: 'post',
    data
  });
}

export function getPageList(pageFlag, pageSize, lastId, data) {
  return request({
    url: `/api/page/list/${pageFlag}/${pageSize}/${lastId}`,
    method: 'get',
    params: data
  });
}

export function getTotal(data) {
  return request({
    url: `/api/total`,
    method: 'get',
    params: data
  });
}

export function save(data) {
  return request({
    url: '/api/save',
    method: 'post',
    data
  });
}

export function getOne(id) {
  return request({
    url: `/api/one/${id}`,
    method: 'get'
  });
}

export function getAll() {
  return request({
    url: `/api/all`,
    method: 'get'
  });
}
