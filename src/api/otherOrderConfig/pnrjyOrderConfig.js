import request from '@/utils/request';


// 查询原始单
export function getList(params) {
  return request({
    url: '/pnrjy/order/list',
    method: 'get',
    params
  });
}

// 查询原始单数量
export function getTotal(params) {
  return request({
    url: '/pnrjy/order/total',
    method: 'get',
    params
  });
}

//导单 
export function exportOrder(data) {
  return request({
    url: "/pnrjy/order/export",
    method: "post",
    data
  });
}

