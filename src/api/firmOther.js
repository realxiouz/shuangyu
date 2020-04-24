import request from '@/utils/request';


export function removeOne(firmID) {
  return request({
    url: `/firm/other/remove/one/${firmID}`,
    method: `delete`,
  });
}

export function getOne(otherId) {
  return request({
    url: `/firm/other/get/one/${otherId}`,
    method: `get`
  });
}

export function getList(filter) {
  return request({
    url: `/firm/other/list`,
    method: `get`,
    params: filter
  });
}


