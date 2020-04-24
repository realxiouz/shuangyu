import request from '@/utils/request';


export function removeOne(firmID) {
  return request({
    url: `/firm/other/remove/one/${firmID}`,
    method: `delete`,
  });
}

export function getOne(firmId) {
  return request({
    url: `/firm/other/get/one/${firmId}`,
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


