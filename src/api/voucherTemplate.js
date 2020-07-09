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

export function getPageList(args) {
  const { pageFlag, pageSize, ...params } = args;
  return request({
    url: `/finance/voucher/template/get/page/list/${pageFlag}/${pageSize}`,
    method: 'get',
    params
  });
}

export function removeOne(args) {
  const { templateId } = args;
  return request({
    url: `/finance/voucher/template/remove/one/${templateId}`,
    method: 'delete'
  });
}
