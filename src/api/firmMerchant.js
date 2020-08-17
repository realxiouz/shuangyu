import request from '@/utils/request';


export function addOne(data) {
  return request({
    url: `/firm/merchant/add/one`,
    method: `post`,
    data
  });
}

export function updateOne(merchantId, data) {
  return request({
    url: `/firm/merchant/update/one/${merchantId}`,
    method: `put`,
    data
  });
}

export function removeOne(merchantId) {
  return request({
    url: `/firm/merchant/remove/one/${merchantId}`,
    method: `delete`,
  });
}

export function getOne(merchantId) {
  return request({
    url: `/firm/merchant/get/one/${merchantId}`,
    method: `get`
  });
}

export function getTotal(filter) {
  return request({
    url: `/firm/merchant/get/total`,
    method: `get`,
    params: filter
  });
}

export function getSupplierTotal(filter) {
  return request({
    url: `/firm/supplier/get/total`,
    method: `get`,
    params: filter
  });
}

export function getCustomerTotal(filter) {
  return request({
    url: `/firm/customer/get/total`,
    method: `get`,
    params: filter
  });
}

export function getPageList(pageFlag, pageSize, params) {
  return request({
    url: `/firm/merchant/get/page/list/${pageFlag}/${pageSize}`,
    method: `get`,
    params
  });
}

export function getCustomerPageList(pageFlag, pageSize, params) {
  return request({
    url: `/firm/customer/get/page/list/${pageFlag}/${pageSize}`,
    method: `get`,
    params
  });
}

export function getSupplierPageList(pageFlag, pageSize, params) {
  return request({
    url: `/firm/supplier/get/page/list/${pageFlag}/${pageSize}`,
    method: `get`,
    params:params
  });
}

export function getList(filter) {
  return request({
    url: `/firm/merchant/get/list`,
    method: `get`,
    params: filter
  });
}

export function getCustomerList(filter) {
  return request({
    url: `/firm/merchant/customer/get/list`,
    method: `get`,
    params: filter
  });
}

export function getSupplierList(filter) {
  return request({
    url: `/firm/merchant/supplier/get/list`,
    method: `get`,
    params: filter
  });
}

export function associateUser(staffId, userId) {
  return request({
    url: `/firm/merchant/associate/${staffId}/${userId}`,
    method: `put`,
  });
}


