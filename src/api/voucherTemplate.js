import request from '@/utils/request';

export function getOne(params) {
  return request({
    url: `/finance/voucher/template/get/one/${params.templateId}`,
    method: 'get'
  });
}

export function saveData(data) {
  return request({
    url: '/finance/voucher/template/save',
    method: 'post',
    data
  });
}

export function getPageList(params) {
  return request({
    url: `/finance/voucher/template/get/page/list/${params.pageFlag}/${params.pageSize}`,
    method: 'get',
    params
  });
}

export function removeOne(data) {
  return request({
    url: `/finance/voucher/template/remove/one/${data.templateId}`,
    method: 'delete'
  });
}
