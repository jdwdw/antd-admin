import React, { Component } from 'react'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import PropTypes from 'prop-types'
import { Button, InputItem } from 'antd-mobile'
import styles from './index.less'

class MyPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      accesstokenValue: '',
    }
    this.onInputValueChange = this.onInputValueChange.bind(this)
  }

  onInputValueChange (value) {
    this.setState({
      accesstokenValue: value,
    })
  }

  render () {
    const { myPage, dispatch } = this.props
    let accesstokenValue = this.state.accesstokenValue
    console.log(localStorage.getItem('accesstoken'))
    if (localStorage.getItem('accesstoken')) {
      return (<Button onClick={function () { dispatch({ type: 'myPage/logout' }) }}>退出登录</Button>)
    }
    return (
      <div>
        <InputItem
          clear
          placeholder=" 输入帐号 "
          autoFocus
          onChange={value => this.onInputValueChange(value)}
        >
        帐号
        </InputItem>
        <Button onClick={function () { dispatch({ type: 'myPage/login', payload: { accesstoken: accesstokenValue } }) }}>登录</Button>
      </div>

    )
  }
}

MyPage.propTypes = {
  dispatch: PropTypes.func,
  myPage: PropTypes.object,
}

export default connect(({ myPage }) => ({ myPage }))(MyPage)
