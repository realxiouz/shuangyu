import request from '@/utils/request';


export function addOne(data) {
  return request({
    url: `/firm/merchant/add/one`,
    method: `post`,
    data
  });
}

export function updateOne(data) {
  return request({
    url: `/firm/merchant/update/one`,
    method: `post`,
    data
  });
}

export function removeOne(otherId) {
  return request({
    url: `/firm/merchant/remove/one/${otherId}`,
    method: `delete`,
  });
}

export function getOne(otherId) {
  return request({
    url: `/firm/merchant/one/${otherId}`,
    method: `get`
  });
}

export function getList(filter) {
  return request({
    url: `/firm/merchant/list`,
    method: `get`,
    params: filter
  });
}

export function associateUser(data) {
  return request({
    url: `/firm/merchant/associate`,
    method: `put`,
    data
  });
}


