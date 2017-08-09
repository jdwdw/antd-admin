import pathToRegexp from 'path-to-regexp'
import { routerRedux } from 'dva/router'
import { getMessages, markAllMessage } from '../services/messages'

export default {
  namespace: 'messages',
  state: {
    messagesData: {},
  },

  subscriptions: {

    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/messages') {
          dispatch({
            type: 'getMessages',
          })
        }
      })
    },

  },

  effects: {
    * getMessages ({ payload }, { call, put }) {
      const accesstoken = localStorage.getItem('accesstoken')
      const params = { accesstoken }
      let data = yield call(getMessages, params)
      console.log('messages')
      console.log(data)
      if (data.success) {
        data = { messagesData: data.data }
        yield put({ type: 'updateState',
          payload: data,
        })
      }
    },

    * markAllMessage ({ payload }, { call }) {
      const accesstoken = localStorage.getItem('accesstoken')
      const params = { accesstoken }
      yield call(markAllMessage, params)
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
