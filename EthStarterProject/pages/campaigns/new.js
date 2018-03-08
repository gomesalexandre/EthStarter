import React from 'react';
import PageLayout from '../../components/Layout';
import { Form, Input, Button, Card, Spin, Icon, notification } from 'antd';
import uuid from 'uuid/v1';

import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
class NewCampaign extends React.Component {
  constructor(props) {
    super(props);
    this.state = { newCampaigns: {}, loading: false }
  }
  handleSubmit = async e => {
    e.preventDefault();
    this.setState({loading: true});

    try {
      const campaignId = uuid();
      const accounts = await web3.eth.getAccounts();
      const newCampaign = await factory.methods.deployCampaign('100').send({from: accounts[0]});
      notification.success({
        message: 'New campaign created',
        description: 'You are in the future',
      });
      this.state.newCampaigns[campaignId] = newCampaign;
      console.log(newCampaigns);
    } catch(err) {
      notification.success({
        message: err.message,
        description: 'You are in the future but the tx failed, sorry :(',
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
  <PageLayout>
    <h3>Create a new campaign</h3>
      <NewCampaignForm/>
  </PageLayout>
);
