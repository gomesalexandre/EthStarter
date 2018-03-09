import React from 'react';
import PageLayout from '../../components/Layout';
import { Form, Input, Button, Card, Spin, Icon, notification } from 'antd';
import uuid from 'uuid/v1';

import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
class NewCampaign extends React.Component {
  constructor(props) {
    super(props);
    this.state = { newCampaigns: {}, loading: false, minWei: 0 }
  }
  handleSubmit = async e => {
    e.preventDefault();
    this.setState({loading: true});

    try {
      this.props.form.validateFields((err, values) =>{
        if (err) throw err;
        this.setState({minWei: values.minWei});
      });
      const campaignId = uuid();
      const accounts = await web3.eth.getAccounts();
      const newCampaign = await factory.methods.deployCampaign(this.state.minWei).send({from: accounts[0]});
      console.log('NEw campaign is', newCampaign);
      notification.success({
        message: 'New campaign created',
        description: `tx : ${newCampaign.transactionHash}`,
        icon: <Icon type="check" style={{ color: '#4CAF50' }} />,
      });
      this.state.newCampaigns[campaignId] = newCampaign;
    } catch(err) {
      notification.success({
        message: 'Tx failed',
        description: err.message,
      })
    } finally {
      this.setState({loading: false});
    }
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return(
        <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item>
            {getFieldDecorator('minWei', {
              rules: [{ required: true, message: 'Minimum Wei to contribute', whitespace: true }],
              })(<Input />)
            }
          </Form.Item>
          <Button type="primary" htmlType="submit">
          {this.state.loading ? <Icon type="loading" /> : 'Submit'}
          </Button>
        </Form>
        {/* { Object.keys(this.state.newCampaigns).map(key =>
          <Card title={this.state.newCampaigns[key]}>

          </Card>
        )} */}
        </div>
    );
  }
}
const NewCampaignForm = Form.create({})(NewCampaign);

export default () => (
  <PageLayout selected="new">
    <h3>Create a new campaign</h3>
      <NewCampaignForm/>
  </PageLayout>
);
