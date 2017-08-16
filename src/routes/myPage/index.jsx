import React, { Component } from 'react'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import PropTypes from 'prop-types'
import { Button, InputItem, ImagePicker } from 'antd-mobile'
import AvatarPicker from '../../components/AvatarPicker/AvatarPicker'
import styles from './index.less'


const data = [{
  url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
  id: '2121',
}, {
  url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
  id: '2122',
}]

class ImagePickerExample extends React.Component {
  state = {
    files: data,
  };
  onChange = (files, type, index) => {
    console.log(files, type, index)
    this.setState({
      files,
    })
  };
  onAddImageClick = (e) => {
    e.preventDefault()
    this.setState({
      files: this.state.files.concat({
        url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
        id: '3',
      }),
    })
  };
  onTabChange = (key) => {
    console.log(key)
  };
  render () {
    const { files } = this.state
    return (
      <div>
        <ImagePicker
          files={files}
          onChange={this.onChange}
          onImageClick={(index, fs) => console.log(index, fs)}
          selectable={files.length < 1}
          onAddImageClick={this.onAddImageClick}
        />
      </div>
    )
  }
}


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
    if (localStorage.getItem('accesstoken')) {
      return (
        <div>
          <Button onClick={function () { dispatch({ type: 'myPage/gotoTopicCreator' }) }}>创建主题</Button>
          <ImagePickerExample />
          <span>22</span>
          <AvatarPicker />
          <span>2</span>
          <AvatarPicker />
          <span>22</span>
          <Button onClick={function () { dispatch({ type: 'myPage/logout' }) }}>退出登录</Button>
        </div>
      )
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
