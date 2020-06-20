import request from '@/utils/request';


export function removeOne(id) {
  return request({
    url: `/firm/open/auth/remove/one/${id}`,
    method: 'delete'
  });
}

export function updateOne(id, data) {
  return request({
    url: `/firm/open/auth/update/one${id}`,
    method: 'put',
    data
  });
}

export function getPageList(pageFlag, pageSize, filter) {
  return request({
    url: `/firm/open/auth/get/page/list/${pageFlag}/${pageSize}`,
    method: 'get',
    params: filter
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

export function getTotal(params) {
  return request({
    url: `/firm/open/auth/get/total`,
    method: 'get',
    params: params
  });
}

export function getOne(id) {
  return request({
    url: `/firm/open/auth/get/one/${id}`,
    method: 'get'
  });
}

export function addOne(data) {
  return request({
    url: "/firm/open/auth/add/one",
    method: "post",
    data
  });
}
