import React from 'react';
import { nextConnect } from '../store/initStore';
import { getCurrentAccount } from '../actions';
import web3 from '../ethereum/web3';

import { Layout, Menu, Icon, Row, Col, notification } from 'antd';
const { Header } = Layout;

class PageHeader extends React.Component {
  async componentDidMount() {
    this.props.dispatch(await getCurrentAccount(web3))
      .catch(e => notification.error({
        message: e.message,
        description: 'Are you sure metmask is installed and unlocked ?',
        duration: 0,
        }));
  }
  render() {
    return (
      <div>
        <Header className="header">
          <div className="header-container">
            <Row type="flex" justify="space-between">
              <Col span={6}>
                <h1 style={{ "color": "white" }} className="header-title">EthStarter</h1>
              </Col>
              <Col span={6}>
                <span className="header-userbar">
                  <span className="header-userbar--address">{this.props.web3CurrentAccount && `Hello ${this.props.web3CurrentAccount}`}</span>
              </span>
              </Col>
            </Row>
          </div>
        </Header>
        <Menu
        selectedKeys={[this.props.selected]}
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
  }
}

export default nextConnect(state => state)(PageHeader);
