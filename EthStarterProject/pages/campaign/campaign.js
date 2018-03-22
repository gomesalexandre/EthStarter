import React from 'react';
import { Card, Breadcrumb, Tag, Row, Col, Button, Modal, Layout, Menu, Form, Input, InputNumber, List, Icon, notification, } from 'antd';
import { nextConnect, } from '../../store/initStore';
import web3 from '../../ethereum/web3';
import CampaignInstance from '../../ethereum/campaign';
import { createRequest, } from '../../actions/createRequestAsync';
import { getAccounts, } from '../../actions/addAccountsAsync';
import PageLayout from '../../components/Layout';
import ContributeForm from '../../components/ContributeForm';
import Router from 'next/router';
import { getCampaignSummary, } from '../../actions/getCampaignSummaryAsync';

class Campaign extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    isRequestModalVisible: false,
    isContributeCardVisible: false,
    requestDescription: '',
    requestRecipient: '',
    requestValue: 0,
  }

  static getInitialProps ({ store, query, }) {
    store.dispatch({ type: 'GET_INITIAL_PROPS', });
    return { query, };
  }

  async componentDidMount() {
    await this.props.dispatch(getCampaignSummary(this.props.query.address));
    await this.props.dispatch(getAccounts(web3));
  }
  showRequestForm() {
    this.setState({isRequestCardVisible: true,});
  }
  showContributeForm() {
    this.setState({isContributeCardVisible: true, });
  }
  showRequestModal(data) {
    try {
      this.props.form.validateFields((err, values) =>{
        this.props.dispatch({
          type: 'SET_REQUEST_IN_STORE',
          payload: {
            requestDescription: values.requestDescription,
            requestRecipient: values.requestRecipient,
            requestValue: values.requestValue,
          },
        });

        this.setState({isRequestModalVisible: true,});
      });
    } catch(e) {throw e;}
  }
  async handleRequestOk() {
    await this.props.dispatch(createRequest(this.props.campaign.address, this.props.newRequest, this.props.accounts[0]));
  }

  render(){
    console.log('props are', this.props);
    const { getFieldDecorator, } = this.props.form;

    return(
      <PageLayout>
        <Modal
        visible={this.state.isRequestModalVisible}
        title="New Request"
        onOk={() => this.handleRequestOk()}
        okText={this.props.loading ? <Icon type="loading" /> : 'Request'}
        >
         <List
        grid={{ gutter: 16, column: 3, }}
        dataSource={[
          {
            title: 'Value',
            content: this.props.newRequest ? this.props.newRequest.value : '' ,
          },
          {
            title: 'Description',
            content: this.props.newRequest ? this.props.newRequest.description : '' ,
          },
          {
            title: 'Recipient',
            content: this.props.newRequest ? this.props.newRequest.recipient : '',
          },
        ]}
        renderItem={item => (
          <List.Item>
            <Card title={item.title}>{item.content}</Card>
          </List.Item>
        )}
        />
        </Modal>
          <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item><a href="">Campaigns</a></Breadcrumb.Item>
            <Breadcrumb.Item>{this.props.address}</Breadcrumb.Item>
          </Breadcrumb>
            <Layout style={{"padding": "0 50px",}}>
             <Layout.Sider width={200} style={{ background: '#fff', }}>
                <Menu
                  mode="inline"
                  defaultSelectedKeys={['1',]}
                  defaultOpenKeys={['sub1',]}
                  style={{ height: '100%', }}
                >
                  {/* <Menu.SubMenu key="requests" requests={() => this.props.requests}title={<span>Requests</span>}>
                    {[1,2,].map((x,i) => ( //TODO: Get actual requests !
                      <Menu.Item key={i} >Request number here</Menu.Item>
                    ))}
                  </Menu.SubMenu> */}
                </Menu>
              </Layout.Sider>
              <Layout.Content>
                <Card title="Campaign">
                  <Button type={this.state.isRequestCardVisible ? "primary" : "secondary"} icon="file" onClick={() => this.showRequestForm()}>Create new request</Button>
                  <Button type="secondary" icon="file" onClick={() => this.showContributeForm()}>Contribute</Button>
                  { this.state.isRequestCardVisible &&
                    <Card type="inner" title="New request">
                      <Form layout="inline">
                        <Form.Item label= "Description">
                          {getFieldDecorator('requestDescription', {
                            rules: [{ required: true, whitespace: true, },],
                            })(<Input />)
                          }
                        </Form.Item>
                        <Form.Item label= "Value">
                        {getFieldDecorator('requestValue', {
                            rules: [{ required: true, whitespace: true, },],
                            })(<Input />)
                        }
                        </Form.Item>
                        <Form.Item label= "Recipient">
                        {getFieldDecorator('requestRecipient', {
                            rules: [{ required: true, whitespace: true, },],
                            })(<Input />)
                        }
                        </Form.Item>
                        <Button type="primary" onClick={() => this.showRequestModal()}>Request</Button>
                      </Form>
                    </Card>
                  }
                  <Card type="inner" title="Address">{this.props.campaign.address}</Card>
                  <Card type="inner" title="Minimum Contribution">
                    {this.props.campaignminimumContribution} wei ({web3.utils.fromWei(this.props.campaign.minimumContribution, 'ether')} ethers)
                  </Card>
                  <Card type="inner" title="Manager">{this.props.campaign.manager}</Card>
                  <Card type="inner" title="Contributers">{this.props.campaign.approversCount}</Card>
                  {/* <Card type="inner" title="Requests">{this.props.campaign.requests}</Card> */}
                </Card>
              </Layout.Content>
            </Layout>
      </PageLayout>
    );}
}

const ParsedCampaign = Form.create({})(Campaign);
export default nextConnect(state => state)(ParsedCampaign);
