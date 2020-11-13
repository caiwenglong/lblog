import request from '@/utils/request'

export const getUsers = (params: any) =>
  request({
    url: '/user-center/user',
    method: 'get',
    params
  })

export const getUserInfo = (data: any) =>
  request({
    url: '/user-center/user/info',
    method: 'post',
    data
  })

export const getUserByName = (username: string) =>
  request({
    url: `/user-center/user/${username}`,
    method: 'get'
  })

export const updateUser = (username: string, data: any) =>
  request({
    url: `/user-center/user/${username}`,
    method: 'put',
    data
  })

export const deleteUser = (username: string) =>
  request({
    url: `/user-center/user/${username}`,
    method: 'delete'
  })

export const login = (data: any) =>
  request({
    url: '/user-center/user/login',
    method: 'post',
    data
  })

export const logout = () =>
  request({
    url: '/user-center/user/logout',
    method: 'post'
  })

export const register = (data: any) =>
  request({
    url: '/user-center/user/register',
    method: 'post',
    data
  })
