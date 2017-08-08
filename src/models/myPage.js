import { routerRedux } from 'dva/router'
import pathToRegexp from 'path-to-regexp'
import { login } from '../services/app'

export default {
  namespace: 'myPage',
  state: {
    userObject: {},
  },
  subscriptions: {

    // setup ({ dispatch }) {
    //   dispatch({ type: 'query' })
    // },

  },
  effects: {

    * login ({ payload }, { call, put }) {
      let data = yield call(login, payload)
      localStorage.setItem('accesstoken', payload.accesstoken)
      localStorage.setItem('loginname', data.loginname)
      if (data.success) {
        data = { userObject: data }
        yield put({ type: 'updateState',
          payload: data,
        })
      }
    },

    * logout ({
      payload,
    }, { put }) {
      yield put({ type: 'updateState',
        payload: { userObject: {} },
      })
      localStorage.removeItem('accesstoken')
      localStorage.removeItem('loginname')
    },

    * gotoTopicCreator ({
      payload,
    }, { put }) {
      yield put(routerRedux.push('/topic/create'))
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
