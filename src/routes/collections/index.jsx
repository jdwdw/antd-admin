import React, { Component } from 'react'
import { Link } from 'dva/router'
import { connect } from 'dva'
import PropTypes from 'prop-types'
import { Grid } from 'antd-mobile'
import styles from './index.less'

class Collections extends Component {
  constructor (props) {
    super(props)
  }


  render () {
    const { dispatch } = this.props
    if (this.props.collections.collectionsData.length <= 0) {
      return (
        <div>
            is loading
        </div>

      )
    }
    const { collectionsData } = this.props.collections
    const dataSource = collectionsData.map((value) => {
      return (
        {
          icon: value.author.avatar_url,
          text: value.title,
          id: value.id,
        }
      )
    })
    return (
      <div>
        <Grid data={dataSource} isCarousel onClick={_el => dispatch({ type: 'collections/goToTopicRoute', payload: _el.id })} />
      </div>
    )
  }
}


export default connect(({ collections }) => ({ collections }))(Collections)
