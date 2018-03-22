import React from 'react';
import PropTypes from 'prop-types';
import { Modal, List, Card, Icon, } from 'antd';

const RequestModal = props => (
  <Modal
          visible={props.isRequestModalVisible}
          title="New Request"
          onOk={props.handleRequestOk}
          okText={props.loading ? <Icon type="loading" /> : 'Request'}
          >
          <List
          grid={{ gutter: 16, column: 3, }}
          dataSource={[
            {
              title: 'Value',
              content: props.newRequest.value,
            },
            {
              title: 'Description',
              content: props.newRequest.description,
            },
            {
              title: 'Recipient',
              content: props.newRequest.recipient,
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

RequestModal.propTypes = {
  isRequestModalVisible: PropTy
};

export default RequestModal;
