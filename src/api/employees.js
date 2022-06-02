import request from '@/utils/request'

export function getSimpleEmployees() {
  return request({
    method: 'get',
    url: '/sys/user/simple'
  })
}

