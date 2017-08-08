import React, { Component } from 'react'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import PropTypes from 'prop-types'
import { Button, InputItem } from 'antd-mobile'
import TopicCreator from './components/TopicCreator'
import styles from './index.less'

class TopicCreate extends Component {
  constructor (props) {
    super(props)
  }


  render () {
    const props = this.props

    return (
      <div>
        <Button onClick={function () { props.history.goBack() }}> goBack</Button>
        <TopicCreator {...props} />
      </div>

    )
  }
}


export default connect(({ topicCreator }) => ({ topicCreator }))(TopicCreate)
