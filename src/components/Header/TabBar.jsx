import React, { Component } from 'react'
import { routerRedux } from 'dva/router'
import PropTypes from 'prop-types'
import { TabBar, Button } from 'antd-mobile'
import styles from './TabBar.less'

const TabBarItem = TabBar.Item

class TabBarComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedTab: 'index',
    }
    this.handleChangeRoute = this.handleChangeRoute.bind(this)
  }

  handleChangeRoute (dispatch) {
    dispatch({ type: 'index/changeRoute' })
  }

  render () {
    let children = this.props.children
    return (
      <div className={styles.TabBar}>
        <TabBar unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
        >
          <TabBarItem
            title="首页"
            key="首页"
            icon={<div style={{
              width: '0.44rem',
              height: '0.44rem',
              background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  0.42rem 0.42rem no-repeat' }}
            />
            }
            selectedIcon={<div style={{
              width: '0.44rem',
              height: '0.44rem',
              background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  0.42rem 0.42rem no-repeat' }}
            />
            }
            selected={this.state.selectedTab === 'index'}
            onPress={() => {
              this.setState({
                selectedTab: 'index',
              })
              this.props.onChangeRoute('/homePage')
            }}
            data-seed="logId"
          >
            {children}
          </TabBarItem>
          <TabBarItem
            title="收藏"
            key="收藏"
            icon={<div style={{
              width: '0.44rem',
              height: '0.44rem',
              background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  0.42rem 0.42rem no-repeat' }}
            />
            }
            selectedIcon={<div style={{
              width: '0.44rem',
              height: '0.44rem',
              background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  0.42rem 0.42rem no-repeat' }}
            />
            }
            selected={this.state.selectedTab === 'collect'}
            onPress={() => {
              this.setState({
                selectedTab: 'collect',
              })
              this.props.onChangeRoute('/dashboard')
            }}
          >
            {children}
          </TabBarItem>
          <TabBarItem
            title="消息"
            key="消息"
            icon={<div style={{
              width: '0.44rem',
              height: '0.44rem',
              background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  0.42rem 0.42rem no-repeat' }}
            />
            }
            selectedIcon={<div style={{
              width: '0.44rem',
              height: '0.44rem',
              background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  0.42rem 0.42rem no-repeat' }}
            />
            }
            selected={this.state.selectedTab === 'message'}
            onPress={() => {
              this.setState({
                selectedTab: 'message',
              })
              this.props.onChangeRoute('/UIElement/dropOption')
            }}
          >
            {children}
          </TabBarItem>
          <TabBarItem
            title="我的"
            key="我的"
            icon={<div style={{
              width: '0.44rem',
              height: '0.44rem',
              background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  0.42rem 0.42rem no-repeat' }}
            />
            }
            selectedIcon={<div style={{
              width: '0.44rem',
              height: '0.44rem',
              background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  0.42rem 0.42rem no-repeat' }}
            />
            }
            selected={this.state.selectedTab === 'my'}
            onPress={() => {
              this.setState({
                selectedTab: 'my',
              })
              this.props.onChangeRoute('/myPage')
            }}
          >
            {children}
          </TabBarItem>
        </TabBar>
      </div>
    )
  }
}

TabBarComponent.propTypes = {
  children: PropTypes.element.isRequired,
  onChangeRoute: PropTypes.func.isRequired,
}

export default TabBarComponent
