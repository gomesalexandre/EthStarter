import React from 'react';
import Link from 'next/link';
import { Layout, Menu, Breadcrumb, Icon, Card, Row, Col, Button, Tag, List, } from 'antd';

import factory from '../ethereum/factory';
import PageLayout from '../components/Layout';

const { Header, Content, } = Layout;

const campaignCard = (address, key) => {
  return(
    <Col key={key}>
      <Card
        title={address}
        extra={
          <Link href={`/campaign?id=${address}`} as={`/campaign/${address}`} prefetch>
            More
          </Link>}
        style={{ width: "500px", }}>
        <p><a href={`https://rinkeby.etherscan.io/address/${address}`}>View on EtherScan</a></p>
      </Card>
    </Col>);
};

class CampaignsIndex extends React.Component {
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return { campaigns, };
  }

  render() {
    return(
      <PageLayout selected="campaigns">
        <h1 style={{"textAlign" : "center",}}>Opened campaigns</h1>
        <Row type="flex" justify="center">
          {this.props.campaigns.map( (campaignAddress, i) => campaignCard(campaignAddress, i))}
        </Row>
        <Row type="flex" justify="left">
          <Button type="primary">Create a campaign</Button>
        </Row>
      </PageLayout>
  );
}}

export default CampaignsIndex;
