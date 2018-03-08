import React from 'react';
import Link from 'next/link'
import { connect } from 'react-redux';
import { Layout, Menu, Breadcrumb, Icon, Card, Row, Col, Button } from 'antd';

import factory from '../ethereum/factory';
import campaign from '../ethereum/campaign';
import PageLayout from '../components/Layout';

const { Header, Content } = Layout;

const campaignCard = address => {
  const campaignInstance = campaign(address);
  return(
    <Col>
      <Card title={address} extra={<a href="#">More</a>} style={{ width: "500px" }}>
        <p><a href={`https://rinkeby.etherscan.io/tx/${address}`}>View on EtherScan</a></p>
        {/* <p>Minimum contribution: {minimumContribution}</p> */}
        <p>Is Campaign complete</p>
      </Card>
    </Col>);
};

class CampaignsIndex extends React.Component {
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return { campaigns }
  }

  render() {
    return(
      <PageLayout>
        <h1 style={{"textAlign" : "center"}}>Opened campaigns</h1>
        <Row type="flex" justify="center">
          {this.props.campaigns.map( campaignAddress => campaignCard(campaignAddress))}
        </Row>
        <Row type="flex" justify="left">
          <Button type="primary">Create a campaign</Button>
        </Row>
      </PageLayout>
  )
}}

export default CampaignsIndex;
