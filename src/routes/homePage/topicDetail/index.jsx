import React, { Component } from 'react'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import PropTypes from 'prop-types'
import { Button, InputItem } from 'antd-mobile'
import styles from './index.less'

class TopicDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      accesstokenValue: '',
    }
  }


  render () {
    console.log(this.props.topicDetail.topicData)
    if (this.props.topicDetail.topicData.data) {
      return (
        <div>
            is loading
        </div>

      )
    }
    return (
      <div>
          topicDetail
      </div>

    )
  }
}


export default connect(({ topicDetail }) => ({ topicDetail }))(TopicDetail)
