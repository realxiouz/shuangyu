import request from '@/utils/request';
export function getUserOne(filter) {
  return request({
    url: '/firm/user/get/first/one',
    method: 'get',
    params: filter
  });
}

export function getPageList(pageFlag, pageSize, params) {
  return request({
    url: `/firm/page/list/${pageFlag}/${pageSize}`,
    method: `get`,
    params
  });
}

export function saveOne(data) {
  return request({
    url: `/firm/save/one`,
    method: `post`,
    data
  });
}

export function addOne(data) {
  return request({
    url: `/firm/add/one`,
    method: `post`,
    data
  });
}

export function updateOne(firmId, data) {
  console.log(firmId);
  console.log(data);
  return request({
    url: `/firm/update/one/${firmId}`,
    method: 'put',
    data
  });
}

export function removeOne(firmId) {
  return request({
    url: `/firm/remove/one/${firmId}`,
    method: `delete`
  });
}

export function getOne(firmId) {
  return request({
    url: `/firm/get/one/${firmId}`,
    method: `get`
  });
}

export function getRootTotal(filter) {
  return request({
    url: `/firm/get/root/total`,
    method: `get`,
    params: filter
  });
}

export function getTreeList(filter) {
  return request({
    url: `/firm/tree/list`,
    method: `get`,
    params: filter
  });
}

export function getList(filter) {
  return request({
    url: `/firm/list`,
    method: `get`,
    params: filter
  });
}

export function getAsyncTreeList(pid, filter) {
  return request({
    url: `/firm/get/async/tree/list/${pid}`,
    method: `get`,
    params: filter
  });
}

export function getRootPageList(pageFlag, pageSize, params) {
  return request({
    url: `/firm/get/root/list/page/${pageFlag}/${pageSize}`,
    method: `get`,
    params: params
  });
}

export function getConfigPageList(pageFlag, pageSize, params) {
  return request({
    url: `/firm/open/config/get/page/list/${pageFlag}/${pageSize}`,
    method: `get`,
    params
  });
}

export function getConfigList(params) {
  return request({
    url: `/firm/open/config/get/list`,
    method: `get`,
    params
  });
}

export function getConfigOne(openId) {
  return request({
    url: `/firm/open/config/get/one/${openId}`,
    method: `get`
  });
}

export function getSupplierList(filter) {
  return request({
    url: `/firm/merchant/supplier/get/list`,
    method: `get`,
    params: filter
  });
}

export function getSupplierListForOpen(hasOpenFlag) {
  return request({
    url: `/firm/merchant/supplier/get/list/for/open/${hasOpenFlag}`,
    method: `get`
  });
}
