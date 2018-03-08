import React from 'react';
import PageLayout from '../../components/Layout';
import { Form, Input, Button, Card } from 'antd';
import uuid from 'uuid/v1';

import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
class NewCampaign extends React.Component {
  constructor(props) {
    super(props);
    this.state = { newCampaigns: {} }
  }
  handleSubmit = async e => {
    e.preventDefault();
    const campaignId = uuid();
    const accounts = await web3.eth.getAccounts();

    this.state.newCampaigns[campaignId] = {loading: true};

    console.log('New campaigns obj was first ', this.state.newCampaigns);

    const newCampaign = await factory.methods.deployCampaign('100').send({from: accounts[0]});

    console.log('New campaigns obj is', this.state.newCampaigns);
    this.state.newCampaigns[campaignId] = newCampaign;
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
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form>
        { Object.keys(this.state.newCampaigns).map(key =>
          <Card title={this.state.newCampaigns[key].loading ? "Loading" : this.state.newCampaigns[key]}>

          </Card>
        )}
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
