import request from '@/utils/request';

export function changePassword(data) {
  return request({
    url: '/admin/user/login/activate',
    method: 'post',
    data
  });
}
