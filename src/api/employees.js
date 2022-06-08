import request from '@/utils/request'

// 获取员工基本信息
export function getSimpleEmployees() {
  return request({
    method: 'get',
    url: '/sys/user/simple'
  })
}

export function getUser(params) {
  return request({
    method: 'get',
    url: '/sys/user',
    params
  })
}

// 删除员工
export function removeEmployees(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}

// 添加员工
export function addEmployees(data) {
  return request({
    url: `/sys/user`,
    method: 'post',
    data
  })
}

// 批量导入员工
export function addBatchEmployees(data) {
  return request({
    url: `/sys/user/batch`,
    method: 'post',
    data
  })
}

// 修改用户信息
export function updateEmployee(data) {
  console.log(data)
  return request({
    url: `/sys/user/${data.id}`,
    method: 'put',
    data
  })
}

export function assignRoles(data) {
  return request({
    method: 'put',
    url: '/sys/user/assignRoles',
    data
  })
}
