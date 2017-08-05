import { request, config } from 'utils'

const { api } = config
const { topics } = api

export async function getTopics (data) {
  return request({
    url: topics,
    method: 'get',
    data,
  })
}
