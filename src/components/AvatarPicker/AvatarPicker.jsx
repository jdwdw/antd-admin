import React, { Component } from 'react'
import RcUpload from 'rc-upload'
import PropTypes from 'prop-types'
import { Button } from 'antd-mobile'
import styles from './AvatarPicker.less'

class AvatarPicker extends Component {
  constructor (props) {
    super(props)
    this.state = {

    }
    // this.handleChange = this.handleChange.bind(this)
    // this.onProgress = this.onProgress.bind(this)
  }

  componentWillMount () {
    if (this.props.imageUrl) {
      this.setState({
        imageUrl: this.props.imageUrl,
      })
    }
  }


  // TODO handleChange应该在onSuccess中调用
  onProgress=(event, file) => {
    this.handleChange(file)
  }

  handleChange=(file) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => this.setState({ imageUrl: reader.result }))
    reader.readAsDataURL(file)
  }


  render () {
    const imageUrl = this.state.imageUrl
    console.log(this.handleChange)
    const uploaderProps = {
      action: '',
      data: { a: 1, b: 2 },
      headers: {
        Authorization: 'xxxxxxx',
      },
      multiple: true,
      beforeUpload (file) {
        console.log('beforeUpload', file.name)
      },
      onStart: (file) => {
        console.log('onStart', file.name)
        // this.refs.inner.abort(file);
      },
      onSuccess (file) {
        console.log('onSuccess', file)
      },
      // onProgress (step, file) {
      //   console.log('onProgress', Math.round(step.percent), file.name)
      //   console.log(this)
      //   this.handleChange(file)
      // },
      onProgress: this.onProgress,
      onError (err) {
        console.log('onError', err)
      },
    }
    return (
      <div className={styles.AvatarPicker}>
        <RcUpload {...uploaderProps} ><img className="imgChosen" src={imageUrl || 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502884358739&di=596fc9ccac6a6e20991ba55f6e466258&imgtype=0&src=http%3A%2F%2Fpic.962.net%2Fup%2F2017-7%2F14999154663088331.png'} /></RcUpload>
      </div>
    )
  }
}

export default AvatarPicker
