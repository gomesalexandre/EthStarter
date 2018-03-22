import React from 'react';
import { nextConnect, } from '../store/initStore';
import { Layout, Breadcrumb, Card, Row, Col, Button, Tag, List, Spin, } from 'antd';

import { getCampaigns, } from '../actions/addFetchedCampaignsAsync';

import PageLayout from '../components/Layout';

import CampaignCard from '../decorators/CampaignCard';
const { Header, Content, } = Layout;



class CampaignsIndex extends React.Component {
  async componentDidMount() {
    // TODO: Error handling on unsuccessful campaigns fetch
    await this.props.dispatch(getCampaigns());
  }

  render() {
    return(
      <PageLayout selected="campaigns">
        <h1 style={{"textAlign" : "center",}}>Opened campaigns</h1>
        <Row type="flex" justify="center">
          {this.props.campaigns ? this.props.campaigns.map( (campaignAddress, i) => CampaignCard(campaignAddress, i)) : <Spin size="large" />}
        </Row>
        <Row type="flex" justify="left">
          <Button type="primary">Create a campaign</Button>
        </Row>
      </PageLayout>
  );
}}

export default nextConnect(state => state)(CampaignsIndex);
