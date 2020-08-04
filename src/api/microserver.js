import request from '@/utils/request';

export function getOne(code) {
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

export function getPageList(pageFlag, pageSize, params) {
  return request({
    url: `/manage/micro/service/page/list/${pageFlag}/${pageSize}`,
    method: 'get',
    params
  });
}

export function removeOne(code) {
  return request({
    url: `/manage/micro/service/remove/one/${code}`,
    method: 'delete'
  });
}
