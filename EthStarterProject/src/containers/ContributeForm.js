import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Select, Input, Icon } from 'antd';

class ContributeForm extends React.Component {
  getinitialProps() {
    return({ loading: false, form: '', minEth: 0 });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return(
      <Form onSubmit={this.handleSubmit}>
        <Form.Item>
          <span>
            {getFieldDecorator('minEth', {
              rules: [{ required: true, message: 'Amount to contribute', whitespace: true }],
            })(<Input />)
            }
            <Select
              value={this.props.currency || 'ether'}
              size={2}
              style={{ width: '32%' }}
            >
              <Select.Option value="wei">wei</Select.Option>
              <Select.Option value="ether">ether</Select.Option>
            </Select>
          </span>
        </Form.Item>
        <Button type="primary" htmlType="submit">
          {this.props.loading ? <Icon type="loading" /> : 'Submit'}
        </Button>
      </Form>
    );
  }
}

ContributeForm.propTypes = {
  form: PropTypes.object,
  currency: PropTypes.string,
  loading: PropTypes.bool,
};
const GeneratedContributeForm = Form.create({})(ContributeForm);

export default () => (
  <div>
    <h3>Contribute to Campaign</h3>
    <GeneratedContributeForm/>
  </div>
);
