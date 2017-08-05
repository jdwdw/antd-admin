import modelExtend from 'dva-model-extend'
import list from './list'

export default modelExtend(list, {

  namespace: 'listJob',

  subscriptions: {

    setup ({ dispatch }) {
      dispatch({ type: 'concatTopics', payload: 'listJob' })
    },

  },
})
