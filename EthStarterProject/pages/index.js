import React from 'react';
import { Layout, Menu, Breadcrumb, Icon, Card, Row, Col, Button, Tag, List, } from 'antd';
import web3 from '../ethereum/web3';

import factory from '../ethereum/factory';
import PageLayout from '../components/Layout';

import CampaignCard from '../decorators/CampaignCard';
const { Header, Content, } = Layout;



class CampaignsIndex extends React.Component {
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return { campaigns, };
  }

  render() {
    console.log('wbeb3 is', web3.currentProvider);
    return(
      <PageLayout selected="campaigns">
        <h1 style={{"textAlign" : "center",}}>Opened campaigns</h1>
        <Row type="flex" justify="center">
          {this.props.campaigns.map( (campaignAddress, i) => CampaignCard(campaignAddress, i))}
        </Row>
        <Row type="flex" justify="left">
          <Button type="primary">Create a campaign</Button>
        </Row>
      </PageLayout>
  );
}}

export default CampaignsIndex;
