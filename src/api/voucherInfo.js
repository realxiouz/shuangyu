import request from '@/utils/request';

export function getOne(id) {
  return request({
    url: `/finance/voucher/info/get/one/${id}`,
    method: 'get'
  });
}

export function saveData(data) {
  return request({
    url: '/finance/voucher/info/save/data',
    method: 'post',
    data
  });
}

export function getPageList(pageFlag, pageSize, params) {
  return request({
    url: `/finance/voucher/info/get/page/list/${pageFlag}/${pageSize}`,
    method: 'get',
    params
  });
}

export function removeOne(id) {
  return request({
    url: `/finance/voucher/info/remove/one/${id}`,
    method: 'delete'
  });
}
