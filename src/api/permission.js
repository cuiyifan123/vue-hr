import request from '@/utils/request'

export function getPermissions() {
  return request({
    url: '/sys/permission',
    method: 'get'
  })
}

export function addPermission(data) {
  return request({
    url: '/sys/permission',
    method: 'post',
    data
  })
}

export function delPermission(id) {
  return request({
    method: 'delete',
    url: `/sys/permission/${id}`
  })
}

export function getPermission(id) {
  return request({
    method: 'get',
    url: `/sys/permission/${id}`
  })
}

export function updatePermission(data) {
  return request({
    method: 'put',
    url: `/sys/permission/${data.id}`,
    data
  })
}
