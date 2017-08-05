import './index.html'
import 'babel-polyfill'
import dva from 'dva'
import createLoading from 'dva-loading'
import { browserHistory } from 'dva/router'
import { message } from 'antd'

// 1. Initialize
const app = dva({
  ...createLoading({
    effects: true,
  }),
  history: browserHistory,
  onError (error) {
    message.error(error.message)
  },
})

// 2. Model
app.model(require('./models/app'))
app.model(require('./models/list'))
app.model(require('./models/listAsk'))
app.model(require('./models/listGood'))
app.model(require('./models/listJob'))
app.model(require('./models/listShare'))

// 3. Router
app.router(require('./router'))

// 4. Start
app.start('#root')
