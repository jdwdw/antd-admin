import pathToRegexp from 'path-to-regexp'
import { routerRedux } from 'dva/router'
import { createTopic, editTopic } from '../services/topics'
import { getTopic } from '../services/topic'

export default {
  namespace: 'topicCreator',
  state: {
    topicData: {},
    topicId: '',
  },

  subscriptions: {

    setup ({ dispatch, history }) {
      history.listen((location) => {
        const match = pathToRegexp('/topic/:id/edit').exec(location.pathname)
        if (match) {
          dispatch({
            type: 'getTopic',
            payload: { id: match[1] },
          })
        } else {
          dispatch({
            type: 'updateState',
            payload: { topicData: {}, topicId: '' },
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
      console.log(data)
      if (data.success) {
        data = { topicData: data.data, topicId: data.data.id }
        // yield put({
        //   type: 'setTopicId',
        //   payload: { topicId: payload.id },
        // })
        yield put({ type: 'updateState',
          payload: data,
        })
      }
    },


    * creatTopic ({ payload }, { call, put, select }) {
      const accesstoken = localStorage.getItem('accesstoken')
      let params = { accesstoken }
      const topicId = yield select(state => state.topicCreator.topicId)
      let data = {}
      if (topicId) {
        console.log('22222222')
        const topicObject = { title: payload.title, tab: payload.tab, content: payload.content, topic_id: topicId }
        params = Object.assign(params, topicObject)
        console.log(params)
        data = yield call(editTopic, params)
      } else {
        const topicObject = { title: payload.title, tab: payload.tab, content: payload.content }
        params = Object.assign(params, topicObject)
        console.log(params)
        data = yield call(createTopic, params)
      }

      if (data.success) {
        console.log('createSuccess')
      }
    },

    * backtoHomePage ({ payload }, { put }) {
      yield put(routerRedux.push('/myPage'))
    },

    // * replies ({ payload }, { call, put, select }) {
    //   const accesstoken = localStorage.getItem('accesstoken')
    //   let params = { accesstoken }
    //   const topicId = yield select(state => state.topicDetail.topicId)
    //   const topicIdObject = { topic_id: topicId }
    //   const payloadObject = { reply_id: payload.reply_id, content: payload.content }
    //   params = Object.assign(params, topicIdObject, payloadObject)
    //   let data = yield call(repliesCreat, params)
    //   if (data.success) {
    //     data = { topicData: data.data }
    //     yield put({ type: 'getTopic',
    //       payload: { id: topicId },
    //     })
    //   }
    // },

  },
  reducers: {
    setTopicId (state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },

    updateState (state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },

  },
}
