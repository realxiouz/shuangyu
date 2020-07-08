import request from '@/utils/request';

export function getOne(id) {
  return request({
    url: `/finance/voucher/record/get/one/${id}`,
    method: 'get'
  });
}

export function saveOne(data) {
  return request({
    url: '/finance/voucher/record/save/one',
    method: 'post',
    data
  });
}

export function getPageList(pageFlag, pageSize, params) {
  return request({
    url: `/finance/voucher/record/get/page/list/${pageFlag}/${pageSize}`,
    method: 'get',
    params
  });
}

export function removeOne(id) {
  return request({
    url: `/finance/voucher/record/remove/one/${id}`,
    method: 'delete'
  });
}
