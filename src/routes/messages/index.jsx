import React, { Component } from 'react'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import PropTypes from 'prop-types'
import { WingBlank, WhiteSpace } from 'antd-mobile'
import ListItem from './components/ListItem'
import styles from './index.less'

class Messages extends Component {
  constructor (props) {
    super(props)
  }


  render () {
    console.log(this.props)
    const { messages } = this.props
    const hasReadMessages = messages.messagesData.has_read_messages
    const hasNotReadMessages = messages.messagesData.hasnot_read_messages
    return (
      <div>
        <WingBlank size="sm">
          <div>
            <div>未读信息</div>
            {hasNotReadMessages && hasNotReadMessages.length > 0 ? hasNotReadMessages.map((value) => {
              return (<ListItem data={value} />)
            }) : <div>没有未读信息</div>
            }
          </div>
        </WingBlank>
        <WhiteSpace size="lg" />
        <WingBlank size="sm">
          <div>
            <div>已读信息</div>
            {hasReadMessages ? hasReadMessages.map((value) => {
              return (<ListItem data={value} />)
            }) : <div>没有已读信息</div>
            }
          </div>
        </WingBlank>
      </div>

    )
  }
}


export default connect(({ messages }) => ({ messages }))(Messages)
