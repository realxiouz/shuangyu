import request from '@/utils/request';

export function saveOne(data) {
  return request({
    url: `/admin/api/save/one`,
    method: 'post',
    data
  });
}

export function addOne(data) {
  return request({
    url: `/admin/api/add/one`,
    method: 'post',
    data
  });
}

export function addMany(data) {
  return request({
    url: `/admin/api/add/many`,
    method: 'post',
    data
  });
}

export function updateOne(id, data) {
  return request({
    url: `/admin/api/update/one/${id}`,
    method: 'put',
    data
  });
}

export function updateMany(ids, data) {
  return request({
    url: `/admin/api/update/many`,
    method: 'put',
    params: ids,
    data
  });
}

export function updateManyByFilter(filter, data) {
  return request({
    url: `/admin/api/update/many/filter`,
    method: 'put',
    params: filter,
    data
  });
}

export function removeOne(id) {
  return request({
    url: `/admin/api/remove/one/${id}`,
    method: 'delete'
  });
}

export function removeMany(data) {
  return request({
    url: `/admin/api/remove/many`,
    method: 'delete',
    data
  });
}

export function removeManyByFilter(filter) {
  return request({
    url: `/admin/api/remove/many/filter`,
    method: 'delete',
    params: filter
  });
}

export function removeRealOne(id) {
  return request({
    url: `/admin/api/remove/one/real/${id}`,
    method: 'delete'
  });
}

export function getOne(id) {
  return request({
    url: `/admin/api/get/one/${id}`,
    method: 'get'
  });
}

export function getOneByFilter(filter) {
  return request({
    url: `/admin/api/get/one`,
    method: 'get',
    params: filter
  });
}

export function getMany(data) {
  return request({
    url: `/admin/api/get/many`,
    method: 'post',
    data
  });
}

export function getList(filter) {
  return request({
    url: `/admin/api/get/list`,
    method: 'get',
    params: filter
  });
}

export function getPageList(pageFlag, pageSize, lastId, filter) {
  return request({
    url: `/admin/api/get/page/list/${pageFlag}/${pageSize}/${lastId}`,
    method: 'get',
    params: filter
  });
}

export function getTotal(filter) {
  return request({
    url: `/admin/api/get/total`,
    method: 'get',
    params: filter
  });
}
