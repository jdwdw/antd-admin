import { request, config } from 'utils'

const { api } = config
const { topic } = api

export async function getTopic (params) {
  return request({
    url: topic,
    method: 'get',
    data: params,
  })
}
