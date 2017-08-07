import React, { Component } from 'react'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import PropTypes from 'prop-types'
import { Button, InputItem } from 'antd-mobile'
import ReplyItem from './components/ReplyItem'
import RichText from './components/RichText'
import styles from './index.less'

class TopicDetail extends Component {
  constructor (props) {
    super(props)
  }


  render () {
    const { dispatch } = this.props
    if (!this.props.topicDetail.topicData.author) {
      return (
        <div>
            is loading
        </div>

      )
    }
    const { top, title, create_at, last_reply_at, tab, is_collect, reply_count, replies, content, visit_count, author } = this.props.topicDetail.topicData
    return (
      <div>
          topicDetail
        <div className={styles.topicHeader}>
          <div className={'topicHeaderTitle'}>
            {top ? <div>置顶</div> : ''}
            <div>{title}</div>
          </div>
          <div className={'topicHeaderDetail'}>
            <span>*发布于</span><span>{(new Date(create_at).format('yyyy-MM-dd'))}</span>
            <span>*作者</span><span>{author.loginname}</span>
            <span>*</span><span>{visit_count}</span><span>次浏览</span>
            <span>*最后一次编辑</span><span>{(new Date(last_reply_at).format('yyyy-MM-dd'))}</span>
            <span>*来自</span><span>{tab}</span>
          </div>
          <Button onClick={is_collect ? function () { dispatch({ type: 'topicDetail/deCollect' }) } : function () { dispatch({ type: 'topicDetail/collect' }) }} >{is_collect ? '取消收藏' : '收藏'}</Button>
        </div>
        <div className={styles.topicContent} dangerouslySetInnerHTML={{ __html: content }} />
        <div className={styles.topicReplies}>
          <div>{reply_count}<span>回复</span></div>
          { replies.map((value, index) => {
            return (
              // <div />
              <ReplyItem data={value} dispatch={dispatch} currentIndex={index} />
            )
          })}
          <RichText dispatch={dispatch} />
        </div>
      </div>

    )
  }
}


export default connect(({ topicDetail }) => ({ topicDetail }))(TopicDetail)
