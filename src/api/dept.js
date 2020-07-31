import request from '@/utils/request';

export function save(data) {
  return request({
    url: '/firm/dept/save',
    method: 'post',
    data
  });
}

export function addOne(data) {
  return request({
    url: `/firm/dept/add/one`,
    method: `post`,
    data
  });
}

export function updateOne(id, data) {
  return request({
    url: `/firm/dept/update/one/${id}`,
    method: 'put',
    data
  });
}

export function removeOne(id) {
  return request({
    url: `/firm/dept/remove/one/${id}`,
    method: 'delete'
  });
}

export function getRootPageList(args) {
  const { pageFlag, pageSize, ...params } = args;
  return request({
    url: `/firm/dept/get/root/list/page/${pageFlag}/${pageSize}`,
    method: 'get',
    params
  });
}

export function getPageList(args) {
  const { pageFlag, pageSize, ...params } = args;
  return request({
    url: `/firm/dept/page/list/${pageFlag}/${pageSize}`,
    method: 'get',
    params
  });
}

export function getAsyncTreeList(pid, filter) {
  return request({
    url: `/firm/dept/get/async/tree/list/${pid}`,
    method: `get`,
    params: filter
  });
}

export function getTotal(params) {
  return request({
    url: `/firm/dept/get/total`,
    method: 'get',
    params: params
  });
}

export function getRootTotal(params) {
  return request({
    url: `/firm/dept/get/root/total`,
    method: 'get',
    params: params
  });
}

export function getList(params) {
  return request({
    url: `/firm/dept/list`,
    method: 'get',
    params: params
  });
}

export function getTreeList(params) {
  return request({
    url: `/firm/dept/tree/list`,
    method: 'get',
    params: params
  });
}

export function getOne(id) {
  return request({
    url: `/firm/dept/one/${id}`,
    method: 'get'
  });
}
