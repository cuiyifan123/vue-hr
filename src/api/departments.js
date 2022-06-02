import request from '@/utils/request.js'

export function getDepts() {
  return request({
    method: 'get',
    url: '/company/department'
  })
}

export function addDepartment(data) {
  return request({
    method: 'post',
    url: '/company/department',
    data
  })
}
export function getDepartmentById(id) {
  return request({
    method: 'get',
    url: `/company/department/${id}`
  })
}

export function updateDepartment(data) {
  return request({
    method: 'put',
    url: `/company/department/${data.id}`,
    data
  })
}
