import React from 'react';
import { getVisibleSelector, getCampaignSelector, getNewRequestSelector, getAccountsSelector } from '../../src/store/selectors';
import Router from 'next/router';
import PropTypes from 'prop-types';
import web3 from '../../src/ethereum/web3';
import { Card, Button, Layout, Menu, Form, Input, notification, Icon } from 'antd';
import { nextConnect } from '../../src/store/initStore';
import { createRequest, getAccounts, getCampaignSummary, makeVisible, makeInvisible } from '../../src/actions';
import { PageLayout } from '../../src/containers';
import { RequestModal, BreadCrumb } from '../../src/wrappers';

class Campaign extends React.Component {
  constructor(props) {
    super(props);
  }

  static getInitialProps ({ store, query }) {
    store.dispatch({ type: 'GET_INITIAL_PROPS' });
    return { query };
  }

  async componentWillMount() {
    await this.props.dispatch(getCampaignSummary(this.props.query.address));
    await this.props.dispatch(getAccounts(web3));
  }
  showRequestForm() {
    this.props.dispatch(makeVisible('requestCard'));
  }
  // showContributeForm() {
  //   this.setState({isContributeCardVisible: true, });
  // }
  showRequestModal() {
    try {
      this.props.form.validateFields((err, values) => {
        this.props.dispatch({
          type: 'PREPARE_REQUEST',
          payload: {
            requestDescription: values.requestDescription,
            requestRecipient: values.requestRecipient,
            requestValue: values.requestValue,
          },
        });

        this.props.dispatch(makeVisible('requestModal'));
      });
    } catch(e) {throw e;}
  }
  hideRequestModal() {
    this.props.dispatch(makeInvisible('requestModal'));
  }
  async handleRequestOk() {
    try {
      await this.props.dispatch(createRequest(this.props.campaign.address, this.props.newRequest, this.props.accounts[0]));

      notification.success({
        message: 'New request created',
        description: 'Reload page',
        icon: <Icon type="check" style={{ color: '#4CAF50' }} />,
      });

      Router.push(`/campaign/${this.props.address}`);
    } catch(e) {
      notification.error({
        message: 'Tx failed',
        description: e.message,
      });
    }
  }

  render(){
    console.log('New state is', this.props);
    const { getFieldDecorator } = this.props.form;
    const { loading, newRequest } = this.props;

    return(
      <div className="campaign">
        <PageLayout style={{ height:"100vh" }}>
          <RequestModal
            isRequestModalVisible={this.props.visible.requestModal}
            handleRequestOk={() => this.handleRequestOk()}
            handleRequestCancel={() => this.hideRequestModal()}
            loading={loading}
            newRequest={newRequest}
          />
          <div className="campaign-breadcrumb">
            <BreadCrumb path={[
              { title: 'Campaigns', url: 'http://foo.bar' },
              { title: this.props.query.address, url:'http://foo.bar' },
            ]} />
          </div>
          <Layout style={{ margin: "auto", width: "90%" }}>
            <Layout.Sider width={200} style={{ background: '#fff' }}>
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%' }}
              >
                {/* <Menu.SubMenu key="requests" requests={() => this.props.requests}title={<span>Requests</span>}>
                      {[1,2,].map((x,i) => ( //TODO: Get actual requests !
                        <Menu.Item key={i} >Request number here</Menu.Item>
                      ))}
                    </Menu.SubMenu> */}
              </Menu>
            </Layout.Sider>
            <Layout.Content>
              {this.props.campaign.minimumContribution &&
                  <Card title="Campaign">
                    <Button type={this.props.visible.requestCard ? "primary" : "secondary"} icon="file" onClick={() => this.showRequestForm()}>Create new request</Button>
                    {/* <Button type="secondary" icon="file" onClick={() => this.showContributeForm()}>Contribute</Button> */}
                    {this.props.visible.requestCard &&
                      <Card type="inner" title="New request">
                        <Form layout="inline">
                          <Form.Item label= "Description">
                            {getFieldDecorator('requestDescription', {
                              rules: [{ required: true, whitespace: true }],
                            })(<Input />)
                            }
                          </Form.Item>
                          <Form.Item label= "Value">
                            {getFieldDecorator('requestValue', {
                              rules: [{ required: true, whitespace: true }],
                            })(<Input />)
                            }
                          </Form.Item>
                          <Form.Item label= "Recipient">
                            {getFieldDecorator('requestRecipient', {
                              rules: [{ required: true, whitespace: true }],
                            })(<Input />)
                            }
                          </Form.Item>
                          <Button type="primary" onClick={() => this.showRequestModal()}>Request</Button>
                        </Form>
                      </Card>
                    }
                    <Card type="inner" title="Address">{this.props.campaign.address}</Card>
                    <Card type="inner" title="Minimum Contribution">
                      {this.props.campaign.minimumContribution} wei ({web3.utils.fromWei(this.props.campaign.minimumContribution, 'ether')} ethers)
                    </Card>
                    <Card type="inner" title="Manager">{this.props.campaign.manager}</Card>
                    <Card type="inner" title="Contributers">{this.props.campaign.approversCount}</Card>
                    {/* <Card type="inner" title="Requests">{this.props.campaign.requests}</Card> */}
                  </Card>
              }
            </Layout.Content>
          </Layout>
        </PageLayout>
      </div>
    );}
}
Campaign.propTypes = {
  visible: PropTypes.bool,
  dispatch: PropTypes.func,
  query: PropTypes.object,
  form: PropTypes.object,
  campaign: PropTypes.object,
  newRequest: PropTypes.object,
  accounts: PropTypes.array,
  loading: PropTypes.bool,
  address: PropTypes.string,

};
const ParsedCampaign = Form.create({})(Campaign);

export default nextConnect(state => ({
  visible: getVisibleSelector(state),
  campaign: getCampaignSelector(state),
  newRequest: getNewRequestSelector(state),
  accounts: getAccountsSelector(state),
}))(ParsedCampaign);
