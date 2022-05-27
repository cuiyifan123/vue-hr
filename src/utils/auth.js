import Cookies from 'js-cookie'
import md5 from 'md5'

const TokenKey = md5('token_key')
const TimeStampKey = md5('token_time_stamp_key')

export const getToken = () => Cookies.get(TokenKey)
export const setToken = (token) => Cookies.set(TokenKey, token)
export const removeToken = (token) => Cookies.remove(TokenKey, token)

export const getTimeStamp = () => Cookies.get(TimeStampKey)
export const setTimeStamp = (timeStamp) => Cookies.set(TimeStampKey, timeStamp)
export const removeTimeStamp = () => Cookies.remove(TimeStampKey)
