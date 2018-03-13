import react from 'react';
import { Card, Breadcrumb, Tag, Row, Col, Button, Modal } from 'antd';
import web3 from '../../ethereum/web3';
import CampaignInstance from '../../ethereum/campaign';
import PageLayout from '../../components/Layout';
import ContributeForm from '../../components/ContributeForm';

class Campaign extends React.Component {
  state = {isModalVisible : false}

  static async getInitialProps ({query}) {
    const campaignInstance = CampaignInstance(query.address);
    const campaignSummary = await campaignInstance.methods.getSummary().call();

    return({
      address: query.address,
      balance: campaignSummary[0],
      minimumContribution: campaignSummary[1],
      manager: campaignSummary[2],
      approversCount: campaignSummary[3],
      requests: campaignSummary[4],
    });
  }
  newRequestHandler() {
    this.setState({isModalVisible: true});
    console.log('New state is', this.state);
  }
  render(){
    return(
      <PageLayout>
      <Modal
      visible={this.state.isModalVisible}
      title="Create a new campaign"
      // onOk={this.handleOk}
      // onCancel={this.handleCancel}
      // footer={[
      //   <Button key="back" onClick={this.handleCancel}>Return</Button>,
      //   <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
      //     Submit
      //   </Button>,
      //     ]}
        >
        </Modal>
        <Row>
          <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item><a href="">Campaigns</a></Breadcrumb.Item>
            <Breadcrumb.Item>{this.props.address}</Breadcrumb.Item>
          </Breadcrumb>
          <Col span={18} offset={3}>
            <Card title="Campaign">
              <Button type="primary" icon="file" onClick={() => this.newRequestHandler()}>Create new request</Button>
              <Card type="inner" title="Address">{this.props.address}</Card>
              <Card type="inner" title="Minimum Contribution">
                {this.props.minimumContribution} wei ({web3.utils.fromWei(this.props.minimumContribution, 'ether')} ethers)
              </Card>
              <Card type="inner" title="Manager">{this.props.manager}</Card>
              <Card type="inner" title="Contributers">{this.props.approversCount}</Card>
              <Card type="inner" title="Requests">{this.props.requests}</Card>
            </Card>
          </Col>
          {/* <Col span={4}>
            <ContributeForm/>
          </Col> */}
        </Row>
      </PageLayout>
    )};
}
export default Campaign;
