import request from '@/utils/request';

export function getOne(id) {
  return request({
    url: `/finance/voucher/get/one/${id}`,
    method: 'get'
  });
}

export function saveData(data) {
  return request({
    url: '/finance/voucher/save',
    method: 'post',
    data
  });
}

export function getPageList(pageFlag, pageSize, params) {
  return request({
    url: `/finance/voucher/get/page/list/${pageFlag}/${pageSize}`,
    method: 'get',
    params
  });
}

export function removeOne(id) {
  return request({
    url: `/finance/voucher/remove/one/${id}`,
    method: 'delete'
  });
}
