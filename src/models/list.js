import { getTopics } from '../services/topics'

export default {
  namespace: 'listAll',
  state: {
    dataSource: [],
    tab: '',
    currentPage: 1,
    refreshing: false,
  },
  subscriptions: {

    setup ({ dispatch }) {
      dispatch({ type: 'concatTopics', payload: 'listAll' })
    },

  },
  effects: {

    concatTopics: [
      function* ({ payload }, { call, put, select }) {
        const list = yield select(state => state[payload])
        const params = { tab: list.tab, page: list.currentPage }
        let data = yield call(getTopics, params)
        if (data.success) {
          data = list.dataSource.concat(data.data)
          data = { dataSource: data, currentPage: list.currentPage + 1 }
          yield put({ type: 'updateState',
            payload: data,
          })
        }
      },
      {
        type: 'throttle',
        ms: 2000,
      },
    ],

    refreshTopics: [
      function* ({ payload }, { call, put, select }) {
        const list = yield select(state => state[payload])
        let refreshing = !list.refreshing
        yield put({ type: 'changeRefreshing',
          payload: { refreshing },
        })
        const params = { tab: list.tab, page: 1 }
        let data = yield call(getTopics, params)
        if (data.success) {
          data = { dataSource: data.data, currentPage: 1 }
          yield put({ type: 'updateState',
            payload: data,
          })
        }
        refreshing = !refreshing
        yield put({ type: 'changeRefreshing',
          payload: { refreshing },
        })
      },
      {
        type: 'throttle',
        ms: 2000,
      },
    ],

  },
  reducers: {
    updateState (state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },

    changeRefreshing (state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },

  },
}
