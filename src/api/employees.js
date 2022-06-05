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
