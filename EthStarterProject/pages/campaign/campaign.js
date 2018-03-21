import React from 'react';
import { Card, Breadcrumb, Tag, Row, Col, Button, Modal, Layout, Menu, Form, Input, InputNumber, List, Icon, notification, } from 'antd';
import { nextConnect, } from '../../store/initStore';
import web3 from '../../ethereum/web3';
import CampaignInstance from '../../ethereum/campaign';
import PageLayout from '../../components/Layout';
import ContributeForm from '../../components/ContributeForm';
import Router from 'next/router';

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
    loading: false,
  }

  static async getInitialProps ({query,}) {
    const campaignInstance = CampaignInstance(query.address);
    const campaignSummary = await campaignInstance.methods.getSummary().call();
    return({
      address: query.address,
      balance: campaignSummary[0],
      minimumContribution: campaignSummary[1],
      manager: campaignSummary[2],
      approversCount: campaignSummary[3],
      requests: campaignSummary[4],
      campaignInstance: campaignInstance,
    });
  }
  showRequestForm() {
    this.setState({isRequestCardVisible: true,});
  }
  showContributeForm() {
    this.setState({isContributeCardVisible: true, });
  }
  showRequestModal(data) {
    this.setState({isRequestModalVisible: true,});

    try {
      this.props.form.validateFields((err, values) =>{
        this.setState({
          requestDescription: values.requestDescription,
          requestRecipient: values.requestRecipient,
          requestValue: values.requestValue,
        });
      });
    } catch(e) {throw e;}
  }
  async handleRequestOk() {
    this.setState({loading: true,});

    try {
      const accounts = await web3.eth.getAccounts();
      const campaignInstance = await CampaignInstance(this.props.address);
      const result = await campaignInstance.methods
        .createRequest(this.state.requestDescription, this.state.requestValue, this.state.requestRecipient)
        .send({from: accounts[0],});

      notification.success({
        message: 'New request created',
        description: 'Reload page',
        icon: <Icon type="check" style={{ color: '#4CAF50', }} />,
      });

      Router.push(`/campaign/${this.props.address}`);
    } catch(e) {
        notification.error({
          message: 'Tx failed',
          description: e.message,
        });
    } finally { this.setState({loading: false,}); }
  }
  render(){
    const { getFieldDecorator, } = this.props.form;

    return(
      <PageLayout>
        <Modal
        visible={this.state.isRequestModalVisible}
        title="New Request"
        onOk={() => this.handleRequestOk()}
        okText={this.state.loading ? <Icon type="loading" /> : 'Request'}
        >
         <List
        grid={{ gutter: 16, column: 3, }}
        dataSource={[
          {
            title: 'Value',
            content: this.state.requestValue,
          },
          {
            title: 'Description',
            content: this.state.requestDescription,
          },
          {
            title: 'Recipient',
            content: this.state.requestRecipient,
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
                  <Menu.SubMenu key="requests" requests={() => this.props.requests}title={<span>Requests</span>}>
                    {[1,2,].map((x,i) => (
                      <Menu.Item >Request {this.props.requests}</Menu.Item>
                    ))}
                  </Menu.SubMenu>
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
                  <Card type="inner" title="Address">{this.props.address}</Card>
                  <Card type="inner" title="Minimum Contribution">
                    {this.props.minimumContribution} wei ({web3.utils.fromWei(this.props.minimumContribution, 'ether')} ethers)
                  </Card>
                  <Card type="inner" title="Manager">{this.props.manager}</Card>
                  <Card type="inner" title="Contributers">{this.props.approversCount}</Card>
                  <Card type="inner" title="Requests">{this.props.requests}</Card>
                </Card>
              </Layout.Content>
            </Layout>
      </PageLayout>
    );}
}
const ParsedCampaign = Form.create({})(Campaign);
export default nextConnect(state => state)(ParsedCampaign);
