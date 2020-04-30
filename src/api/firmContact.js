import request from '@/utils/request';

export function addOne(data) {
  return request({
    url: '/firm/contact/add/one',
    method: 'post',
    data
  });
}

export function updateOne(data) {
  return request({
    url: '/firm/contact/update/one',
    method: 'post',
    data
  });
}

export function removeOne(contactId) {
  return request({
    url: `/firm/contact/remove/one/${contactId}`,
    method: 'delete'
  });
}

export function getOne(contactId) {
  return request({
    url: `/firm/contact/one/${contactId}`,
    method: 'get'
  });
}

export function getList(filter) {
  return request({
    url: `/firm/contact/list`,
    method: 'get',
    params: filter
  });
}

export function getTotal(filter) {
  return request({
    url: '/firm/contact/total',
    method: 'get',
    params: filter
  });
}

export function getPageList(pageFlag, pageSize, lastId, filter) {
  return request({
    url: `/firm/contact/page/list/${pageFlag}/${pageSize}/${lastId}`,
    method: 'get',
    params: filter
  });
}
