import React, { Component } from 'react'
import { Link } from 'dva/router'
import { connect } from 'dva'
import PropTypes from 'prop-types'
import { Card, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import RichText from './RichText'
import styles from './ReplyItem.less'

class ReplyItem extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isReplyRichTextDisplay: false,
    }
    this.onChangeReplyRichTextDisplay = this.onChangeReplyRichTextDisplay.bind(this)
  }

  onChangeReplyRichTextDisplay () {
    this.setState({
      isReplyRichTextDisplay: !this.state.isReplyRichTextDisplay,
    })
  }

  render () {
    const { dispatch, currentIndex } = this.props
    const { author, content, create_at, id, is_uped, reply_id, ups } = this.props.data
    if (!author) {
      return (
        <div>
            is loading
        </div>

      )
    }

    return (
      <WingBlank size="sm">
        <WhiteSpace size="sm" />
        <Card className={styles.reply}>
          <Card.Header
            title={<div><span>{author.loginname}</span><span>{currentIndex + 1}</span><span>楼</span><span>{(new Date(create_at).format('yyyy-MM-dd'))}</span></div>}
            thumb={author.avatar_url}
            extra={<div>
              <Button onClick={function () { dispatch({ type: 'topicDetail/replyUps', payload: id }) }}>{ups.length}</Button>
              <Button onClick={this.onChangeReplyRichTextDisplay}>{this.state.isReplyRichTextDisplay ? '收起' : '回复'}</Button>
            </div>}
          />
          <Card.Body>
            <div className={styles.topicContent} dangerouslySetInnerHTML={{ __html: content }} />
            {this.state.isReplyRichTextDisplay ? <RichText dispatch={dispatch} reply_id={id} /> : ''}
          </Card.Body>
          {/* <Card.Footer content="footer content" extra={<div>extra footer content</div>} /> */}
        </Card>
        <WhiteSpace size="sm" />
      </WingBlank>
    )
  }
}

export default ReplyItem
