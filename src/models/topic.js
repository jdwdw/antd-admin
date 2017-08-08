import pathToRegexp from 'path-to-regexp'
import { routerRedux } from 'dva/router'
import { getTopic, collect, deCollect, repliesCreat, replyUpsChange } from '../services/topic'

export default {
  namespace: 'topicDetail',
  state: {
    topicData: {},
    topicId: '',
  },

  subscriptions: {

    setup ({ dispatch, history }) {
      history.listen((location) => {
        console.log(location.pathname)
        console.log(pathToRegexp('/tac/:id/topic').exec('/tac/333232/topic'))
        const match = pathToRegexp('/topic/:id').exec(location.pathname)
        if (match) {
          dispatch({
            type: 'getTopic',
            payload: { id: match[1] },
          })
        }
      })
    },

  },

  effects: {
    * getTopic ({ payload }, { call, put }) {
      const accesstoken = localStorage.getItem('accesstoken')
      let params = { accesstoken }
      params = Object.assign(params, payload)
      let data = yield call(getTopic, params)
      if (data.success) {
        data = { topicData: data.data, topicId: data.data.id }
        yield put({ type: 'updateState',
          payload: data,
        })
      }
    },

    * collect ({ payload }, { call, put, select }) {
      const accesstoken = localStorage.getItem('accesstoken')
      let params = { accesstoken }
      const topicId = yield select(state => state.topicDetail.topicId)
      const topicIdObject = { topic_id: topicId }
      params = Object.assign(params, topicIdObject)
      let data = yield call(collect, params)
      if (data.success) {
        data = { topicData: data.data }
        yield put({ type: 'getTopic',
          payload: { id: topicId },
        })
      }
    },
    * deCollect ({ payload }, { call, put, select }) {
      const accesstoken = localStorage.getItem('accesstoken')
      let params = { accesstoken }
      const topicId = yield select(state => state.topicDetail.topicId)
      const topicIdObject = { topic_id: topicId }
      params = Object.assign(params, topicIdObject)
      let data = yield call(deCollect, params)
      if (data.success) {
        data = { topicData: data.data }
        yield put({ type: 'getTopic',
          payload: { id: topicId },
        })
      }
    },

    * replies ({ payload }, { call, put, select }) {
      const accesstoken = localStorage.getItem('accesstoken')
      let params = { accesstoken }
      const topicId = yield select(state => state.topicDetail.topicId)
      const topicIdObject = { topic_id: topicId }
      const payloadObject = { reply_id: payload.reply_id, content: payload.content }
      params = Object.assign(params, topicIdObject, payloadObject)
      let data = yield call(repliesCreat, params)
      if (data.success) {
        data = { topicData: data.data }
        yield put({ type: 'getTopic',
          payload: { id: topicId },
        })
      }
    },

    * replyUps ({ payload }, { call, put, select }) {
      const accesstoken = localStorage.getItem('accesstoken')
      let params = { accesstoken }
      const topicId = yield select(state => state.topicDetail.topicId)
      const replyIdObject = { reply_id: payload }
      params = Object.assign(params, replyIdObject)
      let data = yield call(replyUpsChange, params)
      if (data.success) {
        data = { topicData: data.data }
        yield put({ type: 'getTopic',
          payload: { id: topicId },
        })
      }
    },

    * topiceEdit ({ payload }, { put, select }) {
      const topicId = yield select(state => state.topicDetail.topicId)
      const url = `/topic/${topicId}/edit`
      yield put(routerRedux.push(url))
    },


  },
  reducers: {
    updateState (state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },

  },
}
