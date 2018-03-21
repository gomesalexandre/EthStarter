import React from 'react';
import { nextConnect, } from '../store/initStore';
import { Layout, Menu, Breadcrumb, Icon, Card, Row, Col, Button, Tag, List, } from 'antd';

import { getCampaigns, } from '../actions/addFetchedCampaigns';

import PageLayout from '../components/Layout';

import CampaignCard from '../decorators/CampaignCard';
const { Header, Content, } = Layout;



class CampaignsIndex extends React.Component {
  async componentDidMount() {
    await this.props.dispatch(getCampaigns());
  }

  render() {
    return(
      <PageLayout selected="campaigns">
        <h1 style={{"textAlign" : "center",}}>Opened campaigns</h1>
        <Row type="flex" justify="center">
          {this.props.campaigns ? this.props.campaigns.map( (campaignAddress, i) => CampaignCard(campaignAddress, i)) : ''}
        </Row>
        <Row type="flex" justify="left">
          <Button type="primary">Create a campaign</Button>
        </Row>
      </PageLayout>
  );
}}

export default nextConnect(state => state)(CampaignsIndex);
