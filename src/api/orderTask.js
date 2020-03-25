import request from '@/utils/request';

export function getPageList(params) {
    return request({
      url:  `/order/task/page/list/${params.pageSize}/${params.createTime}/${params.taskId}`,
      method: 'get',
      params: params.searchForm
    });
}


export function getTotal(params) {
    return request({
      url: '/order/task/get/total',
      method: 'get',
      params:params
    });
  }