import React, { Component } from 'react'
import { Link } from 'dva/router'
import { connect } from 'dva'
import PropTypes from 'prop-types'
// import { RefreshControl, ListView } from 'antd-mobile'
import styles from './ListItem.less'

class ListItem extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { data } = this.props
    return (
      <div>
        <div>{data.author.loginname}</div>
        <Link to={`/topic/${data.topic.id}`}>
          <div>{data.topic.title}</div>
        </Link>
      </div>
    )
  }
}

export default ListItem
