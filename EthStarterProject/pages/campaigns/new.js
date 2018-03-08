import React from 'react';
import PageLayout from '../../components/Layout';
import { Form, Input } from 'antd';

class NewCampaign extends React.Component {
  render() {
    return(
      <PageLayout>
        <h3>Create a new campaign</h3>
        <Form>
          <Form.Item>
            <Input placeholder="Minimuma amount"></Input>
          </Form.Item>
        </Form>
      </PageLayout>
    );
  }
}
export default NewCampaign
