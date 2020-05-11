import request from '@/utils/request';



// 查询原始单
export function getList(data) {
  return request({
    url: '/qunar/order/get/list',
    method: 'post',
    data
  });
}

