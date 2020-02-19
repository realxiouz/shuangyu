import request from '@/utils/request';

export function addApi(data) {
  return request({
    url: '/admin/api/add/one',
    method: 'post',
    data
  });
}



