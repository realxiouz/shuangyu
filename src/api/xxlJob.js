import request from '@/utils/request';

export function start(jobId) {
  return request({
    url: `/job/info/start/${jobId}`,
    method: 'get'
  });
}
export function stop(jobId) {
  return request({
    url: `/job/info/stop/${jobId}`,
    method: 'get'
  });
}
export function trigger(jobId,filter) {
  return request({
    url: `/job/info/trigger/${jobId}`,
    method: 'get',
    params:filter
  });
}
