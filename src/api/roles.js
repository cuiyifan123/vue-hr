import request from '@/utils/request.js'

// 获取角色列表
export function getRoles(params) {
  return request({
    method: 'get',
    url: '/sys/role',
    params
  })
}

export function removeRole(id) {
  return request({
    method: 'delete',
    url: `/sys/role/${id}`
  })
}

// 添加角色
export function addRole(data) {
  return request({
    method: 'post',
    url: `/sys/role`,
    data
  })
}

// 修改角色
export function updateRole(data) {
  return request({
    method: 'put',
    url: `/sys/role/${data.id}`,
    data
  })
}

export function updateRolePermission(data) {
  return request({
    method: 'put',
    url: '/sys/role/assignPrem',
    data
  })
}
export function getRolePermissionById(id) {
  return request({
    method: 'get',
    url: `/sys/role/${id}`
  })
}
