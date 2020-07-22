import request from '@/utils/request';

export function getOne(params) {
  return request({
    url: `/finance/voucher/group/get/one/${params.voucherGroupId}`,
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

export function getList(params) {
  return request({
    url: `/finance/voucher/group/get/list`,
    method: 'get',
    params
  });
}

export function getPageList(params) {
  return request({
    url: `/finance/voucher/group/get/page/list/${params.pageFlag}/${params.pageSize}`,
    method: 'get',
    params
  });
}

export function removeOne(data) {
  return request({
    url: `/finance/voucher/group/remove/one/${data.voucherGroupId}`,
    method: 'delete'
  });
}
