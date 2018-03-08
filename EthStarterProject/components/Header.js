import React from 'react';

import { Layout, Menu, Icon } from 'antd';
const { Header } = Layout;

export default (props) => (
  <div>
    <Header>
      <h1 style={{"color": "white"}}>EthStarter</h1>
    </Header>
    <Menu
    // onClick={this.handleClick}
    selectedKeys={[props.selected]}
    mode="horizontal"
    >
      <Menu.Item key="new">
        <Icon type="file-add" />New Campaign
      </Menu.Item>
      <Menu.Item key="campaigns">
        <Icon type="appstore" />Campaigns
      </Menu.Item>
    </Menu>
  </div>
);
