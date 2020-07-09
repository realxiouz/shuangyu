import request from '@/utils/request';

export function getOne(args) {
  const { templateId } = args;
  return request({
    url: `/finance/voucher/template/get/one/${templateId}`,
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

export function getPageList(pageFlag, pageSize, params) {
  return request({
    url: `/finance/voucher/template/get/page/list/${pageFlag}/${pageSize}`,
    method: 'get',
    params
  });
}

export function removeOne(id) {
  return request({
    url: `/finance/voucher/template/remove/one/${id}`,
    method: 'delete'
  });
}
