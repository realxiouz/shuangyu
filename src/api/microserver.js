import request from '@/utils/request';

export function getOne(args) {
  const { code } = args;
  return request({
    url: `/manage/micro/service/get/one/${code}`,
    method: 'get'
  });
}

export function saveData(data) {
  return request({
    url: '/manage/micro/service/save/one',
    method: 'post',
    data
  });
}

export function getPageList(args) {
  const { pageFlag, pageSize, ...params } = args;
  return request({
    url: `/manage/micro/service/page/list/${pageFlag}/${pageSize}`,
    method: 'get',
    params
  });
}

export function removeOne(args) {
  const { code } = args;
  return request({
    url: `/manage/micro/service/remove/one/${code}`,
    method: 'delete'
  });
}
