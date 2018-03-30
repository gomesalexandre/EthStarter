import React from 'react';
import PropTypes from 'prop-types';
import { nextConnect } from '../store/initStore';
import { getCurrentAccount, getNetwork } from '../actions';
import web3 from '../ethereum/web3';

import { Layout, Menu, Icon, Row, Col, notification, Tag } from 'antd';
const { Header } = Layout;

class PageHeader extends React.Component {
  componentDidMount() {
    this.props.dispatch(getCurrentAccount(web3))
      .catch(e => notification.error({
        message: e.message,
        description: 'Are you sure metmask is installed and unlocked ?',
        duration: 0,
        }));
    this.props.dispatch(getNetwork(web3))
      .catch(e => notification.error({
        message: e.message,
        description: 'Are you sure metmask is installed and unlocked ?',
        duration: 0,
        }));
    }
  render() {
    return (
      <React.Fragment>
        <Header className="header">
          <div className="header-container">
            <Row type="flex" justify="space-between">
              <Col span={6}>
                <h1 style={{ "color": "white" }} className="header-title">EthStarter</h1>
              </Col>
              <Col span={12}>
                <span className="header-userbar">
                  <span className="header-userbar--address">{this.props.web3CurrentAccount &&
                    <span>
                      <Icon type="user" />
                      <Tag color="#87d068" className="header-userbar--address--tag">
                        <a href={`http://rinkeby.etherscan.io/address/${this.props.web3CurrentAccount}`}>
                          {this.props.web3CurrentAccount}
                        </a>
                      </Tag>
                    </span>
                    }
                  </span>
                  <span className="header-userbar--network">{this.props.web3CurrentNetwork &&
                    <Tag color="green" className="header-userbar--network--tag">
                      {this.props.web3CurrentNetwork}
                    </Tag>
                    }
                  </span>
              </span>
              </Col>
            </Row>
          </div>
        </Header>
        <div className="navbar">
          <Menu
          selectedKeys={[this.props.selected]}
          mode="horizontal"
          className="navbar-menu"
          >
            <Menu.Item key="new">
              <a href="/campaign/new"><Icon type="file-add" />New Campaign</a>
            </Menu.Item>
            <Menu.Item key="campaigns">
              <a href="/" ><Icon type="appstore" />Campaigns</a>
            </Menu.Item>
          </Menu>
        </div>
      </React.Fragment>
    );
  }
}

PageHeader.propTypes = {
  dispatch: PropTypes.func,
  selected: PropTypes.obj,
  web3CurrentAccount: PropTypes.string,
};
export default nextConnect(state => state)(PageHeader);
