import request from '@/utils/request';

export function getOne(id) {
  return request({
    url: `/firm/open/auth/get/one/${id}`,
    method: 'get'
  });
}

export function addOne(data) {
  return request({
    url: '/firm/open/auth/add/one',
    method: 'post',
    data
  });
}

export function updateOne(id, data) {
  return request({
    url: '/firm/open/auth/update/one${id}',
    method: 'post',
    data
  });
}

export function getList(params) {
  return request({
    url: `/firm/open/auth/get/list`,
    method: 'get',
    params
  });
}

export function getPageList(pageFlag, pageSize, params) {
  return request({
    url: `/firm/open/auth/get/page/list/${pageFlag}/${pageSize}`,
    method: 'get',
    params
  });
}

export function getCustomerList(params) {
  return request({
    url: `/firm/customer/open/auth/get/list`,
    method: 'get',
    params: params
  });
}

export function getSupplierList(params) {
  return request({
    url: `/firm/supplier/open/auth/get/list`,
    method: 'get',
    params: params
  });
}

export function removeOne(id) {
  return request({
    url: `/firm/open/auth/remove/one/${id}`,
    method: 'delete'
  });
}
