import request from '@/utils/request'

/**
 *
 * @param {Object} data 登录需要的参数: mobile和password
 * @returns {*} 请求的结果，一个promise对象
 */
export function loginApi(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

export function getInfoApi() {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}

export function logoutApi() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}

/**
 *
 * @param id 用户id
 * @returns {*} 请求函数
 */
export function getUserDetailById(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'get'
  })
}
