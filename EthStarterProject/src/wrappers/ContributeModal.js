import React from 'react';
import PropTypes from 'prop-types';
import { Modal, List, Card, Icon } from 'antd';

const ContributeModal = props => (
  <Modal
    width={'80%'}
    visible={true}
    title="New Contribution"
    onOk={props.handleContributeOk}
    // onCancel={props.handleContributeCancel}
    okText={props.loading ? <Icon type="loading" /> : 'Contribute'}
  >
    <List
      grid={{ gutter: 16, column: 3 }}
      dataSource={[
        {
          title: 'Value',
          content: props.newContribution.value,
        },
      ]}
      renderItem={item => (
        <List.Item>
          <Card title={item.title}>{item.content}</Card>
        </List.Item>
      )}
    />
  </Modal>
);

export default ContributeModal;
