import request from '@/utils/request';

export function getOne(params) {
  return request({
    url: `/finance/voucher/record/get/one/${params.voucherRecordId}`,
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

export function getPageList(params) {
  return request({
    url: `/finance/voucher/record/get/page/list/${params.pageFlag}/${params.pageSize}`,
    method: 'get',
    params
  });
}

export function removeOne(data) {
  return request({
    url: `/finance/voucher/record/remove/one/${data.voucherRecordId}`,
    method: 'delete'
  });
}
