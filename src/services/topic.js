import { request, config } from 'utils'

const { api } = config
const { topic, topicCollect, topicDeCollect, replies, replyUps } = api

export async function getTopic (params) {
  return request({
    url: topic,
    method: 'get',
    data: params,
  })
}

export async function collect (params) {
  return request({
    url: topicCollect,
    method: 'post',
    data: params,
  })
}

export async function deCollect (params) {
  return request({
    url: topicDeCollect,
    method: 'post',
    data: params,
  })
}

export async function repliesCreat (params) {
  return request({
    url: replies.replace(':reply_id', params.topic_id),
    method: 'post',
    data: params,
  })
}

export async function replyUpsChange (params) {
  return request({
    url: replyUps.replace(':reply_id', params.reply_id),
    method: 'post',
    data: params,
  })
}
