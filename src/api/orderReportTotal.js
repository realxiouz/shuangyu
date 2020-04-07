import request from '@/utils/request';

export function getList(params) {
    return request({
      url: `/order/total/report/list`,
      method: "get",
      params: params
    });
  }