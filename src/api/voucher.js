import request from '@/utils/request';

export function getOne(params) {
  return request({
    url: `/finance/voucher/get/one/${params.voucherId}`,
    method: 'get'
  });
}

export function save(data) {
  return request({
    url: '/finance/voucher/save',
    method: 'post',
    data
  });
}

export function getPageList(params) {
  return request({
    url: `/finance/voucher/get/page/list/${params.pageFlag}/${params.pageSize}`,
    method: 'get',
    params
  });
}

export function removeOne(data) {
  return request({
    url: `/finance/voucher/remove/one/${data.voucherId}`,
    method: 'delete'
  });
}
