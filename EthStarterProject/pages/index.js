import React from 'react';
import Link from 'next/link'
import { Layout, Menu, Breadcrumb, Icon, Card, Row, Col, Button } from 'antd';

import factory from '../ethereum/factory';
import PageLayout from '../components/Layout';

const { Header, Content } = Layout;


class CampaignsIndex extends React.Component {
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return { campaigns }
  }

  campaignCard(address) {
    return (
      <Col>
        <Card title={address} extra={<a href="#">More</a>} style={{ width: "500px" }}>
          <p>Campaign amount</p>
          <p>Is Campaign complete</p>
        </Card>
      </Col>)
  }
  render() {
    return(
      <PageLayout>
        <h1 style={{"textAlign" : "center"}}>Opened campaigns</h1>
        <Row type="flex" justify="center">
          {this.props.campaigns.map( campaign => this.campaignCard(campaign))}
        </Row>
        <Row type="flex" justify="left">
          <Button type="primary">Create a campaign</Button>
        </Row>
      </PageLayout>
  )
}}
export default CampaignsIndex;
