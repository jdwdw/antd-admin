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
      localStorage.setItem('accesstoken', 'e29ad689-a77d-4835-87f5-64aef11f772a')
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
