import request from '@/utils/request';

export function saveOne(data) {
  return request({
    url: `/admin/menu/save/one`,
    method: 'post',
    data
  });
}

export function addOne(data) {
  return request({
    url: `/admin/menu/add/one`,
    method: 'post',
    data
  });
}

export function addMany(data) {
  return request({
    url: `/admin/menu/add/many`,
    method: 'post',
    data
  });
}

export function updateOne(id, data) {
  return request({
    url: `/admin/menu/update/one/${id}`,
    method: 'put',
    data
  });
}

export function updateMany(ids, data) {
  return request({
    url: `/admin/menu/update/many`,
    method: 'put',
    params: ids,
    data
  });
}

export function updateManyByFilter(filter, data) {
  return request({
    url: `/admin/menu/update/many/filter`,
    method: 'put',
    params: filter,
    data
  });
}

export function removeOne(id) {
  return request({
    url: `/admin/menu/remove/one/${id}`,
    method: 'delete'
  });
}

export function removeMany(data) {
  return request({
    url: `/admin/menu/remove/many`,
    method: 'delete',
    data
  });
}

export function removeManyByFilter(filter) {
  return request({
    url: `/admin/menu/remove/many/filter`,
    method: 'delete',
    params: filter
  });
}

export function removeRealOne(id) {
  return request({
    url: `/admin/menu/remove/one/real/${id}`,
    method: 'delete'
  });
}

export function getOne(id) {
  return request({
    url: `/admin/menu/get/one/${id}`,
    method: 'get'
  });
}

export function getOneByFilter(filter) {
  return request({
    url: `/admin/menu/get/one`,
    method: 'get',
    params: filter
  });
}

export function getMany(data) {
  return request({
    url: `/admin/menu/get/many`,
    method: 'post',
    data
  });
}

export function getList(filter) {
  return request({
    url: `/admin/menu/get/list`,
    method: 'get',
    params: filter
  });
}

export function getTreeList(filter) {
  return request({
    url: `/admin/menu/get/tree/list`,
    method: 'get',
    params: filter
  });
}

export function getPageList(pageFlag, pageSize, filter) {
  return request({
    url: `/admin/menu/get/list/page/${pageFlag}/${pageSize}`,
    method: 'get',
    params: filter
  });
}

export function nodeDragDrop(data) {
  return request({
    url: `/admin/menu/tree/node/drag/drop`,
    method: 'post',
    data
  });
}
