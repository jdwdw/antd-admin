import pathToRegexp from 'path-to-regexp'
import { getTopic } from '../services/topic'

export default {
  namespace: 'topicDetail',
  state: {
    topicData: {},
  },

  subscriptions: {

    setup ({ dispatch, history }) {
      history.listen((location) => {
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
      console.log(99999)
      const accesstoken = localStorage.getItem('accesstoken')
      let params = { accesstoken }
      params = Object.assign(params, payload)
      console.log(params)
      let data = yield call(getTopic, params)
      if (data.success) {
        console.log(data)
        data = { topicData: data.data }
        yield put({ type: 'updateState',
          payload: data,
        })
      }
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
