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
