import React, { Component } from 'react'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import PropTypes from 'prop-types'
import { Tabs, WhiteSpace, Badge } from 'antd-mobile'
import ListComponent from './components/List'
import styles from './index.less'

const TabPane = Tabs.TabPane

class HomePage extends Component {
  constructor (props) {
    super(props)
  }


  render () {
    const List = connect(({ listAll }) => ({ listAll }))(ListComponent)
    const ListAsk = connect(({ listAsk }) => ({ listAsk }))(ListComponent)
    const ListGood = connect(({ listGood }) => ({ listGood }))(ListComponent)
    const ListJob = connect(({ listJob }) => ({ listJob }))(ListComponent)
    const ListShare = connect(({ listShare }) => ({ listShare }))(ListComponent)
    return (
      <Tabs defaultActiveKey="0" onChange={function (key) { console.log(key) }} onTabClick={function (key) { console.log(key) }} swipeable="false" >
        <TabPane tab="全部" key="0">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '10rem', backgroundColor: '#fff' }}>
            {<List requestKey={'listAll'} />}
          </div>
        </TabPane>
        <TabPane tab="精华" key="1">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '10rem', backgroundColor: '#fff' }}>
            {<ListGood requestKey={'listGood'} />}
          </div>
        </TabPane>
        <TabPane tab="分享" key="2">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '10rem', backgroundColor: '#fff' }}>
            {<ListShare requestKey={'listShare'} />}
          </div>
        </TabPane>
        <TabPane tab="问答" key="3">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '10rem', backgroundColor: '#fff' }}>
            {<ListAsk requestKey={'listAsk'} />}
          </div>
        </TabPane>
        <TabPane tab="招聘" key="4">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '10rem', backgroundColor: '#fff' }}>
            {<ListJob requestKey={'listJob'} />}
          </div>
        </TabPane>
      </Tabs>

    )
  }
}

HomePage.propTypes = {

}

export default HomePage
