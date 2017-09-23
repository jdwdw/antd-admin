import modelExtend from 'dva-model-extend'
import list from './list'

export default modelExtend(list, {

  namespace: 'listAsk',
  state: {
    tab: 'ask',
  },

  subscriptions: {

    setup ({ dispatch }) {
      dispatch({ type: 'concatTopics', payload: 'listAsk' })
    },

  },
})
