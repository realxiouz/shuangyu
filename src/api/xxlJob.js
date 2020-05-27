import request from '@/utils/request';

export function start(jobId) {
  return request({
    url: `/xxl/job/info/start/${jobId}`,
    method: 'get'
  });
}
export function stop(jobId) {
  return request({
    url: `/xxl/job/info/stop/${jobId}`,
    method: 'get'
  });
}
export function trigger(jobId,filter) {
  return request({
    url: `/xxl/job/info/trigger/${jobId}`,
    method: 'get',
    params:filter
  });
}
