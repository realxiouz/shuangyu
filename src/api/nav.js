import request from '@/utils/request';

export function saveOne(data) {
  return request({
    url: `/admin/nav/save/one`,
    method: 'post',
    data
  });
}

export function addOne(data) {
  return request({
    url: `/admin/nav/add/one`,
    method: 'post',
    data
  });
}

export function addMany(data) {
  return request({
    url: `/admin/nav/add/many`,
    method: 'post',
    data
  });
}

export function updateOne(id, data) {
  return request({
    url: `/admin/nav/update/one/${id}`,
    method: 'put',
    data
  });
}

export function updateMany(ids, data) {
  return request({
    url: `/admin/nav/update/many`,
    method: 'put',
    params: ids,
    data
  });
}

export function updateManyByFilter(filter, data) {
  return request({
    url: `/admin/nav/update/many/filter`,
    method: 'put',
    params: filter,
    data
  });
}

export function removeOne(id) {
  return request({
    url: `/admin/nav/remove/one/${id}`,
    method: 'delete'
  });
}

export function removeMany(data) {
  return request({
    url: `/admin/nav/remove/many`,
    method: 'delete',
    data
  });
}

export function removeManyByFilter(filter) {
  return request({
    url: `/admin/nav/remove/many/filter`,
    method: 'delete',
    params: filter
  });
}

export function removeRealOne(id) {
  return request({
    url: `/admin/nav/remove/one/real/${id}`,
    method: 'delete'
  });
}

export function getOne(id) {
  return request({
    url: `/admin/nav/get/one/${id}`,
    method: 'get'
  });
}

export function getOneByFilter(filter) {
  return request({
    url: `/admin/nav/get/one`,
    method: 'get',
    params: filter
  });
}

export function getMany(data) {
  return request({
    url: `/admin/nav/get/many`,
    method: 'post',
    data
  });
}

export function getList(filter) {
  return request({
    url: `/admin/nav/get/list`,
    method: 'get',
    params: filter
  });
}

export function getTreeList(filter) {
  return request({
    url: `/admin/nav/get/list/tree`,
    method: 'get',
    params: filter
  });
}

export function getPageList(pageFlag, pageSize, filter) {
  return request({
    url: `/admin/nav/get/list/page/${pageFlag}/${pageSize}`,
    method: 'get',
    params: filter
  });
}

export function getTotal(filter) {
  return request({
    url: `/admin/nav/get/total`,
    method: 'get',
    params: filter
  });
}
