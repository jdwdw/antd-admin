import { request, config } from 'utils'

const { api } = config
const { topics, topicCreate, topicEdit } = api

export async function getTopics (data) {
  return request({
    url: topics,
    method: 'get',
    data,
  })
}

export async function createTopic (data) {
  return request({
    url: topicCreate,
    method: 'post',
    data,
  })
}

export async function editTopic (data) {
  return request({
    url: topicEdit,
    method: 'post',
    data,
  })
}
