import React from 'react';

import { Layout, Menu, Icon } from 'antd';
const { Header } = Layout;

export default () => (
  <div>
    <Header>
      <h1 style={{"color": "white"}}>EthStarter</h1>
    </Header>
    <Menu
    // onClick={this.handleClick}
    // selectedKeys={[this.state.current]}
    mode="horizontal"
    >
      <Menu.Item key="mail">
        <Icon type="file-add" />New Campaign
      </Menu.Item>
      <Menu.Item key="app" disabled>
        <Icon type="appstore" />Campaigns
      </Menu.Item>
    </Menu>
  </div>
);
