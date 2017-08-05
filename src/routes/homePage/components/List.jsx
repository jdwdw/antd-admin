import React, { Component } from 'react'
import { Link } from 'dva/router'
import { connect } from 'dva'
import PropTypes from 'prop-types'
import { RefreshControl, ListView } from 'antd-mobile'
import styles from './List.less'

function MyBody (props) {
  return (
    <div className="am-list-body my-body">
      <span style={{ display: 'none' }}>you can custom body wrap element</span>
      {props.children}
    </div>
  )
}


class List extends Component {
  constructor (props) {
    super(props)

    this.onEndReached = this.onEndReached.bind(this)
    this.onRefresh = this.onRefresh.bind(this)
  }

  onEndReached () {
    const dispatch = this.props.dispatch
    const payload = this.props.requestKey
    let key = this.props.requestKey
    key = `${key}/concatTopics`
    dispatch({ type: key, payload })
  }

  onRefresh () {
    const dispatch = this.props.dispatch
    const payload = this.props.requestKey
    let key = this.props.requestKey
    key = `${key}/refreshTopics`
    dispatch({ type: key, payload })
  }

  render () {
    let key = this.props.requestKey
    const separator = () => (
      <div style={{
        backgroundColor: '#F5F5F9',
        height: 8,
        borderTop: '1px solid #ECECED',
        borderBottom: '1px solid #ECECED',
      }}
      />
    )
    const row = (rowData) => {
      return (
        <div>
          <img src={rowData.author.avatar_url} style={{ height: '1rem', width: '1rem' }} />
          <Link to={`/topic/${rowData.id}`}>
            <div style={{ 'font-size': '0.4rem' }}>{rowData.title}</div>
          </Link>
        </div>
      )
    }

    const ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    })

    const dataSource = ds.cloneWithRows(this.props[key].dataSource)
    return (
      <div style={{ margin: '0 auto', width: '96%' }}>
        <ListView
          dataSource={dataSource}
          renderHeader={() => <span>header</span>}
          renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }} />)}

          renderBodyComponent={() => <MyBody />}
          renderRow={row}
          renderSeparator={separator}
          className="fortest"
          style={{
            height: '400px',
            overflow: 'auto',
            border: '1px solid #ddd',
            margin: '0.1rem 0',
          }}
          pageSize={20}
          onScroll={() => { console.log('scroll') }}
          scrollRenderAheadDistance={500}
          scrollEventThrottle={200}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={10}
          scrollerOptions={{ scrollbars: true }}
          refreshControl={<RefreshControl refreshing={this.props[key].refreshing} onRefresh={this.onRefresh} />}
        />
      </div>

    )
  }
}

List.propTypes = {

}

export default List
// export default connect(({ listAll }) => ({ listAll }))(List)
