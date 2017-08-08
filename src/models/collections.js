import pathToRegexp from 'path-to-regexp'
import { routerRedux } from 'dva/router'
import { getCollections } from '../services/topic'

export default {
  namespace: 'collections',
  state: {
    collectionsData: [],
  },

  subscriptions: {

    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/collections') {
          dispatch({
            type: 'getCollections',
          })
        }
      })
    },

  },

  effects: {
    * getCollections ({ payload }, { call, put }) {
      const params = { loginname: localStorage.getItem('loginname') }
      let data = yield call(getCollections, params)
      console.log(data)
      if (data.success) {
        data = { collectionsData: data.data }
        yield put({ type: 'updateState',
          payload: data,
        })
      }
    },

    * goToTopicRoute ({ payload = '' }, { put }) {
      const url = `/topic/${payload}`
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
