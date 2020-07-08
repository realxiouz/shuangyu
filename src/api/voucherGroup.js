import request from '@/utils/request';

export function getOne(id) {
  return request({
    url: `/finance/voucher/group/get/one/${id}`,
    method: 'get'
  });
}

export function saveOne(data) {
  return request({
    url: '/finance/voucher/group/save/one',
    method: 'post',
    data
  });
}

export function getPageList(pageFlag, pageSize, params) {
  return request({
    url: `/finance/voucher/group/get/page/list/${pageFlag}/${pageSize}`,
    method: 'get',
    params
  });
}

export function removeOne(id) {
  return request({
    url: `/finance/voucher/group/remove/one/${id}`,
    method: 'delete'
  });
}
