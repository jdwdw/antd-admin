import React from 'react'
import PropTypes from 'prop-types'
import pathToRegexp from 'path-to-regexp'
import { connect } from 'dva'
import { classnames, config } from 'utils'
import { Helmet } from 'react-helmet'
import '../themes/index.less'
import './index.less'
import NProgress from 'nprogress'
import Error from './error'
import TabBar from '../components/Header/TabBar'

const { prefix, openPages } = config


const App = ({ children, dispatch, app, loading, location }) => {
  return (
    <div>
      <TabBar onChangeRoute={function (payload) { dispatch({ type: 'app/goToUIElementDropOption', payload }) }}>
        <div style={{ overflow: 'auto', height: '700px' }}>
          { children }
        </div>
      </TabBar>
    </div>
  )
}

App.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  app: PropTypes.object,
  loading: PropTypes.object,
}

export default connect(({ app, loading }) => ({ app, loading }))(App)
