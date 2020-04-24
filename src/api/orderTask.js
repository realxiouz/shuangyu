import request from '@/utils/request';

export function getPageList(params) {
  return request({
    url: `/order/task/page/list`,
    method: 'get',
    params: params
  });
}


export function getTotal(params) {
  return request({
    url: '/order/task/get/total',
    method: 'get',
    params: params
  });
}

export function getPendingTotal(params) {
  return request({
    url: '/order/task/get/pending/total',
    method: 'get',
    params: params
  });
}


// 任务提交
export function taskSubmit(params) {
  return request({
    url: '/order/task/submit',
    method: 'get',
    params: params
  });
}


// 任务取消
export function taskCancel(params) {
  return request({
    url: '/order/task/cancel',
    method: 'get',
    params: params
  });
}


// 任务备注
export function taskRemark(params) {
  return request({
    url: '/order/task/remark',
    method: 'get',
    params: params
  });
}
// 

// 批量转任务
export function taskTransfer(data) {
  return request({
    url: '/order/task/transfer',
    method: 'post',
    data:data
  });
}