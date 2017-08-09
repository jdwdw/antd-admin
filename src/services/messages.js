import { request, config } from 'utils'

const { api } = config
const { messages, messageMarkAll, messageCount } = api

export async function getMessageCount (data) {
  return request({
    url: messageCount,
    method: 'get',
    data,
  })
}

export async function getMessages (data) {
  return request({
    url: messages,
    method: 'get',
    data,
  })
}

export async function markAllMessage (data) {
  return request({
    url: messageMarkAll,
    method: 'post',
    data,
  })
}
