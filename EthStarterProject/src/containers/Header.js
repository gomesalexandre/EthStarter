import React from 'react';

import { Layout, Menu, Icon } from 'antd';
const { Header } = Layout;

export default (props) => (
  <div>
    <Header className="header">
      <h1 style={{ "color": "white" }}>EthStarter</h1>
    </Header>
    <Menu
    // onClick={this.handleClick}
    selectedKeys={[props.selected]}
    mode="horizontal"
    >
      <Menu.Item key="new">
       <a href="/campaign/new"><Icon type="file-add" />New Campaign</a>
      </Menu.Item>
      <Menu.Item key="campaigns">
        <a href="/" ><Icon type="appstore" />Campaigns</a>
      </Menu.Item>
    </Menu>
  </div>
);
