import request from '@/utils/request';

export function saveOne(data) {
  return request({
    url: `/admin/role/save/one`,
    method: 'post',
    data
  });
}

export function addOne(data) {
  return request({
    url: `/admin/role/add/one`,
    method: 'post',
    data
  });
}

export function addMany(data) {
  return request({
    url: `/admin/role/add/many`,
    method: 'post',
    data
  });
}

export function updateOne(id, data) {
  return request({
    url: `/admin/role/update/one/${id}`,
    method: 'put',
    data
  });
}

export function updateMany(ids, data) {
  return request({
    url: `/admin/role/update/many`,
    method: 'put',
    params: ids,
    data
  });
}

export function updateManyByFilter(filter, data) {
  return request({
    url: `/admin/role/update/many/filter`,
    method: 'put',
    params: filter,
    data
  });
}

export function removeOne(args) {
  const { roleId } = args
  return request({
    url: `/admin/role/remove/one/${roleId}`,
    method: 'delete'
  });
}

export function removeMany(data) {
  return request({
    url: `/admin/role/remove/many`,
    method: 'delete',
    data
  });
}

export function removeManyByFilter(filter) {
  return request({
    url: `/admin/role/remove/many/filter`,
    method: 'delete',
    params: filter
  });
}

export function removeRealOne(id) {
  return request({
    url: `/admin/role/remove/one/real/${id}`,
    method: 'delete'
  });
}

export function getOne(id) {
  return request({
    url: `/admin/role/get/one/${id}`,
    method: 'get'
  });
}

export function getOneByFilter(filter) {
  return request({
    url: `/admin/role/get/one`,
    method: 'get',
    params: filter
  });
}

export function getMany(data) {
  return request({
    url: `/admin/role/get/many`,
    method: 'post',
    data
  });
}

export function getList(filter) {
  return request({
    url: `/admin/role/get/list`,
    method: 'get',
    params: filter
  });
}

export function getPageList(args) {
  const {pageFlag, pageSize, ...params} = args;
  return request({
    url: `/admin/role/get/list/page/${pageFlag}/${pageSize}`,
    method: 'get',
    params
  });
}

export function getTotal(filter) {
  return request({
    url: `/admin/role/get/total`,
    method: 'get',
    params: filter
  });
}

export function getUserRole(flog) {
  return request({
    url: `/firm/role/get/user/${flog}`,
    method: 'get'
  });
}
