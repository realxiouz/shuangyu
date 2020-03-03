import request from '@/utils/request';

export function getList(data) {
  return request({
    url: '/staff/list',
    method: 'get',
    data
  });
}
