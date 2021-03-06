import React from 'react'
import PropTypes from 'prop-types'
import { Router } from 'dva/router'
// import App from './routes/app'
import index from './routes/index.jsx'

const registerModel = (app, model) => {
  if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
    app.model(model)
  }
}

const Routers = function ({ history, app }) {
  const routes = [
    {
      path: '/',
      component: index,
      getIndexRoute (nextState, cb) {
        require.ensure([], (require) => {
          cb(null, { component: require('./routes/homePage/') })
        }, 'homePage')
      },
      childRoutes: [
        {
          path: 'myPage',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/myPage'))
              cb(null, require('./routes/myPage/'))
            }, 'myPage')
          },
        },
        {
          path: 'homePage',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('./routes/homePage/'))
            }, 'homePage')
          },
        },
        {
          path: 'topic/create',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/topicCreator'))
              cb(null, require('./routes/homePage/topicDetail/topicCreat/'))
            }, 'topic-creator')
          },
        },
        {
          path: 'topic/:id/edit',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/topicCreator'))
              cb(null, require('./routes/homePage/topicDetail/topicCreat'))
            }, 'topic-edit')
          },
        },
        {
          path: 'topic/:id',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/topic'))
              cb(null, require('./routes/homePage/topicDetail/'))
            }, 'topic-detail')
          },
        },
        {
          path: 'collections',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/collections'))
              cb(null, require('./routes/collections/'))
            }, 'collections')
          },
        },
        {
          path: 'messages',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/messages'))
              cb(null, require('./routes/messages/'))
            }, 'messages')
          },
        },
        {
          path: 'dashboard',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/dashboard'))
              cb(null, require('./routes/dashboard/'))
            }, 'dashboard')
          },
        }, {
          path: 'user',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/user'))
              cb(null, require('./routes/user/'))
            }, 'user')
          },
        }, {
          path: 'user/:id',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/user/detail'))
              cb(null, require('./routes/user/detail/'))
            }, 'user-detail')
          },
        }, {
          path: 'login',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/login'))
              cb(null, require('./routes/login/'))
            }, 'login')
          },
        }, {
          path: 'request',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('./routes/request/'))
            }, 'request')
          },
        }, {
          path: 'UIElement/iconfont',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('./routes/UIElement/iconfont/'))
            }, 'UIElement-iconfont')
          },
        }, {
          path: 'UIElement/search',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('./routes/UIElement/search/'))
            }, 'UIElement-search')
          },
        }, {
          path: 'UIElement/dropOption',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('./routes/UIElement/dropOption/'))
            }, 'UIElement-dropOption')
          },
        }, {
          path: 'UIElement/layer',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('./routes/UIElement/layer/'))
            }, 'UIElement-layer')
          },
        }, {
          path: 'UIElement/dataTable',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('./routes/UIElement/dataTable/'))
            }, 'UIElement-dataTable')
          },
        }, {
          path: 'UIElement/editor',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('./routes/UIElement/editor/'))
            }, 'UIElement-editor')
          },
        }, {
          path: 'chart/lineChart',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('./routes/chart/lineChart/'))
            }, 'chart-lineChart')
          },
        }, {
          path: 'chart/barChart',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('./routes/chart/barChart/'))
            }, 'chart-barChart')
          },
        }, {
          path: 'chart/areaChart',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('./routes/chart/areaChart/'))
            }, 'chart-areaChart')
          },
        }, {
          path: 'post',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/post'))
              cb(null, require('./routes/post/'))
            }, 'post')
          },
        }, {
          path: '*',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('./routes/error/'))
            }, 'error')
          },
        },
      ],
    },
  ]

  return <Router history={history} routes={routes} />
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers
